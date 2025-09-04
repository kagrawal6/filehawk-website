# Indexing Sequence Diagram

**End-to-End Document Indexing Process Flow**

## Overview

This sequence diagram illustrates the complete document indexing workflow in Filevate, from user initiation to completion notification.

```mermaid
sequenceDiagram
    participant User
    participant React_UI as React UI
    participant Electron_Main as Electron Main
    participant Flask_API as Flask API
    participant File_Scanner as File Scanner
    participant AI_Models as AI Models
    participant ChromaDB
    participant Metadata_Tracker as Metadata Tracker
    participant Real_Time_Monitor as Real-time Monitor

    %% User initiates indexing
    User->>React_UI: Select "Index Folder"
    React_UI->>Electron_Main: IPC: folder selection request
    Electron_Main->>Electron_Main: Show native folder dialog
    Electron_Main-->>React_UI: IPC: selected folder path
    React_UI->>React_UI: Display selected folder
    
    User->>React_UI: Click "Start Indexing"
    React_UI->>Electron_Main: IPC: start indexing request
    Electron_Main->>Flask_API: HTTP POST /api/index
    
    %% Initialize indexing
    Flask_API->>Flask_API: Validate folder path
    Flask_API->>Real_Time_Monitor: Start file monitoring
    Real_Time_Monitor-->>Flask_API: Monitoring started
    Flask_API->>File_Scanner: Start directory scan
    
    %% File discovery and filtering
    File_Scanner->>File_Scanner: Recursive directory traversal
    File_Scanner->>File_Scanner: Apply file type filters
    File_Scanner->>File_Scanner: Check exclusion patterns
    File_Scanner->>File_Scanner: Validate file sizes
    File_Scanner-->>Flask_API: Return file list
    
    %% Initialize progress tracking
    Flask_API->>React_UI: WebSocket: indexing started
    Flask_API->>React_UI: WebSocket: total files count
    React_UI->>React_UI: Initialize progress bar
    React_UI-->>User: Show indexing progress
    
    %% Process files in batches
    loop For each batch of files
        Flask_API->>Flask_API: Get next batch (50 files)
        
        loop For each file in batch
            Flask_API->>Metadata_Tracker: Check if file changed
            Metadata_Tracker-->>Flask_API: File status (new/modified/unchanged)
            
            alt File needs processing
                Flask_API->>Flask_API: Read file content
                Flask_API->>Flask_API: Extract text (PDF, Office, etc.)
                Flask_API->>Flask_API: Clean and normalize content
                
                %% Dual-mode chunking
                Flask_API->>Flask_API: Create gist chunks (35 lines)
                Flask_API->>Flask_API: Create pinpoint chunks (10 lines)
                
                %% AI processing
                Flask_API->>AI_Models: Generate gist embeddings (MSMarco)
                AI_Models-->>Flask_API: Return gist vectors
                Flask_API->>AI_Models: Generate pinpoint embeddings (AllMiniLM)
                AI_Models-->>Flask_API: Return pinpoint vectors
                
                %% Store in database
                Flask_API->>ChromaDB: Store gist chunks + vectors
                ChromaDB-->>Flask_API: Confirm gist storage
                Flask_API->>ChromaDB: Store pinpoint chunks + vectors
                ChromaDB-->>Flask_API: Confirm pinpoint storage
                
                %% Update metadata
                Flask_API->>Metadata_Tracker: Update file metadata
                Metadata_Tracker-->>Flask_API: Metadata updated
                
            else File unchanged
                Flask_API->>Flask_API: Skip processing (no changes)
            end
            
            %% Progress update
            Flask_API->>React_UI: WebSocket: file processed
            React_UI->>React_UI: Update progress bar
            React_UI-->>User: Show current progress
        end
        
        %% Memory cleanup between batches
        Flask_API->>Flask_API: Cleanup batch memory
    end
    
    %% Indexing completion
    Flask_API->>Flask_API: Calculate final statistics
    Flask_API->>React_UI: WebSocket: indexing completed
    React_UI->>React_UI: Show completion notification
    React_UI-->>User: Display "Indexing Complete"
    
    %% Real-time monitoring continues
    Note over Real_Time_Monitor: Continues monitoring for file changes
    Real_Time_Monitor->>Flask_API: File change detected
    Flask_API->>Flask_API: Queue file for re-indexing
```

## Sequence Details

### **1. User Initiation Phase**
- User selects folder through native dialog
- Indexing request sent to Flask backend
- Initial validation and setup

### **2. File Discovery Phase**
- Recursive directory scanning
- File type and size filtering
- Exclusion pattern application
- Total file count determination

### **3. Progress Initialization Phase**
- Real-time monitoring setup
- Progress tracking initialization
- User interface updates begin

### **4. Batch Processing Phase**
- Files processed in configurable batches (default: 50)
- Change detection using SHA-256 hashing
- Skip unchanged files for efficiency

### **5. Content Processing Phase**
- Multi-format text extraction
- Content cleaning and normalization
- Dual-mode chunking (gist + pinpoint)

### **6. AI Processing Phase**
- Embedding generation using appropriate models
- Vector computation (384 dimensions)
- Local AI inference (no external calls)

### **7. Storage Phase**
- Vector storage in ChromaDB collections
- Metadata tracking for change detection
- Persistent storage with automatic backup

### **8. Progress Tracking Phase**
- Real-time WebSocket updates to UI
- Progress bar and status updates
- Error notification and handling

### **9. Completion Phase**
- Final statistics calculation
- Completion notification to user
- Real-time monitoring activation

## Error Handling Scenarios

### **File Processing Errors**
```mermaid
sequenceDiagram
    participant Flask_API as Flask API
    participant React_UI as React UI
    participant User

    Flask_API->>Flask_API: Attempt file processing
    Flask_API->>Flask_API: Error occurs (corruption, encoding, etc.)
    Flask_API->>Flask_API: Log error details
    Flask_API->>React_UI: WebSocket: file error notification
    React_UI->>React_UI: Add to error list
    React_UI-->>User: Show error in progress panel
    Flask_API->>Flask_API: Continue with next file
```

### **Model Loading Errors**
```mermaid
sequenceDiagram
    participant Flask_API as Flask API
    participant AI_Models as AI Models
    participant React_UI as React UI
    participant User

    Flask_API->>AI_Models: Request embedding generation
    AI_Models-->>Flask_API: Model loading error
    Flask_API->>Flask_API: Retry with backoff
    alt Retry successful
        AI_Models-->>Flask_API: Return embeddings
    else Retry failed
        Flask_API->>React_UI: WebSocket: critical error
        React_UI-->>User: Show error dialog with retry option
    end
```

## Performance Optimizations

### **Batch Processing**
- **Configurable Batch Size**: Balance memory vs. throughput
- **Memory Cleanup**: Regular cleanup between batches
- **Progress Granularity**: Efficient progress updates

### **Change Detection**
- **SHA-256 Hashing**: Fast content change detection
- **Metadata Tracking**: Skip unchanged files
- **Incremental Updates**: Only process modifications

### **Parallel Processing**
- **Multi-threading**: Configurable worker threads
- **AI Model Sharing**: Efficient model reuse
- **I/O Optimization**: Async file operations

### **Memory Management**
- **Streaming Processing**: Large files processed in chunks
- **Resource Limits**: Configurable memory limits
- **Garbage Collection**: Proactive memory cleanup

---

*This indexing sequence diagram shows the current document processing implementation in Filevate.*
