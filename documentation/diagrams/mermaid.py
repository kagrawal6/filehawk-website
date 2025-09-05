#!/usr/bin/env python3
import argparse
import os
import re
import sys
import webbrowser
from pathlib import Path

HTML_TEMPLATE = """<!doctype html>
<html>
<head>
<meta charset="utf-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1"/>
<title>{title}</title>
<style>
  body {{
    margin: 0;
    font-family: system-ui, -apple-system, Segoe UI, Arial, sans-serif;
    background: {bg};
    color: {fg};
  }}
  .toolbar {{
    position: sticky;
    top: 0;
    display: flex;
    gap: .5rem;
    align-items: center;
    padding: .5rem .75rem;
    border-bottom: 1px solid {border};
    background: {toolbar_bg};
    z-index: 10;
  }}
  .toolbar input[type="range"] {{
    width: 250px;
  }}
  .stage-wrap {{
    position: relative;
    width: 100%;
    height: calc(100vh - 52px);
    overflow: auto;
    padding: 16px;
    cursor: grab;
  }}
  .stage {{
    transform-origin: 0 0;
    display: inline-block;
  }}
  /* make SVG selectable and crisp */
  svg {{
    shape-rendering: geometricPrecision;
    text-rendering: optimizeLegibility;
  }}
  .hint {{
    opacity: .7;
    font-size: 12px;
    margin-left: auto;
  }}
  button {{
    cursor: pointer;
  }}
  .panning {{
    cursor: grabbing !important;
  }}
</style>
</head>
<body>
  <div class="toolbar">
    <strong>{title}</strong>
    <label style="margin-left:1rem;">Zoom
      <input id="zoom" type="range" min="0.25" max="4" step="0.05" value="{initial_zoom}">
    </label>
    <button id="zoomOut">-</button>
    <button id="zoomIn">+</button>
    <button id="reset">Reset</button>
    <span class="hint">Tip: Ctrl/Cmd + mouse wheel zooms · Drag to pan</span>
  </div>
  <div class="stage-wrap" id="wrap">
    <div class="stage" id="stage">
      <pre class="mermaid">
{mermaid_code}
      </pre>
    </div>
  </div>

  <!-- Mermaid CDN -->
  <script src="https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.min.js"></script>
  <script>
    const userConfig = {{
      startOnLoad: true,
      theme: "{theme}",
      themeVariables: {{
        fontSize: "{font_size}px",
        lineHeight: "{line_height}px"
      }}
    }};
    mermaid.initialize(userConfig);

    const zoomEl = document.getElementById('zoom');
    const stage = document.getElementById('stage');
    const wrap = document.getElementById('wrap');
    const btnIn = document.getElementById('zoomIn');
    const btnOut = document.getElementById('zoomOut');
    const btnReset = document.getElementById('reset');

    let svgEl = null;
    let baseWidth = 0, baseHeight = 0;

    function applyZoom(z) {{
      const scale = typeof z === 'string' ? parseFloat(z) : z;
      if (svgEl) {{
        svgEl.style.transformOrigin = '0 0';
        svgEl.style.transform = `scale(${{scale}})`;
        if (baseWidth && baseHeight) {{
          stage.style.width = Math.ceil(baseWidth * scale) + 'px';
          stage.style.height = Math.ceil(baseHeight * scale) + 'px';
        }}
      }} else {{
        // Fallback if SVG not yet found: scale the stage
        stage.style.transformOrigin = '0 0';
        stage.style.transform = `scale(${{scale}})`;
      }}
      zoomEl.value = scale.toFixed(2);
    }}

    zoomEl.addEventListener('input', () => applyZoom(zoomEl.value));

    btnIn.addEventListener('click', () => {{
      const z = Math.min(4, (parseFloat(zoomEl.value) + 0.1));
      applyZoom(z);
    }});
    btnOut.addEventListener('click', () => {{
      const z = Math.max(0.25, (parseFloat(zoomEl.value) - 0.1));
      applyZoom(z);
    }});
    btnReset.addEventListener('click', () => applyZoom({initial_zoom}));

    // Ctrl/Cmd + wheel zoom
    wrap.addEventListener('wheel', (e) => {{
      if (!(e.ctrlKey || e.metaKey)) return;
      e.preventDefault();
      const delta = e.deltaY > 0 ? -0.1 : 0.1;
      const z = Math.min(4, Math.max(0.25, parseFloat(zoomEl.value) + delta));
      applyZoom(z);
    }}, {{passive:false}});

    // Auto-fit width on load (approx)
    window.addEventListener('load', () => {{
      // Give Mermaid a moment to render
      setTimeout(() => {{
        try {{
          svgEl = stage.querySelector('svg');
          if (!svgEl) return;
          const bbox = svgEl.getBBox();
          baseWidth = Math.max(1, bbox.width);
          baseHeight = Math.max(1, bbox.height);
          const target = wrap.clientWidth - 32; // padding margin
          let z = target / baseWidth;
          z = Math.max(0.25, Math.min(2.5, z));
          applyZoom(z);
        }} catch (e) {{}}
      }}, 250);
    }});

    // Drag to pan
    let isPanning = false;
    let startX = 0, startY = 0, startScrollLeft = 0, startScrollTop = 0;
    wrap.addEventListener('mousedown', (e) => {{
      if (e.button !== 0) return; // left-click only
      isPanning = true;
      wrap.classList.add('panning');
      startX = e.pageX - wrap.offsetLeft;
      startY = e.pageY - wrap.offsetTop;
      startScrollLeft = wrap.scrollLeft;
      startScrollTop = wrap.scrollTop;
    }});
    window.addEventListener('mouseup', () => {{
      isPanning = false;
      wrap.classList.remove('panning');
    }});
    wrap.addEventListener('mouseleave', () => {{
      isPanning = false;
      wrap.classList.remove('panning');
    }});
    wrap.addEventListener('mousemove', (e) => {{
      if (!isPanning) return;
      e.preventDefault();
      const x = e.pageX - wrap.offsetLeft;
      const y = e.pageY - wrap.offsetTop;
      const dx = x - startX;
      const dy = y - startY;
      wrap.scrollLeft = startScrollLeft - dx;
      wrap.scrollTop = startScrollTop - dy;
    }});
  </script>
</body>
</html>
"""

