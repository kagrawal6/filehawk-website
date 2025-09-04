# Indexing API Endpoints

**Complete specification for Filevate's intelligent content indexing and management APIs**

## Overview

The Indexing API manages the sophisticated content processing pipeline that transforms raw documents into semantically searchable vectors using dual-model AI intelligence. Supports real-time monitoring, incremental updates, and enterprise-scale batch processing.

## Core Indexing Endpoints

### `POST /api/index`

**Primary content indexing endpoint with intelligent batch processing**

#### Request

```http
POST /api/index HTTP/1.1
Content-Type: application/json

{
  "folder_path": "/documents/research",
  "recursive": true,
  "file_types": ["pdf", "docx", "txt", "md", "py"],
  "chunking_mode": "gist",
  "force_reindex": false,
  "batch_size": 50,
  "options": {
    "extract_metadata": true,
    "generate_summaries": true,
    "detect_language": true,
    "ocr_enabled": true
  }
}
```

#### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `folder_path` | string | ✅ | Absolute path to folder for indexing |
| `recursive` | boolean | ❌ | Include subdirectories (default: true) |
| `file_types` | array | ❌ | File extensions to include (default: all supported) |
| `chunking_mode` | string | ❌ | "gist" (default) or "pinpoint" or "both" |
| `force_reindex` | boolean | ❌ | Reprocess unchanged files (default: false) |
| `batch_size` | integer | ❌ | Files per batch (default: 50, max: 200) |
| `options` | object | ❌ | Advanced processing options |

#### Response

```json
{
  "indexing_id": "idx_1704123456789",
  "status": "started",
  "estimated_files": 1247,
  "estimated_time_minutes": 15,
  "folder_path": "/documents/research",
  "chunking_mode": "gist",
  "settings": {
    "recursive": true,
    "file_types": ["pdf", "docx", "txt", "md", "py"],
    "batch_size": 50,
    "force_reindex": false
  },
  "timestamp": "2024-09-01T15:30:45Z"
}
```

### `GET /api/status`

**Real-time indexing progress and system status**

#### Request

```http
GET /api/status HTTP/1.1
```

#### Response

```json
{
  "indexing_status": {
    "active": true,
    "current_operation": "processing_batch_12",
    "progress": {
      "files_processed": 587,
      "total_files": 1247,
      "percentage": 47.1,
      "current_file": "/documents/research/ml_algorithms.pdf",
      "files_per_minute": 85.3,
      "estimated_remaining_minutes": 7.8
    },
    "indexing_id": "idx_1704123456789",
    "started_at": "2024-09-01T15:30:45Z"
  },
  "system_status": {
    "api_version": "1.2.3",
    "models_loaded": {
      "gist_model": {
        "name": "msmarco-MiniLM-L6-cos-v5",
        "status": "ready",
        "memory_usage_mb": 247
      },
      "pinpoint_model": {
        "name": "all-MiniLM-L6-v2", 
        "status": "ready",
        "memory_usage_mb": 198
      }
    },
    "database": {
      "status": "connected",
      "collections": {
        "gist_chunks": 45789,
        "gist_centroids": 2847,
        "pinpoint_chunks": 156234
      },
      "total_files_indexed": 2847,
      "database_size_mb": 1247
    },
    "realtime_monitor": {
      "active": true,
      "monitored_folders": 3,
      "pending_changes": 12,
      "last_sync": "2024-09-01T15:28:30Z"
    }
  }
}
```

### `POST /api/reindex`

**Selective re-indexing of specific files or folders**

#### Request

```http
POST /api/reindex HTTP/1.1
Content-Type: application/json

{
  "targets": [
    "/documents/updated_report.pdf",
    "/projects/new_analysis/"
  ],
  "chunking_mode": "both",
  "force": true,
  "priority": "high"
}
```

#### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `targets` | array | ✅ | File paths or folder paths to reindex |
| `chunking_mode` | string | ❌ | "gist", "pinpoint", or "both" (default: existing) |
| `force` | boolean | ❌ | Force reindex even if unchanged (default: false) |
| `priority` | string | ❌ | "low", "normal" (default), "high" |

#### Response

```json
{
  "reindex_id": "ridx_1704123456790",
  "status": "queued", 
  "targets_queued": 15,
  "estimated_time_minutes": 3.2,
  "priority": "high",
  "timestamp": "2024-09-01T15:35:22Z"
}
```

## Batch Processing Endpoints

### `POST /api/index/batch`

**High-performance batch indexing for enterprise workflows**

#### Request

