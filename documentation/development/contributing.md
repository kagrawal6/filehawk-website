# Contributing to Filevate

**Complete guide for contributing to the Filevate semantic intelligence platform**

## Welcome Contributors! 🎉

Thank you for your interest in contributing to Filevate! We're building the future of semantic document search and every contribution helps make it better. Whether you're fixing bugs, adding features, improving documentation, or sharing ideas, your contributions are valued.

## Code of Conduct

### Our Commitment

We are committed to providing a friendly, safe, and welcoming environment for all contributors regardless of experience level, gender identity, sexual orientation, disability, personal appearance, body size, race, ethnicity, age, religion, nationality, or other similar characteristics.

### Expected Behavior

- **Be respectful**: Treat everyone with respect and kindness
- **Be collaborative**: Help others learn and grow
- **Be constructive**: Provide helpful feedback and suggestions
- **Be patient**: Remember that everyone has different skill levels
- **Be inclusive**: Welcome newcomers and help them get started

### Unacceptable Behavior

- Harassment, discrimination, or offensive comments
- Personal attacks or trolling
- Publishing private information without permission
- Spam, self-promotion, or off-topic discussions
- Any behavior that would be inappropriate in a professional setting

## Getting Started

### **Development Environment Setup**

1. **Fork and Clone**
   ```bash
   # Fork the repository on GitHub
   git clone https://github.com/your-username/filevate.git
   cd filevate
   
   # Add upstream remote
   git remote add upstream https://github.com/original-org/filevate.git
   ```

2. **Environment Setup**
   ```bash
   # Create virtual environment
   python3 -m venv venv
   source venv/bin/activate  # Windows: venv\Scripts\activate
   
   # Install dependencies
   pip install -r requirements.txt
   pip install -r requirements-dev.txt  # Development dependencies
   
   # Setup pre-commit hooks
   pre-commit install
   ```

3. **Desktop App Setup**
   ```bash
   cd desktop-app
   npm install
   ```

4. **Verify Setup**
   ```bash
   # Run tests to verify everything works
   python -m pytest tests/ -v
   python test_api.py
   
   # Start development environment
   python api.py  # Backend
   cd desktop-app && npm start  # Frontend
   ```

### **Understanding the Codebase**

Before contributing, familiarize yourself with:

- [Architecture Overview](../architecture/overview.md) - High-level system design
- [API Documentation](../api/README.md) - REST API endpoints
- [Algorithm Documentation](../algorithms/) - Core AI algorithms
- [Developer Guide](getting-started.md) - Development environment setup

## Types of Contributions

### **🐛 Bug Reports**

Help us improve by reporting bugs you encounter:

#### **Before Submitting a Bug Report**

1. **Search existing issues** to avoid duplicates
2. **Try the latest version** to see if it's already fixed
3. **Gather information** about your environment

#### **Bug Report Template**

```markdown
**Bug Description**
A clear description of what the bug is.

**To Reproduce**
Steps to reproduce the behavior:
1. Go to '...'
2. Click on '....'
3. Scroll down to '....'
4. See error

**Expected Behavior**
What you expected to happen.

**Screenshots**
If applicable, add screenshots.

**Environment (please complete):**
- OS: [e.g. Windows 10, macOS 12, Ubuntu 20.04]
- Python Version: [e.g. 3.9.16]
- Node.js Version: [e.g. 16.17.0]
- Filevate Version: [e.g. 1.0.0]

**Additional Context**
Any other context about the problem.

**Logs**
Relevant log output (if any).
```

### **✨ Feature Requests**

Suggest new features or improvements:

#### **Feature Request Template**

```markdown
**Is your feature request related to a problem?**
A clear description of what the problem is.

**Describe the solution you'd like**
A clear description of what you want to happen.

**Describe alternatives you've considered**
Alternative solutions or features you've considered.

**Additional context**
Any other context, mockups, or examples.

**Technical Considerations**
Any technical details or implementation ideas.
```

### **📝 Documentation Improvements**

Documentation is crucial for user and developer experience:

- **Fix typos and grammar**
- **Improve clarity and organization**
- **Add missing information**
- **Create tutorials and examples**
- **Update outdated content**

### **🔧 Code Contributions**

#### **Types of Code Contributions**

1. **Bug Fixes**: Fix reported issues
2. **Performance Improvements**: Optimize algorithms or UI
3. **New Features**: Add requested functionality
4. **Refactoring**: Improve code quality and maintainability
5. **Testing**: Add or improve test coverage

