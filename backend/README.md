# DSA Code Analysis Platform - Backend

A comprehensive FastAPI backend for analyzing Data Structures and Algorithms code with visualizations, complexity analysis, and optimization suggestions.

## 🚀 Quick Start

### Option 1: Automated Setup (Recommended)

Run the setup script to automatically configure everything:

```bash
python setup.py
```

This will:
- Check Python version and virtual environment
- Create a `.env` file with your database configuration
- Install all dependencies
- Create necessary directories
- Test database connection
- Start the application

### Option 2: Manual Setup

#### 1. Prerequisites

- Python 3.8 or higher
- Virtual environment (recommended)
- PostgreSQL database (or SQLite for development)

#### 2. Install Dependencies

```bash
pip install -r requirements.txt
```

#### 3. Create Environment File

Create a `.env` file in the backend directory:

```bash
# Copy the example file
cp env.example .env

# Edit the .env file with your settings
nano .env
```

#### 4. Configure Database

**For Remote PostgreSQL (Recommended for Production):**
```
DATABASE_URL=postgresql://username:password@host:port/database?sslmode=require
```

**For Local SQLite (Development):**
```
DATABASE_URL=sqlite:///./dsa_analysis.db
```

#### 5. Start the Application

```bash
python main.py
```

## 📋 Environment Variables

### Required Settings

| Variable | Description | Example |
|----------|-------------|---------|
| `DATABASE_URL` | PostgreSQL connection string | `postgresql://user:pass@host:5432/db` |
| `SECRET_KEY` | Application secret key | `your-secret-key-here` |
| `JWT_SECRET_KEY` | JWT token secret key | `your-jwt-secret-key-here` |

### Optional Settings

| Variable | Default | Description |
|----------|---------|-------------|
| `DEBUG` | `False` | Enable debug mode |
| `ENVIRONMENT` | `production` | Environment (production/development) |
| `HOST` | `0.0.0.0` | Server host |
| `PORT` | `8000` | Server port |
| `REDIS_URL` | `None` | Redis connection URL |
| `CELERY_BROKER_URL` | `None` | Celery broker URL |

## 🗄️ Database Setup

### PostgreSQL (Production)

1. **Create Database:**
```sql
CREATE DATABASE dsa_analysis;
```

2. **Connection String Format:**
```
postgresql://username:password@host:port/database?sslmode=require
```

3. **SSL Configuration:**
- For cloud databases (Render, Railway, etc.), add `?sslmode=require`
- For local databases, SSL is optional

### SQLite (Development)

For local development, you can use SQLite:
```
DATABASE_URL=sqlite:///./dsa_analysis.db
```

## 🔧 Configuration

### Database Connection

The application automatically handles:
- SSL connections for remote databases
- Connection pooling
- Automatic fallback to SQLite if PostgreSQL fails
- Connection timeouts and retries

### Feature Flags

Control which features are enabled:

```bash
ENABLE_AI_ANALYSIS=False          # AI-powered analysis
ENABLE_CODE_EXECUTION=True        # Code execution
ENABLE_VISUALIZATION=True         # Code visualizations
ENABLE_COMPLEXITY_ANALYSIS=True   # Complexity analysis
```

## 🚀 Running the Application

### Development Mode

```bash
# Set debug mode
export DEBUG=True
export ENVIRONMENT=development

# Start with auto-reload
python main.py
```

### Production Mode

```bash
# Set production mode
export DEBUG=False
export ENVIRONMENT=production

# Start the application
python main.py
```

### Using Uvicorn Directly

```bash
uvicorn main:app --host 0.0.0.0 --port 8000 --reload
```

## 📊 API Endpoints

### Health Check
- `GET /health` - Application health status
- `GET /` - Root endpoint with API info

### API Documentation
- `GET /docs` - Interactive API docs (Swagger UI)
- `GET /redoc` - ReDoc API documentation

### Core Endpoints
- `POST /api/v1/analyze` - Analyze code
- `POST /api/v1/execute` - Execute code
- `GET /api/v1/languages` - Supported languages
- `POST /api/v1/optimize` - Get optimization suggestions

## 🔍 Troubleshooting

### Common Issues

#### 1. Database Connection Errors

**Error:** `Multiple exceptions: [Errno 10061] Connect call failed`

**Solution:**
- Check if your database is running
- Verify the connection string format
- Ensure SSL is configured for remote databases
- Check if your IP is whitelisted (for cloud databases)

**For Remote Databases:**
```
DATABASE_URL=postgresql://user:pass@host:5432/db?sslmode=require
```

#### 2. Missing Dependencies

**Error:** `ModuleNotFoundError: No module named 'fastapi'`

**Solution:**
```bash
pip install -r requirements.txt
```

#### 3. Permission Errors

**Error:** `Permission denied` when creating files

**Solution:**
```bash
# Create directories with proper permissions
mkdir -p uploads logs temp cache
chmod 755 uploads logs temp cache
```

#### 4. Port Already in Use

**Error:** `Address already in use`

**Solution:**
```bash
# Change port in .env file
PORT=8001

# Or kill the process using the port
lsof -ti:8000 | xargs kill -9
```

### Debug Mode

Enable debug mode for detailed error messages:

```bash
export DEBUG=True
python main.py
```

### Logs

Check application logs for detailed error information:

```bash
# View logs in real-time
tail -f logs/app.log

# Or check console output when DEBUG=True
```

## 🛠️ Development

### Project Structure

```
backend/
├── app/
│   ├── api/           # API routes
│   ├── core/          # Core configuration
│   ├── models/        # Database models
│   ├── services/      # Business logic
│   └── utils/         # Utilities
├── main.py           # Application entry point
├── setup.py          # Setup script
├── requirements.txt  # Dependencies
├── .env             # Environment variables
└── README.md        # This file
```

### Adding New Features

1. **Create API endpoint** in `app/api/v1/`
2. **Add business logic** in `app/services/`
3. **Create models** in `app/models/` if needed
4. **Update tests** in `tests/`

### Testing

```bash
# Run tests
pytest

# Run with coverage
pytest --cov=app
```

## 🚀 Deployment

### Render.com

1. **Connect your repository**
2. **Set environment variables:**
   - `DATABASE_URL`
   - `SECRET_KEY`
   - `JWT_SECRET_KEY`
   - `ENVIRONMENT=production`
   - `DEBUG=False`

3. **Build command:**
```bash
pip install -r requirements.txt
```

4. **Start command:**
```bash
python main.py
```

### Railway.app

1. **Deploy from GitHub**
2. **Add environment variables**
3. **Railway will auto-detect Python and run the app**

### Docker

```bash
# Build image
docker build -t dsa-analysis-backend .

# Run container
docker run -p 8000:8000 --env-file .env dsa-analysis-backend
```

## 📞 Support

If you encounter issues:

1. **Check the logs** for error messages
2. **Verify your configuration** in `.env`
3. **Test database connection** manually
4. **Enable debug mode** for detailed errors

## 🔒 Security

### Production Checklist

- [ ] Change default secret keys
- [ ] Set `DEBUG=False`
- [ ] Configure `ALLOWED_HOSTS`
- [ ] Use HTTPS in production
- [ ] Set up proper CORS origins
- [ ] Configure database SSL
- [ ] Set up monitoring and logging

### Environment Variables Security

- Never commit `.env` files to version control
- Use strong, unique secret keys
- Rotate keys regularly
- Use environment-specific configurations

## 📈 Monitoring

### Health Check

Monitor application health:
```bash
curl http://localhost:8000/health
```

### Metrics

The application provides health metrics at `/health` endpoint.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License. 