```http
POST /api/index/batch HTTP/1.1
Content-Type: application/json

{
  "batch_name": "quarterly_reports_q3_2024",
  "folders": [
    {
      "path": "/reports/q3_2024/financial",
      "weight": 1.5,
      "metadata": {"department": "finance", "quarter": "Q3"}
    },
    {
      "path": "/reports/q3_2024/operations", 
      "weight": 1.0,
      "metadata": {"department": "operations", "quarter": "Q3"}
    }
  ],
  "processing_options": {
    "parallel_workers": 8,
    "memory_limit_mb": 2048,
    "chunk_size_override": {"pdf": 40, "docx": 30},
    "extract_tables": true,
    "extract_images": false
  },
  "notification": {
    "webhook_url": "https://your-system.com/indexing-complete",
    "email": "admin@yourcompany.com"
  }
}
```

#### Response

```json
{
  "batch_id": "batch_1704123456791",
  "status": "scheduled",
  "total_folders": 2,
  "estimated_files": 3456,
  "estimated_duration_hours": 2.3,
  "processing_options": {
    "parallel_workers": 8,
    "memory_limit_mb": 2048
  },
  "schedule": {
    "start_time": "2024-09-01T16:00:00Z",
    "priority": "normal"
  }
}
```

### `GET /api/index/batches`

**List and monitor batch indexing operations**

#### Request

```http
GET /api/index/batches?status=active&limit=10 HTTP/1.1
```

#### Response

```json
{
  "batches": [
    {
      "batch_id": "batch_1704123456791",
      "batch_name": "quarterly_reports_q3_2024",
      "status": "processing",
      "progress": {
        "folders_completed": 1,
        "total_folders": 2,
        "files_processed": 1789,
        "total_files": 3456,
        "percentage": 51.8
      },
      "started_at": "2024-09-01T16:00:00Z",
      "estimated_completion": "2024-09-01T18:15:00Z"
    }
  ],
  "pagination": {
    "total": 25,
    "limit": 10,
    "offset": 0
  }
}
```

## File Management Endpoints

### `GET /api/files/track`

**Comprehensive file tracking and management interface**

#### Request

```http
GET /api/files/track?folder=/documents&status=synced&sort=last_indexed&limit=50 HTTP/1.1
```

#### Query Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `folder` | string | Filter by folder path |
| `status` | string | "synced", "out_of_sync", "indexing", "error" |
| `file_type` | string | Filter by file extension |
| `sort` | string | "name", "size", "last_modified", "last_indexed", "confidence" |
| `limit` | integer | Max results (default: 50, max: 1000) |
| `offset` | integer | Pagination offset |

#### Response

```json
{
  "files": [
    {
      "file_path": "/documents/research/ai_trends_2024.pdf",
      "file_name": "ai_trends_2024.pdf",
      "file_size": 2847563,
      "file_type": "pdf",
      "last_modified": "2024-08-28T10:15:30Z",
      "last_indexed": "2024-08-28T10:16:45Z",
      "sync_status": "synced",
      "chunking_modes": ["gist", "pinpoint"],
      "chunk_counts": {
        "gist": 47,
        "pinpoint": 156
      },
      "metadata": {
        "sha256": "a7b3c9d2e8f4...",
        "language": "en",
        "has_images": true,
        "has_tables": true,
        "extraction_method": "pdfplumber"
      },
      "indexing_stats": {
        "processing_time_ms": 2850,
        "embedding_time_ms": 1200,
        "total_time_ms": 4050
      }
    }
  ],
  "summary": {
    "total_files": 2847,
    "synced": 2834,
    "out_of_sync": 8,
    "indexing": 3,
    "errors": 2,
    "total_size_mb": 15847
  },
  "pagination": {
    "limit": 50,
    "offset": 0,
    "total": 2847
  }
}
```

### `POST /api/files/reindex`

**Force reindexing of specific files**

#### Request

```http
POST /api/files/reindex HTTP/1.1
Content-Type: application/json

{
  "file_paths": [
    "/documents/important_report.pdf",
    "/projects/analysis.docx"
  ],
  "chunking_mode": "both",
  "priority": "high"
}
```

#### Response

```json
{
  "reindex_id": "file_ridx_1704123456792",
  "files_queued": 2,
  "estimated_time_minutes": 1.5,
  "status": "queued"
}
```

### `DELETE /api/files/remove`

**Remove files from index without deleting source files**

#### Request

```http
DELETE /api/files/remove HTTP/1.1
Content-Type: application/json

{
  "file_paths": [
    "/old_documents/deprecated_report.pdf"
  ],
  "remove_chunks": true,
  "remove_metadata": true
}
```

#### Response

```json
{
  "removed_files": 1,
  "removed_chunks": {
    "gist": 34,
    "pinpoint": 89
  },
  "freed_space_mb": 12.7,
  "status": "success"
}
```

## Real-time Monitoring Endpoints

### `GET /api/monitor/status`

**Real-time file system monitoring status**

#### Response

