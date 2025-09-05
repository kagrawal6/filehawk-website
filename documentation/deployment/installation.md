# Installation Guide

**Complete guide for installing Filevate semantic search platform**

## Overview

Filevate is a cross-platform desktop application that runs locally on your machine. This guide covers installation for Windows, macOS, and Linux systems.

## System Requirements

### **Minimum Requirements**

| Component | Specification | Notes |
|-----------|---------------|-------|
| **Operating System** | Windows 10+, macOS 10.15+, Ubuntu 18.04+ | Cross-platform support |
| **Memory (RAM)** | 4GB minimum | 8GB recommended for large collections |
| **Storage** | 5GB free space | Additional space for document indexing |
| **CPU** | 2 cores, 2.0 GHz | AI model inference requires decent CPU |
| **Network** | Internet for setup | Optional after initial model download |

### **Recommended Specifications**

| Component | Specification | Benefits |
|-----------|---------------|----------|
| **Memory (RAM)** | 16GB+ | Better performance with large document sets |
| **Storage** | SSD | Faster indexing and search response times |
| **CPU** | 4+ cores, 3.0 GHz+ | Improved AI model inference speed |

## Installation Methods

### **Method 1: Source Installation (Current)**

#### **Prerequisites**

1. **Install Python 3.8+**
   ```bash
   # Windows (recommended: Python.org installer)
   # Download from: https://www.python.org/downloads/
   
   # macOS (using Homebrew)
   brew install python@3.9
   
   # Ubuntu/Debian
   sudo apt update
   sudo apt install python3.9 python3.9-pip python3.9-venv
   
   # Verify installation
   python3 --version
   ```

2. **Install Node.js 16+** (for desktop app)
   ```bash
   # Windows (recommended: nodejs.org installer)
   # Download from: https://nodejs.org/
   
   # macOS (using Homebrew)
   brew install node@16
   
   # Ubuntu/Debian
   curl -fsSL https://deb.nodesource.com/setup_16.x | sudo -E bash -
   sudo apt-get install -y nodejs
   
   # Verify installation
   node --version
   npm --version
   ```

3. **Install Git**
   ```bash
   # Windows (recommended: git-scm.com installer)
   # Download from: https://git-scm.com/downloads
   
   # macOS (using Homebrew)
   brew install git
   
   # Ubuntu/Debian
   sudo apt install git
   
   # Verify installation
   git --version
   ```

#### **Installation Steps**

1. **Clone Repository**
   ```bash
   git clone https://github.com/your-org/filevate.git
   cd filevate
   ```

2. **Setup Python Environment**
   ```bash
   # Create virtual environment
   python3 -m venv venv
   
   # Activate virtual environment
   # Windows
   venv\Scripts\activate
   # macOS/Linux
   source venv/bin/activate
   
   # Verify activation
   which python  # Should point to venv/bin/python
   ```

3. **Install Python Dependencies**
   ```bash
   # Install required packages
   pip install -r requirements.txt
   
   # Verify key packages
   pip list | grep -E "(sentence-transformers|chromadb|flask)"
   ```

4. **Setup Desktop Application**
   ```bash
   cd desktop-app
   
   # Install Node.js dependencies
   npm install
   
   # Verify installation
   npm list --depth=0
   ```

5. **Download AI Models** (First-time setup)
   ```bash
   # Return to project root
   cd ..
   
   # Pre-download models (optional but recommended)
   python -c "
   from sentence_transformers import SentenceTransformer
   print('Downloading Gist model...')
   SentenceTransformer('sentence-transformers/msmarco-MiniLM-L6-cos-v5')
   print('Downloading Pinpoint model...')
   SentenceTransformer('all-MiniLM-L6-v2')
   print('Models downloaded successfully!')
   "
   ```

#### **First Run**

1. **Start Backend API**
   ```bash
   # In project root with activated venv
   python api.py
   
   # You should see:
   # Model loading and initialization messages
   # "Running on http://localhost:5000"
   ```

2. **Start Desktop Application**
   ```bash
   # In new terminal window
   cd desktop-app
   npm start
   
   # Electron app should open automatically
   ```

3. **Verify Installation**
   ```bash
   # Test API health
   curl http://localhost:5000/api/health
   
   # Expected response:
   # {"status": "healthy", "version": "1.0.0", ...}
   ```

## Configuration

### **Basic Configuration**

Edit `config.py` to customize settings:

```python
# config.py - Key settings
FOLDER_TO_INDEX = "./test_confidence_files"  # Change to your documents folder
GIST_EMBEDDING_MODEL = "sentence-transformers/msmarco-MiniLM-L6-cos-v5"
PINPOINT_EMBEDDING_MODEL = "all-MiniLM-L6-v2"

# Performance settings
MAX_FILE_SIZE_MB = 100
ENABLE_GRANULAR_CHUNKING = True
```

### **Directory Structure**

After installation, your directory structure should look like:

