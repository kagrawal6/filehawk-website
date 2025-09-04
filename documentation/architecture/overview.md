# System Architecture Overview

**Filevate AI-Powered Local Semantic Search Platform**

## 🏗️ **High-Level Architecture**

Filevate is built as a local-first desktop application that combines AI capabilities with modern software architecture to deliver semantic search functionality on the user's machine.

```mermaid
graph TB
    subgraph "User's Local Machine"
        subgraph "Desktop Application"
            ELECTRON[Electron Framework<br/>React + TypeScript UI]
            PRELOAD[Preload Script<br/>Secure IPC Bridge]
        end
        
        subgraph "Local API Server"
            FLASK[Flask API Server<br/>localhost:5000]
            ENDPOINTS[REST Endpoints<br/>Search, Index, Status]
            CORS[CORS Middleware<br/>Local Origin Access]
        end
        
        subgraph "AI/ML Layer"
            GIST_MODEL[Gist Model<br/>MSMarco MiniLM L6]
            PINPOINT_MODEL[Pinpoint Model<br/>AllMiniLM L6 v2]
            EMBEDDING_GEN[Embedding Generation<br/>384-dim Vectors]
        end
        
        subgraph "Data Storage"
            CHROMA[ChromaDB<br/>Vector Database]
            METADATA[Metadata Tracker<br/>File State Management]
            FILE_CACHE[Model Cache<br/>Local SentenceTransformers]
        end
        
        subgraph "File System Integration"
            WATCHDOG[File Monitor<br/>Real-time Change Detection]
            SYNC_TRACKER[Sync Tracker<br/>Queue Management]
            LOCAL_FILES[Local Documents<br/>User-selected Directories]
        end
    end
    
    subgraph "Optional External Services"
        GITHUB[GitHub API<br/>OAuth + Repository Access]
        HF_MODELS[Hugging Face<br/>Model Downloads]
    end
    
    %% Local connections
    ELECTRON --> PRELOAD
    PRELOAD --> FLASK
    FLASK --> ENDPOINTS
    ENDPOINTS --> GIST_MODEL
    ENDPOINTS --> PINPOINT_MODEL
    GIST_MODEL --> EMBEDDING_GEN
    PINPOINT_MODEL --> EMBEDDING_GEN
    EMBEDDING_GEN --> CHROMA
    ENDPOINTS --> METADATA
    ENDPOINTS --> WATCHDOG
    WATCHDOG --> SYNC_TRACKER
    SYNC_TRACKER --> LOCAL_FILES
    
    %% Optional external (one-time/on-demand)
    GIST_MODEL -.-> HF_MODELS
    PINPOINT_MODEL -.-> HF_MODELS
    ENDPOINTS -.-> GITHUB
    
    %% Styling
    classDef local fill:#E8F5E8,stroke:#388E3C,color:#000
    classDef ai fill:#E3F2FD,stroke:#1976D2,color:#000
    classDef data fill:#F3E5F5,stroke:#7B1FA2,color:#000
    classDef external fill:#FFF3E0,stroke:#F57C00,color:#000
    
    class ELECTRON,PRELOAD,FLASK,ENDPOINTS,CORS local
    class GIST_MODEL,PINPOINT_MODEL,EMBEDDING_GEN ai
    class CHROMA,METADATA,FILE_CACHE,WATCHDOG,SYNC_TRACKER,LOCAL_FILES data
    class GITHUB,HF_MODELS external
```

## 🎯 **Core Design Principles**

### **1. Local-First Architecture**
- **All Processing Local**: Document indexing and search happen on user's machine
- **No Cloud Dependencies**: Core functionality works completely offline
- **Privacy by Design**: No document content transmitted externally
- **User Data Ownership**: All indexed data stored locally under user control

### **2. AI-Powered Intelligence**
- **Dual-Model Approach**: Specialized models for different search contexts
- **Semantic Understanding**: Goes beyond keyword matching to understand meaning
- **Confidence Scoring**: Multi-factor ranking algorithm for result relevance
- **Real-time Processing**: Immediate indexing of file changes

