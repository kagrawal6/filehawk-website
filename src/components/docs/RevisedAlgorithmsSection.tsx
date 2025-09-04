import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Brain, 
  Target, 
  Layers, 
  BarChart3, 
  Copy,
  CheckCircle,
  Zap,
  Database,
  FileText,
  Cpu
} from 'lucide-react'
import { useScrollAnimation } from '../../hooks/useScrollAnimation'
import { 
  TableOfContents, 
  DocumentationSection, 
  TabbedContent, 
  ExpandableSection 
} from './DocumentationNavigation'
import { AlgorithmFlowDiagram } from './InteractiveDiagrams'
import DualModelAIDiagram from './DualModelAIDiagram'
import DualChunkingDiagram from './DualChunkingDiagram'
import ConfidenceScoringDiagram from './ConfidenceScoringDiagram'

const RevisedAlgorithmsSection: React.FC = () => {
  const isAnimated = useScrollAnimation()
  const [currentSection, setCurrentSection] = useState('introduction')
  const [copiedCode, setCopiedCode] = useState<string | null>(null)

  // Define page sections for TOC
  const sections = [
    { id: 'introduction', title: 'Algorithm Overview', level: 1, isActive: currentSection === 'introduction' },
    { id: 'dual-ai-models', title: 'Dual AI Models', level: 1, isActive: currentSection === 'dual-ai-models' },
    { id: 'scoring-engine', title: 'Scoring Engine', level: 1, isActive: currentSection === 'scoring-engine' },
    { id: 'chunking-strategies', title: 'Chunking Strategies', level: 1, isActive: currentSection === 'chunking-strategies' },
    { id: 'mathematical-foundations', title: 'Mathematical Foundations', level: 1, isActive: currentSection === 'mathematical-foundations' },
    { id: 'performance-optimization', title: 'Performance & Optimization', level: 1, isActive: currentSection === 'performance-optimization' }
  ]

  // Update current section based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const sectionIds = ['introduction', 'dual-ai-models', 'scoring-engine', 'chunking-strategies', 'mathematical-foundations', 'performance-optimization']
      
      for (const sectionId of sectionIds) {
        const element = document.getElementById(sectionId)
        if (element) {
          const rect = element.getBoundingClientRect()
          if (rect.top <= 100 && rect.bottom >= 100) {
            setCurrentSection(sectionId)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleSectionChange = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  const copyToClipboard = async (text: string, id: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedCode(id)
      setTimeout(() => setCopiedCode(null), 2000)
    } catch (err) {
      console.error('Failed to copy: ', err)
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative">
      {/* Table of Contents */}
      <TableOfContents 
        sections={sections}
        onSectionChange={handleSectionChange}
      />

      {/* Header */}
      <motion.div 
        className="text-center mb-16"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: isAnimated ? 1 : 0, y: isAnimated ? 0 : 20 }}
        transition={{ duration: 0.8 }}
      >
        <div className="inline-flex items-center px-4 py-2 rounded-full border mb-6" 
          style={{ backgroundColor: 'var(--bg-elevated)', borderColor: 'var(--border-subtle)' }}>
          <Brain className="h-5 w-5 mr-2 text-brand-gold-400" />
          <span className="text-sm font-medium" style={{ color: 'var(--fg-secondary)' }}>
            AI Algorithms & Mathematical Intelligence
          </span>
        </div>
        
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold tracking-tight mb-6">
          <span style={{ color: 'var(--fg-primary)' }}>Advanced Mathematical</span>{' '}
          <span className="bg-gradient-to-r from-brand-gold-400 to-brand-gold-600 bg-clip-text text-transparent">
            Intelligence Engine
          </span>
        </h1>
        
        <p className="text-xl leading-relaxed max-w-4xl mx-auto" style={{ color: 'var(--fg-secondary)' }}>
          Explore the sophisticated AI algorithms and mathematical frameworks that power FileHawk's semantic intelligence. 
          From dual embedding models to 14-component scoring systems, discover how advanced mathematics delivers 
          <strong> enterprise-grade search precision</strong>.
        </p>
      </motion.div>

      {/* Introduction */}
      <DocumentationSection 
        id="introduction"
        title="Algorithm Overview"
        subtitle="Four foundational AI systems working in concert to deliver semantic intelligence"
      >
        <div className="mb-12">
          <AlgorithmFlowDiagram 
            title="Interactive Algorithm Flow"
            description="Step-by-step visualization of FileHawk's complete scoring pipeline"
            height="600px"
            interactive={true}
          />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { 
              icon: Brain, 
              title: 'Dual AI Models', 
              metric: '384-dim', 
              description: 'MSMarco + AllMiniLM embeddings',
              details: 'Two specialized models for topic-level and granular content understanding'
            },
            { 
              icon: Target, 
              title: 'Confidence Engine', 
              metric: '14 factors', 
              description: 'Multi-component analysis',
              details: 'Mathematical confidence scoring with distance transformation and quality assessment'
            },
            { 
              icon: BarChart3, 
              title: 'Holistic Scoring', 
              metric: '5 components', 
              description: 'File-level intelligence',
              details: 'Sophisticated ranking combining semantic similarity, BM25, and centroid analysis'
            },
            { 
              icon: Layers, 
              title: 'Smart Chunking', 
              metric: '2 modes', 
              description: 'Context-aware segmentation',
              details: 'Intelligent content segmentation preserving semantic boundaries and context'
            }
          ].map((algorithm, index) => (
            <motion.div 
              key={algorithm.title}
              className="p-6 rounded-xl border group hover:border-brand-gold-500/40 transition-all duration-300"
              style={{ backgroundColor: 'var(--bg-elevated)', borderColor: 'var(--border-subtle)' }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
            >
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-brand-gold-500/20 text-brand-gold-400 mb-4 group-hover:bg-brand-gold-500/30 transition-colors">
                  <algorithm.icon className="h-8 w-8" />
                </div>
                <div className="text-2xl font-bold text-brand-gold-400 mb-2">
                  {algorithm.metric}
                </div>
                <h3 className="font-semibold mb-2" style={{ color: 'var(--fg-primary)' }}>
                  {algorithm.title}
                </h3>
                <p className="text-sm mb-3" style={{ color: 'var(--fg-secondary)' }}>
                  {algorithm.description}
                </p>
                <p className="text-xs" style={{ color: 'var(--fg-muted)' }}>
                  {algorithm.details}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </DocumentationSection>

      {/* Dual AI Models */}
      <DocumentationSection 
        id="dual-ai-models"
        title="Dual AI Models"
        subtitle="Specialized embedding models optimized for different search scenarios"
      >
        <TabbedContent
          tabs={[
            {
              id: 'model-architecture',
              label: 'Model Architecture',
              icon: Brain,
              content: (
                <div className="space-y-8">
                  <DualModelAIDiagram />
                  
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="p-6 rounded-xl border" style={{ backgroundColor: 'var(--bg-elevated)', borderColor: 'var(--border-subtle)' }}>
                      <div className="flex items-center mb-4">
                        <div className="p-3 rounded-lg bg-purple-500/20 text-purple-400 mr-4">
                          <Target className="h-6 w-6" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-purple-400">Gist Model</h4>
                          <p className="text-sm" style={{ color: 'var(--fg-secondary)' }}>MSMarco MiniLM L6</p>
                        </div>
                      </div>
                      <ul className="space-y-2 text-sm" style={{ color: 'var(--fg-secondary)' }}>
                        <li>• Optimized for topic-level understanding</li>
                        <li>• File-level semantic relevance</li>
                        <li>• Broad context comprehension</li>
                        <li>• Query-document alignment</li>
                      </ul>
                    </div>

                    <div className="p-6 rounded-xl border" style={{ backgroundColor: 'var(--bg-elevated)', borderColor: 'var(--border-subtle)' }}>
                      <div className="flex items-center mb-4">
                        <div className="p-3 rounded-lg bg-blue-500/20 text-blue-400 mr-4">
                          <Zap className="h-6 w-6" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-blue-400">Pinpoint Model</h4>
                          <p className="text-sm" style={{ color: 'var(--fg-secondary)' }}>AllMiniLM L6 v2</p>
                        </div>
                      </div>
                      <ul className="space-y-2 text-sm" style={{ color: 'var(--fg-secondary)' }}>
                        <li>• Precise content location</li>
                        <li>• Granular chunk matching</li>
                        <li>• Fine-grained semantics</li>
                        <li>• Detailed content analysis</li>
                      </ul>
                    </div>
                  </div>
                </div>
              )
            },
            {
              id: 'embedding-generation',
              label: 'Embedding Generation',
              icon: Cpu,
              content: (
                <div className="space-y-6">
                  <ExpandableSection title="🔬 Embedding Process Details" defaultExpanded>
                    <div className="space-y-4">
                      <div className="p-4 rounded-lg font-mono text-sm" style={{ backgroundColor: 'var(--bg-app)' }}>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-brand-gold-400">Embedding Generation Pipeline</span>
                          <button
                            onClick={() => copyToClipboard(`# Embedding Generation
query_embedding = gist_model.encode(query_text)
chunk_embeddings = pinpoint_model.encode(chunk_texts)

# Similarity Computation  
similarities = cosine_similarity(query_embedding, chunk_embeddings)
confidence_scores = distance_to_confidence(similarities)`, 'embedding-code')}
                            className="text-xs text-brand-gold-400 hover:text-brand-gold-300 transition-colors"
                          >
                            {copiedCode === 'embedding-code' ? <CheckCircle className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                          </button>
                        </div>
                        <pre style={{ color: 'var(--fg-secondary)' }}>{`# Embedding Generation
query_embedding = gist_model.encode(query_text)
chunk_embeddings = pinpoint_model.encode(chunk_texts)

# Similarity Computation  
similarities = cosine_similarity(query_embedding, chunk_embeddings)
confidence_scores = distance_to_confidence(similarities)`}</pre>
                      </div>
                      
                      <div className="grid md:grid-cols-3 gap-4">
                        {[
                          { step: "1", title: "Text Preprocessing", desc: "Tokenization, normalization, length optimization" },
                          { step: "2", title: "Model Inference", desc: "Transformer-based embedding generation" },
                          { step: "3", title: "Vector Processing", desc: "Normalization, similarity computation" }
                        ].map((step, index) => (
                          <div key={index} className="p-4 rounded-lg border" style={{ backgroundColor: 'var(--bg-elevated)', borderColor: 'var(--border-subtle)' }}>
                            <div className="flex items-center mb-2">
                              <div className="w-6 h-6 rounded-full bg-brand-gold-500 text-black text-sm font-bold flex items-center justify-center mr-3">
                                {step.step}
                              </div>
                              <span className="font-semibold" style={{ color: 'var(--fg-primary)' }}>{step.title}</span>
                            </div>
                            <p className="text-sm" style={{ color: 'var(--fg-secondary)' }}>{step.desc}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </ExpandableSection>

                  <ExpandableSection title="⚡ Performance Characteristics">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h5 className="font-semibold mb-3 text-brand-gold-400">Gist Model Performance</h5>
                        <div className="space-y-2 text-sm" style={{ color: 'var(--fg-secondary)' }}>
                          <div className="flex justify-between">
                            <span>Inference Time:</span>
                            <span className="text-brand-gold-400">8-12ms</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Memory Usage:</span>
                            <span className="text-brand-gold-400">~180MB</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Vector Dimension:</span>
                            <span className="text-brand-gold-400">384</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Max Tokens:</span>
                            <span className="text-brand-gold-400">512</span>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h5 className="font-semibold mb-3 text-brand-gold-400">Pinpoint Model Performance</h5>
                        <div className="space-y-2 text-sm" style={{ color: 'var(--fg-secondary)' }}>
                          <div className="flex justify-between">
                            <span>Inference Time:</span>
                            <span className="text-brand-gold-400">12-18ms</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Memory Usage:</span>
                            <span className="text-brand-gold-400">~220MB</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Vector Dimension:</span>
                            <span className="text-brand-gold-400">384</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Max Tokens:</span>
                            <span className="text-brand-gold-400">256</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </ExpandableSection>
                </div>
              )
            }
          ]}
        />
      </DocumentationSection>

      {/* Scoring Engine */}
      <DocumentationSection 
        id="scoring-engine"
        title="Confidence Scoring Engine"
        subtitle="14-component mathematical framework for result relevance assessment"
      >
        <TabbedContent
          tabs={[
            {
              id: 'scoring-overview',
              label: 'Scoring Framework',
              icon: Target,
              content: (
                <div className="space-y-8">
                  <ConfidenceScoringDiagram />
                  
                  <div className="grid md:grid-cols-2 gap-8">
                    <ExpandableSection title="🎯 Core Scoring Components" defaultExpanded>
                      <div className="space-y-3">
                        {[
                          { component: "Distance Transformation", weight: "35%", desc: "Cosine similarity to confidence conversion" },
                          { component: "Quality Assessment", weight: "25%", desc: "Content quality and semantic coherence" },
                          { component: "Filename Enhancement", weight: "20%", desc: "Semantic filename-query alignment" },
                          { component: "Length Normalization", weight: "15%", desc: "Document length bias correction" },
                          { component: "Context Boosting", weight: "5%", desc: "Surrounding content relevance" }
                        ].map((item, index) => (
                          <div key={index} className="flex items-center justify-between p-3 rounded-lg" style={{ backgroundColor: 'var(--bg-app)' }}>
                            <div>
                              <span className="font-semibold" style={{ color: 'var(--fg-primary)' }}>{item.component}</span>
                              <p className="text-xs" style={{ color: 'var(--fg-muted)' }}>{item.desc}</p>
                            </div>
                            <span className="text-brand-gold-400 font-semibold">{item.weight}</span>
                          </div>
                        ))}
                      </div>
                    </ExpandableSection>

                    <ExpandableSection title="📊 Mathematical Foundation" defaultExpanded>
                      <div className="p-4 rounded-lg font-mono text-sm" style={{ backgroundColor: 'var(--bg-app)' }}>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-brand-gold-400">Confidence Formula</span>
                          <button
                            onClick={() => copyToClipboard(`confidence = 1 - (distance / distance_max) 
enhanced_conf = confidence * quality_factor * filename_boost
final_score = enhanced_conf * length_normalization`, 'confidence-formula')}
                            className="text-xs text-brand-gold-400 hover:text-brand-gold-300 transition-colors"
                          >
                            {copiedCode === 'confidence-formula' ? <CheckCircle className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                          </button>
                        </div>
                        <pre style={{ color: 'var(--fg-secondary)' }}>{`confidence = 1 - (distance / distance_max) 
enhanced_conf = confidence * quality_factor * filename_boost
final_score = enhanced_conf * length_normalization`}</pre>
                      </div>
                      
                      <div className="mt-4 space-y-2 text-sm" style={{ color: 'var(--fg-secondary)' }}>
                        <div>• <strong>Distance:</strong> Cosine distance between embeddings</div>
                        <div>• <strong>Quality Factor:</strong> Content semantic coherence (0.8-1.2)</div>
                        <div>• <strong>Filename Boost:</strong> Semantic filename matching (1.0-1.5)</div>
                        <div>• <strong>Length Norm:</strong> Bias correction for document length</div>
                      </div>
                    </ExpandableSection>
                  </div>
                </div>
              )
            },
            {
              id: 'holistic-scoring',
              label: 'Holistic Scoring',
              icon: BarChart3,
              content: (
                <div className="space-y-6">
                  <ExpandableSection title="🏗️ File-Level Intelligence System" defaultExpanded>
                    <div className="space-y-4">
                      <p style={{ color: 'var(--fg-secondary)' }}>
                        The holistic scoring algorithm combines multiple mathematical approaches to assess file-level relevance 
                        beyond individual chunk scores, providing comprehensive document understanding.
                      </p>
                      
                      <div className="grid md:grid-cols-3 gap-4">
                        {[
                          {
                            title: "S_max Component",
                            formula: "max(confidence_scores)",
                            desc: "Best chunk wins approach - highest individual chunk confidence",
                            weight: "40%"
                          },
                          {
                            title: "S_topk Component", 
                            formula: "soft_topk(scores, k=3, α=2)",
                            desc: "Quality-aware top-k mean with exponential weighting",
                            weight: "25%"
                          },
                          {
                            title: "S_centroid Component",
                            formula: "cosine(query, centroid)",
                            desc: "File-level semantic similarity using document centroid",
                            weight: "20%"
                          },
                          {
                            title: "S_bm25 Component",
                            formula: "BM25(query, chunks)",
                            desc: "Traditional keyword-based relevance scoring",
                            weight: "10%"
                          },
                          {
                            title: "Length Factor",
                            formula: "length_norm(chunk_count)",
                            desc: "Document length bias correction",
                            weight: "5%"
                          }
                        ].slice(0, 3).map((component, index) => (
                          <div key={index} className="p-4 rounded-lg border" style={{ backgroundColor: 'var(--bg-elevated)', borderColor: 'var(--border-subtle)' }}>
                            <h5 className="font-semibold text-brand-gold-400 mb-2">{component.title}</h5>
                            <div className="p-2 rounded bg-gray-800 font-mono text-xs mb-2" style={{ color: 'var(--fg-secondary)' }}>
                              {component.formula}
                            </div>
                            <p className="text-sm mb-2" style={{ color: 'var(--fg-secondary)' }}>{component.desc}</p>
                            <div className="text-xs font-semibold text-brand-gold-400">Weight: {component.weight}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </ExpandableSection>

                  <ExpandableSection title="⚙️ Implementation Details">
                    <div className="p-4 rounded-lg font-mono text-sm" style={{ backgroundColor: 'var(--bg-app)' }}>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-brand-gold-400">Holistic Scoring Implementation</span>
                        <button
                          onClick={() => copyToClipboard(`def compute_holistic_score(query_embedding, chunks_data):
    # Component 1: Maximum confidence
    s_max = max([chunk.confidence for chunk in chunks_data])
    
    # Component 2: Soft top-k mean
    s_topk = soft_top_k_mean(confidences, k=3, alpha=2.0)
    
    # Component 3: Centroid similarity
    s_centroid = cosine_similarity(query_embedding, file_centroid)
    
    # Component 4: BM25 enhancement
    s_bm25 = compute_bm25_score(query_terms, chunks_data)
    
    # Component 5: Length normalization
    length_factor = length_normalization(len(chunks_data))
    
    # Weighted combination
    final_score = (0.4 * s_max + 0.25 * s_topk + 
                   0.2 * s_centroid + 0.1 * s_bm25 + 
                   0.05 * length_factor)
    
    return final_score`, 'holistic-code')}
                          className="text-xs text-brand-gold-400 hover:text-brand-gold-300 transition-colors"
                        >
                          {copiedCode === 'holistic-code' ? <CheckCircle className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                        </button>
                      </div>
                      <pre style={{ color: 'var(--fg-secondary)' }}>{`def compute_holistic_score(query_embedding, chunks_data):
    # Component 1: Maximum confidence
    s_max = max([chunk.confidence for chunk in chunks_data])
    
    # Component 2: Soft top-k mean
    s_topk = soft_top_k_mean(confidences, k=3, alpha=2.0)
    
    # Component 3: Centroid similarity
    s_centroid = cosine_similarity(query_embedding, file_centroid)
    
    # Component 4: BM25 enhancement
    s_bm25 = compute_bm25_score(query_terms, chunks_data)
    
    # Component 5: Length normalization
    length_factor = length_normalization(len(chunks_data))
    
    # Weighted combination
    final_score = (0.4 * s_max + 0.25 * s_topk + 
                   0.2 * s_centroid + 0.1 * s_bm25 + 
                   0.05 * length_factor)
    
    return final_score`}</pre>
                    </div>
                  </ExpandableSection>
                </div>
              )
            }
          ]}
        />
      </DocumentationSection>

      {/* Chunking Strategies */}
      <DocumentationSection 
        id="chunking-strategies"
        title="Intelligent Chunking Strategies"
        subtitle="Context-aware content segmentation preserving semantic boundaries"
      >
        <div className="space-y-8">
          <DualChunkingDiagram />
          
          <TabbedContent
            tabs={[
              {
                id: 'chunking-modes',
                label: 'Chunking Modes',
                icon: Layers,
                content: (
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="p-6 rounded-xl border" style={{ backgroundColor: 'var(--bg-elevated)', borderColor: 'var(--border-subtle)' }}>
                      <div className="flex items-center mb-4">
                        <div className="p-3 rounded-lg bg-green-500/20 text-green-400 mr-4">
                          <FileText className="h-6 w-6" />
                        </div>
                        <h4 className="font-semibold" style={{ color: 'var(--fg-primary)' }}>Granular Chunking</h4>
                      </div>
                      <ul className="space-y-2 text-sm mb-4" style={{ color: 'var(--fg-secondary)' }}>
                        <li>• Precise content location</li>
                        <li>• Exact paragraph/sentence extraction</li>
                        <li>• Minimal context overlap</li>
                        <li>• Optimized for pinpoint search</li>
                      </ul>
                      <div className="p-3 rounded-lg" style={{ backgroundColor: 'var(--bg-app)' }}>
                        <div className="text-xs font-semibold text-green-400 mb-1">Chunk Size: 256 tokens</div>
                        <div className="text-xs" style={{ color: 'var(--fg-muted)' }}>Overlap: 25 tokens</div>
                      </div>
                    </div>

                    <div className="p-6 rounded-xl border" style={{ backgroundColor: 'var(--bg-elevated)', borderColor: 'var(--border-subtle)' }}>
                      <div className="flex items-center mb-4">
                        <div className="p-3 rounded-lg bg-blue-500/20 text-blue-400 mr-4">
                          <Database className="h-6 w-6" />
                        </div>
                        <h4 className="font-semibold" style={{ color: 'var(--fg-primary)' }}>Contextual Chunking</h4>
                      </div>
                      <ul className="space-y-2 text-sm mb-4" style={{ color: 'var(--fg-secondary)' }}>
                        <li>• Semantic boundary preservation</li>
                        <li>• Topic-aware segmentation</li>
                        <li>• Generous context windows</li>
                        <li>• Optimized for gist search</li>
                      </ul>
                      <div className="p-3 rounded-lg" style={{ backgroundColor: 'var(--bg-app)' }}>
                        <div className="text-xs font-semibold text-blue-400 mb-1">Chunk Size: 512 tokens</div>
                        <div className="text-xs" style={{ color: 'var(--fg-muted)' }}>Overlap: 50 tokens</div>
                      </div>
                    </div>
                  </div>
                )
              },
              {
                id: 'adaptive-strategy',
                label: 'Adaptive Strategy',
                icon: Brain,
                content: (
                  <div className="space-y-6">
                    <ExpandableSection title="🧠 Intelligent Boundary Detection" defaultExpanded>
                      <div className="space-y-4">
                        <p style={{ color: 'var(--fg-secondary)' }}>
                          FileHawk employs content-aware boundary detection to ensure chunks maintain semantic coherence 
                          while optimizing for both search modes.
                        </p>
                        
                        <div className="grid md:grid-cols-3 gap-4">
                          {[
                            { 
                              title: "Sentence Boundaries",
                              desc: "Natural sentence completion prevents mid-sentence cuts",
                              icon: "📝"
                            },
                            {
                              title: "Paragraph Awareness", 
                              desc: "Maintains logical paragraph structure and topic flow",
                              icon: "📄"
                            },
                            {
                              title: "Code Block Integrity",
                              desc: "Preserves complete code functions and logical blocks", 
                              icon: "💻"
                            }
                          ].map((strategy, index) => (
                            <div key={index} className="p-4 rounded-lg border text-center" style={{ backgroundColor: 'var(--bg-elevated)', borderColor: 'var(--border-subtle)' }}>
                              <div className="text-2xl mb-2">{strategy.icon}</div>
                              <h5 className="font-semibold mb-2" style={{ color: 'var(--fg-primary)' }}>{strategy.title}</h5>
                              <p className="text-sm" style={{ color: 'var(--fg-secondary)' }}>{strategy.desc}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </ExpandableSection>

                    <ExpandableSection title="⚡ Performance Optimization">
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <h5 className="font-semibold mb-3 text-brand-gold-400">Chunking Performance</h5>
                          <div className="space-y-2 text-sm" style={{ color: 'var(--fg-secondary)' }}>
                            <div className="flex justify-between">
                              <span>Processing Speed:</span>
                              <span className="text-brand-gold-400">5,200 files/min</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Memory Efficiency:</span>
                              <span className="text-brand-gold-400">2.1MB/1K docs</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Chunk Quality:</span>
                              <span className="text-brand-gold-400">96.3% coherent</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Boundary Accuracy:</span>
                              <span className="text-brand-gold-400">98.7% semantic</span>
                            </div>
                          </div>
                        </div>
                        
                        <div>
                          <h5 className="font-semibold mb-3 text-brand-gold-400">Optimization Strategies</h5>
                          <ul className="space-y-2 text-sm" style={{ color: 'var(--fg-secondary)' }}>
                            <li>• Batch processing for efficiency</li>
                            <li>• Parallel chunk generation</li>
                            <li>• Memory-mapped file access</li>
                            <li>• Streaming text extraction</li>
                            <li>• Incremental re-chunking</li>
                          </ul>
                        </div>
                      </div>
                    </ExpandableSection>
                  </div>
                )
              }
            ]}
          />
        </div>
      </DocumentationSection>

      {/* Performance & Optimization */}
      <DocumentationSection 
        id="performance-optimization"
        title="Performance & Optimization"
        subtitle="Enterprise-scale performance characteristics and optimization strategies"
      >
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {[
            { metric: "25-40ms", label: "Semantic Search", desc: "P95 end-to-end latency", color: "text-green-400" },
            { metric: "8-15ms", label: "Vector Query", desc: "ChromaDB similarity search", color: "text-blue-400" },
            { metric: "95.7%", label: "Accuracy", desc: "Semantic understanding precision", color: "text-purple-400" },
            { metric: "~400MB", label: "Memory", desc: "Combined AI model footprint", color: "text-orange-400" }
          ].map((stat, index) => (
            <motion.div 
              key={index}
              className="p-6 rounded-xl border text-center"
              style={{ backgroundColor: 'var(--bg-elevated)', borderColor: 'var(--border-subtle)' }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <div className={`text-2xl font-bold mb-2 ${stat.color}`}>
                {stat.metric}
              </div>
              <div className="font-semibold mb-1" style={{ color: 'var(--fg-primary)' }}>
                {stat.label}
              </div>
              <div className="text-xs" style={{ color: 'var(--fg-muted)' }}>
                {stat.desc}
              </div>
            </motion.div>
          ))}
        </div>

        <ExpandableSection title="🚀 Optimization Strategies" defaultExpanded>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: "Algorithm Optimization",
                strategies: [
                  "Vectorized similarity computation",
                  "Efficient top-k selection",
                  "Batch embedding generation",
                  "Cached model inference"
                ]
              },
              {
                title: "Memory Management", 
                strategies: [
                  "Model quantization (FP16)",
                  "Lazy loading strategies",
                  "Embedding compression",
                  "Garbage collection tuning"
                ]
              },
              {
                title: "Infrastructure Scaling",
                strategies: [
                  "Multi-threaded processing",
                  "Async I/O operations", 
                  "Connection pooling",
                  "Load balancing"
                ]
              }
            ].map((category, index) => (
              <div key={index} className="p-6 rounded-xl border" style={{ backgroundColor: 'var(--bg-elevated)', borderColor: 'var(--border-subtle)' }}>
                <h5 className="font-semibold mb-4 text-brand-gold-400">{category.title}</h5>
                <ul className="space-y-2">
                  {category.strategies.map((strategy, strategyIndex) => (
                    <li key={strategyIndex} className="flex items-start">
                      <div className="w-1.5 h-1.5 rounded-full bg-brand-gold-400 mt-2 mr-3 flex-shrink-0"></div>
                      <span className="text-sm" style={{ color: 'var(--fg-secondary)' }}>{strategy}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </ExpandableSection>
      </DocumentationSection>
    </div>
  )
}

export default RevisedAlgorithmsSection