def extract_mermaid_blocks(md_text):
    # Matches ```mermaid ... ``` including optional language params on same line
    pattern = re.compile(r"```mermaid[^\n]*\n(.*?)\n```", re.DOTALL | re.IGNORECASE)
    return [m.group(1).strip() for m in pattern.finditer(md_text)]

def make_html(mermaid_code, title, out_path, theme, font_size, line_height, initial_zoom):
    dark = theme.lower() in ("dark", "forest", "neutral", "dark2")
    html = HTML_TEMPLATE.format(
        title=title,
        mermaid_code=escape_html(mermaid_code),
        theme=theme,
        font_size=font_size,
        line_height=line_height,
        initial_zoom=initial_zoom,
        bg="#0b0b0c" if dark else "#ffffff",
        fg="#f2f2f2" if dark else "#111111",
        border="rgba(255,255,255,.12)" if dark else "rgba(0,0,0,.12)",
        toolbar_bg="rgba(255,255,255,.06)" if dark else "rgba(0,0,0,.03)",
    )
    out_path.write_text(html, encoding="utf-8")

def escape_html(s: str) -> str:
    return (s
        .replace("&","&amp;")
        .replace("<","&lt;")
        .replace(">","&gt;")
    )

def find_default_md_file() -> Path:
    """Find a default markdown file when only a diagram index is provided.

    Preference order:
      1) A file named 'frontend.md' in CWD or script dir
      2) If exactly one .md exists in CWD
      3) If exactly one .md exists in script dir
    Otherwise, exit with guidance.
    """
    cwd = Path.cwd()
    script_dir = Path(__file__).parent

    def list_md(dir_path: Path):
        return sorted(p for p in dir_path.glob("*.md") if p.is_file())

    # Prefer 'frontend.md' in cwd then script dir
    for d in (cwd, script_dir):
        candidate = d / "frontend.md"
        if candidate.exists():
            return candidate

    # If exactly one .md in cwd
    cwd_md = [p for p in list_md(cwd)]
    if len(cwd_md) == 1:
        return cwd_md[0]

    # If exactly one .md in script dir
    sd_md = [p for p in list_md(script_dir)]
    if len(sd_md) == 1:
        return sd_md[0]

    # Otherwise, error with guidance
    print(
        "Could not determine which .md file to use.\n"
        "Specify a markdown file explicitly, e.g.:\n"
        "  python mermaid.py <path/to/file.md> <diagram_number>",
        file=sys.stderr,
    )
    sys.exit(1)


