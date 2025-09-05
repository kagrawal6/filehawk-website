# Filevate Features Overview

**AI-Powered Capabilities for Local Document Search**

## 🎯 **Core Features**

Filevate provides semantic search capabilities through AI-powered features designed for individual users working with document collections.

### **🧠 [Semantic Search](semantic-search.md)**
AI-powered document intelligence that understands meaning beyond keywords

**Key Capabilities:**
- **Natural Language Queries** - Search using everyday language
- **Contextual Understanding** - AI comprehends document meaning
- **Dual Search Modes** - Gist (comprehensive) and Pinpoint (precise)
- **Confidence Scoring** - Intelligent relevance ranking

### **✂️ [Dual Chunking Modes](dual-chunking-modes.md)**
Intelligent content segmentation for different search contexts

**Chunking Strategies:**
- **Gist Mode** - 35-line chunks for topic understanding
- **Pinpoint Mode** - 10-line chunks for precise location
- **Smart Overlap** - Configurable chunk boundaries
- **Content-Aware** - Respects document structure

## 🔧 **Technical Features**

### **🤖 AI Models**
- **Dual Architecture** - MSMarco MiniLM + AllMiniLM models
- **Local Processing** - All AI inference on user's machine
- **384-Dimension Vectors** - Semantic representations
- **Offline Capable** - No internet required after setup

### **⚡ Real-Time Sync**
- **File Monitoring** - Automatic change detection
- **Incremental Updates** - Only processes modified files
- **Background Processing** - Non-blocking with progress
- **SHA-256 Detection** - Efficient change identification

### **🔗 GitHub Integration**
- **OAuth Authentication** - Secure GitHub access
- **Repository Cloning** - Local copies for indexing
- **Branch Tracking** - Multiple branch support
- **Automatic Sync** - Updates when repos change

## 💻 **User Interface**

### **🖥️ Desktop Application**
- **Cross-Platform** - Windows, macOS, Linux support
- **Electron + React** - Modern web-based UI
- **Real-time Search** - Instant results as you type
- **File Preview** - Quick content preview

### **⚙️ Configuration**
- **Directory Selection** - Choose folders to index
- **Performance Tuning** - Adjust processing settings
- **Exclusion Patterns** - Skip unwanted files
- **Search Preferences** - Configure defaults

## 📊 **Current Capabilities**

### **File Support**
- **15+ File Types** - PDF, Office docs, code, markdown
- **Text Extraction** - Intelligent content processing
- **Size Limits** - Configurable maximum file sizes
- **Encoding Support** - Multiple text encodings

### **Performance**
- **Response Times** - Typically 100-300ms locally
- **Collection Size** - Tested with 100K+ documents
- **Memory Usage** - 2-4GB depending on collection
- **Processing Speed** - 50-100 files per minute

### **Storage**
- **Local-First** - All data on user's machine
- **ChromaDB** - Vector database storage
- **Platform Directories** - OS-appropriate locations
- **Cleanup Tools** - Easy data removal

## 🔒 **Privacy & Security**

### **Local Processing**
- **No Cloud** - All processing happens locally
- **Private by Design** - Content never transmitted
- **User Ownership** - Complete data control
- **Offline Operation** - Full functionality without internet

### **GitHub Security**
- **OAuth Device Flow** - Standard authentication
- **Read-Only Access** - No modification permissions
- **Secure Storage** - System keyring for tokens
- **Easy Revocation** - Remove access anytime

## 🎯 **Use Cases**

### **Development**
- **Code Search** - Find functions and patterns
- **Documentation** - Locate technical docs
- **API Discovery** - Search codebases
- **Knowledge Management** - Organize resources

### **Research**
- **Literature Review** - Search papers and notes
- **Content Discovery** - Find relevant information
- **Reference Location** - Specific quotes and citations
- **Knowledge Synthesis** - Discover connections

## 🔮 **Current Limitations**

### **Design Constraints**
- **Single-User** - No multi-user support
- **Local Only** - No distributed search
- **Basic Logging** - Console output only
- **File Size Limits** - Performance impact with large files

### **Performance Notes**
- **Memory Requirements** - Scales with collection size
- **Initial Indexing** - Can take time for large collections
- **Model Loading** - Initial download and startup time
- **Storage Growth** - Vector data grows with documents

---

*This overview reflects current Filevate capabilities as a local semantic search platform.*
