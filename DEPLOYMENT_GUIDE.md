# 🚀 DSA Code Analysis Platform - Production Deployment Guide

## Overview

This guide provides comprehensive instructions for deploying the DSA Code Analysis Platform to production environments with enterprise-grade reliability, security, and performance.

## 🏗️ Architecture

```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │   Backend API   │    │   Database      │
│   (React)       │◄──►│   (FastAPI)     │◄──►│   (PostgreSQL)  │
│   Port: 3000    │    │   Port: 8000    │    │   Port: 5432    │
└─────────────────┘    └─────────────────┘    └─────────────────┘
         │                       │                       │
         │              ┌─────────────────┐              │
         │              │   Redis Cache   │              │
         │              │   Port: 6379    │              │
         │              └─────────────────┘              │
         │                       │                       │
         │              ┌─────────────────┐              │
         └──────────────►│   Nginx Proxy   │◄─────────────┘
                        │   Port: 80/443  │
                        └─────────────────┘
```

## 📋 Prerequisites

### System Requirements
- **CPU**: 4+ cores (8+ recommended)
- **RAM**: 8GB+ (16GB+ recommended)
- **Storage**: 50GB+ SSD
- **OS**: Ubuntu 20.04+ / CentOS 8+ / Debian 11+

### Software Requirements
- **Docker**: 20.10+
- **Docker Compose**: 2.0+
- **Git**: 2.30+
- **Node.js**: 18+ (for frontend build)
- **Python**: 3.9+ (for backend)

## 🔧 Installation Steps

### 1. Clone Repository
```bash
git clone https://github.com/your-org/dsa-code-analysis-platform.git
cd dsa-code-analysis-platform
```

### 2. Environment Configuration

#### Backend Environment (.env)
```bash
# Copy example environment file
cp backend/env.example backend/.env

# Edit with your production values
nano backend/.env
```

**Required Backend Variables:**
```env
# Application
DEBUG=False
ENVIRONMENT=production
SECRET_KEY=your-super-secret-key-here
JWT_SECRET_KEY=your-jwt-secret-key-here

# Database
DATABASE_URL=postgresql://username:password@host:5432/dsa_platform
DATABASE_POOL_SIZE=20
DATABASE_MAX_OVERFLOW=30

# Redis (Optional but recommended)
REDIS_URL=redis://localhost:6379/0

# Security
ALLOWED_HOSTS=https://yourdomain.com,https://www.yourdomain.com

# Monitoring
SENTRY_DSN=your-sentry-dsn
PROMETHEUS_ENABLED=True

# AI Features (Optional)
OPENAI_API_KEY=your-openai-key
ANTHROPIC_API_KEY=your-anthropic-key

# Email (Optional)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USERNAME=your-email@gmail.com
SMTP_PASSWORD=your-app-password
```

#### Frontend Environment (.env)
```bash
# Copy example environment file
cp frontend/env.example frontend/.env

# Edit with your production values
nano frontend/.env
```

**Required Frontend Variables:**
```env
# API Configuration
REACT_APP_API_URL=https://api.yourdomain.com/api/v1
REACT_APP_WS_URL=wss://api.yourdomain.com/ws

# Application Settings
REACT_APP_NAME=DSA Code Visualizer Pro
REACT_APP_ENVIRONMENT=production

# Analytics (Optional)
REACT_APP_GA_TRACKING_ID=your-ga-tracking-id
REACT_APP_SENTRY_DSN=your-sentry-dsn

# Feature Flags
REACT_APP_ENABLE_AI_ANALYSIS=true
REACT_APP_ENABLE_CODE_EXECUTION=true
REACT_APP_ENABLE_VISUALIZATION=true
```

### 3. Database Setup

#### PostgreSQL Installation
```bash
# Ubuntu/Debian
sudo apt update
sudo apt install postgresql postgresql-contrib

# CentOS/RHEL
sudo yum install postgresql-server postgresql-contrib
sudo postgresql-setup initdb
sudo systemctl start postgresql
sudo systemctl enable postgresql
```

#### Database Configuration
```bash
# Switch to postgres user
sudo -u postgres psql

# Create database and user
CREATE DATABASE dsa_platform;
CREATE USER dsa_user WITH PASSWORD 'your_secure_password';
GRANT ALL PRIVILEGES ON DATABASE dsa_platform TO dsa_user;
ALTER USER dsa_user CREATEDB;
\q
```

### 4. Backend Deployment

#### Option A: Docker Deployment (Recommended)
```bash
# Build and start backend
cd backend
docker-compose -f docker-compose.production.yml up -d

# Check logs
docker-compose -f docker-compose.production.yml logs -f
```

