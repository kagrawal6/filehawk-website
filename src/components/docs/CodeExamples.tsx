import React, { useState } from 'react'
import { 
  Code, 
  Copy, 
  CheckCircle, 
  Play, 
  Terminal, 
  FileText, 
  Database, 
  Bot,
  Settings
} from 'lucide-react'

interface CodeExampleProps {
  title: string
  description: string
  language: 'python' | 'javascript' | 'bash' | 'json' | 'yaml'
  code: string
  category?: string
  output?: string
  interactive?: boolean
}

export const CodeExample: React.FC<CodeExampleProps> = ({ 
  title, 
  description, 
  language, 
  code, 
  category,
  output,
  interactive = false 
}) => {
  const [copied, setCopied] = useState(false)
  const [isRunning, setIsRunning] = useState(false)

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy code: ', err)
    }
  }

  const simulateRun = () => {
    if (!interactive) return
    setIsRunning(true)
    setTimeout(() => setIsRunning(false), 3000)
  }

  const getLanguageIcon = () => {
    switch (language) {
      case 'python': return Bot
      case 'javascript': return Code
      case 'bash': return Terminal
      case 'json': return Database
      case 'yaml': return Settings
      default: return FileText
    }
  }

  const LanguageIcon = getLanguageIcon()

  return (
    <div className="rounded-lg border" style={{ backgroundColor: 'var(--bg-elevated)', borderColor: 'var(--border-subtle)' }}>
      {/* Header */}
      <div className="p-4 border-b flex items-center justify-between" style={{ borderColor: 'var(--border-subtle)' }}>
        <div className="flex items-center">
          <div className="p-2 rounded bg-brand-gold-500/20 text-brand-gold-400 mr-3">
            <LanguageIcon className="h-4 w-4" />
          </div>
          <div>
            <h4 className="font-semibold" style={{ color: 'var(--fg-primary)' }}>{title}</h4>
            <p className="text-sm" style={{ color: 'var(--fg-secondary)' }}>{description}</p>
            {category && (
              <span className="text-xs px-2 py-1 rounded bg-brand-gold-500/20 text-brand-gold-400 mt-1 inline-block">
                {category}
              </span>
            )}
          </div>
        </div>
        <div className="flex items-center space-x-2">
          {interactive && (
            <button
              onClick={simulateRun}
              disabled={isRunning}
              className="flex items-center px-3 py-1 rounded border border-green-500 text-green-400 hover:bg-green-500/10 transition-all duration-300 disabled:opacity-50"
            >
              <Play className="h-3 w-3 mr-1" />
              {isRunning ? 'Running...' : 'Run'}
            </button>
          )}
          <button
            onClick={copyToClipboard}
            className="flex items-center px-3 py-1 rounded border border-brand-gold-500 text-brand-gold-400 hover:bg-brand-gold-500/10 transition-all duration-300"
          >
            {copied ? <CheckCircle className="h-3 w-3 mr-1" /> : <Copy className="h-3 w-3 mr-1" />}
            {copied ? 'Copied!' : 'Copy'}
          </button>
        </div>
      </div>

      {/* Code Block */}
      <div className="relative">
        <pre className="p-4 overflow-x-auto text-sm font-mono" style={{ backgroundColor: 'var(--bg-app)', color: 'var(--fg-secondary)' }}>
          <code className={`language-${language}`}>{code}</code>
        </pre>
        
        {/* Language Badge */}
        <div className="absolute top-2 right-2 px-2 py-1 rounded text-xs font-mono" 
             style={{ backgroundColor: 'var(--bg-elevated)', color: 'var(--fg-muted)' }}>
          {language}
        </div>
      </div>

      {/* Output Section */}
      {(output || isRunning) && (
        <div className="border-t" style={{ borderColor: 'var(--border-subtle)' }}>
          <div className="p-4">
            <div className="flex items-center mb-2">
              <Terminal className="h-4 w-4 mr-2 text-green-400" />
              <span className="text-sm font-semibold" style={{ color: 'var(--fg-primary)' }}>Output</span>
            </div>
            <pre className="text-sm font-mono p-3 rounded" style={{ backgroundColor: 'var(--bg-app)', color: 'var(--fg-secondary)' }}>
              {isRunning ? (
                <span className="text-yellow-400">Executing...</span>
              ) : (
                output
              )}
            </pre>
          </div>
        </div>
      )}
    </div>
  )
}

