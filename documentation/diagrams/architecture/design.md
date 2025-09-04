# Filevate System Architecture

**AI-Powered Local Semantic Search Platform**

## High-Level System Overview

This diagram shows the complete Filevate system design, including desktop frontend, AI backend, and local data storage.

```mermaid
graph TB
    %% User Interface
    subgraph "Desktop Application"
        UI[React UI<br/>Search & Results]
        ELECTRON[Electron Framework<br/>Cross-platform]
        IPC[IPC Bridge<br/>Secure Communication]
    end

    %% Backend Services
    subgraph "Local Backend"
        API[Flask API<br/>localhost:5000]
        SEARCH[Search Engine<br/>Dual-mode AI]
        INDEX[Indexing Pipeline<br/>Text Processing]
        GITHUB[GitHub Integration<br/>OAuth + Cloning]
    end
    
    %% AI Models
    subgraph "AI Processing"
        GIST[MSMarco Model<br/>Topic Search]
        PINPOINT[AllMiniLM Model<br/>Precise Search]
        RANKING[Confidence Scoring<br/>Multi-factor Algorithm]
    end
    
    %% Data Storage
    subgraph "Local Storage"
        CHROMA[ChromaDB<br/>Vector Database]
        METADATA[File Metadata<br/>State Tracking]
        FILES[Local Documents<br/>User Directories]
    end

    %% External Services
    subgraph "External (Optional)"
        GITHUB_API[GitHub API<br/>Repository Access]
        HF[Hugging Face<br/>Model Downloads]
    end

    %% Connections
    UI --> IPC
    IPC --> API
    API --> SEARCH
    API --> INDEX
    API --> GITHUB
    
    SEARCH --> GIST
    SEARCH --> PINPOINT
    SEARCH --> RANKING
    
    INDEX --> GIST
    INDEX --> PINPOINT
    INDEX --> CHROMA
    INDEX --> METADATA
    
    GITHUB --> GITHUB_API
    GIST -.-> HF
    PINPOINT -.-> HF
    
    CHROMA --> RANKING
    METADATA --> INDEX
    FILES --> INDEX

    %% Styling
    classDef ui fill:#E3F2FD,stroke:#1976D2,color:#000
    classDef backend fill:#E8F5E8,stroke:#388E3C,color:#000
    classDef ai fill:#F3E5F5,stroke:#7B1FA2,color:#000
    classDef storage fill:#FCE4EC,stroke:#C2185B,color:#000
    classDef external fill:#FFF3E0,stroke:#F57C00,color:#000

    class UI,ELECTRON,IPC ui
    class API,SEARCH,INDEX,GITHUB backend
    class GIST,PINPOINT,RANKING ai
    class CHROMA,METADATA,FILES storage
    class GITHUB_API,HF external
```

## Core Architecture

### **Local-First Design**
- All document processing happens locally
- No cloud dependencies for core functionality
- Complete user data ownership and privacy

### **Dual-Model AI**
- MSMarco MiniLM for search-optimized tasks
- AllMiniLM for general semantic understanding
- Confidence scoring for result ranking

### **Desktop Application**
- Electron + React cross-platform interface
- Secure IPC communication with backend
- Real-time search and indexing feedback

### **Vector Storage**
- ChromaDB for efficient similarity search
- Persistent metadata for file state tracking
- Local storage in platform-appropriate directories

## Key Features

### **Search Capabilities**
- Natural language query understanding
- Dual search modes (Gist/Pinpoint)
- Multi-factor confidence scoring
- Real-time result ranking

### **File Processing**
- 15+ file type support
- Intelligent text extraction
- Dual-chunking strategy
- Real-time change detection

### **GitHub Integration**
- OAuth device flow authentication
- Repository cloning and sync
- Branch-aware indexing
- Offline search of repositories

---

*This diagram reflects the current local-first implementation of Filevate.*
