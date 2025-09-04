# Security & Data Privacy

**Local-first security architecture ensuring data sovereignty and privacy**

## Overview

Filevate is designed with a **local-first, privacy-by-design** architecture where all document processing, AI inference, and search operations happen entirely on the user's machine. No document content or search queries are transmitted to external services.

## Security Architecture

### **Local-First Processing**

All core operations happen locally:
- **Document Processing**: Files read and processed on local machine only
- **AI Inference**: SentenceTransformers models run locally
- **Search Operations**: ChromaDB vector search performed locally
- **Data Storage**: All indexed data stored in local database

### **Limited External Communication**

**GitHub Integration (Optional)**:
- OAuth device flow for secure authentication
- Repository metadata retrieved via GitHub API
- Access token stored securely using system keyring
- Repository content cloned locally for indexing

**AI Model Downloads (One-time)**:
- Pre-trained models downloaded from Hugging Face on first use
- Models cached locally for offline operation
- No usage data sent back to model providers

## Data Privacy Principles

### **1. No Data Transmission**
- Document content never transmitted to external services
- Search queries processed entirely locally
- File metadata stays on user's machine

### **2. Local Storage Only**
- ChromaDB vector database stored locally
- File metadata tracked in local database
- AI model cache maintained locally

### **3. User Control**
- Users choose which directories to index
- Complete data removal via cleanup tools
- Transparent indexing status and file lists

## Current Security Implementation

### **Secure Token Storage**
```python
# GitHub token storage using system keyring
import keyring

# Store token securely
keyring.set_password("filesearcher", "github_token", token)

# Retrieve token
token = keyring.get_password("filesearcher", "github_token")
```

### **File System Permissions**
- Read-only access to user-selected directories
- No modification of source documents
- Standard user permissions for application data

### **Network Access Control**
- GitHub API calls only when GitHub integration enabled
- Model downloads only during initial setup
- No telemetry or analytics transmission

## Data Storage Locations

**Windows**: `%APPDATA%\Filevate\`  
**macOS**: `~/Library/Application Support/Filevate/`  
**Linux**: `~/.local/share/Filevate/`

## Security Best Practices

### **For Users**
- Keep operating system updated
- Use standard user account (not administrator)
- Enable disk encryption for sensitive data
- Regularly review indexed file list
- Revoke GitHub access if no longer needed

### **For Organizations**
- Deploy on managed workstations
- Configure network policies for GitHub/Hugging Face access
- Implement centralized GitHub OAuth app management
- Monitor GitHub token usage

## Current Limitations

- No encryption at rest (relies on OS-level security)
- No multi-user access control
- No audit logging (basic application logs only)
- No enterprise authentication integration

---

*This represents the current security implementation of Filevate as a local-first application.*
