# Filevate Backend Architecture

**Local AI-Powered Semantic Search Platform - Backend Systems**

## System Overview

This diagram illustrates the backend architecture of Filevate, showcasing the dual-model AI architecture, GitHub integration, and local-first processing design.

```mermaid
graph TB
    %% External Systems
    subgraph "External Services (Optional)"
        GITHUB[🔗 GitHub API<br/>OAuth + Repository Access]
        HF_MODELS[🤗 Hugging Face<br/>Model Downloads]
    end

    %% Main Application Components
    subgraph "Filevate Local Backend"
        subgraph "Flask API Server"
            API_SERVER["api.py<br/>Flask Development Server<br/>localhost:5000"]
            ROUTES["Route Handlers<br/>Search, Index, GitHub, Status"]
            CORS["CORS Middleware<br/>Local Origin Access"]
        end

        subgraph "File Processing Pipeline"
            FILE_SCANNER["File Scanner<br/>Directory Traversal"]
            TEXT_EXTRACTOR["Text Extractor<br/>15+ File Types"]
            CHUNKER["Dual-Mode Chunker<br/>Gist: 35-line / Pinpoint: 10-line"]
            FILTER["File Filter<br/>Size/Type/Hidden File Exclusion"]
        end

        subgraph "AI/ML Processing"
            GIST_MODEL["MSMarco MiniLM L6<br/>Search-Optimized"]
            PINPOINT_MODEL["AllMiniLM L6 v2<br/>General Semantic"]
            EMBEDDING_GEN["Embedding Generation<br/>384-dim Vectors"]
            RANKING_ENGINE["gist_ranking.py<br/>Multi-factor Scoring"]
        end

        subgraph "Local Data Storage"
            CHROMA_CLIENT["ChromaDB Client<br/>Persistent Vector Store"]
            GIST_COLLECTION["Gist Collection<br/>Topic-level Chunks"]
            PINPOINT_COLLECTION["Pinpoint Collection<br/>Precise Chunks"]
            METADATA_TRACKER["metadata_tracker.py<br/>File State & SHA-256"]
        end

        subgraph "Real-time Monitoring"
            WATCHDOG["realtime_monitor.py<br/>File System Watchdog"]
            SYNC_TRACKER["sync_tracker.py<br/>Change Queue Management"]
            GITHUB_SYNC["GitHub Integration<br/>Repository Cloning & Sync"]
        end
    end

    %% Data Flow
    GITHUB -.-> GITHUB_SYNC
    HF_MODELS -.-> GIST_MODEL
    HF_MODELS -.-> PINPOINT_MODEL
    
    API_SERVER --> ROUTES
    ROUTES --> CORS
    ROUTES --> FILE_SCANNER
    ROUTES --> GIST_MODEL
    ROUTES --> PINPOINT_MODEL
    
    FILE_SCANNER --> TEXT_EXTRACTOR
    TEXT_EXTRACTOR --> FILTER
    FILTER --> CHUNKER
    CHUNKER --> EMBEDDING_GEN
    
    GIST_MODEL --> EMBEDDING_GEN
    PINPOINT_MODEL --> EMBEDDING_GEN
    EMBEDDING_GEN --> CHROMA_CLIENT
    
    CHROMA_CLIENT --> GIST_COLLECTION
    CHROMA_CLIENT --> PINPOINT_COLLECTION
    CHUNKER --> METADATA_TRACKER
    
    WATCHDOG --> SYNC_TRACKER
    SYNC_TRACKER --> FILE_SCANNER
    GITHUB_SYNC --> FILE_SCANNER
    
    GIST_COLLECTION --> RANKING_ENGINE
    RANKING_ENGINE --> ROUTES

    %% Styling
    classDef external fill:#FFF3E0,stroke:#F57C00,color:#000
    classDef api fill:#E3F2FD,stroke:#1976D2,color:#000
    classDef processing fill:#E8F5E8,stroke:#388E3C,color:#000
    classDef ai fill:#F3E5F5,stroke:#7B1FA2,color:#000
    classDef storage fill:#FCE4EC,stroke:#C2185B,color:#000
    classDef monitoring fill:#FFF8E1,stroke:#F9A825,color:#000

    class GITHUB,HF_MODELS external
    class API_SERVER,ROUTES,CORS api
    class FILE_SCANNER,TEXT_EXTRACTOR,CHUNKER,FILTER processing
    class GIST_MODEL,PINPOINT_MODEL,EMBEDDING_GEN,RANKING_ENGINE ai
    class CHROMA_CLIENT,GIST_COLLECTION,PINPOINT_COLLECTION,METADATA_TRACKER storage
    class WATCHDOG,SYNC_TRACKER,GITHUB_SYNC monitoring
```

## Key Components

### **Flask API Server (api.py)**
- **Local Development Server**: Runs on localhost:5000
- **RESTful Endpoints**: Search, indexing, GitHub integration, status
- **CORS Enabled**: Accepts requests from Electron desktop app
- **No Authentication**: Local-only access for single-user desktop app

### **Dual-Model AI Architecture**
- **Gist Model**: MSMarco MiniLM L6 CoS v5 for search-optimized tasks
- **Pinpoint Model**: AllMiniLM L6 v2 for general semantic understanding
- **Local Processing**: All AI inference happens on user's machine
- **Offline Capable**: No external API calls for search operations

### **ChromaDB Vector Storage**
- **Persistent Client**: Local database with automatic persistence
- **Dual Collections**: Separate storage for Gist and Pinpoint chunks
- **HNSW Indexing**: Efficient vector similarity search
- **Metadata Integration**: File paths, timestamps, and chunk information

### **Real-time File Monitoring**
- **Watchdog Integration**: Cross-platform file system monitoring
- **Change Detection**: SHA-256 hashing for efficient change identification
- **Queue Management**: Background processing of file changes
- **GitHub Sync**: Repository change detection and incremental updates

### **GitHub Integration**
- **OAuth Device Flow**: Industry-standard authentication
- **Repository Cloning**: Local copies for offline indexing
- **Branch Management**: Track multiple branches with intelligent switching
- **Secure Token Storage**: System keyring integration

## Performance Characteristics

### **Processing Capabilities**
- **File Processing**: 50-100 files per minute (varies by size)
- **Search Response**: Typically 100-300ms for local queries
- **Concurrent Operations**: Search while indexing supported
- **Memory Usage**: 2-4GB depending on collection size

### **Scalability Limits**
- **Collection Size**: Tested with up to 100K documents
- **File Size Limit**: Configurable (default 100MB)
- **Concurrent Users**: Single-user desktop application
- **Network Dependencies**: GitHub and model downloads only

## Security Model

### **Local-First Security**
- **No External Data Transmission**: Document content stays local
- **OS-Level Permissions**: Standard user account security
- **Keyring Integration**: Secure GitHub token storage
- **CORS Protection**: API restricted to desktop app origin

### **GitHub Security**
- **Read-Only Access**: No repository modification permissions
- **OAuth Tokens**: Secure storage and automatic refresh
- **Repository Isolation**: Each repo cloned to separate directory
- **Revocation Support**: Easy token removal via GitHub settings

---

*This backend architecture diagram reflects the current local-first implementation of Filevate's semantic search platform.*