```
filevate/
├── venv/                    # Python virtual environment
├── api.py                   # Main API server
├── config.py               # Configuration file
├── requirements.txt        # Python dependencies
├── desktop-app/            # Electron application
│   ├── node_modules/       # Node.js dependencies
│   ├── src/               # Application source
│   └── package.json       # Node.js configuration
└── [other project files]
```

## Initial Setup

### **First-Time Configuration**

1. **Select Folder to Index**
   - Use the desktop app to select your documents folder
   - Or edit `FOLDER_TO_INDEX` in `config.py`

2. **Start Initial Indexing**
   - Click "Start Indexing" in the desktop app
   - Or use API: `POST /api/index`

3. **Test Search**
   - Try searching for documents in the desktop app
   - Or use API: `POST /api/search`

### **GitHub Integration Setup** (Optional)

1. **Enable GitHub Integration**
   - In desktop app: Go to Settings → GitHub
   - Click "Connect GitHub Account"

2. **OAuth Authentication**
   - Follow device flow instructions
   - Enter code at github.com/device
   - Authorize the application

3. **Select Repositories**
   - Choose repositories to index
   - Configure branch preferences

## Troubleshooting

### **Common Installation Issues**

#### **Python Environment Issues**

**Problem**: "Module not found" errors
```bash
# Solution: Ensure venv is activated
source venv/bin/activate  # macOS/Linux
venv\Scripts\activate     # Windows

# Reinstall dependencies
pip install -r requirements.txt
```

**Problem**: Permission errors during installation
```bash
# Solution: Use virtual environment (don't use sudo/admin)
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

#### **Node.js Issues**

**Problem**: "npm install" fails
```bash
# Solution: Clear npm cache and retry
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

**Problem**: Node.js version compatibility
```bash
# Solution: Use Node.js 16+
node --version  # Should be v16.x.x or higher
npm --version   # Should be 8.x.x or higher
```

#### **Model Download Issues**

**Problem**: Model download fails
```bash
# Solution: Manual download with better error handling
python -c "
import os
os.environ['TRANSFORMERS_CACHE'] = './model_cache'
from sentence_transformers import SentenceTransformer
try:
    model = SentenceTransformer('sentence-transformers/msmarco-MiniLM-L6-cos-v5')
    print('Model downloaded successfully')
except Exception as e:
    print(f'Download failed: {e}')
"
```

#### **Runtime Issues**

**Problem**: API server won't start
```bash
# Check if port 5000 is already in use
lsof -i :5000  # macOS/Linux
netstat -ano | findstr :5000  # Windows

# Kill existing process if needed
kill -9 <PID>  # macOS/Linux
taskkill /PID <PID> /F  # Windows
```

**Problem**: Desktop app can't connect to API
```bash
# Verify API is running
curl http://localhost:5000/api/health

# Check firewall settings
# Ensure localhost connections are allowed
```

### **Performance Issues**

**Problem**: Slow indexing performance
```python
# Solution: Adjust config.py settings
MAX_WORKERS = 2  # Reduce if system is struggling
INDEXING_BATCH_SIZE = 25  # Reduce batch size
ENABLE_GRANULAR_CHUNKING = False  # Disable for speed
```

**Problem**: High memory usage
```python
# Solution: Reduce memory-intensive operations
MAX_FILE_SIZE_MB = 50  # Reduce max file size
CHUNK_OVERLAP_LINES = 1  # Reduce overlap
```

## Verification

### **Installation Check**

Run these commands to verify installation:

```bash
# Check Python packages
pip list | grep -E "(sentence-transformers|chromadb|flask)"

# Check Node.js packages
cd desktop-app && npm list --depth=0

# Test API endpoints
curl http://localhost:5000/api/health
curl -X POST http://localhost:5000/api/search \
  -H "Content-Type: application/json" \
  -d '{"query": "test", "mode": "gist"}'
```

### **Expected Output**

Successful installation should show:
- API server running on http://localhost:5000
- Desktop app opening and connecting to API
- Health check returning "healthy" status
- Model loading messages in console

## Data Locations

### **Application Data**

**Windows**: `%APPDATA%\Filevate\`  
**macOS**: `~/Library/Application Support/Filevate/`  
**Linux**: `~/.local/share/Filevate/`

### **Model Cache**

**Default**: `~/.cache/huggingface/transformers/`

Models are downloaded once and cached locally for offline use.

## Uninstallation

### **Remove Application**

```bash
# Remove project directory
rm -rf filevate/

# Remove application data (optional)
# Windows
rd /s %APPDATA%\Filevate

# macOS
rm -rf ~/Library/Application\ Support/Filevate

# Linux
rm -rf ~/.local/share/Filevate

# Remove model cache (optional)
rm -rf ~/.cache/huggingface/transformers/
```

---

*This installation guide covers the current source-based installation method for Filevate. Pre-built installers will be available in future releases.*
