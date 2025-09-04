# GitHub Integration Workflow

**Complete GitHub OAuth and Repository Management Flow**

## Overview

This diagram shows the comprehensive GitHub integration workflow in Filevate, from OAuth authentication through repository indexing and real-time synchronization.

```mermaid
flowchart TD
    %% User Initiation
    USER_START[👤 User Clicks<br/>"Connect GitHub"]
    
    %% OAuth Device Flow
    DEVICE_AUTH[GitHub Device Auth<br/>POST /login/device/code]
    DEVICE_RESPONSE[Device Code Response<br/>user_code, device_code, verification_uri]
    SHOW_CODE[Display User Code<br/>Show verification URL]
    
    %% User Authorization
    USER_BROWSER[🌐 User Opens Browser<br/>github.com/device]
    USER_ENTERS_CODE[User Enters Code<br/>Authorize Application]
    USER_CONFIRMS[User Confirms<br/>Grant Repository Access]
    
    %% Token Exchange
    POLL_TOKEN[Poll for Token<br/>POST /login/oauth/access_token]
    TOKEN_RECEIVED[Access Token<br/>Received]
    STORE_TOKEN[Store Token Securely<br/>System Keyring]
    
    %% Repository Discovery
    FETCH_REPOS[Fetch Repositories<br/>GET /user/repos]
    FILTER_REPOS[Filter & Sort<br/>By Activity & Access]
    DISPLAY_REPOS[📋 Display Repository List<br/>Name, Description, Updated]
    
    %% Repository Selection
    USER_SELECTS[User Selects Repository<br/>Choose Branch & Settings]
    CLONE_REPO[Clone Repository<br/>Git Clone to Local]
    BRANCH_CHECKOUT[Checkout Branch<br/>Switch to Selected Branch]
    
    %% Repository Indexing
    INDEX_START[Start Repository Indexing<br/>Background Process]
    
    subgraph "Repository Processing"
        SCAN_FILES[Scan Repository Files<br/>Apply Exclusion Rules]
        EXTRACT_TEXT[Extract Text Content<br/>Code, Docs, README]
        CHUNK_CONTENT[Chunk Repository Content<br/>Gist + Pinpoint Modes]
        GENERATE_EMBEDDINGS[Generate AI Embeddings<br/>MSMarco + AllMiniLM]
        STORE_VECTORS[Store in ChromaDB<br/>Separate Collections]
    end
    
    %% Manifest Management
    CREATE_MANIFEST[Create Branch Manifest<br/>Track Indexed Files]
    STORE_MANIFEST[Store Manifest<br/>Persistent State]
    
    %% Real-time Sync Setup
    SETUP_MONITORING[Setup File Monitoring<br/>Watch Repository Directory]
    SCHEDULE_SYNC[Schedule Periodic Sync<br/>Check for Updates]
    
    %% Ongoing Synchronization
    DETECT_CHANGES[Detect Repository Changes<br/>Git Pull & Compare]
    UPDATE_INDEX[Update Search Index<br/>Incremental Changes]
    NOTIFY_USER[Notify User<br/>Sync Complete]
    
    %% Error Handling
    AUTH_ERROR{Authentication<br/>Error?}
    CLONE_ERROR{Clone<br/>Error?}
    INDEX_ERROR{Indexing<br/>Error?}
    
    ERROR_DISPLAY[❌ Display Error<br/>User-Friendly Message]
    RETRY_OPTION[🔄 Offer Retry<br/>Retry Button]
    
    %% Flow Connections
    USER_START --> DEVICE_AUTH
    DEVICE_AUTH --> DEVICE_RESPONSE
    DEVICE_RESPONSE --> SHOW_CODE
    SHOW_CODE --> USER_BROWSER
    USER_BROWSER --> USER_ENTERS_CODE
    USER_ENTERS_CODE --> USER_CONFIRMS
    
    USER_CONFIRMS --> POLL_TOKEN
    POLL_TOKEN --> AUTH_ERROR
    AUTH_ERROR -->|No| TOKEN_RECEIVED
    AUTH_ERROR -->|Yes| ERROR_DISPLAY
    ERROR_DISPLAY --> RETRY_OPTION
    RETRY_OPTION --> DEVICE_AUTH
    
    TOKEN_RECEIVED --> STORE_TOKEN
    STORE_TOKEN --> FETCH_REPOS
    FETCH_REPOS --> FILTER_REPOS
    FILTER_REPOS --> DISPLAY_REPOS
    
    DISPLAY_REPOS --> USER_SELECTS
    USER_SELECTS --> CLONE_REPO
    CLONE_REPO --> CLONE_ERROR
    CLONE_ERROR -->|No| BRANCH_CHECKOUT
    CLONE_ERROR -->|Yes| ERROR_DISPLAY
    
    BRANCH_CHECKOUT --> INDEX_START
    INDEX_START --> SCAN_FILES
    SCAN_FILES --> EXTRACT_TEXT
    EXTRACT_TEXT --> CHUNK_CONTENT
    CHUNK_CONTENT --> GENERATE_EMBEDDINGS
    GENERATE_EMBEDDINGS --> STORE_VECTORS
    STORE_VECTORS --> INDEX_ERROR
    
    INDEX_ERROR -->|No| CREATE_MANIFEST
    INDEX_ERROR -->|Yes| ERROR_DISPLAY
    
    CREATE_MANIFEST --> STORE_MANIFEST
    STORE_MANIFEST --> SETUP_MONITORING
    SETUP_MONITORING --> SCHEDULE_SYNC
    
    SCHEDULE_SYNC --> DETECT_CHANGES
    DETECT_CHANGES --> UPDATE_INDEX
    UPDATE_INDEX --> NOTIFY_USER
    NOTIFY_USER --> DETECT_CHANGES

    %% Styling
    classDef user fill:#E3F2FD,stroke:#1976D2,color:#000
    classDef oauth fill:#F3E5F5,stroke:#7B1FA2,color:#000
    classDef repo fill:#E8F5E8,stroke:#388E3C,color:#000
    classDef processing fill:#FFF3E0,stroke:#F57C00,color:#000
    classDef sync fill:#FCE4EC,stroke:#C2185B,color:#000
    classDef error fill:#FFEBEE,stroke:#D32F2F,color:#000
    classDef success fill:#F1F8E9,stroke:#689F38,color:#000

    class USER_START,USER_BROWSER,USER_ENTERS_CODE,USER_CONFIRMS,USER_SELECTS user
    class DEVICE_AUTH,DEVICE_RESPONSE,SHOW_CODE,POLL_TOKEN,TOKEN_RECEIVED,STORE_TOKEN oauth
    class FETCH_REPOS,FILTER_REPOS,DISPLAY_REPOS,CLONE_REPO,BRANCH_CHECKOUT repo
    class INDEX_START,SCAN_FILES,EXTRACT_TEXT,CHUNK_CONTENT,GENERATE_EMBEDDINGS,STORE_VECTORS processing
    class CREATE_MANIFEST,STORE_MANIFEST,SETUP_MONITORING,SCHEDULE_SYNC,DETECT_CHANGES,UPDATE_INDEX,NOTIFY_USER sync
    class AUTH_ERROR,CLONE_ERROR,INDEX_ERROR,ERROR_DISPLAY,RETRY_OPTION error
```