### **3. Cross-Platform Compatibility**
- **Desktop Application**: Native experience on Windows, macOS, and Linux
- **Electron Framework**: Modern web technologies with native integration
- **Universal File Support**: 15+ file types with intelligent text extraction
- **Platform-Specific Storage**: Uses OS-appropriate directories for data

## 📊 **System Components**

### **Frontend Architecture**

```mermaid
graph LR
    subgraph "Electron Main Process"
        MAIN[Main Process<br/>Window Management]
        MENU[Native Menus<br/>System Integration]
        IPC[IPC Manager<br/>Secure Communication]
    end
    
    subgraph "Renderer Process"
        REACT[React Application<br/>TypeScript UI]
        COMPONENTS[UI Components<br/>Search, Settings, GitHub]
        STATE[State Management<br/>React Hooks + Context]
    end
    
    subgraph "Preload Scripts"
        BRIDGE[Security Bridge<br/>API Access Control]
        ELECTRON_API[electronAPI<br/>Exposed Functions]
    end
    
    MAIN --> IPC
    IPC --> BRIDGE
    BRIDGE --> ELECTRON_API
    ELECTRON_API --> REACT
    REACT --> COMPONENTS
    COMPONENTS --> STATE
    
    classDef electron fill:#9C27B0,stroke:#4A148C,color:#fff
    classDef react fill:#61DAFB,stroke:#21A0C4,color:#000
    classDef security fill:#FF5722,stroke:#D84315,color:#fff
    
    class MAIN,MENU,IPC electron
    class REACT,COMPONENTS,STATE react
    class BRIDGE,ELECTRON_API security
```

### **Backend Architecture**

```mermaid
graph TB
    subgraph "Flask Application"
        APP[Flask App<br/>WSGI Server]
        ROUTES[Route Handlers<br/>@app.route decorators]
        ERROR[Error Handlers<br/>Exception Management]
    end
    
    subgraph "Core Services"
        SEARCH[Search Service<br/>Dual-mode Semantic Search]
        INDEX[Indexing Service<br/>Document Processing]
        GITHUB_SVC[GitHub Service<br/>Repository Integration]
        SYNC[Sync Service<br/>Real-time Updates]
    end
    
    subgraph "Data Layer"
        CHROMA_CLIENT[ChromaDB Client<br/>Persistent Vector Store]
        METADATA_STORE[Metadata Store<br/>File State Tracking]
        MODEL_CACHE[Model Cache<br/>In-memory AI Models]
    end
    
    APP --> ROUTES
    ROUTES --> ERROR
    ROUTES --> SEARCH
    ROUTES --> INDEX
    ROUTES --> GITHUB_SVC
    ROUTES --> SYNC
    
    SEARCH --> CHROMA_CLIENT
    INDEX --> CHROMA_CLIENT
    SEARCH --> MODEL_CACHE
    INDEX --> MODEL_CACHE
    INDEX --> METADATA_STORE
    SYNC --> METADATA_STORE
    
    classDef flask fill:#000000,stroke:#FFFFFF,color:#fff
    classDef service fill:#4CAF50,stroke:#2E7D32,color:#fff
    classDef data fill:#2196F3,stroke:#1565C0,color:#fff
    
    class APP,ROUTES,ERROR flask
    class SEARCH,INDEX,GITHUB_SVC,SYNC service
    class CHROMA_CLIENT,METADATA_STORE,MODEL_CACHE data
```

## 🔧 **Technology Stack**

### **Frontend Technologies**
- **Electron**: Cross-platform desktop framework
- **React**: UI library with TypeScript
- **CSS**: Styling with Tailwind CSS
- **Node.js**: JavaScript runtime for desktop app

### **Backend Technologies**
- **Python**: Core programming language
- **Flask**: Lightweight web framework
- **ChromaDB**: Vector database for embeddings
- **SentenceTransformers**: AI model library

### **AI/ML Technologies**
- **MSMarco MiniLM L6**: Optimized for search tasks (Gist mode)
- **AllMiniLM L6 v2**: General semantic understanding (Pinpoint mode)
- **Hugging Face Transformers**: Model loading and inference
- **NumPy**: Vector computations and similarity calculations