def parse_args():
    ap = argparse.ArgumentParser(
        description=(
            "Generate Mermaid diagram HTML previews.\n\n"
            "No arguments: generate all diagrams for all .md files in this folder,\n"
            "saving as <FileName>_<DiagramNumber>.html.\n\n"
            "Examples:\n"
            "  python mermaid.py                      # batch mode over folder\n"
            "  python mermaid.py <diagram_number>     # open Nth diagram from default .md\n"
            "  python mermaid.py <markdown_file> [diagram_number]\n"
            "  python mermaid.py -f <markdown_file> <diagram_number>\n"
        )
    )

    ap.add_argument("md_or_index", nargs="?", help="Markdown file path OR a diagram number (1-based)")
    ap.add_argument("diagram_number", nargs="?", type=int, help="Diagram number to open (1-based)")
    ap.add_argument("-f", "--file", dest="file", help="Markdown file path (if first arg is a number)")

    ap.add_argument("--theme", default="default", help="Mermaid theme: default | dark | forest | neutral | base")
    ap.add_argument("--font-size", type=int, default=20, help="Base font size in px for diagram text")
    ap.add_argument("--line-height", type=int, default=24, help="Line height in px for diagram text")
    ap.add_argument("--initial-zoom", type=float, default=1.2, help="Initial zoom scale")
    ap.add_argument("--open", action="store_true", help="Open in browser (on by default)")
    ap.add_argument("--no-open", dest="open", action="store_false", help="Do not open in browser")
    ap.set_defaults(open=True)
    return ap.parse_args()


def resolve_inputs(args):
    """Resolve markdown path and diagram index from CLI args."""
    md_path = None
    index = None

    if args.file:
        md_path = Path(args.file)
        index = args.diagram_number if args.diagram_number else None
    elif args.md_or_index:
        s = str(args.md_or_index).strip()
        if s.isdigit():
            index = int(s)
            md_path = find_default_md_file()
        else:
            md_path = Path(s)
            index = args.diagram_number if args.diagram_number else None
    else:
        # No positional provided; try default md and default to first diagram
        md_path = find_default_md_file()
        index = args.diagram_number if args.diagram_number else 1

    if index is None:
        index = 1

    return md_path, index


def main():
    args = parse_args()

    # Batch mode: no file/index provided -> process all .md files in script dir
    if not args.md_or_index and not args.file and args.diagram_number is None:
        script_dir = Path(__file__).parent
        md_files = sorted(p for p in script_dir.glob("*.md") if p.is_file())
        if not md_files:
            print(f"No .md files found in {script_dir}")
            sys.exit(0)

        total_outputs = 0
        for md_path in md_files:
            text = md_path.read_text(encoding="utf-8", errors="ignore")
            blocks = extract_mermaid_blocks(text)
            if not blocks:
                continue
            for i, block in enumerate(blocks, start=1):
                title = f"{md_path.name} – diagram {i}/{len(blocks)}"
                out_path = md_path.parent / f"{md_path.stem}_{i}.html"
                make_html(
                    mermaid_code=block,
                    title=title,
                    out_path=out_path,
                    theme=args.theme,
                    font_size=args.font_size,
                    line_height=args.line_height,
                    initial_zoom=args.initial_zoom,
                )
                total_outputs += 1
                if args.open:
                    webbrowser.open(out_path.as_uri())

        print(f"Generated {total_outputs} preview file(s) across {len(md_files)} markdown file(s) in: {script_dir}")
        return

    # Single-file/single-diagram mode
    md_path, diagram_index = resolve_inputs(args)

    if not md_path.exists():
        print(f"File not found: {md_path}", file=sys.stderr)
        sys.exit(1)

    text = md_path.read_text(encoding="utf-8", errors="ignore")
    blocks = extract_mermaid_blocks(text)

    if not blocks:
        print("No ```mermaid``` code blocks found.")
        sys.exit(2)

    if diagram_index < 1 or diagram_index > len(blocks):
        print(
            (
                f"Requested diagram {diagram_index} is out of range. "
                f"This file contains {len(blocks)} diagram(s)."
            ),
            file=sys.stderr,
        )
        sys.exit(3)

    i = diagram_index
    block = blocks[i - 1]
    title = f"{md_path.name} – diagram {i}/{len(blocks)}"
    out_path = md_path.parent / f"{md_path.stem}_{i}.html"
    make_html(
        mermaid_code=block,
        title=title,
        out_path=out_path,
        theme=args.theme,
        font_size=args.font_size,
        line_height=args.line_height,
        initial_zoom=args.initial_zoom,
    )

    print(f"Generated preview: {out_path}")
    if args.open:
        webbrowser.open(out_path.as_uri())

if __name__ == "__main__":
    main()
