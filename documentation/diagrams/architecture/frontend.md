# Filevate Frontend Architecture

**Desktop Application - Electron + React + TypeScript**

## System Overview

Frontend architecture of the Filevate desktop application with React UI and Electron framework.

```mermaid
graph TB
    %% External Services
    subgraph "External"
        API[Local Flask API<br/>localhost:5000]
        FILES[File System<br/>User Documents]
        GITHUB[GitHub OAuth<br/>Browser Flow]
    end

    %% Electron Main Process
    subgraph "Electron Main"
        MAIN[main.ts<br/>App Lifecycle]
        WINDOWS[Window Manager<br/>UI Windows]
        
        subgraph "IPC Handlers"
            IPC_API[API Requests<br/>HTTP Proxy]
            IPC_FOLDERS[Folder Selection<br/>Native Dialogs]
            IPC_FILES[File Operations<br/>Open Files]
        end
        
        PRELOAD[preload.ts<br/>Security Bridge]
    end

    %% React Application
    subgraph "React App (Renderer)"
        subgraph "Core Components"
            APP[App.tsx<br/>Root Component]
            HOME[HomePage.tsx<br/>Search Interface]
            SETTINGS[SettingsPage.tsx<br/>Configuration]
        end
        
        subgraph "Search UI"
            SEARCH_BAR[SearchBar.tsx<br/>Query Input]
            RESULTS[SearchResults.tsx<br/>Result Display]
            FILE_RESULT[FileResult.tsx<br/>Result Items]
            MODE_SELECT[Mode Selector<br/>Gist/Pinpoint]
        end
        
        subgraph "Navigation"
            SIDEBAR[Sidebar.tsx<br/>Menu Navigation]
            HEADER[BrandHeader.tsx<br/>App Header]
        end
        
        subgraph "Utilities"
            API_CLIENT[api.ts<br/>HTTP Client]
            STATE[React State<br/>Component State]
        end
    end

    %% Connections
    API --> IPC_API
    FILES --> IPC_FOLDERS
    GITHUB --> SETTINGS
    
    MAIN --> WINDOWS
    MAIN --> PRELOAD
    WINDOWS --> APP
    PRELOAD --> API_CLIENT
    
    APP --> HOME
    APP --> SETTINGS
    APP --> SIDEBAR
    APP --> HEADER
    
    HOME --> SEARCH_BAR
    HOME --> RESULTS
    RESULTS --> FILE_RESULT
    SEARCH_BAR --> MODE_SELECT
    
    SEARCH_BAR --> API_CLIENT
    API_CLIENT --> IPC_API
    SETTINGS --> STATE

    %% Styling
    classDef external fill:#FFF3E0,stroke:#F57C00,color:#000
    classDef electron fill:#9C27B0,stroke:#4A148C,color:#fff
    classDef react fill:#61DAFB,stroke:#21A0C4,color:#000
    classDef ui fill:#4CAF50,stroke:#2E7D32,color:#fff
    classDef utils fill:#FF9800,stroke:#E65100,color:#fff

    class API,FILES,GITHUB external
    class MAIN,WINDOWS,IPC_API,IPC_FOLDERS,IPC_FILES,PRELOAD electron
    class APP,HOME,SETTINGS react
    class SEARCH_BAR,RESULTS,FILE_RESULT,MODE_SELECT,SIDEBAR,HEADER ui
    class API_CLIENT,STATE utils
```

## Key Components

### **Electron Framework**
- **Main Process**: Application lifecycle and window management
- **Preload Script**: Secure bridge between main and renderer
- **IPC Handlers**: Communication with Flask backend
- **Native Integration**: File dialogs and system access

### **React Application**
- **Component Architecture**: Modular UI components
- **Search Interface**: Query input and result display
- **Settings Management**: Configuration and GitHub setup
- **State Management**: React hooks for data flow

### **Communication Flow**
- **User Input**: React components capture user interactions
- **IPC Bridge**: Secure communication to main process
- **API Proxy**: Main process forwards requests to Flask
- **Result Display**: Search results rendered in React UI

## Technology Stack

### **Frontend**
- **Electron**: Cross-platform desktop framework
- **React**: UI component library
- **TypeScript**: Type-safe development
- **CSS**: Modern responsive styling

### **Development**
- **Webpack**: Module bundling
- **Node.js**: JavaScript runtime
- **npm**: Package management
- **Hot Reload**: Development efficiency

---

*This frontend architecture reflects the current Electron + React implementation.*