#### **Development Workflow**

1. **Choose or Create an Issue**
   - Look for issues labeled `good first issue` for beginners
   - Comment on the issue to indicate you're working on it
   - For new features, create an issue first to discuss

2. **Create a Feature Branch**
   ```bash
   git checkout main
   git pull upstream main
   git checkout -b feature/your-feature-name
   ```

3. **Make Your Changes**
   - Follow coding standards (see below)
   - Write or update tests
   - Update documentation if needed
   - Ensure all tests pass

4. **Commit Your Changes**
   ```bash
   # Follow conventional commit format
   git commit -m "feat(search): add advanced filtering options"
   ```

5. **Submit Pull Request**
   - Push your branch to your fork
   - Create a pull request on GitHub
   - Fill out the PR template completely

## Coding Standards

### **Python Code Style**

We follow PEP 8 with some modifications:

```python
# Good example
class SearchEngine:
    """
    Semantic search engine with dual-mode intelligence.
    
    This class implements both gist and pinpoint search modes,
    providing comprehensive document understanding capabilities.
    """
    
    def __init__(self, config: Config):
        self.config = config
        self.logger = logger_manager.get_logger('search')
        self._models = {}
    
    def search(
        self, 
        query: str, 
        mode: SearchMode = SearchMode.GIST,
        limit: int = 10
    ) -> List[SearchResult]:
        """
        Perform semantic search with specified mode.
        
        Args:
            query: Natural language search query
            mode: Search mode (gist or pinpoint)
            limit: Maximum number of results to return
            
        Returns:
            List of search results with confidence scores
            
        Raises:
            ValueError: If query is empty or invalid
            SearchError: If search operation fails
        """
        if not query or not query.strip():
            raise ValueError("Query cannot be empty")
        
        self.logger.info(f"Performing {mode.value} search", extra={
            'query_length': len(query),
            'mode': mode.value,
            'limit': limit
        })
        
        try:
            results = self._execute_search(query, mode, limit)
            self.logger.info(f"Search completed successfully", extra={
                'result_count': len(results),
                'avg_confidence': np.mean([r.confidence for r in results])
            })
            return results
            
        except Exception as e:
            self.logger.error(f"Search failed: {str(e)}", extra={
                'query': query[:50],  # Truncate for privacy
                'mode': mode.value
            })
            raise SearchError(f"Search operation failed: {str(e)}") from e
```

#### **Python Style Guidelines**

```yaml
Code Style:
  ✅ Use type hints for all function parameters and returns
  ✅ Write comprehensive docstrings (Google style)
  ✅ Follow PEP 8 naming conventions
  ✅ Use dataclasses for simple data containers
  ✅ Prefer composition over inheritance
  ✅ Use context managers for resource management
  ✅ Handle exceptions explicitly and meaningfully
  ✅ Add logging for important operations

Formatting:
  ✅ Line length: 100 characters (not 80)
  ✅ Use black for automatic formatting
  ✅ Use isort for import organization
  ✅ Use flake8 for linting

Documentation:
  ✅ All public functions must have docstrings
  ✅ Include examples in complex function docstrings
  ✅ Document all parameters and return values
  ✅ Explain any side effects or exceptions
```

### **TypeScript/React Code Style**

```typescript
// Good example
interface SearchComponentProps {
  query: string;
  results: SearchResult[];
  isLoading: boolean;
  onQueryChange: (query: string) => void;
  onResultClick: (result: SearchResult) => void;
}

/**
 * SearchComponent displays search interface with real-time results.
 * 
 * Features:
 * - Real-time search as user types
 * - Confidence score visualization
 * - Result highlighting and interaction
 * - Loading states and error handling
 */
export const SearchComponent: React.FC<SearchComponentProps> = ({
  query,
  results,
  isLoading,
  onQueryChange,
  onResultClick
}) => {
  const [searchMode, setSearchMode] = useState<SearchMode>('gist');
  const debouncedQuery = useDebounce(query, 300);

  // Perform search when debounced query changes
  useEffect(() => {
    if (debouncedQuery.trim()) {
      performSearch(debouncedQuery, searchMode);
    }
  }, [debouncedQuery, searchMode]);

  const handleResultSelection = useCallback((result: SearchResult) => {
    // Track user interaction for analytics
    analytics.track('result_clicked', {
      file_path: result.file_path,
      confidence: result.confidence,
      search_mode: searchMode
    });
    
    onResultClick(result);
  }, [onResultClick, searchMode]);

  if (isLoading) {
    return (
      <div className="search-loading" data-testid="search-loading">
        <LoadingSpinner />
        <span>Searching...</span>
      </div>
    );
  }

  return (
    <div className="search-component" data-testid="search-component">
      <SearchModeSelector 
        mode={searchMode}
        onChange={setSearchMode}
      />
      
      <SearchResultsList
        results={results}
        onResultClick={handleResultSelection}
        highlightQuery={query}
      />
    </div>
  );
};
```

