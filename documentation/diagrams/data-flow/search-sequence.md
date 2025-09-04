# Search Sequence Diagram

**End-to-End Search Process Flow**

## Overview

This sequence diagram shows the complete interaction flow for a search operation in Filevate, from user input to result display.

```mermaid
sequenceDiagram
    participant User
    participant React_UI as React UI
    participant Electron_Main as Electron Main
    participant Flask_API as Flask API
    participant AI_Models as AI Models
    participant ChromaDB
    participant Ranking_Engine as Ranking Engine

    %% User initiates search
    User->>React_UI: Enter search query
    React_UI->>React_UI: Validate input
    React_UI->>React_UI: Select search mode (Gist/Pinpoint)
    
    %% Send request through Electron
    React_UI->>Electron_Main: IPC: search request
    Electron_Main->>Electron_Main: Validate request
    Electron_Main->>Flask_API: HTTP POST /api/search
    
    %% Backend processing
    Flask_API->>Flask_API: Parse request parameters
    Flask_API->>Flask_API: Validate query and mode
    
    alt Gist Mode
        Flask_API->>AI_Models: Generate embedding (MSMarco)
        AI_Models-->>Flask_API: Return query vector
        Flask_API->>ChromaDB: Query gist collection
        ChromaDB-->>Flask_API: Return similarity results
        Flask_API->>Ranking_Engine: Apply gist ranking algorithm
        Ranking_Engine-->>Flask_API: Return ranked results
    else Pinpoint Mode
        Flask_API->>AI_Models: Generate embedding (AllMiniLM)
        AI_Models-->>Flask_API: Return query vector
        Flask_API->>ChromaDB: Query pinpoint collection
        ChromaDB-->>Flask_API: Return similarity results
        Flask_API->>Flask_API: Apply pinpoint confidence scoring
    end
    
    %% Confidence calculation and boosting
    Flask_API->>Flask_API: Calculate base confidence scores
    Flask_API->>Flask_API: Apply filename matching boost
    Flask_API->>Flask_API: Apply exact term matching boost
    Flask_API->>Flask_API: Normalize final scores
    
    %% Return results
    Flask_API-->>Electron_Main: HTTP Response with results
    Electron_Main-->>React_UI: IPC: search response
    React_UI->>React_UI: Process and format results
    React_UI->>React_UI: Update search results UI
    React_UI-->>User: Display ranked results
    
    %% User interaction with results
    User->>React_UI: Click on result
    React_UI->>Electron_Main: IPC: open file request
    Electron_Main->>Electron_Main: Open file with system default
    Electron_Main-->>React_UI: IPC: file opened confirmation
    React_UI-->>User: Visual feedback
```

## Sequence Details

### **1. User Input Phase**
- User enters natural language query in search bar
- React UI validates input and selects search mode
- Query preprocessing (normalization, validation)

### **2. Request Routing Phase**
- React UI sends request via Electron IPC
- Main process validates and forwards to Flask API
- Security validation and parameter checking

### **3. AI Processing Phase**
- Flask API selects appropriate AI model
- Query converted to 384-dimensional vector
- Model inference performed locally

### **4. Vector Search Phase**
- ChromaDB performs cosine similarity search
- Retrieves top-k most similar chunks
- Raw distance scores returned

### **5. Ranking Phase**
- **Gist Mode**: Multi-factor ranking algorithm applied
- **Pinpoint Mode**: Direct confidence score calculation
- Boosting factors applied (filename, exact terms)

### **6. Response Phase**
- Results formatted with confidence scores
- Response sent back through Electron IPC
- React UI updates with ranked results

### **7. User Interaction Phase**
- User can click on results to open files
- System file manager opens selected documents
- Visual feedback provided to user

## Performance Considerations

### **Response Time Optimization**
- **Local Processing**: All operations on user's machine
- **Model Caching**: AI models loaded once at startup
- **Vector Index**: ChromaDB provides fast similarity search
- **Efficient IPC**: Minimal overhead between components

### **Error Handling**
- **Input Validation**: Malformed queries handled gracefully
- **Model Failures**: Fallback error messages for AI issues
- **Database Errors**: Recovery and user notification
- **Network Timeouts**: Graceful timeout handling

### **Memory Management**
- **Batch Processing**: Large result sets processed in chunks
- **Resource Cleanup**: Proper cleanup after operations
- **Memory Limits**: Configurable limits for large operations

---

*This sequence diagram shows the current search implementation flow in Filevate.*
