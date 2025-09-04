import React, { useState, useEffect, useRef } from 'react';
import { Play, RotateCcw, Calculator, BarChart3 } from 'lucide-react';

interface ScoringCandidate {
  id: string;
  fileName: string;
  chunk: string;
  s_max: number;
  s_topk_mean: number;
  s_centroid: number;
  s_bm25: number;
  holisticScore: number;
  rank: number | null;
  position: { x: number; y: number };
  isCalculating: boolean;
  isHighlighted: boolean;
}

interface ScoringWeights {
  w_max: number;
  w_topk_mean: number;
  w_centroid: number;
  w_bm25: number;
}

const HolisticScoringDemo: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [searchQuery, setSearchQuery] = useState('React component optimization');
  const [currentCandidate, setCurrentCandidate] = useState<string | null>(null);
  
  const [weights, setWeights] = useState<ScoringWeights>({
    w_max: 0.45,
    w_topk_mean: 0.25,
    w_centroid: 0.20,
    w_bm25: 0.10
  });

  const [candidates, setCandidates] = useState<ScoringCandidate[]>([
    {
      id: '1',
      fileName: 'components.tsx',
      chunk: 'useState hook for state management',
      s_max: 0,
      s_topk_mean: 0,
      s_centroid: 0,
      s_bm25: 0,
      holisticScore: 0,
      rank: null,
      position: { x: 100, y: 120 },
      isCalculating: false,
      isHighlighted: false
    },
    {
      id: '2',
      fileName: 'optimization.js',
      chunk: 'React component performance optimization',
      s_max: 0,
      s_topk_mean: 0,
      s_centroid: 0,
      s_bm25: 0,
      holisticScore: 0,
      rank: null,
      position: { x: 200, y: 80 },
      isCalculating: false,
      isHighlighted: false
    },
    {
      id: '3',
      fileName: 'hooks.tsx',
      chunk: 'custom hooks implementation patterns',
      s_max: 0,
      s_topk_mean: 0,
      s_centroid: 0,
      s_bm25: 0,
      holisticScore: 0,
      rank: null,
      position: { x: 300, y: 140 },
      isCalculating: false,
      isHighlighted: false
    },
    {
      id: '4',
      fileName: 'utils.py',
      chunk: 'utility functions for data processing',
      s_max: 0,
      s_topk_mean: 0,
      s_centroid: 0,
      s_bm25: 0,
      holisticScore: 0,
      rank: null,
      position: { x: 150, y: 200 },
      isCalculating: false,
      isHighlighted: false
    },
    {
      id: '5',
      fileName: 'performance.tsx',
      chunk: 'component optimization techniques',
      s_max: 0,
      s_topk_mean: 0,
      s_centroid: 0,
      s_bm25: 0,
      holisticScore: 0,
      rank: null,
      position: { x: 250, y: 180 },
      isCalculating: false,
      isHighlighted: false
    }
  ]);

  const calculateIndividualScores = (chunk: string, query: string) => {
    const queryWords = query.toLowerCase().split(' ');
    const chunkWords = chunk.toLowerCase().split(' ');
    
    // s_max: Maximum similarity among all chunks
    const intersection = queryWords.filter(word => 
      chunkWords.some(cWord => cWord.includes(word) || word.includes(cWord))
    );
    const s_max = Math.min(0.95, Math.max(0.1, intersection.length / queryWords.length + Math.random() * 0.3));
    
    // s_topk_mean: Average similarity of top-k chunks
    const s_topk_mean = Math.min(0.85, Math.max(0.05, s_max * 0.8 + Math.random() * 0.2));
    
    // s_centroid: Similarity to file centroid
    const s_centroid = Math.min(0.75, Math.max(0.1, s_max * 0.6 + Math.random() * 0.25));
    
    // s_bm25: BM25 lexical similarity
    const s_bm25 = Math.min(0.6, Math.max(0.05, intersection.length / (queryWords.length + chunkWords.length) + Math.random() * 0.2));
    
    return { s_max, s_topk_mean, s_centroid, s_bm25 };
  };

  const calculateHolisticScore = (scores: any, weights: ScoringWeights): number => {
    return (
      weights.w_max * scores.s_max +
      weights.w_topk_mean * scores.s_topk_mean +
      weights.w_centroid * scores.s_centroid +
      weights.w_bm25 * scores.s_bm25
    );
  };

  const drawCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw query
    ctx.fillStyle = '#d4a574';
    ctx.font = '14px monospace';
    ctx.fillText('Query: ' + searchQuery.substring(0, 25) + '...', 20, 30);

    // Draw candidates
    candidates.forEach((candidate) => {
      const { x, y } = candidate.position;

      // Candidate circle
      if (candidate.isCalculating) {
        ctx.strokeStyle = '#d4a574';
        ctx.lineWidth = 3;
        ctx.setLineDash([5, 5]);
      } else if (candidate.isHighlighted) {
        ctx.strokeStyle = '#22c55e';
        ctx.lineWidth = 3;
        ctx.setLineDash([]);
      } else if (candidate.holisticScore > 0) {
        const intensity = candidate.holisticScore;
        ctx.strokeStyle = `rgba(212, 165, 116, ${intensity})`;
        ctx.lineWidth = 2;
        ctx.setLineDash([]);
      } else {
        ctx.strokeStyle = '#666666';
        ctx.lineWidth = 1;
        ctx.setLineDash([]);
      }

      ctx.beginPath();
      ctx.arc(x, y, 20, 0, 2 * Math.PI);
      ctx.stroke();

      // Fill based on holistic score
      if (candidate.holisticScore > 0) {
        const alpha = candidate.holisticScore * 0.8;
        ctx.fillStyle = `rgba(212, 165, 116, ${alpha})`;
        ctx.fill();
      }

      // Rank badge
      if (candidate.rank !== null) {
        ctx.fillStyle = '#22c55e';
        ctx.beginPath();
        ctx.arc(x + 15, y - 15, 10, 0, 2 * Math.PI);
        ctx.fill();
        
        ctx.fillStyle = '#000000';
        ctx.font = 'bold 12px monospace';
        ctx.textAlign = 'center';
        ctx.fillText(candidate.rank.toString(), x + 15, y - 11);
        ctx.textAlign = 'left';
      }

      // File name
      ctx.fillStyle = '#cccccc';
      ctx.font = '11px monospace';
      const fileName = candidate.fileName;
      const textWidth = ctx.measureText(fileName).width;
      ctx.fillText(fileName, x - textWidth / 2, y - 30);

      // Holistic score
      if (candidate.holisticScore > 0) {
        ctx.fillStyle = '#d4a574';
        ctx.font = 'bold 12px monospace';
        const score = candidate.holisticScore.toFixed(3);
        const scoreWidth = ctx.measureText(score).width;
        ctx.fillText(score, x - scoreWidth / 2, y + 35);
      }

      // Score breakdown (for highlighted candidate)
      if (candidate.isHighlighted && candidate.holisticScore > 0) {
        const breakdown = [
          `s_max: ${candidate.s_max.toFixed(3)}`,
          `s_topk: ${candidate.s_topk_mean.toFixed(3)}`,
          `s_cent: ${candidate.s_centroid.toFixed(3)}`,
          `s_bm25: ${candidate.s_bm25.toFixed(3)}`
        ];

        ctx.fillStyle = 'rgba(42, 42, 42, 0.9)';
        ctx.fillRect(x + 30, y - 40, 140, 80);
        ctx.strokeStyle = '#d4a574';
        ctx.lineWidth = 1;
        ctx.setLineDash([]);
        ctx.strokeRect(x + 30, y - 40, 140, 80);

        ctx.fillStyle = '#d4a574';
        ctx.font = '10px monospace';
        breakdown.forEach((line, idx) => {
          ctx.fillText(line, x + 35, y - 25 + idx * 15);
        });
      }
      
      ctx.setLineDash([]);
    });
  };

  const runScoring = async () => {
    setIsRunning(true);
    setCurrentStep(0);
    setCurrentCandidate(null);

    // Reset all candidates
    const resetCandidates = candidates.map(c => ({
      ...c,
      s_max: 0,
      s_topk_mean: 0,
      s_centroid: 0,
      s_bm25: 0,
      holisticScore: 0,
      rank: null,
      isCalculating: false,
      isHighlighted: false
    }));
    setCandidates(resetCandidates);

    // Step 1: Calculate individual scores for each candidate
    setCurrentStep(1);
    for (let i = 0; i < resetCandidates.length; i++) {
      const candidate = resetCandidates[i];
      setCurrentCandidate(candidate.id);
      
      // Mark as calculating
      setCandidates(prev => prev.map(c => 
        c.id === candidate.id 
          ? { ...c, isCalculating: true, isHighlighted: false }
          : { ...c, isCalculating: false, isHighlighted: false }
      ));
      
      drawCanvas();
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Calculate individual scores
      const scores = calculateIndividualScores(candidate.chunk, searchQuery);
      
      setCandidates(prev => prev.map(c => 
        c.id === candidate.id 
          ? { ...c, ...scores, isCalculating: false }
          : c
      ));

      drawCanvas();
      await new Promise(resolve => setTimeout(resolve, 800));
    }

    // Step 2: Calculate holistic scores
    setCurrentStep(2);
    await new Promise(resolve => setTimeout(resolve, 500));

    setCandidates(prev => prev.map(c => {
      const holisticScore = calculateHolisticScore(c, weights);
      return { ...c, holisticScore };
    }));

    drawCanvas();
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Step 3: Rank candidates
    setCurrentStep(3);
    setCandidates(prev => {
      const sorted = [...prev].sort((a, b) => b.holisticScore - a.holisticScore);
      return sorted.map((c, index) => ({ ...c, rank: index + 1 }));
    });

    // Highlight each ranked candidate
    const sortedCandidates = [...candidates].sort((a, b) => (b.holisticScore || 0) - (a.holisticScore || 0));
    for (let i = 0; i < sortedCandidates.length; i++) {
      setCandidates(prev => prev.map(c => ({
        ...c,
        isHighlighted: c.id === sortedCandidates[i].id
      })));
      drawCanvas();
      await new Promise(resolve => setTimeout(resolve, 800));
    }

    setCurrentStep(4);
    setCurrentCandidate(null);
    setCandidates(prev => prev.map(c => ({ ...c, isHighlighted: false })));
    setIsRunning(false);
  };

  const resetDemo = () => {
    setIsRunning(false);
    setCurrentStep(0);
    setCurrentCandidate(null);
    
    setCandidates(prev => prev.map(c => ({
      ...c,
      s_max: 0,
      s_topk_mean: 0,
      s_centroid: 0,
      s_bm25: 0,
      holisticScore: 0,
      rank: null,
      isCalculating: false,
      isHighlighted: false
    })));
    
    drawCanvas();
  };

  useEffect(() => {
    drawCanvas();
  }, [candidates, weights]);

  useEffect(() => {
    drawCanvas();
  }, []);

  const getStepDescription = () => {
    switch (currentStep) {
      case 0:
        return "Ready to calculate holistic scores. Click play to start the scoring algorithm.";
      case 1:
        return `Calculating individual similarity scores for each candidate${currentCandidate ? ` (processing ${candidates.find(c => c.id === currentCandidate)?.fileName})` : ''}`;
      case 2:
        return "Computing weighted holistic scores using the scoring formula";
      case 3:
        return "Ranking candidates by their holistic scores";
      case 4:
        return `Scoring complete. Top result: ${candidates.find(c => c.rank === 1)?.fileName || 'N/A'}`;
      default:
        return "";
    }
  };

  const rankedCandidates = [...candidates]
    .filter(c => c.rank !== null)
    .sort((a, b) => (a.rank || 0) - (b.rank || 0));

  const totalWeight = weights.w_max + weights.w_topk_mean + weights.w_centroid + weights.w_bm25;

  return (
    <div className="flex gap-6 h-full">
      {/* Left Panel */}
      <div className="w-80 p-6 rounded-xl border" style={{ backgroundColor: '#2a2a2a', borderColor: '#404040' }}>
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-2 text-amber-400">Holistic Scoring System</h3>
            <div className="text-sm text-gray-400 space-y-1">
              <div>Complexity: <span className="text-amber-400 font-mono">O(k)</span></div>
              <div>Components: <span className="text-blue-400">4 similarity metrics</span></div>
              <div>Output: <span className="text-green-400">Weighted combined score</span></div>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Search Query</label>
              <textarea
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full p-2 bg-gray-800 border border-gray-600 rounded text-sm resize-none"
                rows={2}
                disabled={isRunning}
              />
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-medium">Scoring Weights</h4>
                <span className="text-xs text-gray-400">Total: {totalWeight.toFixed(2)}</span>
              </div>
              
              <div className="space-y-2">
                <div>
                  <div className="flex justify-between text-sm">
                    <span>s_max weight</span>
                    <span className="font-mono">{weights.w_max.toFixed(2)}</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.05"
                    value={weights.w_max}
                    onChange={(e) => setWeights(prev => ({ ...prev, w_max: parseFloat(e.target.value) }))}
                    className="w-full accent-amber-400"
                    disabled={isRunning}
                  />
                </div>
                
                <div>
                  <div className="flex justify-between text-sm">
                    <span>s_topk_mean weight</span>
                    <span className="font-mono">{weights.w_topk_mean.toFixed(2)}</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.05"
                    value={weights.w_topk_mean}
                    onChange={(e) => setWeights(prev => ({ ...prev, w_topk_mean: parseFloat(e.target.value) }))}
                    className="w-full accent-amber-400"
                    disabled={isRunning}
                  />
                </div>
                
                <div>
                  <div className="flex justify-between text-sm">
                    <span>s_centroid weight</span>
                    <span className="font-mono">{weights.w_centroid.toFixed(2)}</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.05"
                    value={weights.w_centroid}
                    onChange={(e) => setWeights(prev => ({ ...prev, w_centroid: parseFloat(e.target.value) }))}
                    className="w-full accent-amber-400"
                    disabled={isRunning}
                  />
                </div>
                
                <div>
                  <div className="flex justify-between text-sm">
                    <span>s_bm25 weight</span>
                    <span className="font-mono">{weights.w_bm25.toFixed(2)}</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.05"
                    value={weights.w_bm25}
                    onChange={(e) => setWeights(prev => ({ ...prev, w_bm25: parseFloat(e.target.value) }))}
                    className="w-full accent-amber-400"
                    disabled={isRunning}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={runScoring}
              disabled={isRunning}
              className="flex-1 flex items-center justify-center gap-2 py-2 px-4 bg-amber-600 hover:bg-amber-700 disabled:bg-gray-700 disabled:cursor-not-allowed rounded transition-colors"
            >
              {isRunning ? <Calculator className="w-4 h-4 animate-spin" /> : <Play className="w-4 h-4" />}
              {isRunning ? 'Calculating...' : 'Calculate Scores'}
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

          {currentStep === 4 && rankedCandidates.length > 0 && (
            <div className="space-y-2">
              <h4 className="text-sm font-medium text-amber-400 flex items-center gap-2">
                <BarChart3 className="w-4 h-4" />
                Final Rankings
              </h4>
              {rankedCandidates.map((candidate) => (
                <div key={candidate.id} className="p-3 bg-gray-800 rounded">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-mono">{candidate.fileName}</span>
                    <span className="text-xs bg-amber-600 px-2 py-1 rounded">#{candidate.rank}</span>
                  </div>
                  <div className="text-xs text-gray-400 mt-1">
                    Holistic Score: <span className="text-amber-400">{candidate.holisticScore.toFixed(3)}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Right Panel */}
      <div className="flex-1 p-6 rounded-xl border" style={{ backgroundColor: '#2a2a2a', borderColor: '#404040' }}>
        <h3 className="text-lg font-semibold mb-4 text-center">Holistic Scoring Visualization</h3>
        
        <canvas
          ref={canvasRef}
          width={500}
          height={300}
          className="border border-gray-600 rounded bg-gray-900 mx-auto block"
        />

        <div className="mt-6 space-y-4">
          <div className="text-center text-sm text-gray-400">
            Combines multiple similarity metrics into a single holistic score
          </div>
          
          <div className="p-4 bg-gray-800 rounded">
            <h4 className="font-medium text-amber-400 mb-3">Scoring Formula:</h4>
            <div className="font-mono text-sm text-center bg-gray-900 p-3 rounded border">
              <div className="text-amber-400">h(q,d) = w₁·s_max + w₂·s_topk_mean + w₃·s_centroid + w₄·s_bm25</div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 bg-gray-800 rounded">
              <h4 className="font-medium text-amber-400 mb-2">Semantic Metrics</h4>
              <div className="text-sm text-gray-300 space-y-1">
                <div><strong>s_max:</strong> Best chunk similarity</div>
                <div><strong>s_topk_mean:</strong> Top-k average</div>
                <div><strong>s_centroid:</strong> File centroid match</div>
              </div>
            </div>
            <div className="p-4 bg-gray-800 rounded">
              <h4 className="font-medium text-amber-400 mb-2">Lexical Metric</h4>
              <div className="text-sm text-gray-300 space-y-1">
                <div><strong>s_bm25:</strong> BM25 keyword score</div>
                <div className="text-gray-400 mt-2">Provides lexical grounding for semantic search</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HolisticScoringDemo;