# Search API Endpoints

**Complete specification for Filevate's advanced semantic search APIs**

## Overview

The Search API provides access to Filevate's dual-model AI intelligence, enabling applications to perform sophisticated semantic queries across enterprise document collections with sub-50ms response times.

## Core Search Endpoint

### `POST /api/search`

**Primary semantic search endpoint with dual-mode AI intelligence**

#### Request

```http
POST /api/search HTTP/1.1
Content-Type: application/json

{
  "query": "machine learning algorithms for data processing",
  "mode": "gist",
  "limit": 20,
  "filters": {
    "file_types": ["pdf", "docx", "md"],
    "folders": ["/documents/research"],
    "date_range": {
      "start": "2024-01-01",
      "end": "2024-12-31"
    }
  },
  "include_snippets": true,
  "confidence_threshold": 0.3
}
```

#### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `query` | string | ✅ | Natural language search query (max 500 chars) |
| `mode` | string | ❌ | Search mode: `"gist"` (default) or `"pinpoint"` |
| `limit` | integer | ❌ | Max results to return (default: 10, max: 100) |
| `filters` | object | ❌ | Advanced filtering options |
| `include_snippets` | boolean | ❌ | Include content snippets (default: true) |
| `confidence_threshold` | float | ❌ | Minimum confidence score 0-1 (default: 0.0) |

#### Filters Object

```json
{
  "file_types": ["pdf", "docx", "txt", "md", "py", "js"],
  "folders": ["/path/to/folder1", "/path/to/folder2"],
  "date_range": {
    "start": "2024-01-01",
    "end": "2024-12-31"
  },
  "file_size": {
    "min": 1024,
    "max": 10485760
  }
}
```

#### Response

```json
{
  "results": [
    {
      "file_name": "advanced_ml_algorithms.pdf",
      "file_path": "/documents/research/advanced_ml_algorithms.pdf",
      "confidence": 0.87,
      "confidence_badge": "high",
      "snippet": "Machine learning algorithms for efficient data processing include ensemble methods, neural networks, and dimensionality reduction techniques...",
      "chunk_index": 12,
      "total_chunks": 45,
      "file_size": 2547832,
      "last_modified": "2024-08-15T14:30:22Z",
      "file_type": "pdf",
      "match_type": "semantic_similarity",
      "boost_factors": {
        "filename_boost": 0.15,
        "exact_term_boost": 0.08,
        "multi_chunk_boost": 0.12
      }
    }
  ],
  "metadata": {
    "total_results": 47,
    "query_time_ms": 42,
    "mode": "gist",
    "confidence_distribution": {
      "high": 8,
      "medium": 15,
      "low": 24
    },
    "search_id": "search_1704123456789"
  }
}
```

#### Response Fields

| Field | Type | Description |
|-------|------|-------------|
| `file_name` | string | Name of the matching file |
| `file_path` | string | Full path to the file |
| `confidence` | float | AI confidence score (0.0-1.0) |
| `confidence_badge` | string | User-friendly confidence: "high", "medium", "low" |
| `snippet` | string | Relevant content excerpt with context |
| `chunk_index` | integer | Index of matching chunk within file |
| `file_size` | integer | File size in bytes |
| `match_type` | string | Type of match: "semantic_similarity", "exact_match", "fuzzy_match" |
| `boost_factors` | object | Applied confidence boost factors |

## Search Modes

### Gist Mode (Default)
**Optimized for topic-level understanding and comprehensive relevance**

```json
{
  "query": "project management methodologies",
  "mode": "gist"
}
```

**Characteristics:**
- Uses MSMarco MiniLM model for search-optimized embeddings
- 35-line chunk size for broader context understanding
- Multi-factor confidence scoring with file-level intelligence
- Ideal for: Research, topic discovery, comprehensive document analysis

### Pinpoint Mode
**Optimized for precise information location and exact details**

```json
{
  "query": "function calculateTotalCost implementation",
  "mode": "pinpoint"
}
```

