import React, { useState, useEffect, useRef } from 'react';
import { 
  Search, 
  Play,
  RotateCcw,
  Database,
  TrendingUp,
  Info,
  Settings,
  Zap
} from 'lucide-react';

interface SearchChunk {
  id: string;
  file: string;
  content: string;
  position: { x: number; y: number };
  similarity: number;
  isSearching: boolean;
  isMatched: boolean;
}

interface SearchFile {
  name: string;
  chunks: SearchChunk[];
  bestSimilarity: number;
  rank: number | null;
}

const PinpointSearchDemo: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [searchQuery] = useState('neural network training algorithms');
  const [similarityThreshold, setSimilarityThreshold] = useState(0.75);
  const [searchedCount, setSearchedCount] = useState(0);
  const [matchedCount, setMatchedCount] = useState(0);

  const [searchFiles] = useState<SearchFile[]>([
    {
      name: 'neural_networks.py',
      chunks: [
        { id: '1', file: 'neural_networks.py', content: 'Neural network training with backpropagation', position: { x: 100, y: 100 }, similarity: 0, isSearching: false, isMatched: false },
        { id: '2', file: 'neural_networks.py', content: 'Training algorithms for deep learning', position: { x: 150, y: 150 }, similarity: 0, isSearching: false, isMatched: false },
        { id: '3', file: 'neural_networks.py', content: 'Network architecture design patterns', position: { x: 200, y: 120 }, similarity: 0, isSearching: false, isMatched: false }
      ],
      bestSimilarity: 0,
      rank: null
    },
    {
      name: 'deep_learning.py',
      chunks: [
        { id: '4', file: 'deep_learning.py', content: 'Deep neural network training loops', position: { x: 300, y: 180 }, similarity: 0, isSearching: false, isMatched: false },
        { id: '5', file: 'deep_learning.py', content: 'Training optimization algorithms', position: { x: 350, y: 140 }, similarity: 0, isSearching: false, isMatched: false }
      ],
      bestSimilarity: 0,
      rank: null
    },
    {
      name: 'data_utils.py',
      chunks: [
        { id: '6', file: 'data_utils.py', content: 'Data preprocessing utilities', position: { x: 120, y: 250 }, similarity: 0, isSearching: false, isMatched: false },
        { id: '7', file: 'data_utils.py', content: 'Dataset loading helper functions', position: { x: 180, y: 280 }, similarity: 0, isSearching: false, isMatched: false }
      ],
      bestSimilarity: 0,
      rank: null
    },
    {
      name: 'project_docs.md',
      chunks: [
        { id: '8', file: 'project_docs.md', content: 'Project documentation and setup', position: { x: 280, y: 250 }, similarity: 0, isSearching: false, isMatched: false },
        { id: '9', file: 'project_docs.md', content: 'Installation and configuration guide', position: { x: 330, y: 280 }, similarity: 0, isSearching: false, isMatched: false }
      ],
      bestSimilarity: 0,
      rank: null
    }
  ]);

  const [queryEmbedding] = useState({ x: 250, y: 50 });

  const calculateSimilarity = (chunkContent: string): number => {
    // Enhanced confidence scoring simulation for "neural network training algorithms"
    const baseScores: { [key: string]: number } = {
      'Neural network training with backpropagation': 0.85,
      'Training algorithms for deep learning': 0.80,
      'Network architecture design patterns': 0.65,
      'Deep neural network training loops': 0.82,
      'Training optimization algorithms': 0.78,
      'Data preprocessing utilities': 0.15,
      'Dataset loading helper functions': 0.12,
      'Project documentation and setup': 0.08,
      'Installation and configuration guide': 0.05
    };
    
    let baseScore = baseScores[chunkContent] || 0.10;
    
    // Simulate enhanced confidence layers
    const queryTerms = ['neural', 'network', 'training', 'algorithms'];
    const contentLower = chunkContent.toLowerCase();
    
    // Layer 1: Exact phrase matching boost (up to 50%)
    const exactMatches = queryTerms.filter(term => contentLower.includes(term)).length;
    const exactBoost = 1 + (exactMatches / queryTerms.length) * 0.5;
    
    // Layer 2: Position boost (15% for early mentions)
    const positionBoost = contentLower.indexOf('neural') < 20 ? 1.15 : 1.0;
    
    // Layer 3: Chunk size boost (10% for precise matches in small chunks)
    const sizeBoost = chunkContent.length < 100 && exactMatches > 2 ? 1.10 : 1.0;
    
    // Apply enhanced confidence calculation
    const enhancedScore = Math.min(0.98, baseScore * exactBoost * positionBoost * sizeBoost);
    
    return enhancedScore;
  };

  const drawCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw query embedding
    ctx.fillStyle = '#d4a574';
    ctx.beginPath();
    ctx.arc(queryEmbedding.x, queryEmbedding.y, 8, 0, 2 * Math.PI);
    ctx.fill();
    ctx.fillStyle = '#d4a574';
    ctx.font = '12px monospace';
    ctx.fillText('Query', queryEmbedding.x + 12, queryEmbedding.y + 4);

    // Draw chunks
    searchFiles.forEach(file => {
      file.chunks.forEach(chunk => {
        // Chunk circle
        if (chunk.isSearching) {
          ctx.strokeStyle = '#d4a574';
          ctx.lineWidth = 3;
          ctx.setLineDash([5, 5]);
        } else if (chunk.isMatched) {
          ctx.strokeStyle = '#22c55e';
          ctx.lineWidth = 2;
          ctx.setLineDash([]);
        } else if (chunk.similarity > 0) {
          ctx.strokeStyle = chunk.similarity >= similarityThreshold ? '#22c55e' : '#ef4444';
          ctx.lineWidth = 2;
          ctx.setLineDash([]);
        } else {
          ctx.strokeStyle = '#666666';
          ctx.lineWidth = 1;
          ctx.setLineDash([]);
        }

        ctx.beginPath();
        ctx.arc(chunk.position.x, chunk.position.y, 12, 0, 2 * Math.PI);
        ctx.stroke();

        // Fill based on similarity
        if (chunk.similarity > 0) {
          const alpha = chunk.similarity;
          ctx.fillStyle = chunk.similarity >= similarityThreshold 
            ? `rgba(34, 197, 94, ${alpha * 0.7})` 
            : `rgba(239, 68, 68, ${alpha * 0.5})`;
          ctx.fill();
        }

        // Draw connection line during search
        if (chunk.isSearching) {
          ctx.strokeStyle = '#d4a574';
          ctx.lineWidth = 2;
          ctx.setLineDash([3, 3]);
          ctx.beginPath();
          ctx.moveTo(queryEmbedding.x, queryEmbedding.y);
          ctx.lineTo(chunk.position.x, chunk.position.y);
          ctx.stroke();
          ctx.setLineDash([]);
        }

        // Chunk label
        ctx.fillStyle = '#cccccc';
        ctx.font = '10px monospace';
        const textWidth = ctx.measureText(chunk.content.substring(0, 15) + '...').width;
        ctx.fillText(
          chunk.content.substring(0, 15) + '...',
          chunk.position.x - textWidth / 2,
          chunk.position.y + 25
        );

        // Similarity score
        if (chunk.similarity > 0) {
          ctx.fillStyle = '#d4a574';
          ctx.font = '11px monospace';
          ctx.fillText(
            chunk.similarity.toFixed(3),
            chunk.position.x - 15,
            chunk.position.y - 18
          );
        }
      });
    });
  };

  const runSearch = async () => {
    setIsRunning(true);
    setCurrentStep(0);
    setSearchedCount(0);
    setMatchedCount(0);

    // Reset all chunks
    searchFiles.forEach(file => {
      file.chunks.forEach(chunk => {
        chunk.similarity = 0;
        chunk.isSearching = false;
        chunk.isMatched = false;
      });
      file.bestSimilarity = 0;
      file.rank = null;
    });

    // Step 1: Search through all chunks sequentially
    setCurrentStep(1);
    let searchedChunks = 0;
    let matchedChunks = 0;

    for (const file of searchFiles) {
      for (const chunk of file.chunks) {
        chunk.isSearching = true;
        drawCanvas();
        await new Promise(resolve => setTimeout(resolve, 800));

        const similarity = calculateSimilarity(chunk.content);
        chunk.similarity = similarity;
        chunk.isSearching = false;
        
        searchedChunks++;
        setSearchedCount(searchedChunks);

        if (similarity >= similarityThreshold) {
          chunk.isMatched = true;
          matchedChunks++;
          setMatchedCount(matchedChunks);
        }

        drawCanvas();
        await new Promise(resolve => setTimeout(resolve, 400));
      }
    }

    // Step 2: Calculate best similarity per file
    setCurrentStep(2);
    searchFiles.forEach(file => {
      file.bestSimilarity = Math.max(...file.chunks.map(c => c.similarity));
    });

    // Step 3: Rank files by best chunk similarity
    setCurrentStep(3);
    const rankedFiles = searchFiles
      .filter(file => file.bestSimilarity >= similarityThreshold)
      .sort((a, b) => b.bestSimilarity - a.bestSimilarity);

    rankedFiles.forEach((file, index) => {
      file.rank = index + 1;
    });

    await new Promise(resolve => setTimeout(resolve, 1000));
    setCurrentStep(4);
    setIsRunning(false);
  };

  const resetDemo = () => {
    setIsRunning(false);
    setCurrentStep(0);
    setSearchedCount(0);
    setMatchedCount(0);
    
    searchFiles.forEach(file => {
      file.chunks.forEach(chunk => {
        chunk.similarity = 0;
        chunk.isSearching = false;
        chunk.isMatched = false;
      });
      file.bestSimilarity = 0;
      file.rank = null;
    });
    
    drawCanvas();
  };

  useEffect(() => {
    drawCanvas();
  }, [searchFiles, similarityThreshold]);

  useEffect(() => {
    drawCanvas();
  }, []);

  const getStepDescription = () => {
    switch (currentStep) {
      case 0:
        return "Ready to search. Click play to start the Enhanced Pinpoint search.";
      case 1:
        return `Computing multi-layer confidence scores. Searched: ${searchedCount}/9 chunks`;
      case 2:
        return "Applying exact phrase, position, and size bonuses";
      case 3:
        return "Aggregating chunks per file with coverage bonuses";
      case 4:
        return `Enhanced ranking complete. Found ${matchedCount} high-confidence matches across ${searchFiles.filter(f => f.rank).length} files`;
      default:
        return "";
    }
  };

  const rankedFiles = searchFiles
    .filter(file => file.rank !== null)
    .sort((a, b) => (a.rank || 0) - (b.rank || 0));

  return (
    <div className={`space-y-6`}>
      {/* Algorithm Steps - First */}
      <div className="p-4 rounded-xl border" style={{ backgroundColor: 'var(--bg-elevated)', borderColor: 'var(--border-subtle)' }}>
        <h4 className="font-medium text-amber-400 mb-2">Enhanced Pinpoint Search Algorithm:</h4>
        <ol className="list-decimal list-inside text-sm space-y-1" style={{ color: 'var(--fg-secondary)' }}>
          <li>Generate query embedding using all-MiniLM-L6-v2 transformer</li>
          <li>Search through all small chunks (3-line precision chunks)</li>
          <li>Calculate semantic distance and apply pinpoint-optimized thresholds</li>
          <li>Compute multi-layered confidence: semantic × exact phrase × filename × position × size</li>
          <li>Aggregate chunks per file with coverage and distribution bonuses</li>
          <li>Rank files using enhanced confidence, exact match count, and filename relevance</li>
        </ol>
      </div>

      {/* Compact Controls Row */}
      <div className="grid lg:grid-cols-4 gap-4">
        {/* Algorithm Info */}
        <div className="p-4 rounded-xl border" style={{ backgroundColor: 'var(--bg-elevated)', borderColor: 'var(--border-subtle)' }}>
          <div className="flex items-center mb-2">
            <div className="p-2 rounded-lg bg-blue-500/20 text-blue-400 mr-3">
              <Search className="h-4 w-4" />
            </div>
            <div className="min-w-0">
              <h3 className="text-sm font-bold text-primary truncate">Enhanced Pinpoint</h3>
              <p className="text-xs text-muted">Multi-layer confidence</p>
            </div>
          </div>
        </div>

        {/* Demo Query */}
        <div className="lg:col-span-2 p-4 rounded-xl border" style={{ backgroundColor: 'var(--bg-elevated)', borderColor: 'var(--border-subtle)' }}>
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-sm font-semibold text-primary">Demo Query</h4>
            <div className="flex gap-2">
              <button
                onClick={runSearch}
                disabled={isRunning}
                className="px-3 py-1.5 bg-blue-500 hover:bg-blue-600 disabled:bg-elevated disabled:cursor-not-allowed text-primary text-xs rounded-lg flex items-center transition-colors"
              >
                {isRunning ? (
                  <>
                    <Zap className="h-3 w-3 mr-1 animate-pulse" />
                    Running...
                  </>
                ) : (
                  <>
                    <Play className="h-3 w-3 mr-1" />
                    Run Demo
                  </>
                )}
              </button>
              <button
                onClick={resetDemo}
                className="px-3 py-1.5 bg-elevated hover:bg-elevated text-primary text-xs rounded-lg flex items-center transition-colors"
              >
                <RotateCcw className="h-3 w-3 mr-1" />
                Reset
              </button>
            </div>
          </div>
          <div className="p-2 rounded bg-muted" style={{ borderColor: 'var(--border-subtle)' }}>
            <div className="font-mono text-amber-400 text-sm">"{searchQuery}"</div>
          </div>
        </div>

        {/* Quick Status */}
        <div className="p-4 rounded-xl border" style={{ backgroundColor: 'var(--bg-elevated)', borderColor: 'var(--border-subtle)' }}>
          <h4 className="text-sm font-semibold text-primary mb-2">Progress</h4>
          <div className="text-xs text-secondary">{getStepDescription()}</div>
          <div className="mt-2 flex justify-between text-xs">
            <span className="text-muted">{searchedCount}/9 chunks</span>
            <span className="text-amber-400">{matchedCount} matches</span>
          </div>
        </div>
      </div>

      {/* Enhanced Confidence Search Visualization - Right after controls */}
      <div className="p-6 rounded-xl border" style={{ backgroundColor: 'var(--bg-elevated)', borderColor: 'var(--border-subtle)' }}>
        <div className="flex items-center mb-6">
          <Database className="h-6 w-6 text-amber-400 mr-3" />
          <h3 className="text-xl font-semibold text-primary">Enhanced Confidence Search Visualization</h3>
          <div className="ml-auto flex items-center text-sm text-muted">
            <Info className="h-4 w-4 mr-1" />
            Brightness = confidence layers
          </div>
        </div>

        <canvas
          ref={canvasRef}
          width={800}
          height={500}
          className="w-full rounded border"
          style={{ backgroundColor: 'var(--bg-muted)', borderColor: 'var(--border-subtle)', minHeight: '500px' }}
        />
      </div>

      {/* Similarity Threshold - More Compact */}
      <div className="p-4 rounded-xl border" style={{ backgroundColor: 'var(--bg-elevated)', borderColor: 'var(--border-subtle)' }}>
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-sm font-semibold text-primary flex items-center">
            <Settings className="h-4 w-4 text-amber-400 mr-2" />
            Similarity Threshold
          </h4>
          <span className="text-xs text-muted">{similarityThreshold.toFixed(2)}</span>
        </div>
        <input
          type="range"
          min="0.5"
          max="1"
          step="0.05"
          value={similarityThreshold}
          onChange={(e) => setSimilarityThreshold(parseFloat(e.target.value))}
          disabled={isRunning}
          className="w-full h-1 bg-elevated rounded-lg appearance-none cursor-pointer accent-amber-400"
        />
      </div>

      {/* File Rankings */}
      {currentStep === 4 && rankedFiles.length > 0 && (
        <div className="p-6 rounded-xl border" style={{ backgroundColor: 'var(--bg-elevated)', borderColor: 'var(--border-subtle)' }}>
          <div className="flex items-center mb-4">
            <TrendingUp className="h-5 w-5 text-amber-400 mr-2" />
            <h4 className="font-semibold text-primary">Ranked Results</h4>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {rankedFiles.map((file) => (
              <div
                key={file.name}
                className="p-4 rounded-lg border"
                style={{ backgroundColor: 'var(--bg-muted)', borderColor: 'var(--border-subtle)' }}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="font-medium text-primary text-sm">{file.name}</div>
                  <div className="text-lg font-bold text-blue-400 ml-2">
                    #{file.rank}
                  </div>
                </div>
                <div className="text-xs text-muted">Enhanced confidence: {file.bestSimilarity.toFixed(3)}</div>
                <div className="text-xs text-muted mt-1">
                  {file.chunks.filter(c => (c.similarity || 0) >= similarityThreshold).length} high-confidence chunks
                </div>
                <div className="text-xs text-amber-400 mt-2">
                  Multi-layer scoring applied ✨
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PinpointSearchDemo;