// Predefined Code Examples
export const APIExamples = {
  search: {
    title: 'Semantic Search API',
    description: 'Perform semantic search with confidence scoring',
    language: 'python' as const,
    category: 'Search API',
    code: `import requests
import json

# Semantic search with FileHawk API
def search_documents(query, mode="gist", limit=10):
    """
    Perform semantic search using FileHawk API
    
    Args:
        query (str): Natural language search query
        mode (str): "gist" for broad search, "pinpoint" for precise
        limit (int): Maximum number of results
    
    Returns:
        dict: Search results with confidence scores
    """
    
    url = "http://localhost:5000/api/search"
    payload = {
        "query": query,
        "mode": mode,
        "limit": limit,
        "include_confidence": True
    }
    
    response = requests.post(url, json=payload)
    
    if response.status_code == 200:
        results = response.json()
        
        # Display results with confidence
        for result in results['results']:
            print(f"File: {result['file_path']}")
            print(f"Confidence: {result['confidence']:.3f}")
            print(f"Snippet: {result['snippet'][:100]}...")
            print("-" * 50)
        
        return results
    else:
        print(f"Error: {response.status_code}")
        return None

# Example usage
results = search_documents(
    query="machine learning algorithms for data processing",
    mode="gist",
    limit=5
)`,
    output: `File: docs/ml/algorithms.pdf
Confidence: 0.892
Snippet: Machine learning algorithms are fundamental tools for processing large datasets...
--------------------------------------------------
File: research/data-processing-techniques.md
Confidence: 0.847
Snippet: Advanced data processing using ML techniques including neural networks...
--------------------------------------------------
File: projects/ml-pipeline/README.md
Confidence: 0.821
Snippet: This project implements a complete machine learning pipeline for data...
--------------------------------------------------`,
    interactive: true
  },

  indexing: {
    title: 'Document Indexing',
    description: 'Index documents with AI embeddings',
    language: 'python' as const,
    category: 'Indexing API',
    code: `import os
import requests
from pathlib import Path

class FileHawkIndexer:
    """FileHawk document indexing client"""
    
    def __init__(self, base_url="http://localhost:5000"):
        self.base_url = base_url
    
    def start_indexing(self, folder_path, options=None):
        """
        Start indexing a folder with AI embeddings
        
        Args:
            folder_path (str): Path to folder to index
            options (dict): Indexing options
        """
        
        default_options = {
            "recursive": True,
            "file_types": [".txt", ".md", ".pdf", ".docx", ".py"],
            "enable_ai_enhancement": True,
            "chunk_size": 512,
            "chunk_overlap": 50,
            "batch_size": 25
        }
        
        if options:
            default_options.update(options)
        
        payload = {
            "folder_path": str(Path(folder_path).absolute()),
            "options": default_options
        }
        
        response = requests.post(
            f"{self.base_url}/api/index", 
            json=payload
        )
        
        if response.status_code == 200:
            result = response.json()
            print(f"Indexing started: {result['indexing_id']}")
            return result['indexing_id']
        else:
            print(f"Error starting indexing: {response.text}")
            return None
    
    def get_status(self):
        """Get current indexing status"""
        response = requests.get(f"{self.base_url}/api/status")
        
        if response.status_code == 200:
            status = response.json()
            
            if status['indexing_status']['active']:
                progress = status['indexing_status']['progress']
                print(f"Indexing Progress: {progress['percentage']:.1f}%")
                print(f"Files Processed: {progress['files_processed']}")
                print(f"Rate: {progress['files_per_minute']:.0f} files/min")
            else:
                print("No active indexing")
            
            return status
        else:
            print(f"Error getting status: {response.text}")
            return None

# Example usage
indexer = FileHawkIndexer()

# Start indexing with custom options
indexing_id = indexer.start_indexing(
    folder_path="./documents",
    options={
        "enable_ai_enhancement": True,
        "chunk_size": 1024,
        "batch_size": 50
    }
)

# Monitor progress
status = indexer.get_status()`,
    output: `Indexing started: idx_1699123456
Indexing Progress: 45.2%
Files Processed: 1,247
Rate: 5,200 files/min`,
    interactive: true
  },

  githubIntegration: {
    title: 'GitHub Repository Integration',
    description: 'Connect and index GitHub repositories',
    language: 'python' as const,
    category: 'GitHub API',
    code: `import requests
import os

class GitHubConnector:
    """FileHawk GitHub integration client"""
    
    def __init__(self, base_url="http://localhost:5000"):
        self.base_url = base_url
    
    def authenticate(self):
        """Start GitHub OAuth device flow"""
        response = requests.post(f"{self.base_url}/api/github/auth/start")
        
        if response.status_code == 200:
            auth_data = response.json()
            print(f"Visit: {auth_data['verification_uri']}")
            print(f"Enter code: {auth_data['user_code']}")
            print("Waiting for authentication...")
            
            return auth_data['device_code']
        else:
            print(f"Auth error: {response.text}")
            return None
    
    def check_auth_status(self, device_code):
        """Check authentication status"""
        payload = {"device_code": device_code}
        response = requests.post(
            f"{self.base_url}/api/github/auth/check", 
            json=payload
        )
        
        if response.status_code == 200:
            result = response.json()
            if result['authenticated']:
                print(f"Authenticated as: {result['user']['login']}")
                return True
        
        return False
    
    def list_repositories(self):
        """List accessible repositories"""
        response = requests.get(f"{self.base_url}/api/github/repositories")
        
        if response.status_code == 200:
            repos = response.json()['repositories']
            
            print("Available repositories:")
            for repo in repos:
                print(f"  {repo['full_name']} ({repo['language']})")
                print(f"    Stars: {repo['stargazers_count']}")
                print(f"    Size: {repo['size']} KB")
            
            return repos
        else:
            print(f"Error listing repos: {response.text}")
            return []
    
    def index_repository(self, repo_name, options=None):
        """Index a GitHub repository"""
        default_options = {
            "branches": ["main", "master"],
            "include_issues": False,
            "include_wiki": False,
            "file_patterns": ["*.py", "*.js", "*.md", "*.txt"],
            "exclude_patterns": ["*.min.js", "node_modules/*"]
        }
        
        if options:
            default_options.update(options)
        
        payload = {
            "repository": repo_name,
            "options": default_options
        }
        
        response = requests.post(
            f"{self.base_url}/api/github/index", 
            json=payload
        )
        
        if response.status_code == 200:
            result = response.json()
            print(f"Repository indexing started: {result['task_id']}")
            return result['task_id']
        else:
            print(f"Indexing error: {response.text}")
            return None

# Example usage
github = GitHubConnector()

# Authenticate with GitHub
device_code = github.authenticate()

# Check authentication (in real app, poll this)
if github.check_auth_status(device_code):
    # List repositories
    repos = github.list_repositories()
    
    # Index a specific repository
    task_id = github.index_repository(
        "microsoft/vscode",
        options={
            "branches": ["main"],
            "file_patterns": ["*.ts", "*.js", "*.md"]
        }
    )`,
    output: `Visit: https://github.com/login/device
Enter code: A3D2-5F7G
Waiting for authentication...
Authenticated as: john-developer

Available repositories:
  microsoft/vscode (TypeScript)
    Stars: 142,567
    Size: 89,234 KB
  facebook/react (JavaScript)
    Stars: 203,891
    Size: 45,678 KB

Repository indexing started: task_gh_1699123789`,
    interactive: true
  },

  configuration: {
    title: 'Advanced Configuration',
    description: 'Configure FileHawk for optimal performance',
    language: 'python' as const,
    category: 'Configuration',
    code: `# config.py - FileHawk configuration
import os
from pathlib import Path

class FileHawkConfig:
    """Advanced FileHawk configuration"""
    
    # Core Settings
    FOLDER_TO_INDEX = os.getenv('FILEHAWK_INDEX_PATH', './documents')
    API_PORT = int(os.getenv('FILEHAWK_PORT', 5000))
    
    # AI Model Configuration
    GIST_EMBEDDING_MODEL = "sentence-transformers/msmarco-MiniLM-L6-cos-v5"
    PINPOINT_EMBEDDING_MODEL = "sentence-transformers/all-MiniLM-L6-v2"
    MODEL_CACHE_DIR = "./model_cache"
    
    # Performance Tuning
    MAX_WORKERS = int(os.getenv('FILEHAWK_WORKERS', 4))
    INDEXING_BATCH_SIZE = 50
    CHUNK_SIZE = 512
    CHUNK_OVERLAP_LINES = 5
    MAX_FILE_SIZE_MB = 100
    
    # Memory Management
    ENABLE_MEMORY_OPTIMIZATION = True
    CACHE_SIZE_LIMIT_MB = 512
    ENABLE_RESULT_CACHING = True
    MAX_CACHED_QUERIES = 1000
    
    # Search Configuration
    DEFAULT_SEARCH_LIMIT = 20
    MAX_SEARCH_LIMIT = 100
    CONFIDENCE_THRESHOLD = 0.1
    ENABLE_SEMANTIC_RERANKING = True
    
    # Security Settings
    ENABLE_API_KEY_AUTH = False
    API_KEY_HEADER = "X-FileHawk-API-Key"
    ENABLE_RATE_LIMITING = True
    RATE_LIMIT_PER_MINUTE = 100
    
    # GitHub Integration
    GITHUB_ENABLE = True
    GITHUB_CLIENT_ID = os.getenv('GITHUB_CLIENT_ID')
    GITHUB_CLIENT_SECRET = os.getenv('GITHUB_CLIENT_SECRET')
    GITHUB_CACHE_DIR = "./github_cache"
    
    # Logging Configuration
    LOG_LEVEL = "INFO"
    ENABLE_DETAILED_LOGGING = True
    LOG_FILE_PATH = "./logs/filehawk.log"
    ENABLE_PERFORMANCE_LOGGING = True
    
    # Advanced Features
    ENABLE_GRANULAR_CHUNKING = True
    ENABLE_CONFIDENCE_BOOSTING = True
    ENABLE_FILENAME_MATCHING = True
    ENABLE_REAL_TIME_INDEXING = True
    
    @classmethod
    def validate_config(cls):
        """Validate configuration settings"""
        errors = []
        
        # Check paths
        if not Path(cls.FOLDER_TO_INDEX).exists():
            errors.append(f"Index path does not exist: {cls.FOLDER_TO_INDEX}")
        
        # Check model cache
        Path(cls.MODEL_CACHE_DIR).mkdir(exist_ok=True)
        
        # Check workers
        if cls.MAX_WORKERS > os.cpu_count():
            errors.append(f"MAX_WORKERS ({cls.MAX_WORKERS}) exceeds CPU count")
        
        # Check memory limits
        if cls.CACHE_SIZE_LIMIT_MB < 100:
            errors.append("CACHE_SIZE_LIMIT_MB should be at least 100MB")
        
        if errors:
            raise ValueError(f"Configuration errors: {'; '.join(errors)}")
        
        return True
    
    @classmethod
    def get_performance_profile(cls, profile="balanced"):
        """Get predefined performance profiles"""
        profiles = {
            "speed": {
                "MAX_WORKERS": min(8, os.cpu_count()),
                "INDEXING_BATCH_SIZE": 100,
                "ENABLE_GRANULAR_CHUNKING": False,
                "CACHE_SIZE_LIMIT_MB": 1024
            },
            "balanced": {
                "MAX_WORKERS": min(4, os.cpu_count()),
                "INDEXING_BATCH_SIZE": 50,
                "ENABLE_GRANULAR_CHUNKING": True,
                "CACHE_SIZE_LIMIT_MB": 512
            },
            "memory": {
                "MAX_WORKERS": 2,
                "INDEXING_BATCH_SIZE": 25,
                "ENABLE_MEMORY_OPTIMIZATION": True,
                "CACHE_SIZE_LIMIT_MB": 256
            }
        }
        
        return profiles.get(profile, profiles["balanced"])

# Usage examples
if __name__ == "__main__":
    # Validate configuration
    FileHawkConfig.validate_config()
    
    # Apply performance profile
    speed_config = FileHawkConfig.get_performance_profile("speed")
    for key, value in speed_config.items():
        setattr(FileHawkConfig, key, value)
    
    print("Configuration validated successfully")
    print(f"Model cache: {FileHawkConfig.MODEL_CACHE_DIR}")
    print(f"Workers: {FileHawkConfig.MAX_WORKERS}")
    print(f"Batch size: {FileHawkConfig.INDEXING_BATCH_SIZE}")`,
    output: `Configuration validated successfully
Model cache: ./model_cache
Workers: 8
Batch size: 100`,
    interactive: true
  }
}

