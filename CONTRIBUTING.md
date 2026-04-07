# Contributing to JusticeAI

Thank you for your interest in contributing to JusticeAI! This document provides guidelines and instructions for contributing to the project.

## 🌟 How to Contribute

### Reporting Bugs

Before creating bug reports, please check the existing issues as you might find out that you don't need to create one. When you are creating a bug report, please include as many details as possible:

* **Use a clear and descriptive title**
* **Describe the exact steps to reproduce the problem**
* **Provide specific examples to demonstrate the steps**
* **Describe the behavior you observed and what behavior you expected**
* **Include screenshots if possible**
* **Include system information (OS, Node.js version, browser)**

### Suggesting Features

Feature suggestions are tracked as GitHub issues. When creating a feature suggestion:

* **Use a clear and descriptive title**
* **Provide a detailed description of the suggested feature**
* **Explain why this feature would be useful**
* **List some examples of how this feature would be used**

### Pull Requests

1. Fork the repository and create your branch from `main`
2. If you've added code that should be tested, add tests
3. If you've changed APIs, update the documentation
4. Ensure the test suite passes
5. Make sure your code lints
6. Issue that pull request!

## 📋 Development Workflow

### Setting Up Development Environment

1. **Clone your fork**
   ```bash
   git clone https://github.com/YOUR_USERNAME/justiceai.git
   cd justiceai
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Ollama**
   ```bash
   # Make sure Ollama is running
   ollama serve
   
   # Pull required models
   ollama pull nomic-embed-text
   ollama pull gemma3:4b
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

### Code Style

* **JavaScript/JSX**: We use ESLint with a custom configuration. Run `npm run lint` to check.
* **Formatting**: We use Prettier. Run `npm run format` before committing.
* **Pre-commit hooks**: We use Husky with lint-staged to automatically lint and format staged files.

### Commit Messages

* Use the present tense ("Add feature" not "Added feature")
* Use the imperative mood ("Move cursor to..." not "Moves cursor to...")
* Limit the first line to 72 characters or less
* Reference issues and pull requests liberally after the first line

### Testing

* Write tests for new features
* Ensure all tests pass before submitting a PR
* Run tests with `npm test`
* Generate coverage reports with `npm run test:coverage`

## 🏗️ Architecture Guidelines

### Component Structure

```jsx
// Use functional components with hooks
function MyComponent({ prop1, prop2 }) {
  // Hooks at the top
  const [state, setState] = useState(initialValue);
  
  // Event handlers
  const handleClick = () => { /* ... */ };
  
  // Render
  return (
    <div className="my-component">
      {/* content */}
    </div>
  );
}
```

### File Naming

* Components: `PascalCase.jsx` (e.g., `ChatPanel.jsx`)
* Utilities: `camelCase.js` (e.g., `parseAnalysis.js`)
* Styles: Use Tailwind utility classes; avoid separate CSS files when possible
* Tests: `*.test.jsx` or `*.spec.jsx`

### Import Organization

```javascript
// 1. React and third-party libraries
import React, { useState } from 'react';
import { motion } from 'framer-motion';

// 2. Internal imports (use @ alias)
import { useToast } from '@/components/ui/Toast';
import { sendMessage } from '@/lib/claudeApi';

// 3. Styles
import './MyComponent.css';
```

## 📝 Types of Contributions

### 1. Code Contributions

* Fix bugs
* Add new features
* Improve performance
* Add tests
* Improve documentation

### 2. Legal Data Contributions

We welcome contributions that improve the accuracy of our legal calculations:

* **Court Fee Data**: Help us integrate official fee schedules from eCourts portals
* **State-wise Slabs**: Contribute structured data for state-specific court fees
* **Consumer Forum Fees**: Add/update consumer court fee calculations
* **RERA Fees**: Contribute Real Estate Regulatory Authority fee data

**Recommended Data Sources:**
- eCourts.gov.in fee calculators
- State government gazette notifications
- Court Fees Act 1870 schedules
- Consumer Protection Act fee structures

If you have access to official fee schedule data or can help scrape/structure this information from government sources, please open an issue or PR!

### 2. Documentation Contributions

* Fix typos
* Clarify unclear sections
* Add examples
* Translate documentation

### 3. Design Contributions

* Improve UI/UX
* Create new icons or graphics
* Suggest color scheme improvements

## 🔍 Code Review Process

All submissions require code review. Reviewers will check for:

* Code quality and style
* Test coverage
* Documentation
* Performance impact
* Security considerations

## 📜 License

By contributing to JusticeAI, you agree that your contributions will be licensed under the MIT License.

## 🙏 Thank You!

Your contributions to open source, large or small, make projects like this possible. Thank you for taking the time to contribute.