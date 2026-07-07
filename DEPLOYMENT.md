# Deployment Guide - Avyaya E-commerce Platform

This guide covers deployment strategies for the Avyaya platform across different cloud providers.

## Overview

The Avyaya platform consists of:
- **Backend**: Spring Boot application (Java 17)
- **Frontend**: Next.js application (Node.js 18+)
- **Database**: PostgreSQL
- **Payments**: Razorpay integration

## Recommended Architecture

```
┌─────────────────┐    ┌────────────────┐    ┌─────────────────┐
│   Frontend      │    │    Backend     │    │    Database     │
│   (Vercel)      │───▶│   (Railway)    │───▶│  (PostgreSQL)   │
│   Next.js       │    │  Spring Boot   │    │   (Supabase)    │
└─────────────────┘    └────────────────┘    └─────────────────┘
```

---

## Backend Deployment

### Option 1: Railway (Recommended)

Railway offers excellent Java support with automatic deployments.

#### Setup Steps

1. **Create Railway Account**
   - Visit [railway.app](https://railway.app)
   - Connect your GitHub account

2. **Create New Project**
   ```bash
   # Install Railway CLI
   npm install -g @railway/cli
   
   # Login to Railway
   railway login
   
   # Initialize project
   railway init
   ```

3. **Configure Environment Variables**
   ```env
   # Database (Railway will provide these)
   DATABASE_URL=postgresql://username:password@host:port/database
   PGDATABASE=railway
   PGHOST=containers-us-west-xxx.railway.app
   PGPASSWORD=your_password
   PGPORT=5432
   PGUSER=postgres
   
   # Application
   SPRING_PROFILES_ACTIVE=prod
   SERVER_PORT=8080
   
   # JWT
   AVYAYA_JWT_SECRET=your-super-secret-jwt-key-256-bits
   AVYAYA_JWT_EXPIRATION=86400000
   
   # Razorpay
   RAZORPAY_KEY_ID=your_razorpay_key_id
   RAZORPAY_KEY_SECRET=your_razorpay_secret_key
   
   # CORS
   AVYAYA_CORS_ALLOWED_ORIGINS=https://your-frontend-domain.vercel.app
   ```

4. **Create Dockerfile** (optional)
   ```dockerfile
   FROM eclipse-temurin:17-jdk-jammy
   
   WORKDIR /app
   COPY target/avyaya-backend-0.0.1-SNAPSHOT.jar app.jar
   
   EXPOSE 8080
   
   CMD ["java", "-jar", "app.jar"]
   ```

5. **Deploy**
   ```bash
   # Build locally first
   mvn clean package -DskipTests
   
   # Deploy to Railway
   railway up
   ```

#### Railway Configuration

Create `railway.toml`:
```toml
[build]
  builder = "NIXPACKS"
  buildCommand = "./mvnw clean package -DskipTests"

[deploy]
  startCommand = "java -jar target/avyaya-backend-0.0.1-SNAPSHOT.jar"
  restartPolicyType = "ON_FAILURE"
  restartPolicyMaxRetries = 10
```

### Option 2: Render

1. **Create Render Account**
   - Visit [render.com](https://render.com)
   - Connect your GitHub repository

2. **Create Web Service**
   - Select "Web Service"
   - Connect your repository
   - Configure build and start commands:
     ```bash
     Build Command: ./mvnw clean package -DskipTests
     Start Command: java -jar target/avyaya-backend-0.0.1-SNAPSHOT.jar
     ```

3. **Set Environment Variables**
   Same as Railway, but note Render's PostgreSQL format.

### Option 3: AWS Elastic Beanstalk

1. **Prepare Application**
   ```bash
   mvn clean package
   ```

2. **Create Application ZIP**
   ```bash
   zip -r avyaya-backend.zip target/avyaya-backend-0.0.1-SNAPSHOT.jar
   ```

3. **Deploy via AWS Console**
   - Create new Elastic Beanstalk application
   - Upload ZIP file
   - Configure environment variables
   - Set up RDS PostgreSQL instance

---

## Database Deployment

### Option 1: Railway PostgreSQL (Recommended)

1. **Add PostgreSQL Service**
   ```bash
   railway add postgresql
   ```

2. **Get Connection Details**
   Railway will automatically set environment variables:
   - `DATABASE_URL`
   - `PGHOST`, `PGPORT`, `PGDATABASE`, `PGUSER`, `PGPASSWORD`

### Option 2: Supabase

1. **Create Supabase Project**
   - Visit [supabase.com](https://supabase.com)
   - Create new project

2. **Get Connection String**
   ```
   postgresql://postgres:password@db.project.supabase.co:5432/postgres
   ```

### Option 3: AWS RDS

1. **Create RDS Instance**
   - Choose PostgreSQL engine
   - Configure security groups
   - Set up backup and monitoring

2. **Configure Connection**
   ```properties
   spring.datasource.url=jdbc:postgresql://your-rds-endpoint:5432/avyaya
   spring.datasource.username=postgres
   spring.datasource.password=your-password
   ```

---

## Frontend Deployment

### Vercel (Recommended)

Vercel offers excellent Next.js support with automatic deployments.

#### Setup Steps

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Configure Environment Variables**
   Create `.env.production`:
   ```env
   NEXT_PUBLIC_API_BASE_URL=https://your-backend.railway.app/api
   NEXT_PUBLIC_RAZORPAY_KEY_ID=your_razorpay_key_id
   ```

3. **Deploy**
   ```bash
   # From frontend directory
   vercel
   
   # Follow prompts to configure project
   # Vercel will auto-deploy from GitHub on push
   ```

4. **Configure Build Settings**
   - Build Command: `npm run build`
   - Output Directory: `.next`
   - Install Command: `npm install`

#### Vercel Configuration

Create `vercel.json`:
```json
{
  "framework": "nextjs",
  "buildCommand": "npm run build",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "env": {
    "NEXT_PUBLIC_API_BASE_URL": "@backend-url",
    "NEXT_PUBLIC_RAZORPAY_KEY_ID": "@razorpay-key"
  }
}
```

### Alternative: Netlify

1. **Build Configuration**
   ```toml
   # netlify.toml
   [build]
     command = "npm run build"
     publish = ".next"
   
   [build.environment]
     NODE_VERSION = "18"
   ```

2. **Environment Variables**
   Set in Netlify dashboard or CLI:
   ```bash
   netlify env:set NEXT_PUBLIC_API_BASE_URL "your-backend-url"
   ```

---

## Domain & SSL Configuration

### Custom Domain Setup

1. **Vercel Custom Domain**
   - Go to Project Settings → Domains
   - Add your domain
   - Configure DNS records as instructed

2. **Railway Custom Domain**
   - Go to Project → Settings → Domains
   - Add custom domain
   - Update DNS CNAME record

### SSL Certificates

Both Vercel and Railway provide automatic SSL certificates via Let's Encrypt.

---

## Environment-Specific Configuration

### Production Application Properties

```properties
# Production Profile
spring.profiles.active=prod

# Database
spring.datasource.url=${DATABASE_URL}
spring.jpa.hibernate.ddl-auto=validate
spring.jpa.show-sql=false

# Security
server.error.include-stacktrace=never
management.endpoints.web.exposure.include=health,info

# Logging
logging.level.com.avyaya=INFO
logging.level.org.springframework.security=WARN
```

### Staging Environment

Create separate staging deployments:

```bash
# Railway staging
railway environment create staging
railway environment use staging
```

---

## Monitoring & Health Checks

### Application Health Endpoints

Spring Boot Actuator provides health endpoints:

```properties
# Enable health check endpoint
management.endpoints.web.exposure.include=health,info
management.endpoint.health.show-details=when-authorized
```

Endpoints:
- `GET /actuator/health` - Application health status
- `GET /actuator/info` - Application information

### Logging

Configure centralized logging:

```properties
# Application logs
logging.file.name=logs/avyaya.log
logging.pattern.file=%d{ISO8601} [%thread] %-5level %logger{36} - %msg%n
logging.logback.rolling-policy.max-file-size=100MB
logging.logback.rolling-policy.total-size-cap=1GB
```

### Monitoring Tools

1. **Sentry** - Error tracking
2. **New Relic** - Application performance
3. **Datadog** - Infrastructure monitoring
4. **Railway Metrics** - Built-in monitoring

---

## Backup & Disaster Recovery

### Database Backups

#### Railway PostgreSQL
```bash
# Automatic daily backups included
# Manual backup via Railway CLI
railway db backup
```

#### Manual Backup Script
```bash
#!/bin/bash
DATE=$(date +%Y%m%d_%H%M%S)
pg_dump $DATABASE_URL > backup_$DATE.sql
aws s3 cp backup_$DATE.sql s3://your-backup-bucket/
```

### Application Backup

1. **Code Repository**: GitHub/GitLab
2. **Environment Variables**: Document in secure location
3. **Static Assets**: Cloud storage backup

---

## CI/CD Pipeline

### GitHub Actions

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Production

on:
  push:
    branches: [ main ]

jobs:
  deploy-backend:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Set up JDK 17
      uses: actions/setup-java@v3
      with:
        java-version: '17'
        distribution: 'temurin'
    
    - name: Cache Maven dependencies
      uses: actions/cache@v3
      with:
        path: ~/.m2
        key: ${{ runner.os }}-m2-${{ hashFiles('**/pom.xml') }}
    
    - name: Run tests
      run: mvn test
      working-directory: ./backend
    
    - name: Build application
      run: mvn clean package -DskipTests
      working-directory: ./backend
    
    - name: Deploy to Railway
      run: |
        npm install -g @railway/cli
        railway login --token ${{ secrets.RAILWAY_TOKEN }}
        railway up
      working-directory: ./backend

  deploy-frontend:
    runs-on: ubuntu-latest
    needs: deploy-backend
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
        cache-dependency-path: frontend/package-lock.json
    
    - name: Install dependencies
      run: npm ci
      working-directory: ./frontend
    
    - name: Run tests
      run: npm test
      working-directory: ./frontend
    
    - name: Deploy to Vercel
      run: vercel --prod --token ${{ secrets.VERCEL_TOKEN }}
      working-directory: ./frontend
```

### Environment Secrets

Configure these secrets in GitHub:
- `RAILWAY_TOKEN`
- `VERCEL_TOKEN`
- Database credentials
- Razorpay keys

---

## Performance Optimization

### Backend Optimization

1. **JVM Tuning**
   ```bash
   # Railway/Render startup command
   java -Xms256m -Xmx512m -XX:+UseG1GC -jar app.jar
   ```

2. **Connection Pooling**
   ```properties
   spring.datasource.hikari.maximum-pool-size=10
   spring.datasource.hikari.minimum-idle=2
   ```

3. **Caching**
   ```properties
   spring.cache.type=caffeine
   spring.cache.caffeine.spec=maximumSize=500,expireAfterWrite=600s
   ```

### Frontend Optimization

1. **Next.js Optimizations**
   ```javascript
   // next.config.js
   module.exports = {
     images: {
       optimize: true,
       formats: ['image/webp', 'image/avif']
     },
     experimental: {
       optimizeCss: true
     }
   }
   ```

2. **Bundle Analysis**
   ```bash
   npm install --save-dev @next/bundle-analyzer
   npm run analyze
   ```

---

## Security Checklist

### Backend Security

- [ ] JWT secret key is secure and environment-specific
- [ ] HTTPS enforced in production
- [ ] CORS properly configured
- [ ] SQL injection prevented (parameterized queries)
- [ ] Input validation on all endpoints
- [ ] Rate limiting implemented
- [ ] Security headers configured
- [ ] Database credentials secured

### Frontend Security

- [ ] Environment variables properly configured
- [ ] No sensitive data in client-side code
- [ ] HTTPS enforced
- [ ] Content Security Policy implemented
- [ ] XSS protection enabled

### Payment Security

- [ ] Razorpay keys secured
- [ ] Payment signature verification implemented
- [ ] PCI compliance considerations
- [ ] Transaction logging and monitoring

---

## Troubleshooting

### Common Deployment Issues

1. **Build Failures**
   - Check Java version (17+)
   - Verify Maven dependencies
   - Check for test failures

2. **Database Connection Issues**
   - Verify connection string format
   - Check network security groups
   - Validate credentials

3. **Frontend Build Issues**
   - Ensure Node.js 18+ compatibility
   - Check environment variable availability
   - Verify API endpoint accessibility

4. **Payment Integration Issues**
   - Validate Razorpay credentials
   - Check webhook configurations
   - Verify signature generation

### Debugging Commands

```bash
# Check application logs (Railway)
railway logs

# Check application status
curl https://your-app.railway.app/actuator/health

# Test API endpoints
curl -X GET https://your-app.railway.app/api/products

# Check environment variables
railway vars
```

---

## Cost Optimization

### Estimated Monthly Costs

**Railway** (Backend + Database):
- Starter: $5/month (512MB RAM, shared CPU)
- Pro: $20/month (1GB RAM, dedicated CPU)

**Vercel** (Frontend):
- Hobby: Free (100GB bandwidth)
- Pro: $20/month (1TB bandwidth)

**Total**: ~$25-40/month for production setup

### Cost Saving Tips

1. Use hobby tiers for development/staging
2. Implement proper caching to reduce database load
3. Optimize bundle sizes to reduce bandwidth costs
4. Use CDN for static assets
5. Monitor usage and scale appropriately

---

This deployment guide provides comprehensive instructions for deploying the Avyaya platform. Choose the deployment strategy that best fits your requirements and budget.

For additional support, refer to the main README.md or contact the development team.