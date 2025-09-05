# Filevate API Documentation

**Complete reference for the RESTful endpoints in the Filevate semantic search platform**

## Overview

The Filevate API provides programmatic access to all platform capabilities through a RESTful interface. Built on Flask with CORS support for the desktop application.

**Base URL**: `http://localhost:5000/api`

## API Architecture

### **Core Design**
- **Local-only API**: Runs on localhost:5000 for desktop app communication
- **RESTful Interface**: Standard HTTP methods and status codes
- **JSON Communication**: Request and response data in JSON format
- **CORS Enabled**: Configured for Electron app origin access
- **No Authentication**: Local-only access, secured by localhost binding

### **Error Handling**
- **Standard HTTP Status Codes**: 200 (success), 400 (bad request), 500 (server error)
- **Structured Error Responses**: Consistent error message format
- **Exception Handling**: Graceful handling of model and database errors

## Available Endpoints

### **Core Endpoints**

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/health` | Health check and server status |
| `GET` | `/api/status` | Detailed application status |
| `POST` | `/api/search` | Semantic search with dual modes |
| `POST` | `/api/index` | Index documents in specified folder |
| `POST` | `/api/cancel_indexing` | Cancel ongoing indexing operation |
| `POST` | `/api/clear_database` | Clear all indexed data |

### **GitHub Integration Endpoints**

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/github/auth/start` | Initiate GitHub OAuth device flow |
| `POST` | `/api/github/auth/poll` | Poll for OAuth completion |
| `GET` | `/api/github/repositories` | List user's GitHub repositories |
| `POST` | `/api/github/connect` | Connect and index a repository |
| `POST` | `/api/github/sync` | Sync repository changes |
| `GET` | `/api/github/status` | Repository indexing status |

### **File Management Endpoints**

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/files` | List all indexed files |
| `DELETE` | `/api/files` | Remove specific files from index |
| `GET` | `/api/folders` | List indexed folders and settings |
| `POST` | `/api/folders` | Add folder to indexing |

### **Search and Results Endpoints**

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/search/gist` | Gist mode semantic search |
| `POST` | `/api/search/pinpoint` | Pinpoint mode semantic search |
| `GET` | `/api/search/suggestions` | Search query suggestions |
| `GET` | `/api/results/{result_id}` | Get detailed result information |

## Request/Response Format

### **Standard Request Format**
```json
{
  "query": "search terms",
  "mode": "gist",
  "limit": 10,
  "filters": {
    "file_types": ["pdf", "md"],
    "date_range": {
      "start": "2023-01-01",
      "end": "2024-01-01"
    }
  }
}
```

### **Standard Response Format**
```json
{
  "success": true,
  "results": [...],
  "metadata": {
    "total_results": 15,
    "search_time_ms": 245,
    "mode": "gist"
  },
  "timestamp": "2024-01-15T10:30:00Z"
}
```

### **Error Response Format**
```json
{
  "error": "Invalid query parameter",
  "details": "Query cannot be empty",
  "timestamp": "2024-01-15T10:30:00Z",
  "status_code": 400
}
```

## Authentication & Security

### **Local-Only Access**
- **No Authentication Required**: API bound to localhost only
- **CORS Configuration**: Accepts requests from Electron app origin
- **Network Security**: Not accessible from external networks
- **Process Security**: Runs under user account permissions

### **GitHub Token Management**
- **OAuth Device Flow**: Industry-standard GitHub authentication
- **Secure Storage**: Tokens stored in system keyring
- **Automatic Refresh**: Handles token renewal automatically
- **Revocation Support**: Tokens can be revoked via GitHub settings

## Rate Limiting & Performance

### **Current Limitations**
- **No Rate Limiting**: Local API with single-user access
- **Concurrent Requests**: Handles multiple simultaneous requests
- **Search Timeouts**: 30-second timeout for search operations
- **Indexing Limits**: Configurable batch sizes and file size limits

### **Performance Characteristics**
- **Search Response Time**: Typically 100-300ms
- **Indexing Throughput**: 50-100 files per minute
- **Memory Usage**: Scales with collection size and models
- **Concurrent Operations**: Search while indexing supported

## Development Usage

### **Starting the API Server**
```bash
# Activate virtual environment
source venv/bin/activate  # Linux/macOS
venv\Scripts\activate     # Windows

# Start API server
python api.py

# Server starts on http://localhost:5000
```

### **Basic API Testing**
```bash
# Test health endpoint
curl http://localhost:5000/api/health

# Test search endpoint
curl -X POST http://localhost:5000/api/search \
  -H "Content-Type: application/json" \
  -d '{"query": "machine learning", "mode": "gist", "limit": 5}'

# Test status endpoint
curl http://localhost:5000/api/status
```

### **Python Client Example**
```python
import requests

# API base URL
BASE_URL = "http://localhost:5000/api"

def search_documents(query, mode="gist", limit=10):
    """Search documents using the API."""
    response = requests.post(f"{BASE_URL}/search", json={
        "query": query,
        "mode": mode,
        "limit": limit
    })
    
    if response.status_code == 200:
        return response.json()
    else:
        raise Exception(f"Search failed: {response.json()}")

# Example usage
results = search_documents("artificial intelligence")
print(f"Found {len(results['results'])} results")
```

### **JavaScript Client Example**
```javascript
// API client for desktop app
class FilevateAPI {
  constructor(baseUrl = 'http://localhost:5000/api') {
    this.baseUrl = baseUrl;
  }

  async search(query, mode = 'gist', limit = 10) {
    const response = await fetch(`${this.baseUrl}/search`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query, mode, limit })
    });

    if (!response.ok) {
      throw new Error(`Search failed: ${response.statusText}`);
    }

    return await response.json();
  }
}

// Example usage
const api = new FilevateAPI();
const results = await api.search('natural language processing');
```

## Error Codes and Troubleshooting

### **Common HTTP Status Codes**

| Code | Meaning | Common Causes |
|------|---------|---------------|
| `200` | Success | Operation completed successfully |
| `400` | Bad Request | Invalid query parameters or missing data |
| `404` | Not Found | Endpoint or resource doesn't exist |
| `500` | Server Error | Model loading failure or database error |
| `503` | Service Unavailable | Models not loaded or database unavailable |

### **Typical Error Scenarios**

**Model Loading Errors**:
```json
{
  "error": "Models not loaded",
  "details": "AI models are still initializing",
  "status_code": 503
}
```

**Search Errors**:
```json
{
  "error": "Search failed",
  "details": "ChromaDB query execution failed",
  "status_code": 500
}
```

**Invalid Parameters**:
```json
{
  "error": "Invalid parameters",
  "details": "Query cannot be empty",
  "status_code": 400
}
```

## Integration Patterns

### **Desktop App Integration**
- **Electron IPC**: Communication via preload script bridge
- **Real-time Updates**: WebSocket-like behavior for indexing progress
- **Error Handling**: Graceful degradation when API unavailable
- **Offline Capability**: Cache recent results for offline browsing

### **Development Integration**
- **Debug Mode**: Enhanced logging and error details
- **Test Mode**: Isolated database for testing
- **Development Scripts**: Automated testing and validation
- **Hot Reload**: API restart triggers app reconnection

---

*This API documentation reflects the current implementation of the Filevate REST API as a local-only service for the desktop application.*