export const BashExamples = {
  installation: {
    title: 'Quick Installation',
    description: 'Install and setup FileHawk from source',
    language: 'bash' as const,
    category: 'Installation',
    code: `#!/bin/bash
# FileHawk Quick Installation Script

set -e  # Exit on any error

echo "🦅 FileHawk Installation Script"
echo "================================"

# Check prerequisites
echo "Checking prerequisites..."

# Check Python
if ! command -v python3 &> /dev/null; then
    echo "❌ Python 3.8+ is required"
    exit 1
fi

# Check Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js 16+ is required"
    exit 1
fi

echo "✅ Prerequisites check passed"

# Clone repository
echo "Cloning FileHawk repository..."
git clone https://github.com/your-org/filevate.git
cd filevate

# Setup Python environment
echo "Setting up Python environment..."
python3 -m venv venv

# Activate virtual environment
if [[ "$OSTYPE" == "msys" || "$OSTYPE" == "win32" ]]; then
    source venv/Scripts/activate
else
    source venv/bin/activate
fi

# Install Python dependencies
echo "Installing Python dependencies..."
pip install --upgrade pip
pip install -r requirements.txt

# Setup desktop application
echo "Setting up desktop application..."
cd desktop-app
npm install
cd ..

# Download AI models
echo "Downloading AI models (this may take a few minutes)..."
python -c "
from sentence_transformers import SentenceTransformer
import os

os.environ['TRANSFORMERS_CACHE'] = './model_cache'

print('Downloading Gist model...')
SentenceTransformer('sentence-transformers/msmarco-MiniLM-L6-cos-v5')

print('Downloading Pinpoint model...')
SentenceTransformer('sentence-transformers/all-MiniLM-L6-v2')

print('✅ Models downloaded successfully!')
"

# Create launch scripts
echo "Creating launch scripts..."

# Backend launch script
cat > launch_backend.sh << 'EOF'
#!/bin/bash
source venv/bin/activate
echo "Starting FileHawk API server..."
python api.py
EOF

# Frontend launch script  
cat > launch_frontend.sh << 'EOF'
#!/bin/bash
cd desktop-app
echo "Starting FileHawk desktop application..."
npm start
EOF

chmod +x launch_backend.sh launch_frontend.sh

echo ""
echo "🎉 Installation completed successfully!"
echo ""
echo "To start FileHawk:"
echo "1. Backend:  ./launch_backend.sh"
echo "2. Frontend: ./launch_frontend.sh"
echo ""
echo "Or run both with: npm run dev"`,
    output: `🦅 FileHawk Installation Script
================================
Checking prerequisites...
✅ Prerequisites check passed
Cloning FileHawk repository...
Setting up Python environment...
Installing Python dependencies...
Setting up desktop application...
Downloading AI models (this may take a few minutes)...
Downloading Gist model...
Downloading Pinpoint model...
✅ Models downloaded successfully!
Creating launch scripts...

🎉 Installation completed successfully!

To start FileHawk:
1. Backend:  ./launch_backend.sh
2. Frontend: ./launch_frontend.sh

Or run both with: npm run dev`,
    interactive: true
  },

  deployment: {
    title: 'Production Deployment',
    description: 'Deploy FileHawk in production environment',
    language: 'bash' as const,
    category: 'Deployment',
    code: `#!/bin/bash
# Production deployment script for FileHawk

set -e

echo "🚀 FileHawk Production Deployment"
echo "================================="

# Configuration
APP_NAME="filehawk"
APP_USER="filehawk"
APP_DIR="/opt/filehawk"
SERVICE_FILE="/etc/systemd/system/filehawk.service"
NGINX_CONFIG="/etc/nginx/sites-available/filehawk"

# Create application user
echo "Creating application user..."
sudo useradd --system --shell /bin/bash --home $APP_DIR $APP_USER || true

# Create application directory
echo "Setting up application directory..."
sudo mkdir -p $APP_DIR
sudo chown $APP_USER:$APP_USER $APP_DIR

# Clone and setup application
echo "Deploying application..."
sudo -u $APP_USER git clone https://github.com/your-org/filevate.git $APP_DIR/app
cd $APP_DIR/app

# Setup Python environment
echo "Setting up Python environment..."
sudo -u $APP_USER python3 -m venv venv
sudo -u $APP_USER venv/bin/pip install -r requirements.txt

# Download models in background
echo "Pre-downloading AI models..."
sudo -u $APP_USER venv/bin/python -c "
from sentence_transformers import SentenceTransformer
import os
os.environ['TRANSFORMERS_CACHE'] = '$APP_DIR/model_cache'
SentenceTransformer('sentence-transformers/msmarco-MiniLM-L6-cos-v5')
SentenceTransformer('sentence-transformers/all-MiniLM-L6-v2')
"

# Create systemd service
echo "Creating systemd service..."
sudo tee $SERVICE_FILE > /dev/null << EOF
[Unit]
Description=FileHawk Semantic Search API
After=network.target

[Service]
Type=simple
User=$APP_USER
WorkingDirectory=$APP_DIR/app
Environment=PATH=$APP_DIR/app/venv/bin
ExecStart=$APP_DIR/app/venv/bin/python api.py
Restart=always
RestartSec=3

# Security settings
NoNewPrivileges=true
PrivateTmp=true
ProtectSystem=strict
ProtectHome=true
ReadWritePaths=$APP_DIR

[Install]
WantedBy=multi-user.target
EOF

# Setup nginx reverse proxy
echo "Configuring nginx..."
sudo tee $NGINX_CONFIG > /dev/null << 'EOF'
server {
    listen 80;
    server_name your-domain.com;
    
    client_max_body_size 100M;
    
    location / {
        proxy_pass http://127.0.0.1:5000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        
        # WebSocket support
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
    }
    
    # API rate limiting
    location /api/ {
        limit_req zone=api burst=20 nodelay;
        proxy_pass http://127.0.0.1:5000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
EOF

# Enable services
echo "Enabling services..."
sudo systemctl daemon-reload
sudo systemctl enable filehawk
sudo systemctl start filehawk

# Enable nginx site
sudo ln -sf $NGINX_CONFIG /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl reload nginx

# Setup log rotation
echo "Setting up log rotation..."
sudo tee /etc/logrotate.d/filehawk > /dev/null << 'EOF'
/var/log/filehawk/*.log {
    daily
    missingok
    rotate 30
    compress
    delaycompress
    notifempty
    create 644 filehawk filehawk
    postrotate
        systemctl reload filehawk
    endscript
}
EOF

# Create monitoring script
echo "Creating monitoring script..."
sudo tee /usr/local/bin/filehawk-health.sh > /dev/null << 'EOF'
#!/bin/bash
# FileHawk health check script

API_URL="http://localhost:5000/api/health"
TIMEOUT=10

response=$(curl -s -w "%{http_code}" --max-time \$TIMEOUT "\$API_URL" || echo "000")
http_code="\${response: -3}"

if [ "\$http_code" = "200" ]; then
    echo "✅ FileHawk API is healthy"
    exit 0
else
    echo "❌ FileHawk API is unhealthy (HTTP: \$http_code)"
    exit 1
fi
EOF

sudo chmod +x /usr/local/bin/filehawk-health.sh

# Setup cron for health checks
echo "*/5 * * * * /usr/local/bin/filehawk-health.sh" | sudo crontab -u root -

echo ""
echo "🎉 Production deployment completed!"
echo ""
echo "Service status:"
sudo systemctl status filehawk --no-pager -l
echo ""
echo "API health check:"
sudo /usr/local/bin/filehawk-health.sh`,
    output: `🚀 FileHawk Production Deployment
=================================
Creating application user...
Setting up application directory...
Deploying application...
Setting up Python environment...
Pre-downloading AI models...
Creating systemd service...
Configuring nginx...
Enabling services...
Setting up log rotation...
Creating monitoring script...

🎉 Production deployment completed!

Service status:
● filehawk.service - FileHawk Semantic Search API
   Loaded: loaded (/etc/systemd/system/filehawk.service; enabled)
   Active: active (running) since Mon 2024-01-15 10:30:45 UTC; 5s ago

API health check:
✅ FileHawk API is healthy`,
    interactive: true
  }
}

export default {
  CodeExample,
  APIExamples,
  BashExamples
}