#### **TypeScript Style Guidelines**

```yaml
Code Style:
  ✅ Use strict TypeScript configuration
  ✅ Define interfaces for all props and data structures
  ✅ Use functional components with hooks
  ✅ Implement proper error boundaries
  ✅ Use meaningful component and variable names
  ✅ Extract custom hooks for reusable logic
  ✅ Memoize expensive operations
  ✅ Use proper dependency arrays in useEffect

File Organization:
  ✅ One component per file
  ✅ Group related components in directories
  ✅ Use index.ts files for clean imports
  ✅ Separate types into dedicated files
  ✅ Keep utility functions in utils/ directory

Testing:
  ✅ Write unit tests for all components
  ✅ Use React Testing Library
  ✅ Test user interactions and edge cases
  ✅ Mock external dependencies
```

## Testing Guidelines

### **Testing Philosophy**

- **Write tests first** for new features (TDD approach)
- **Test behavior, not implementation**
- **Focus on user-facing functionality**
- **Ensure high test coverage** (>80% minimum)
- **Test edge cases and error conditions**

### **Python Testing**

```python
# test_search_engine.py - Example test file
import pytest
import numpy as np
from unittest.mock import Mock, patch, MagicMock

from search_engine import SearchEngine, SearchMode, SearchError
from test_helpers import create_mock_config, create_test_documents

class TestSearchEngine:
    """Comprehensive test suite for SearchEngine."""
    
    @pytest.fixture
    def mock_config(self):
        """Create mock configuration for testing."""
        return create_mock_config()
    
    @pytest.fixture
    def search_engine(self, mock_config):
        """Create SearchEngine instance for testing."""
        return SearchEngine(mock_config)
    
    @pytest.fixture
    def test_documents(self):
        """Create test document corpus."""
        return create_test_documents()
    
    def test_search_with_valid_query_returns_results(self, search_engine):
        """Test that valid queries return appropriate results."""
        # Arrange
        query = "machine learning algorithms"
        expected_result_count = 5
        
        # Act
        results = search_engine.search(query, SearchMode.GIST, limit=10)
        
        # Assert
        assert len(results) <= 10
        assert all(result.confidence >= 0.0 for result in results)
        assert all(result.confidence <= 1.0 for result in results)
        assert all(hasattr(result, 'file_path') for result in results)
    
    def test_search_with_empty_query_raises_error(self, search_engine):
        """Test that empty queries raise appropriate error."""
        # Arrange & Act & Assert
        with pytest.raises(ValueError, match="Query cannot be empty"):
            search_engine.search("", SearchMode.GIST)
        
        with pytest.raises(ValueError, match="Query cannot be empty"):
            search_engine.search("   ", SearchMode.GIST)
    
    @patch('search_engine.SentenceTransformer')
    def test_search_with_model_failure_raises_search_error(
        self, mock_transformer, search_engine
    ):
        """Test error handling when model fails."""
        # Arrange
        mock_transformer.return_value.encode.side_effect = RuntimeError("Model failed")
        
        # Act & Assert
        with pytest.raises(SearchError, match="Search operation failed"):
            search_engine.search("test query", SearchMode.GIST)
    
    def test_gist_mode_returns_different_results_than_pinpoint(self, search_engine):
        """Test that different modes produce different results."""
        # Arrange
        query = "data processing techniques"
        
        # Act
        gist_results = search_engine.search(query, SearchMode.GIST, limit=5)
        pinpoint_results = search_engine.search(query, SearchMode.PINPOINT, limit=5)
        
        # Assert
        assert len(gist_results) > 0
        assert len(pinpoint_results) > 0
        
        # Results should be different (may have some overlap but not identical)
        gist_files = {r.file_path for r in gist_results}
        pinpoint_files = {r.file_path for r in pinpoint_results}
        assert gist_files != pinpoint_files or len(gist_files.symmetric_difference(pinpoint_files)) > 0
    
    def test_search_confidence_scores_are_properly_calibrated(self, search_engine):
        """Test that confidence scores are well-distributed."""
        # Arrange
        queries = [
            "exact match phrase",
            "somewhat related topic", 
            "completely unrelated random words xyz"
        ]
        
        # Act
        all_confidences = []
        for query in queries:
            results = search_engine.search(query, SearchMode.GIST, limit=10)
            all_confidences.extend([r.confidence for r in results])
        
        # Assert
        if all_confidences:
            # Should have good distribution of confidence scores
            assert min(all_confidences) >= 0.0
            assert max(all_confidences) <= 1.0
            assert np.std(all_confidences) > 0.1  # Some variance in scores
    
    @pytest.mark.performance
    def test_search_performance_benchmark(self, search_engine):
        """Test that search performance meets requirements."""
        import time
        
        # Arrange
        query = "performance test query"
        
        # Act
        start_time = time.time()
        results = search_engine.search(query, SearchMode.GIST, limit=20)
        search_duration = time.time() - start_time
        
        # Assert
        assert search_duration < 0.5  # Should complete in under 500ms
        assert len(results) <= 20
    
    @pytest.mark.integration
    def test_search_integration_with_real_documents(self, search_engine, test_documents):
        """Integration test with real document corpus."""
        # This test uses real documents and models
        # Arrange
        # Index test documents first
        for doc in test_documents:
            search_engine.index_document(doc)
        
        # Act
        results = search_engine.search("artificial intelligence", SearchMode.GIST)
        
        # Assert
        assert len(results) > 0
        # Check that AI-related documents rank highly
        ai_related_results = [r for r in results[:5] if 'ai' in r.file_path.lower() or 'artificial' in r.snippet.lower()]
        assert len(ai_related_results) > 0
```