**Characteristics:**
- Uses AllMiniLM model for general semantic understanding
- 10-line chunk size for precise location accuracy
- Direct confidence scoring for specific information retrieval
- Ideal for: Code search, specific fact finding, technical details

## Advanced Search Features

### `POST /api/search/suggestions`

**AI-powered query suggestions based on indexed content**

#### Request

```http
POST /api/search/suggestions HTTP/1.1
Content-Type: application/json

{
  "partial_query": "machine learn",
  "limit": 5,
  "mode": "gist"
}
```

#### Response

```json
{
  "suggestions": [
    {
      "query": "machine learning algorithms",
      "confidence": 0.92,
      "estimated_results": 145
    },
    {
      "query": "machine learning for data processing",
      "confidence": 0.87,
      "estimated_results": 89
    },
    {
      "query": "machine learning model training",
      "confidence": 0.83,
      "estimated_results": 67
    }
  ],
  "query_time_ms": 15
}
```

### `GET /api/search/history`

**Retrieve user search history with analytics**

#### Request

```http
GET /api/search/history?limit=20&days=30 HTTP/1.1
```

#### Response

```json
{
  "history": [
    {
      "query": "machine learning algorithms",
      "timestamp": "2024-09-01T15:30:45Z",
      "mode": "gist",
      "result_count": 47,
      "avg_confidence": 0.72,
      "click_count": 5
    }
  ],
  "analytics": {
    "total_searches": 156,
    "unique_queries": 89,
    "avg_results_per_query": 23.4,
    "most_common_terms": ["algorithm", "data", "processing", "model"]
  }
}
```

### `DELETE /api/search/history`

**Clear search history**

#### Request

```http
DELETE /api/search/history HTTP/1.1
```

#### Response

```json
{
  "message": "Search history cleared successfully",
  "cleared_entries": 156
}
```

## Error Responses

### Standard Error Format

```json
{
  "error": "Invalid search query",
  "details": "Query must be between 1 and 500 characters",
  "error_code": "INVALID_QUERY_LENGTH",
  "timestamp": "2024-09-01T15:30:45Z",
  "search_id": "search_1704123456789"
}
```

### Common Error Codes

| Code | HTTP Status | Description |
|------|-------------|-------------|
| `INVALID_QUERY_LENGTH` | 400 | Query too short (<1) or too long (>500) |
| `INVALID_MODE` | 400 | Mode must be "gist" or "pinpoint" |
| `INVALID_LIMIT` | 400 | Limit must be between 1 and 100 |
| `INVALID_CONFIDENCE_THRESHOLD` | 400 | Threshold must be between 0.0 and 1.0 |
| `NO_INDEXED_CONTENT` | 404 | No content has been indexed yet |
| `MODEL_NOT_LOADED` | 503 | AI models are still loading |
| `SEARCH_TIMEOUT` | 504 | Search took longer than 30 seconds |

## Performance Characteristics

### Response Times

| Operation | Average | 95th Percentile | Maximum |
|-----------|---------|-----------------|---------|
| Basic Search | 25ms | 45ms | 100ms |
| Filtered Search | 35ms | 60ms | 150ms |
| Search Suggestions | 10ms | 20ms | 50ms |
| History Retrieval | 5ms | 15ms | 30ms |

### Throughput Limits

- **Concurrent Searches**: 100 simultaneous requests
- **Rate Limiting**: 1000 requests per minute per client
- **Query Complexity**: No artificial limits on query length or filters
- **Result Size**: Maximum 100 results per query (configurable)

## Authentication & Security

### Local Mode (Default)
No authentication required for local API access:

```http
POST /api/search HTTP/1.1
Content-Type: application/json
```

### Enterprise Mode (Future)
API key authentication for enterprise deployments:

```http
POST /api/search HTTP/1.1
Authorization: Bearer your-api-key-here
Content-Type: application/json
```

## Search Quality Metrics

### Confidence Score Calibration

Filevate's confidence scores are calibrated for intuitive interpretation:

