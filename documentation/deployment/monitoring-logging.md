# Monitoring & Logging

**Current logging capabilities and basic monitoring for Filevate deployments**

## Overview

Filevate currently provides basic logging and status monitoring capabilities. This document outlines the existing monitoring features and suggests potential enhancements for production deployments.

## Current Logging Implementation

### **Application Logging**

Filevate includes basic logging throughout the application:

```python
# Example logging in api.py
import logging

logger = logging.getLogger(__name__)

@app.route('/api/search', methods=['POST'])
def search():
    try:
        logger.info(f"Search request received: {request.json}")
        # Process search
        logger.info(f"Search completed: {len(results)} results")
        return jsonify(results)
    except Exception as e:
        logger.error(f"Search failed: {str(e)}")
        return jsonify({'error': str(e)}), 500
```

### **Log Levels and Output**
- **INFO**: General operation status, search requests, indexing progress
- **WARNING**: Performance issues, large file skips, recoverable errors  
- **ERROR**: API failures, model loading issues, unrecoverable errors
- **DEBUG**: Detailed operation tracing (not enabled by default)

### **Log Destinations**
- **Console Output**: All logs displayed in terminal when running `python api.py`
- **No File Logging**: Currently no persistent log file storage
- **Desktop App Logs**: Electron console logs visible in developer tools

## Health Check Endpoint

### **Basic Health Check**

```python
@app.route('/api/health', methods=['GET'])
def health_check():
    """Basic health check endpoint."""
    try:
        # Check if models are loaded
        if not hasattr(app, 'gist_model') or app.gist_model is None:
            return jsonify({'status': 'unhealthy', 'reason': 'models not loaded'}), 503
        
        # Check database connection
        collection_count = len(chroma_client.list_collections())
        
        return jsonify({
            'status': 'healthy',
            'version': '1.0.0',
            'collections': collection_count,
            'timestamp': datetime.now().isoformat()
        })
    except Exception as e:
        return jsonify({'status': 'error', 'error': str(e)}), 500
```

### **Status Information Endpoints**

```python
@app.route('/api/status', methods=['GET'])
def get_status():
    """Get detailed application status."""
    return jsonify({
        'indexing_status': indexing_status,
        'model_status': {
            'gist_model_loaded': hasattr(app, 'gist_model') and app.gist_model is not None,
            'pinpoint_model_loaded': hasattr(app, 'pinpoint_model') and app.pinpoint_model is not None
        },
        'database_collections': len(chroma_client.list_collections()),
        'uptime': time.time() - app_start_time
    })
```

## Performance Monitoring

### **Search Performance Tracking**

Basic timing information included in search responses:

```python
def search_gist_mode(query, limit=10):
    start_time = time.time()
    
    # Perform search
    results = perform_search_logic(query, limit)
    
    search_duration = time.time() - start_time
    logger.info(f"Gist search completed in {search_duration:.3f}s")
    
    return {
        'results': results,
        'metadata': {
            'search_time_ms': round(search_duration * 1000),
            'result_count': len(results)
        }
    }
```

### **Indexing Progress Monitoring**

Real-time indexing status available via API:

```python
indexing_status = {
    "status": "idle",  # idle, indexing, error
    "current_file": None,
    "progress": 0,
    "total_files": 0,
    "files_processed": 0,
    "errors": [],
    "start_time": None,
    "estimated_completion": None
}
```

## System Resource Monitoring

### **Memory Usage Tracking**

Basic memory monitoring for large operations:

```python
import psutil
import gc

def monitor_memory_usage():
    """Get current memory usage."""
    process = psutil.Process()
    memory_info = process.memory_info()
    
    return {
        'rss_mb': memory_info.rss / 1024 / 1024,
        'vms_mb': memory_info.vms / 1024 / 1024,
        'percent': process.memory_percent()
    }

# Log memory usage during large operations
if files_to_process > 1000:
    memory_usage = monitor_memory_usage()
    logger.info(f"Memory usage before large indexing: {memory_usage}")
```

### **File System Monitoring**

Real-time file change detection:

```python
# realtime_monitor.py provides file system change tracking
class FileFinderEventHandler(FileSystemEventHandler):
    def on_any_event(self, event):
        logger.debug(f"File event: {event.event_type} - {event.src_path}")
        # Track file changes for sync
```

## Current Limitations

### **Missing Monitoring Features**
- No metrics collection (Prometheus, etc.)
- No centralized logging system
- No alerting capabilities
- No dashboard visualization
- No performance trend analysis
- No error rate tracking
- No SLA monitoring

### **Basic Troubleshooting**

**Check API Server Status**:
```bash
curl http://localhost:5000/api/health
```

**View Application Logs**:
```bash
# Start API with verbose logging
python api.py

# Check for error patterns
grep -i error logs/output.log
```

**Monitor Resource Usage**:
```bash
# Check Python process memory usage
ps aux | grep python

# Monitor disk space for database
du -sh ~/.local/share/Filevate/
```

## Potential Enhancements

### **Logging Improvements**
- Structured JSON logging format
- Configurable log levels
- File-based log rotation
- Request correlation IDs

### **Metrics Collection**
- API response time tracking
- Search result quality metrics
- Indexing throughput monitoring
- Error rate calculation

### **Health Monitoring**
- Model inference performance
- Database query performance
- Disk space monitoring
- Memory leak detection

### **Alerting Framework**
- Error threshold monitoring
- Performance degradation alerts
- Resource utilization warnings
- Indexing failure notifications

## Development Monitoring

### **Debug Mode**

Enable detailed logging for development:

```python
# Set debug logging level
logging.basicConfig(level=logging.DEBUG)

# Enable Flask debug mode
app.run(debug=True, host='localhost', port=5000)
```

### **Performance Profiling**

Basic performance analysis:

```python
import cProfile
import pstats

def profile_search_performance():
    profiler = cProfile.Profile()
    profiler.enable()
    
    # Perform search operation
    results = search_gist_mode("test query")
    
    profiler.disable()
    stats = pstats.Stats(profiler)
    stats.sort_stats('cumulative').print_stats(10)
```

---

*This document reflects the current monitoring and logging capabilities of Filevate. Enhanced monitoring features can be added based on operational requirements.*