```json
{
  "monitor_status": {
    "active": true,
    "watched_folders": [
      {
        "path": "/documents",
        "recursive": true,
        "last_event": "2024-09-01T15:45:30Z",
        "event_count_today": 47
      }
    ],
    "sync_queue": {
      "pending_files": 12,
      "processing_files": 3,
      "failed_files": 1,
      "queue_age_seconds": 45
    },
    "performance": {
      "events_per_hour": 127,
      "avg_processing_time_ms": 850,
      "queue_latency_ms": 45
    }
  }
}
```

### `POST /api/monitor/sync`

**Trigger immediate sync of pending changes**

#### Request

```http
POST /api/monitor/sync HTTP/1.1
Content-Type: application/json

{
  "force_full_scan": false,
  "priority": "high"
}
```

#### Response

```json
{
  "sync_id": "sync_1704123456793",
  "files_queued": 12,
  "estimated_time_minutes": 2.1,
  "status": "started"
}
```

## Advanced Configuration Endpoints

### `GET /api/config/indexing`

**Retrieve current indexing configuration**

#### Response

```json
{
  "chunking_settings": {
    "gist_chunk_size": 35,
    "pinpoint_chunk_size": 10,
    "overlap_lines": 2,
    "min_chunk_size": 5
  },
  "processing_settings": {
    "max_file_size_mb": 100,
    "parallel_workers": 4,
    "batch_size": 50,
    "timeout_seconds": 300
  },
  "ai_models": {
    "gist_model": "sentence-transformers/msmarco-MiniLM-L6-cos-v5",
    "pinpoint_model": "sentence-transformers/all-MiniLM-L6-v2",
    "model_cache_size": 2
  },
  "file_type_support": {
    "pdf": {"enabled": true, "ocr": true},
    "docx": {"enabled": true, "extract_images": false},
    "txt": {"enabled": true, "encoding_detection": true},
    "md": {"enabled": true, "parse_frontmatter": true},
    "py": {"enabled": true, "extract_docstrings": true}
  }
}
```

### `PUT /api/config/indexing`

**Update indexing configuration**

#### Request

```http
PUT /api/config/indexing HTTP/1.1
Content-Type: application/json

{
  "chunking_settings": {
    "gist_chunk_size": 40,
    "pinpoint_chunk_size": 12
  },
  "processing_settings": {
    "parallel_workers": 6,
    "batch_size": 75
  }
}
```

#### Response

```json
{
  "status": "updated",
  "changes_applied": [
    "gist_chunk_size: 35 -> 40",
    "pinpoint_chunk_size: 10 -> 12",
    "parallel_workers: 4 -> 6",
    "batch_size: 50 -> 75"
  ],
  "restart_required": false
}
```

## Performance Metrics Endpoints

### `GET /api/metrics/indexing`

**Detailed indexing performance metrics**

#### Response

```json
{
  "current_session": {
    "start_time": "2024-09-01T15:30:45Z",
    "files_processed": 1247,
    "processing_rate_files_per_minute": 83.2,
    "avg_file_size_mb": 2.1,
    "total_processing_time_minutes": 15.0
  },
  "performance_by_type": {
    "pdf": {
      "files_processed": 456,
      "avg_processing_time_ms": 2850,
      "avg_chunks_per_file": 34,
      "success_rate": 0.987
    },
    "docx": {
      "files_processed": 234,
      "avg_processing_time_ms": 1450,
      "avg_chunks_per_file": 22,
      "success_rate": 0.996
    }
  },
  "resource_usage": {
    "memory_usage_mb": 1247,
    "cpu_usage_percent": 45.2,
    "disk_io_mb_per_sec": 12.7,
    "gpu_usage_percent": 0
  },
  "error_statistics": {
    "total_errors": 13,
    "error_rate": 0.010,
    "common_errors": [
      {"type": "file_access_denied", "count": 7},
      {"type": "unsupported_format", "count": 4},
      {"type": "memory_limit_exceeded", "count": 2}
    ]
  }
}
```

## Error Handling

### Common Error Responses

```json
{
  "error": "Folder not found",
  "details": "The specified folder path '/nonexistent/folder' does not exist or is not accessible",
  "error_code": "FOLDER_NOT_FOUND",
  "indexing_id": "idx_1704123456789",
  "timestamp": "2024-09-01T15:30:45Z"
}
```

### Error Codes

| Code | HTTP Status | Description |
|------|-------------|-------------|
| `FOLDER_NOT_FOUND` | 404 | Specified folder doesn't exist |
| `PERMISSION_DENIED` | 403 | Insufficient permissions to access folder |
| `INVALID_FILE_TYPE` | 400 | Unsupported file type specified |
| `BATCH_SIZE_EXCEEDED` | 400 | Batch size exceeds maximum limit |
| `INDEXING_IN_PROGRESS` | 409 | Another indexing operation is active |
| `MODEL_NOT_LOADED` | 503 | AI models are not ready |
| `DISK_SPACE_LOW` | 507 | Insufficient disk space for indexing |
| `MEMORY_LIMIT_EXCEEDED` | 507 | System memory limits reached |