### **File System Technologies**
- **Watchdog**: Cross-platform file system monitoring
- **Platform Storage APIs**: OS-specific data directories
- **Multiple Format Support**: PDF, Office docs, text files, code files

## 📈 **Performance Characteristics**

### **Search Performance**
- **Typical Response Time**: 100-300ms for local searches
- **Concurrent Searches**: Handles multiple simultaneous search requests
- **Index Size Scaling**: Tested with collections up to 100K documents
- **Memory Usage**: ~2-4GB depending on collection size and models

### **Indexing Performance**
- **Processing Speed**: 50-100 files per minute (varies by file size)
- **Batch Processing**: Configurable batch sizes for memory efficiency
- **Incremental Updates**: Only processes changed files
- **Background Processing**: Non-blocking indexing with progress updates

### **Resource Requirements**
- **Minimum RAM**: 4GB (8GB recommended)
- **Storage**: ~2GB for models + indexed data size
- **CPU**: Modern multi-core processor for AI inference
- **Network**: Only for initial setup and GitHub integration

## 🔄 **Data Flow Architecture**

### **Document Indexing Flow**

```mermaid
sequenceDiagram
    participant User
    participant UI
    participant API
    participant FileMonitor
    participant AIModels
    participant ChromaDB
    
    User->>UI: Select folder to index
    UI->>API: POST /api/index
    API->>FileMonitor: Start monitoring
    API->>API: Scan directory
    loop For each file
        API->>AIModels: Generate embeddings
        AIModels->>API: Return vectors
        API->>ChromaDB: Store embeddings
    end
    API->>UI: Indexing complete
    
    Note over FileMonitor: Continuous monitoring
    FileMonitor->>API: File changed
    API->>AIModels: Re-generate embeddings
    AIModels->>ChromaDB: Update vectors
```

### **Search Flow**

```mermaid
sequenceDiagram
    participant User
    participant UI
    participant API
    participant AIModels
    participant ChromaDB
    participant Ranking
    
    User->>UI: Enter search query
    UI->>API: POST /api/search
    API->>AIModels: Generate query embedding
    AIModels->>API: Return query vector
    API->>ChromaDB: Vector similarity search
    ChromaDB->>API: Raw similarity results
    API->>Ranking: Apply confidence scoring
    Ranking->>API: Ranked results
    API->>UI: Return search results
    UI->>User: Display results
```

## 🏠 **Local Deployment Model**

### **Single-User Desktop Deployment**
- **Target Environment**: Individual user workstations
- **Installation**: Source installation or future packaged installers
- **Data Storage**: User's application data directory
- **Configuration**: Local config.py file
- **Scaling**: Designed for personal document collections

### **Development Environment**
- **Development Mode**: Flask debug mode with hot reload
- **Testing**: Local test files and validation scripts
- **Debugging**: Console logging and developer tools
- **Performance Profiling**: Built-in timing and memory monitoring

## 🔒 **Security Model**

### **Local-First Security**
- **No External Data Transmission**: Document content stays local
- **OS-Level Security**: Inherits user account permissions
- **Keyring Integration**: Secure storage for GitHub tokens
- **CORS Protection**: API only accepts requests from desktop app

### **GitHub Integration Security**
- **OAuth Device Flow**: Industry-standard authentication
- **Minimal Permissions**: Read-only repository access
- **Token Management**: Secure storage and automatic refresh
- **Repository Cloning**: Local copies for indexing

## 📊 **Current Limitations**

### **Known Constraints**
- **Single-User Design**: No multi-user access control
- **Local Processing Only**: No distributed computing
- **Basic Monitoring**: Console logging only
- **Manual Configuration**: No centralized configuration management

### **Future Enhancement Opportunities**
- **Performance Optimization**: GPU acceleration for large collections
- **Advanced Monitoring**: Metrics collection and visualization
- **Enterprise Features**: Multi-user support and centralized management
- **Cloud Integration**: Optional cloud backup and sync

---

*This architecture overview reflects the current implementation of Filevate as a local-first semantic search platform designed for individual users and development teams.*