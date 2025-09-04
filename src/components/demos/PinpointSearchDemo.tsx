import React, { useState, useEffect, useRef } from 'react';
import { Play, RotateCcw } from 'lucide-react';

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
    // Realistic predefined similarities for "neural network training algorithms"
    const similarities: { [key: string]: number } = {
      'Neural network training with backpropagation': 0.94,
      'Training algorithms for deep learning': 0.89,
      'Network architecture design patterns': 0.72,
      'Deep neural network training loops': 0.91,
      'Training optimization algorithms': 0.87,
      'Data preprocessing utilities': 0.23,
      'Dataset loading helper functions': 0.18,
      'Project documentation and setup': 0.12,
      'Installation and configuration guide': 0.08
    };
    
    return similarities[chunkContent] || 0.15;
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
        return "Ready to search. Click play to start the Pinpoint search algorithm.";
      case 1:
        return `Searching through all chunks sequentially. Searched: ${searchedCount}/9 chunks`;
      case 2:
        return "Calculating best similarity score for each file";
      case 3:
        return "Ranking files by their best chunk similarity";
      case 4:
        return `Search complete. Found ${matchedCount} matching chunks across ${searchFiles.filter(f => f.rank).length} files`;
      default:
        return "";
    }
  };

  const rankedFiles = searchFiles
    .filter(file => file.rank !== null)
    .sort((a, b) => (a.rank || 0) - (b.rank || 0));

  return (
    <div className="flex gap-6 h-full">
      {/* Left Panel */}
      <div className="w-80 p-6 rounded-xl border" style={{ backgroundColor: '#2a2a2a', borderColor: '#404040' }}>
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-2 text-amber-400">Pinpoint Search Algorithm</h3>
            <div className="text-sm text-gray-400 space-y-1">
              <div>Complexity: <span className="text-amber-400 font-mono">O(log n)</span></div>
              <div>Model: <span className="text-blue-400">all-MiniLM-L6-v2</span></div>
              <div>Strategy: <span className="text-green-400">Direct similarity matching</span></div>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Demo Query</label>
              <div className="p-3 bg-gray-800 border border-gray-600 rounded">
                <div className="font-mono text-amber-400">"{searchQuery}"</div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Similarity Threshold: {similarityThreshold.toFixed(2)}
              </label>
              <input
                type="range"
                min="0.5"
                max="1"
                step="0.05"
                value={similarityThreshold}
                onChange={(e) => setSimilarityThreshold(parseFloat(e.target.value))}
                className="w-full accent-amber-400"
                disabled={isRunning}
              />
            </div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={runSearch}
              disabled={isRunning}
              className="flex-1 flex items-center justify-center gap-2 py-2 px-4 bg-amber-600 hover:bg-amber-700 disabled:bg-gray-700 disabled:cursor-not-allowed rounded transition-colors"
            >
              <Play className="w-4 h-4" />
              {isRunning ? 'Running...' : 'Start Search'}
            </button>
            <button
              onClick={resetDemo}
              disabled={isRunning}
              className="p-2 bg-gray-700 hover:bg-gray-600 disabled:bg-gray-800 rounded transition-colors"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>

          <div className="p-4 bg-gray-800 rounded border-l-4 border-amber-400">
            <div className="text-sm font-medium mb-2">Current Step</div>
            <div className="text-sm text-gray-300">{getStepDescription()}</div>
          </div>

          {currentStep === 4 && rankedFiles.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-sm font-medium text-amber-400">File Rankings</h4>
              {rankedFiles.map((file) => (
                <div key={file.name} className="p-3 bg-gray-800 rounded">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-mono">{file.name}</span>
                    <span className="text-xs bg-amber-600 px-2 py-1 rounded">#{file.rank}</span>
                  </div>
                  <div className="text-xs text-gray-400 mt-1">
                    Best similarity: {file.bestSimilarity.toFixed(3)}
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="p-3 bg-gray-800 rounded">
              <div className="text-amber-400 font-mono text-lg">{searchedCount}/9</div>
              <div className="text-gray-400">Chunks Searched</div>
            </div>
            <div className="p-3 bg-gray-800 rounded">
              <div className="text-green-400 font-mono text-lg">{matchedCount}</div>
              <div className="text-gray-400">Above Threshold</div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel */}
      <div className="flex-1 p-6 rounded-xl border" style={{ backgroundColor: '#2a2a2a', borderColor: '#404040' }}>
        <h3 className="text-lg font-semibold mb-4 text-center">Direct Similarity Search Visualization</h3>
        
        <canvas
          ref={canvasRef}
          width={500}
          height={400}
          className="border border-gray-600 rounded bg-gray-900 mx-auto block"
        />

        <div className="mt-6 space-y-4">
          <div className="text-center text-sm text-gray-400">
            Pinpoint search directly compares query embedding with all small chunks
          </div>
          
          <div className="grid grid-cols-3 gap-4 text-sm">
            <div className="p-3 bg-gray-800 rounded text-center">
              <div className="font-semibold text-amber-400">Stage 1</div>
              <div className="text-gray-300">Query Embedding</div>
            </div>
            <div className="p-3 bg-gray-800 rounded text-center">
              <div className="font-semibold text-amber-400">Stage 2</div>
              <div className="text-gray-300">Direct Search</div>
            </div>
            <div className="p-3 bg-gray-800 rounded text-center">
              <div className="font-semibold text-amber-400">Stage 3</div>
              <div className="text-gray-300">Threshold Filter</div>
            </div>
          </div>

          <div className="p-4 bg-gray-800 rounded">
            <h4 className="font-medium text-amber-400 mb-2">Algorithm Steps:</h4>
            <ol className="list-decimal list-inside text-sm text-gray-300 space-y-1">
              <li>Generate query embedding using all-MiniLM-L6-v2</li>
              <li>Search through all small chunks (3-line max)</li>
              <li>Calculate cosine similarity for each chunk</li>
              <li>Filter chunks above similarity threshold</li>
              <li>Rank files by their best matching chunk</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PinpointSearchDemo;