| Range | Badge | Interpretation | Use Case |
|-------|-------|----------------|----------|
| 0.90-1.00 | High | Highly relevant, strong semantic match | Primary results |
| 0.60-0.89 | Medium | Moderately relevant, good context match | Secondary results |
| 0.30-0.59 | Low | Potentially relevant, worth reviewing | Exploratory browsing |
| 0.00-0.29 | Very Low | Weak relevance, likely filtered out | Background results |

### Semantic Understanding Examples

```yaml
Query: "artificial intelligence in healthcare"
High Confidence Matches:
  - "AI applications in medical diagnosis"
  - "Machine learning for patient care optimization"
  - "Deep learning models for healthcare analytics"

Medium Confidence Matches:
  - "Healthcare technology trends"
  - "Medical data analysis techniques"
  - "Digital transformation in hospitals"

Low Confidence Matches:
  - "Technology adoption in healthcare"
  - "Data science methodologies"
  - "Computer science applications"
```

## Integration Examples

### JavaScript/TypeScript

```typescript
interface SearchRequest {
  query: string;
  mode?: 'gist' | 'pinpoint';
  limit?: number;
  filters?: SearchFilters;
  confidence_threshold?: number;
}

interface SearchResponse {
  results: SearchResult[];
  metadata: SearchMetadata;
}

async function searchDocuments(request: SearchRequest): Promise<SearchResponse> {
  const response = await fetch('/api/search', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(request),
  });

  if (!response.ok) {
    throw new Error(`Search failed: ${response.statusText}`);
  }

  return response.json();
}

// Usage
const results = await searchDocuments({
  query: "machine learning algorithms",
  mode: "gist",
  limit: 20,
  confidence_threshold: 0.5
});

console.log(`Found ${results.metadata.total_results} results in ${results.metadata.query_time_ms}ms`);
```

### Python

```python
import requests
from typing import Dict, List, Optional

class FilevateSearchClient:
    def __init__(self, base_url: str = "http://localhost:5000"):
        self.base_url = base_url
    
    def search(
        self,
        query: str,
        mode: str = "gist",
        limit: int = 10,
        filters: Optional[Dict] = None,
        confidence_threshold: float = 0.0
    ) -> Dict:
        """
        Perform semantic search using Filevate API.
        """
        payload = {
            "query": query,
            "mode": mode,
            "limit": limit,
            "confidence_threshold": confidence_threshold
        }
        
        if filters:
            payload["filters"] = filters
        
        response = requests.post(
            f"{self.base_url}/api/search",
            json=payload,
            timeout=30
        )
        
        response.raise_for_status()
        return response.json()

# Usage
client = FilevateSearchClient()
results = client.search(
    query="artificial intelligence applications",
    mode="gist",
    limit=50,
    filters={
        "file_types": ["pdf", "docx"],
        "confidence_threshold": 0.6
    }
)

for result in results["results"]:
    print(f"{result['confidence']:.2f}: {result['file_name']}")
```

### cURL Examples

```bash
# Basic search
curl -X POST http://localhost:5000/api/search \
  -H "Content-Type: application/json" \
  -d '{
    "query": "project management best practices",
    "mode": "gist",
    "limit": 10
  }'

# Advanced filtered search
curl -X POST http://localhost:5000/api/search \
  -H "Content-Type: application/json" \
  -d '{
    "query": "data visualization techniques",
    "mode": "pinpoint",
    "limit": 25,
    "filters": {
      "file_types": ["py", "ipynb", "md"],
      "folders": ["/data-science", "/analytics"],
      "confidence_threshold": 0.5
    }
  }'

# Get search suggestions
curl -X POST http://localhost:5000/api/search/suggestions \
  -H "Content-Type: application/json" \
  -d '{
    "partial_query": "neural net",
    "limit": 5
  }'
```

---

*This search API represents the core of Filevate's semantic intelligence, delivering enterprise-grade natural language understanding with production-ready performance and reliability.*