### **Frontend Testing**

```typescript
// SearchComponent.test.tsx
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SearchComponent } from './SearchComponent';
import { SearchResult } from '../types';

// Mock the API client
jest.mock('../utils/api', () => ({
  searchDocuments: jest.fn()
}));

describe('SearchComponent', () => {
  const mockResults: SearchResult[] = [
    {
      file_name: 'test-document.pdf',
      file_path: '/test/test-document.pdf',
      confidence: 0.85,
      snippet: 'This is a test document about machine learning...'
    }
  ];

  const defaultProps = {
    query: '',
    results: [],
    isLoading: false,
    onQueryChange: jest.fn(),
    onResultClick: jest.fn()
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders search interface correctly', () => {
    render(<SearchComponent {...defaultProps} />);
    
    expect(screen.getByTestId('search-component')).toBeInTheDocument();
    expect(screen.getByRole('combobox')).toBeInTheDocument(); // Search mode selector
  });

  it('displays loading state when searching', () => {
    render(<SearchComponent {...defaultProps} isLoading={true} />);
    
    expect(screen.getByTestId('search-loading')).toBeInTheDocument();
    expect(screen.getByText('Searching...')).toBeInTheDocument();
  });

  it('displays search results correctly', () => {
    render(<SearchComponent {...defaultProps} results={mockResults} />);
    
    expect(screen.getByText('test-document.pdf')).toBeInTheDocument();
    expect(screen.getByText(/85%/)).toBeInTheDocument(); // Confidence percentage
    expect(screen.getByText(/This is a test document/)).toBeInTheDocument();
  });

  it('calls onResultClick when result is clicked', async () => {
    const user = userEvent.setup();
    const onResultClick = jest.fn();
    
    render(<SearchComponent 
      {...defaultProps} 
      results={mockResults}
      onResultClick={onResultClick}
    />);
    
    const resultElement = screen.getByText('test-document.pdf');
    await user.click(resultElement);
    
    expect(onResultClick).toHaveBeenCalledWith(mockResults[0]);
  });

  it('changes search mode correctly', async () => {
    const user = userEvent.setup();
    
    render(<SearchComponent {...defaultProps} />);
    
    const modeSelector = screen.getByRole('combobox');
    await user.selectOptions(modeSelector, 'pinpoint');
    
    expect(modeSelector).toHaveValue('pinpoint');
  });

  it('handles keyboard navigation', async () => {
    const user = userEvent.setup();
    
    render(<SearchComponent {...defaultProps} results={mockResults} />);
    
    // Test arrow key navigation
    await user.keyboard('{ArrowDown}');
    
    const firstResult = screen.getByText('test-document.pdf');
    expect(firstResult).toHaveClass('focused'); // Assuming focus styling
  });

  it('debounces search queries correctly', async () => {
    jest.useFakeTimers();
    const mockSearch = jest.fn();
    
    // Mock the search hook
    jest.mock('../hooks/useSearch', () => ({
      useSearch: () => ({ performSearch: mockSearch })
    }));
    
    const user = userEvent.setup({ delay: null });
    
    render(<SearchComponent {...defaultProps} />);
    
    const searchInput = screen.getByRole('textbox');
    
    // Type rapidly
    await user.type(searchInput, 'test');
    
    // Fast-forward time
    jest.advanceTimersByTime(250); // Before debounce
    expect(mockSearch).not.toHaveBeenCalled();
    
    jest.advanceTimersByTime(100); // After debounce (300ms total)
    expect(mockSearch).toHaveBeenCalledWith('test', 'gist');
    
    jest.useRealTimers();
  });
});
```