#### Option B: Direct Deployment
```bash
# Install Python dependencies
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt

# Run database migrations
alembic upgrade head

# Start backend server
gunicorn main:app -w 4 -k uvicorn.workers.UvicornWorker --bind 0.0.0.0:8000
```

### 5. Frontend Deployment

#### Build Production Version
```bash
cd frontend
npm install
npm run build
```

#### Deploy with Nginx
```bash
# Install Nginx
sudo apt install nginx  # Ubuntu/Debian
sudo yum install nginx  # CentOS/RHEL

# Copy built files
sudo cp -r build/* /var/www/html/

# Configure Nginx
sudo nano /etc/nginx/sites-available/dsa-platform
```

**Nginx Configuration:**
```nginx
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;
    
    # Redirect HTTP to HTTPS
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name yourdomain.com www.yourdomain.com;
    
    # SSL Configuration
    ssl_certificate /path/to/your/certificate.crt;
    ssl_certificate_key /path/to/your/private.key;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers ECDHE-RSA-AES256-GCM-SHA512:DHE-RSA-AES256-GCM-SHA512;
    ssl_prefer_server_ciphers off;
    
    # Security Headers
    add_header X-Frame-Options DENY;
    add_header X-Content-Type-Options nosniff;
    add_header X-XSS-Protection "1; mode=block";
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains";
    
    # Frontend
    location / {
        root /var/www/html;
        try_files $uri $uri/ /index.html;
        
        # Cache static assets
        location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
            expires 1y;
            add_header Cache-Control "public, immutable";
        }
    }
    
    # API Proxy
    location /api/ {
        proxy_pass http://localhost:8000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        
        # WebSocket support
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
    }
    
    # Health check
    location /health {
        proxy_pass http://localhost:8000/health;
        access_log off;
    }
}
```

```bash
# Enable site
sudo ln -s /etc/nginx/sites-available/dsa-platform /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

### 6. SSL Certificate Setup

#### Let's Encrypt (Free)
```bash
# Install Certbot
sudo apt install certbot python3-certbot-nginx

# Get certificate
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com

# Auto-renewal
sudo crontab -e
# Add: 0 12 * * * /usr/bin/certbot renew --quiet
```

#### Commercial SSL Certificate
```bash
# Upload your certificate files
sudo cp your-certificate.crt /etc/ssl/certs/
sudo cp your-private-key.key /etc/ssl/private/

# Update Nginx configuration with correct paths
sudo nano /etc/nginx/sites-available/dsa-platform
```

## 🔒 Security Hardening

### 1. Firewall Configuration
```bash
# UFW (Ubuntu)
sudo ufw allow ssh
sudo ufw allow 80
sudo ufw allow 443
sudo ufw enable

# Firewalld (CentOS)
sudo firewall-cmd --permanent --add-service=ssh
sudo firewall-cmd --permanent --add-service=http
sudo firewall-cmd --permanent --add-service=https
sudo firewall-cmd --reload
```

### 2. Database Security
```bash
# PostgreSQL security
sudo nano /etc/postgresql/*/main/postgresql.conf

# Add/modify:
listen_addresses = 'localhost'
max_connections = 100
shared_buffers = 256MB
effective_cache_size = 1GB

sudo nano /etc/postgresql/*/main/pg_hba.conf

# Restrict connections:
local   all             postgres                                peer
local   all             all                                     md5
host    all             all             127.0.0.1/32            md5
host    all             all             ::1/128                 md5
```

### 3. Application Security
```bash
# Set secure file permissions
sudo chown -R www-data:www-data /var/www/html/
sudo chmod -R 755 /var/www/html/
sudo chmod 600 backend/.env
sudo chmod 600 frontend/.env

# Disable directory listing
sudo nano /etc/nginx/nginx.conf
# Add: autoindex off;
```

## 📊 Monitoring & Logging

### 1. Application Monitoring
```bash
# Install monitoring tools
sudo apt install htop iotop nethogs

# Set up log rotation
sudo nano /etc/logrotate.d/dsa-platform

# Add:
/var/log/dsa-platform/*.log {
    daily
    missingok
    rotate 52
    compress
    delaycompress
    notifempty
    create 644 www-data www-data
}
```

### 2. Health Checks
```bash
# Create health check script
sudo nano /usr/local/bin/dsa-health-check.sh

#!/bin/bash
# Health check for DSA Platform

# Check backend
if ! curl -f http://localhost:8000/health > /dev/null 2>&1; then
    echo "Backend health check failed"
    exit 1
fi

# Check frontend
if ! curl -f http://localhost > /dev/null 2>&1; then
    echo "Frontend health check failed"
    exit 1
fi

# Check database
if ! sudo -u postgres psql -d dsa_platform -c "SELECT 1;" > /dev/null 2>&1; then
    echo "Database health check failed"
    exit 1
fi

echo "All services healthy"
exit 0

# Make executable
sudo chmod +x /usr/local/bin/dsa-health-check.sh

# Add to crontab
sudo crontab -e
# Add: */5 * * * * /usr/local/bin/dsa-health-check.sh
```

## 🔄 Backup Strategy

### 1. Database Backup
```bash
# Create backup script
sudo nano /usr/local/bin/dsa-backup.sh

