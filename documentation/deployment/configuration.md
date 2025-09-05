# Configuration Guide

**Guide for configuring Filevate settings and options**

## Overview

Filevate uses a simple configuration file (`config.py`) to customize behavior, performance settings, and indexing options. This guide covers all available configuration options.

## Configuration File

### **Main Configuration (config.py)**

The primary configuration file contains all core settings:

```python
# config.py - Core Configuration

# ============================================================================
# CORE SETTINGS
# ============================================================================

# Primary folder to index on startup
FOLDER_TO_INDEX = "./test_confidence_files"

# AI Model Configuration
GIST_EMBEDDING_MODEL = "sentence-transformers/msmarco-MiniLM-L6-cos-v5"
PINPOINT_EMBEDDING_MODEL = "all-MiniLM-L6-v2"

# Application Identity
APP_NAME = "Filevate"

# Database Configuration
COLLECTION_NAME = "filevate"

# ============================================================================
# PERFORMANCE SETTINGS
# ============================================================================

# Chunking Configuration
ENABLE_GRANULAR_CHUNKING = True
GRANULAR_CHUNK_SIZE = 10        # Lines per pinpoint chunk
FILE_LEVEL_CHUNK_SIZE = 35      # Lines per gist chunk
CHUNK_OVERLAP_LINES = 2         # Overlap between chunks

# Processing Limits
MAX_FILE_SIZE_MB = 100          # Skip files larger than this
MAX_WORKERS = 4                 # Parallel processing workers
INDEXING_BATCH_SIZE = 50        # Files processed per batch

# ============================================================================
# FILE PROCESSING
# ============================================================================

# File type support
SUPPORTED_EXTENSIONS = [
    '.txt', '.md', '.py', '.js', '.ts', '.html', '.css',
    '.pdf', '.docx', '.xlsx', '.pptx', '.json', '.yml', '.yaml'
]

# Exclusion patterns
DEFAULT_EXCLUSIONS = [
    '*.tmp', '*.log', '*.cache',
    '.git/*', '.svn/*', '.hg/*',
    'node_modules/*', 'venv/*', '__pycache__/*'
]

# Hidden file handling
SKIP_HIDDEN_FILES = True
SKIP_SYSTEM_FILES = True
```

## Configuration Options

### **Core Settings**

| Setting | Default | Description |
|---------|---------|-------------|
| `FOLDER_TO_INDEX` | `"./test_confidence_files"` | Directory to index on startup |
| `GIST_EMBEDDING_MODEL` | `"sentence-transformers/msmarco-MiniLM-L6-cos-v5"` | AI model for gist mode |
| `PINPOINT_EMBEDDING_MODEL` | `"all-MiniLM-L6-v2"` | AI model for pinpoint mode |
| `APP_NAME` | `"Filevate"` | Application identifier |
| `COLLECTION_NAME` | `"filevate"` | ChromaDB collection name |

### **Performance Settings**

| Setting | Default | Description |
|---------|---------|-------------|
| `ENABLE_GRANULAR_CHUNKING` | `True` | Enable dual-chunking mode |
| `GRANULAR_CHUNK_SIZE` | `10` | Lines per pinpoint chunk |
| `FILE_LEVEL_CHUNK_SIZE` | `35` | Lines per gist chunk |
| `MAX_FILE_SIZE_MB` | `100` | Maximum file size to process |
| `MAX_WORKERS` | `4` | Parallel processing threads |
| `INDEXING_BATCH_SIZE` | `50` | Files per processing batch |

### **File Processing Settings**

| Setting | Default | Description |
|---------|---------|-------------|
| `SKIP_HIDDEN_FILES` | `True` | Ignore hidden files and directories |
| `SKIP_SYSTEM_FILES` | `True` | Ignore system and temporary files |
| `CHUNK_OVERLAP_LINES` | `2` | Overlap between adjacent chunks |

## Environment-Specific Configurations

### **Development Configuration**

For development and testing:

```python
# config_dev.py
from config import *  # Import base configuration

# Override for development
FOLDER_TO_INDEX = "./test_files"
COLLECTION_NAME = "filevate_dev"

# Smaller limits for faster development
INDEXING_BATCH_SIZE = 10
MAX_WORKERS = 2
MAX_FILE_SIZE_MB = 50

# Enable detailed logging
import logging
logging.basicConfig(level=logging.DEBUG)
```

### **Production Configuration**

For production deployment:

```python
# config_prod.py
from config import *  # Import base configuration

# Production-scale limits
INDEXING_BATCH_SIZE = 100
MAX_WORKERS = 8
MAX_FILE_SIZE_MB = 200

# Production paths
FOLDER_TO_INDEX = "/data/documents"
COLLECTION_NAME = "filevate_production"

# Disable debug logging
import logging
logging.basicConfig(level=logging.WARNING)
```

