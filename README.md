# 🚀 DSA Code Analysis Platform

A comprehensive platform for analyzing Data Structures and Algorithms code with real-time visualizations, complexity analysis, and AI-powered insights.

## ✨ Features

### 🔍 **Code Analysis**
- **Multi-language Support**: Python, JavaScript, Java, C++, C, Go, Rust, and more
- **AST Analysis**: Abstract Syntax Tree parsing and visualization
- **Complexity Analysis**: Time and space complexity calculation
- **Real-time Execution**: Step-by-step code execution with variable tracking
- **AI-Powered Insights**: Intelligent code analysis and optimization suggestions

### 🎯 **Visualization & Learning**
- **Interactive Visualizations**: Real-time algorithm visualization
- **Step-by-Step Execution**: Trace code execution line by line
- **Data Structure Visualization**: Trees, graphs, arrays, and more
- **Performance Metrics**: Execution time, memory usage, and CPU analysis

### 🛠️ **Development Tools**
- **Batch Analysis**: Analyze multiple files simultaneously
- **Code Optimization**: AI-powered optimization suggestions
- **Security Analysis**: Vulnerability detection and security scanning
- **Code Quality Metrics**: Complexity, maintainability, and best practices

### 🔐 **Enterprise Features**
- **User Authentication**: JWT-based authentication system
- **Database Storage**: PostgreSQL with SQLite fallback
- **API Documentation**: Interactive Swagger/OpenAPI docs
- **Monitoring & Logging**: Comprehensive metrics and error tracking
- **CI/CD Pipeline**: Automated testing and deployment

## 🏗️ Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │    Backend      │    │   Database      │
│   (React)       │◄──►│   (FastAPI)     │◄──►│  (PostgreSQL)   │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         │              ┌─────────────────┐              │
         │              │   Redis Cache   │              │
         │              └─────────────────┘              │
         │                       │                       │
         │              ┌─────────────────┐              │
         └──────────────►│   AI Services   │◄─────────────┘
                        └─────────────────┘
```

## 🚀 Quick Start

### Prerequisites
- Python 3.11+
- Node.js 18+
- PostgreSQL (optional, SQLite fallback available)
- Redis (optional, in-memory fallback available)

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/dsa-code-analysis-platform.git
cd dsa-code-analysis-platform
```

### 2. Backend Setup
```bash
cd backend

# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Set up environment
cp env.example .env
# Edit .env with your configuration

# Run the application
python main.py
```

### 3. Frontend Setup
```bash
cd frontend

# Install dependencies
npm install

# Start development server
npm start
```

### 4. Access the Application
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8000
- **API Documentation**: http://localhost:8000/docs

## 📚 Usage Guide

### 1. Code Analysis
1. Navigate to the "Analyze Code" page
2. Select your programming language
3. Paste your code in the editor
4. Choose analysis type (AST, Complexity, Visualization)
5. Click "Analyze" to get comprehensive results

### 2. Real-time Execution
1. Go to the "Execute Code" page
2. Write or paste your code
3. Provide input data if required
4. Click "Execute" to see step-by-step execution
5. Watch variables change in real-time

### 3. Batch Analysis
1. Visit the "Batch Analysis" page
2. Upload multiple code files
3. Select analysis types for each file
4. Run batch analysis to get comprehensive reports

### 4. Code Optimization
1. Use the "Optimization" page
2. Analyze your code for performance issues
3. Get AI-powered optimization suggestions
4. Apply optimizations automatically

## 🔧 Configuration

### Environment Variables
Key configuration options in `.env`:

```bash
# Required
SECRET_KEY=your-super-secret-key
JWT_SECRET_KEY=your-jwt-secret-key
DATABASE_URL=postgresql://user:pass@localhost/dsa_analysis

# Optional
DEBUG=False
ENVIRONMENT=production
REDIS_URL=redis://localhost:6379/0
```

### Database Setup
```sql
-- Create PostgreSQL database
CREATE DATABASE dsa_analysis;

-- The application will automatically create tables
```

## 🧪 Testing

### Backend Tests
```bash
cd backend
pytest tests/ -v --cov=app
```

### Frontend Tests
```bash
cd frontend
npm test
```

### End-to-End Tests
```bash
# Run the complete test suite
npm run test:e2e
```

## 🚀 Deployment

### Docker Deployment
```bash
# Build and run with Docker Compose
docker-compose up -d
```

### Production Deployment
```bash
# Backend
cd backend
python main.py

# Frontend (build for production)
cd frontend
npm run build
npm install -g serve
serve -s build -l 3000
```

### Cloud Deployment
- **Backend**: Deploy to Render, Railway, or AWS
- **Frontend**: Deploy to Vercel, Netlify, or AWS S3
- **Database**: Use managed PostgreSQL (AWS RDS, Google Cloud SQL)

## 📊 API Documentation

### Core Endpoints

#### Code Analysis
```http
POST /api/v1/analysis/analyze
{
  "code": "def fibonacci(n): return n if n <= 1 else fibonacci(n-1) + fibonacci(n-2)",
  "language": "python",
  "analysis_type": "full"
}
```

#### Code Execution
```http
POST /api/v1/execution/execute
{
  "code": "print('Hello, World!')",
  "language": "python",
  "input_data": []
}
```

#### Optimization
```http
POST /api/v1/optimization/suggest
{
  "code": "def slow_function(n): return sum(range(n))",
  "language": "python",
  "optimization_type": "performance"
}
```

### Authentication
```http
POST /api/v1/auth/login
{
  "username": "user@example.com",
  "password": "password123"
}
```

## 🔒 Security Features

- **JWT Authentication**: Secure token-based authentication
- **Rate Limiting**: API rate limiting to prevent abuse
- **Input Validation**: Comprehensive input sanitization
- **CORS Protection**: Configurable cross-origin resource sharing
- **SQL Injection Protection**: Parameterized queries
- **XSS Protection**: Input sanitization and output encoding

## 📈 Monitoring & Analytics

- **Health Checks**: `/health` endpoint for monitoring
- **Metrics Collection**: Request counts, response times, error rates
- **Logging**: Structured logging with different levels
- **Error Tracking**: Comprehensive error reporting and debugging

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow PEP 8 for Python code
- Use ESLint and Prettier for JavaScript
- Write comprehensive tests
- Update documentation for new features

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **FastAPI** for the excellent web framework
- **React** and **Material-UI** for the frontend
- **Tree-sitter** for multi-language parsing
- **Plotly** for interactive visualizations
- **PostgreSQL** for reliable data storage

## 📞 Support

- **Documentation**: [Wiki](https://github.com/yourusername/dsa-code-analysis-platform/wiki)
- **Issues**: [GitHub Issues](https://github.com/yourusername/dsa-code-analysis-platform/issues)
- **Discussions**: [GitHub Discussions](https://github.com/yourusername/dsa-code-analysis-platform/discussions)
- **Email**: support@dsa-analysis.com

## 🎯 Roadmap

### Phase 1 (Current)
- ✅ Multi-language code analysis
- ✅ Real-time execution tracing
- ✅ Basic visualizations
- ✅ User authentication

### Phase 2 (Next)
- 🔄 Advanced algorithm detection
- 🔄 Machine learning optimization
- 🔄 Collaborative coding features
- 🔄 Mobile application

### Phase 3 (Future)
- 📋 AI-powered code generation
- 📋 Advanced security analysis
- 📋 Integration with IDEs
- 📋 Educational content platform

---

**Made with ❤️ for the developer community**

