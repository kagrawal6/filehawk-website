# Screenshot Installation Instructions

The ApplicationPagesSection component has been updated to display screenshots on the right side of each application page description. To complete the setup, you need to add the actual screenshot images.

## Required Screenshots

Based on the 10 screenshots provided in the conversation, save them with the following filenames in the `public/screenshots/` directory:

### Light Mode Screenshots:
1. **Settings Page Light Mode** → `public/screenshots/settings-light.png`
   - From conversation: Image showing settings page with light theme

2. **GitHub Integration Page Light Mode** → `public/screenshots/github-light.png`
   - From conversation: Image showing GitHub repositories table with light theme

3. **Track Files Page Light Mode** → `public/screenshots/trackfiles-light.png`
   - From conversation: Image showing file tracking table with light theme

4. **Saved Page Light Mode** → `public/screenshots/saved-light.png`
   - From conversation: Image showing saved items/bookmarks with light theme

5. **Home Page Light Mode** → `public/screenshots/home-light.png`
   - From conversation: Image showing search interface with light theme

### Dark Mode Screenshots:
1. **Settings Page Dark Mode** → `public/screenshots/settings-dark.png`
   - From conversation: Image showing settings page with dark theme

2. **GitHub Integration Page Dark Mode** → `public/screenshots/github-dark.png`
   - From conversation: Image showing GitHub repositories table with dark theme

3. **Track Files Page Dark Mode** → `public/screenshots/trackfiles-dark.png`
   - From conversation: Image showing file tracking table with dark theme

4. **Saved Page Dark Mode** → `public/screenshots/saved-dark.png`
   - From conversation: Image showing saved items/bookmarks with dark theme

5. **Home Page Dark Mode** → `public/screenshots/home-dark.png`
   - From conversation: Image showing search interface with dark theme

## How it Works

The component automatically:
- Detects the current theme (light/dark)
- Shows the appropriate screenshot based on the theme
- Uses a MutationObserver to update screenshots when theme changes
- Falls back to a placeholder SVG if images are missing
- Only displays screenshots for pages that have them (excludes Command Palette and Status Bar)

## Implementation Details

The screenshots are displayed in a responsive grid layout:
- **Desktop (lg+)**: Two-column layout with features on left, screenshot on right
- **Mobile**: Single-column layout with screenshot below features
- **Styling**: Screenshots are contained in a rounded border with shadow, max height of 600px
- **Positioning**: Screenshots are sticky on desktop for better UX during scrolling

## File Structure
```
public/
  screenshots/
    settings-light.png
    settings-dark.png
    github-light.png
    github-dark.png
    trackfiles-light.png
    trackfiles-dark.png
    saved-light.png
    saved-dark.png
    home-light.png
    home-dark.png
    placeholder.svg (fallback image)
    README.md (documentation)
```

Once you add the actual screenshot files, the component will automatically display them with proper theme switching functionality.