## Runtime Configuration

### **Folder-Specific Settings**

The application stores per-folder settings in `folder_settings.py`:

```python
# folder_settings.py - Runtime folder configuration
class FolderSettings:
    def get_folder_config(self, folder_path: str) -> Dict[str, Any]:
        default_config = {
            'chunking_modes': ['gist', 'pinpoint'],
            'max_file_size_mb': 100,
            'exclusion_patterns': [
                '*.tmp', '*.log', '*.cache',
                '.git/*', '.svn/*', '.hg/*',
                'node_modules/*', 'venv/*', '__pycache__/*'
            ],
            'include_hidden_files': False,
            'recursive': True,
            'auto_sync': True
        }
        return default_config
```

### **GitHub Repository Configuration**

For GitHub integration settings:

```python
# GitHub OAuth configuration (stored securely in system keyring)
# No manual configuration required - handled through desktop app
```

## Performance Tuning

### **Small Collections (< 10K files)**

```python
MAX_WORKERS = 2
INDEXING_BATCH_SIZE = 25
ENABLE_GRANULAR_CHUNKING = True
MAX_FILE_SIZE_MB = 50
```

### **Medium Collections (10K - 100K files)**

```python
MAX_WORKERS = 4
INDEXING_BATCH_SIZE = 50
ENABLE_GRANULAR_CHUNKING = True
MAX_FILE_SIZE_MB = 100
```

### **Large Collections (> 100K files)**

```python
MAX_WORKERS = 8
INDEXING_BATCH_SIZE = 100
ENABLE_GRANULAR_CHUNKING = False  # Performance optimization
MAX_FILE_SIZE_MB = 200
```

## Configuration Validation

### **Basic Validation**

The application performs basic configuration validation on startup:

```python
def validate_config():
    """Validate configuration settings."""
    errors = []
    
    # Check required settings
    if not FOLDER_TO_INDEX:
        errors.append("FOLDER_TO_INDEX must be specified")
    
    if not os.path.exists(FOLDER_TO_INDEX):
        errors.append(f"FOLDER_TO_INDEX does not exist: {FOLDER_TO_INDEX}")
    
    # Check performance settings
    if MAX_WORKERS <= 0:
        errors.append("MAX_WORKERS must be greater than 0")
    
    if INDEXING_BATCH_SIZE <= 0:
        errors.append("INDEXING_BATCH_SIZE must be greater than 0")
    
    return errors
```

## Environment Variables

### **Override Settings**

You can override config settings using environment variables:

```bash
# Core settings
export FILEVATE_FOLDER_TO_INDEX="/path/to/documents"
export FILEVATE_MAX_WORKERS="8"
export FILEVATE_INDEXING_BATCH_SIZE="100"

# Start application
python api.py
```

### **Loading Environment Variables**

```python
import os

# Override config with environment variables
FOLDER_TO_INDEX = os.getenv('FILEVATE_FOLDER_TO_INDEX', FOLDER_TO_INDEX)
MAX_WORKERS = int(os.getenv('FILEVATE_MAX_WORKERS', MAX_WORKERS))
INDEXING_BATCH_SIZE = int(os.getenv('FILEVATE_INDEXING_BATCH_SIZE', INDEXING_BATCH_SIZE))
```

## Data Locations

### **Application Data**

**Windows**: `%APPDATA%\Filevate\`  
**macOS**: `~/Library/Application Support/Filevate/`  
**Linux**: `~/.local/share/Filevate/`

### **Database Location**

ChromaDB database is automatically created in the application data directory:
- `{app_data_dir}/chroma_db/`

### **Model Cache**

AI models are cached by Hugging Face Transformers:
- `~/.cache/huggingface/transformers/`

## Troubleshooting

### **Common Configuration Issues**

**Invalid folder path**:
```python
# Check if folder exists
import os
if not os.path.exists(FOLDER_TO_INDEX):
    print(f"Error: {FOLDER_TO_INDEX} does not exist")
```

**Performance issues**:
```python
# Reduce resource usage
MAX_WORKERS = 2
INDEXING_BATCH_SIZE = 25
ENABLE_GRANULAR_CHUNKING = False
```

**Memory issues**:
```python
# Limit file size and batch size
MAX_FILE_SIZE_MB = 50
INDEXING_BATCH_SIZE = 10
```

### **Reset Configuration**

To reset to default configuration:

```bash
# Backup current config
cp config.py config.py.backup

# Restore from sample
cp config_sample.py config.py
```

---

*This configuration guide covers all current settings available in Filevate. Additional configuration options may be added in future versions.*