## Integration Components

### **1. OAuth Device Flow**
- **Device Code Request**: Initiate GitHub OAuth with device flow
- **User Verification**: Display code for user to enter on GitHub
- **Token Polling**: Continuously check for authorization completion
- **Secure Storage**: Store access token in system keyring

### **2. Repository Management**
- **Repository Discovery**: Fetch user's accessible repositories
- **Filtering & Sorting**: Prioritize by activity and access level
- **Clone Management**: Local repository cloning and branch switching
- **Branch Intelligence**: Track multiple branches with separate indices

### **3. Content Processing**
- **File Discovery**: Scan repository with intelligent exclusions
- **Text Extraction**: Process code files, documentation, and README files
- **Dual Chunking**: Apply both gist and pinpoint chunking strategies
- **AI Processing**: Generate embeddings using appropriate models

### **4. Manifest System**
- **Branch Tracking**: Maintain separate manifests per branch
- **Change Detection**: Compare against previous state for incremental updates
- **State Persistence**: Store manifests for efficient sync operations
- **File Metadata**: Track file hashes, sizes, and modification times

### **5. Real-time Synchronization**
- **File Monitoring**: Watch repository directory for local changes
- **Periodic Sync**: Schedule regular checks for remote updates
- **Incremental Updates**: Only process changed files
- **User Notifications**: Inform user of sync status and completion

## Security Considerations

### **OAuth Security**
- **Device Flow**: Industry-standard authentication without exposing client secrets
- **Scope Limitations**: Request minimal necessary permissions (repo read access)
- **Token Security**: Secure storage using platform keyring services
- **Automatic Refresh**: Handle token renewal and expiration gracefully

### **Repository Access**
- **Read-Only**: No modification permissions requested or used
- **Local Processing**: All indexing happens locally, no data transmission
- **Selective Access**: User controls which repositories to connect
- **Easy Revocation**: Users can revoke access via GitHub settings

### **Data Privacy**
- **Local Storage**: Repository content stays on user's machine
- **No Analytics**: No usage data or repository content transmitted
- **User Control**: Complete control over indexed repository data
- **Offline Capable**: Search works without internet connection

## Performance Optimizations

### **Efficient Cloning**
- **Shallow Clones**: Use git shallow clones to reduce bandwidth
- **Branch Specific**: Clone only selected branches when possible
- **Delta Sync**: Use git pull for incremental updates
- **Parallel Processing**: Concurrent repository operations

### **Smart Indexing**
- **Exclusion Rules**: Skip binary files, build artifacts, and dependencies
- **File Size Limits**: Configurable maximum file sizes
- **Batch Processing**: Process files in efficient batches
- **Change Detection**: Only reindex modified files

### **Memory Management**
- **Streaming Processing**: Process large repositories in chunks
- **Cleanup**: Regular cleanup of temporary files and caches
- **Resource Limits**: Configurable memory and processing limits
- **Progress Tracking**: Real-time feedback to user interface

## Error Recovery

### **Authentication Errors**
- **Token Expiration**: Automatic re-authentication flow
- **Network Issues**: Retry with exponential backoff
- **Permission Changes**: Graceful handling of revoked access
- **User Guidance**: Clear error messages and recovery instructions

### **Repository Errors**
- **Clone Failures**: Network timeout and disk space handling
- **Branch Issues**: Handle missing or protected branches
- **File Access**: Skip inaccessible or corrupted files
- **Partial Success**: Continue processing when individual files fail

### **Sync Errors**
- **Network Connectivity**: Offline mode and sync queuing
- **Repository Changes**: Handle renamed, moved, or deleted repositories
- **Conflict Resolution**: Handle local vs remote state conflicts
- **Retry Logic**: Intelligent retry mechanisms for transient failures

---

*This GitHub integration workflow provides seamless repository management with enterprise-grade security and performance in Filevate.*