#!/bin/bash
BACKUP_DIR="/var/backups/dsa-platform"
DATE=$(date +%Y%m%d_%H%M%S)

# Create backup directory
mkdir -p $BACKUP_DIR

# Database backup
sudo -u postgres pg_dump dsa_platform > $BACKUP_DIR/db_backup_$DATE.sql

# Application backup
tar -czf $BACKUP_DIR/app_backup_$DATE.tar.gz /var/www/html/ backend/

# Clean old backups (keep 30 days)
find $BACKUP_DIR -name "*.sql" -mtime +30 -delete
find $BACKUP_DIR -name "*.tar.gz" -mtime +30 -delete

echo "Backup completed: $DATE"

# Make executable
sudo chmod +x /usr/local/bin/dsa-backup.sh

# Add to crontab (daily at 2 AM)
sudo crontab -e
# Add: 0 2 * * * /usr/local/bin/dsa-backup.sh
```

### 2. Configuration Backup
```bash
# Backup configuration files
sudo tar -czf /var/backups/dsa-platform/config_backup_$(date +%Y%m%d).tar.gz \
    /etc/nginx/sites-available/dsa-platform \
    /etc/nginx/nginx.conf \
    backend/.env \
    frontend/.env
```

## 🚀 Performance Optimization

### 1. Nginx Optimization
```bash
sudo nano /etc/nginx/nginx.conf

# Add to http block:
worker_processes auto;
worker_connections 1024;
keepalive_timeout 65;
gzip on;
gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;
```

### 2. Database Optimization
```bash
sudo nano /etc/postgresql/*/main/postgresql.conf

# Performance settings:
shared_buffers = 256MB
effective_cache_size = 1GB
work_mem = 4MB
maintenance_work_mem = 64MB
checkpoint_completion_target = 0.9
wal_buffers = 16MB
default_statistics_target = 100
```

### 3. Application Optimization
```bash
# Backend optimization
sudo nano backend/gunicorn.conf.py

# Add:
workers = 4
worker_class = 'uvicorn.workers.UvicornWorker'
bind = '0.0.0.0:8000'
max_requests = 1000
max_requests_jitter = 100
timeout = 30
keepalive = 2
```

## 🔧 Maintenance

### 1. Regular Updates
```bash
# System updates
sudo apt update && sudo apt upgrade -y

# Application updates
cd /path/to/dsa-platform
git pull origin main
cd backend && pip install -r requirements.txt
cd ../frontend && npm install && npm run build
sudo systemctl restart nginx
```

### 2. Log Management
```bash
# Monitor logs
sudo tail -f /var/log/nginx/access.log
sudo tail -f /var/log/nginx/error.log
sudo journalctl -u nginx -f
```

### 3. Performance Monitoring
```bash
# Monitor system resources
htop
iotop
nethogs

# Monitor application
curl -s http://localhost:8000/health | jq
```

## 🆘 Troubleshooting

### Common Issues

#### 1. Backend Not Starting
```bash
# Check logs
docker-compose logs backend
# or
sudo journalctl -u dsa-backend -f

# Check database connection
sudo -u postgres psql -d dsa_platform -c "SELECT version();"
```

#### 2. Frontend Not Loading
```bash
# Check Nginx status
sudo systemctl status nginx
sudo nginx -t

# Check file permissions
ls -la /var/www/html/
```

#### 3. Database Connection Issues
```bash
# Check PostgreSQL status
sudo systemctl status postgresql

# Check connection
sudo -u postgres psql -d dsa_platform
```

#### 4. SSL Certificate Issues
```bash
# Check certificate validity
sudo certbot certificates

# Renew certificate
sudo certbot renew --dry-run
```

## 📞 Support

For additional support:
- **Documentation**: [Platform Documentation](https://docs.yourdomain.com)
- **Issues**: [GitHub Issues](https://github.com/your-org/dsa-code-analysis-platform/issues)
- **Email**: support@yourdomain.com

## 📝 License

This deployment guide is part of the DSA Code Analysis Platform.
Copyright © 2024 Your Organization. All rights reserved. 