## Webhooks & Notifications

### Webhook Configuration

```json
{
  "webhook_url": "https://your-system.com/indexing-webhook",
  "events": ["indexing_complete", "indexing_error", "batch_complete"],
  "secret": "your-webhook-secret",
  "timeout_seconds": 30
}
```

### Webhook Payload Examples

#### Indexing Complete

```json
{
  "event": "indexing_complete",
  "indexing_id": "idx_1704123456789",
  "timestamp": "2024-09-01T16:45:30Z",
  "data": {
    "folder_path": "/documents/research",
    "files_processed": 1247,
    "files_failed": 3,
    "processing_time_minutes": 15.2,
    "chunks_created": {
      "gist": 42789,
      "pinpoint": 158234
    }
  }
}
```

#### Indexing Error

```json
{
  "event": "indexing_error",
  "indexing_id": "idx_1704123456789",
  "timestamp": "2024-09-01T16:45:30Z",
  "error": {
    "code": "PERMISSION_DENIED",
    "message": "Access denied to folder /protected/documents",
    "file_path": "/protected/documents/sensitive.pdf"
  }
}
```

## Integration Examples

### Python Client

```python
import requests
import time
from typing import Dict, Optional

class FilevateIndexingClient:
    def __init__(self, base_url: str = "http://localhost:5000"):
        self.base_url = base_url
    
    def start_indexing(
        self, 
        folder_path: str,
        chunking_mode: str = "gist",
        recursive: bool = True,
        file_types: Optional[list] = None
    ) -> Dict:
        """Start indexing operation."""
        payload = {
            "folder_path": folder_path,
            "chunking_mode": chunking_mode,
            "recursive": recursive
        }
        
        if file_types:
            payload["file_types"] = file_types
        
        response = requests.post(
            f"{self.base_url}/api/index",
            json=payload
        )
        response.raise_for_status()
        return response.json()
    
    def wait_for_completion(self, indexing_id: str, poll_interval: int = 5) -> Dict:
        """Wait for indexing to complete with progress monitoring."""
        while True:
            status = self.get_status()
            
            if not status["indexing_status"]["active"]:
                break
                
            progress = status["indexing_status"]["progress"]
            print(f"Progress: {progress['percentage']:.1f}% "
                  f"({progress['files_processed']}/{progress['total_files']} files)")
            
            time.sleep(poll_interval)
        
        return status
    
    def get_status(self) -> Dict:
        """Get current indexing status."""
        response = requests.get(f"{self.base_url}/api/status")
        response.raise_for_status()
        return response.json()

# Usage
client = FilevateIndexingClient()

# Start indexing
result = client.start_indexing(
    folder_path="/documents/research",
    chunking_mode="both",
    file_types=["pdf", "docx", "md"]
)

print(f"Indexing started: {result['indexing_id']}")

# Monitor progress
final_status = client.wait_for_completion(result['indexing_id'])
print("Indexing completed!")
```

### Node.js Client

```javascript
const axios = require('axios');

class FilevateIndexingClient {
  constructor(baseUrl = 'http://localhost:5000') {
    this.baseUrl = baseUrl;
  }

  async startIndexing(options) {
    const response = await axios.post(`${this.baseUrl}/api/index`, options);
    return response.data;
  }

  async getStatus() {
    const response = await axios.get(`${this.baseUrl}/api/status`);
    return response.data;
  }

  async waitForCompletion(indexingId, pollInterval = 5000) {
    while (true) {
      const status = await this.getStatus();
      
      if (!status.indexing_status.active) {
        break;
      }

      const progress = status.indexing_status.progress;
      console.log(`Progress: ${progress.percentage.toFixed(1)}% 
        (${progress.files_processed}/${progress.total_files} files)`);

      await new Promise(resolve => setTimeout(resolve, pollInterval));
    }
  }
}

// Usage
const client = new FilevateIndexingClient();

(async () => {
  const result = await client.startIndexing({
    folder_path: '/documents/projects',
    chunking_mode: 'gist',
    recursive: true,
    file_types: ['pdf', 'docx', 'txt', 'md']
  });

  console.log(`Indexing started: ${result.indexing_id}`);
  
  await client.waitForCompletion(result.indexing_id);
  console.log('Indexing completed!');
})();
```

---

*This indexing API provides comprehensive control over Filevate's content processing pipeline, enabling enterprise-scale document management with real-time monitoring and intelligent optimization.*