## Pull Request Process

### **Pull Request Template**

```markdown
## Description
Brief description of the changes and the problem they solve.

## Type of Change
- [ ] Bug fix (non-breaking change which fixes an issue)
- [ ] New feature (non-breaking change which adds functionality)
- [ ] Breaking change (fix or feature that would cause existing functionality to not work as expected)
- [ ] Documentation update
- [ ] Performance improvement
- [ ] Code refactoring

## Testing
- [ ] I have added tests that prove my fix is effective or that my feature works
- [ ] New and existing unit tests pass locally with my changes
- [ ] I have tested this change manually

## Documentation
- [ ] I have updated relevant documentation
- [ ] Code is self-documenting with clear comments
- [ ] API changes are documented

## Checklist
- [ ] My code follows the style guidelines of this project
- [ ] I have performed a self-review of my own code
- [ ] I have commented my code, particularly in hard-to-understand areas
- [ ] My changes generate no new warnings
- [ ] Any dependent changes have been merged and published

## Screenshots (if applicable)
Add screenshots to help explain your changes.

## Related Issues
Fixes #(issue number)
```

### **Pull Request Review Process**

1. **Automated Checks**
   - All tests must pass
   - Code coverage must not decrease
   - Linting checks must pass
   - Build must succeed

2. **Code Review**
   - At least one maintainer approval required
   - Address all review comments
   - Ensure code follows style guidelines

3. **Manual Testing**
   - Feature works as expected
   - No regressions introduced
   - Performance impact assessed

4. **Merge Requirements**
   - All conversations resolved
   - Branch is up to date with main
   - Commit history is clean

## Recognition and Rewards

### **Contributor Recognition**

We recognize valuable contributions through:

- **Contributors file**: All contributors listed in CONTRIBUTORS.md
- **Release notes**: Significant contributions highlighted
- **GitHub badges**: Contributor status on profile
- **Special mentions**: Outstanding contributions featured in blog posts

### **Becoming a Maintainer**

Regular contributors may be invited to become maintainers based on:

- **Quality of contributions**: Well-tested, documented code
- **Community involvement**: Helping others, reviewing PRs
- **Domain expertise**: Deep knowledge of specific areas
- **Reliability**: Consistent, long-term involvement

## Communication Channels

### **Getting Help**

- **GitHub Issues**: Technical questions and bug reports
- **GitHub Discussions**: General questions and ideas
- **Discord Community**: Real-time chat and support
- **Stack Overflow**: Tag questions with `filevate`

### **Stay Updated**

- **Watch the repository** for notifications
- **Follow release announcements**
- **Join our mailing list** for major updates
- **Follow us on Twitter** for news and tips

## Contribution Ideas

### **Good First Issues**

Perfect for new contributors:

- Documentation improvements
- UI/UX enhancements
- Adding test cases
- Fixing typos and broken links
- Improving error messages

### **Advanced Contributions**

For experienced developers:

- Performance optimizations
- New search algorithms
- Integration features
- Security enhancements
- Accessibility improvements

### **Research Opportunities**

For researchers and academics:

- Novel ranking algorithms
- Embedding model improvements
- Evaluation methodologies
- User experience studies
- Benchmarking frameworks

---

**Thank you for contributing to Filevate! Together, we're building the future of semantic document search. 🚀**
