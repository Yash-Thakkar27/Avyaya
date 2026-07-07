# PostgreSQL Database Setup for Avyaya

This guide will help you set up PostgreSQL database for the Avyaya e-commerce platform.

## Prerequisites

- PostgreSQL 12+ installed
- Database administration tool (pgAdmin, DBeaver, or command line)

## Database Creation

1. **Login to PostgreSQL**
   ```bash
   psql -U postgres
   ```

2. **Create Database**
   ```sql
   CREATE DATABASE avyaya_db;
   ```

3. **Create User (Optional)**
   ```sql
   CREATE USER avyaya_user WITH ENCRYPTED PASSWORD 'your_password';
   GRANT ALL PRIVILEGES ON DATABASE avyaya_db TO avyaya_user;
   ```

4. **Connect to Database**
   ```sql
   \c avyaya_db;
   ```

## Schema Creation

The Spring Boot application will automatically create tables using JPA/Hibernate DDL generation. However, you can also create them manually:

### Users Table
```sql
CREATE TABLE users (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    address VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Products Table
```sql
CREATE TABLE products (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL,
    category VARCHAR(50) NOT NULL,
    material VARCHAR(100),
    stone VARCHAR(100),
    image_url VARCHAR(500),
    stock INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Orders Table
```sql
CREATE TABLE orders (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT REFERENCES users(id) ON DELETE CASCADE,
    total_price DECIMAL(10,2) NOT NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'PENDING',
    razorpay_order_id VARCHAR(100),
    razorpay_payment_id VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Order Items Table
```sql
CREATE TABLE order_items (
    id BIGSERIAL PRIMARY KEY,
    order_id BIGINT REFERENCES orders(id) ON DELETE CASCADE,
    product_id BIGINT REFERENCES products(id) ON DELETE CASCADE,
    quantity INTEGER NOT NULL,
    price DECIMAL(10,2) NOT NULL
);
```

### Cart Table
```sql
CREATE TABLE cart (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT REFERENCES users(id) ON DELETE CASCADE,
    product_id BIGINT REFERENCES products(id) ON DELETE CASCADE,
    quantity INTEGER NOT NULL,
    UNIQUE(user_id, product_id)
);
```

## Indexes for Performance

```sql
-- User email index (already unique)
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);

-- Product category index
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category);
CREATE INDEX IF NOT EXISTS idx_products_created_at ON products(created_at);

-- Order user index
CREATE INDEX IF NOT EXISTS idx_orders_user_id ON orders(user_id);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON orders(created_at);

-- Cart user index
CREATE INDEX IF NOT EXISTS idx_cart_user_id ON cart(user_id);
```

## Sample Data

### Sample Categories and Products
```sql
-- Insert sample products
INSERT INTO products (name, description, price, category, material, stone, image_url, stock) VALUES
('Eternal Solitaire Ring', 'Classic solitaire ring with 1ct lab-grown diamond', 45000.00, 'Rings', '18K Gold', '1ct Lab Diamond', 'https://via.placeholder.com/400', 10),
('Classic Drop Earrings', 'Elegant drop earrings with lab-grown diamonds', 32000.00, 'Earrings', '18K Gold', '0.5ct Lab Diamond', 'https://via.placeholder.com/400', 15),
('Minimalist Chain Necklace', 'Delicate chain necklace with diamond accent', 28000.00, 'Neckwear', '18K Gold', 'Lab Diamond Accent', 'https://via.placeholder.com/400', 20),
('Contemporary Band Ring', 'Modern unisex band with diamond setting', 25000.00, 'Unisex', '18K Gold', 'Lab Diamond Band', 'https://via.placeholder.com/400', 12),
('Vintage Stud Earrings', 'Timeless stud earrings with brilliant cut diamonds', 22000.00, 'Earrings', '18K Gold', '0.3ct Lab Diamond', 'https://via.placeholder.com/400', 25),
('Infinity Pendant', 'Symbolic infinity pendant with diamond detail', 35000.00, 'Neckwear', '18K Gold', '0.7ct Lab Diamond', 'https://via.placeholder.com/400', 8);
```

## Application Configuration

Update your `application.properties` file:

```properties
# Database Configuration
spring.datasource.url=jdbc:postgresql://localhost:5432/avyaya_db
spring.datasource.username=avyaya_user
spring.datasource.password=your_password
spring.datasource.driver-class-name=org.postgresql.Driver

# JPA Configuration
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.PostgreSQLDialect
spring.jpa.properties.hibernate.format_sql=true

# Connection Pool
spring.datasource.hikari.maximum-pool-size=20
spring.datasource.hikari.minimum-idle=5
```

## Production Configuration

For production, use environment variables:

```properties
# Database Configuration
spring.datasource.url=${DATABASE_URL:jdbc:postgresql://localhost:5432/avyaya_db}
spring.datasource.username=${DB_USERNAME:avyaya_user}
spring.datasource.password=${DB_PASSWORD:your_password}

# JPA Configuration (Production)
spring.jpa.hibernate.ddl-auto=validate
spring.jpa.show-sql=false
```

## Database Backup

### Create Backup
```bash
pg_dump -U postgres avyaya_db > avyaya_backup.sql
```

### Restore Backup
```bash
psql -U postgres -d avyaya_db < avyaya_backup.sql
```

## Troubleshooting

### Common Issues

1. **Connection Refused**
   - Ensure PostgreSQL is running
   - Check port (default: 5432)
   - Verify host and credentials

2. **Permission Denied**
   - Grant proper privileges to user
   - Check pg_hba.conf for authentication method

3. **Database Does Not Exist**
   - Create database before running application
   - Verify database name in connection string

### Useful Commands

```sql
-- Check database size
SELECT pg_size_pretty(pg_database_size('avyaya_db'));

-- List all tables
\dt

-- Check table structure
\d table_name

-- View table data
SELECT * FROM products LIMIT 5;

-- Check active connections
SELECT * FROM pg_stat_activity WHERE datname = 'avyaya_db';
```

## Security Best Practices

1. **Use Strong Passwords**: Generate random passwords for database users
2. **Limit Privileges**: Grant only necessary permissions
3. **Network Security**: Configure firewall rules for database access
4. **Regular Backups**: Schedule automated backups
5. **Monitor Logs**: Check PostgreSQL logs for suspicious activity

## Performance Optimization

1. **Indexes**: Add indexes on frequently queried columns
2. **Connection Pooling**: Configure appropriate pool sizes
3. **Query Optimization**: Use EXPLAIN to analyze slow queries
4. **Regular VACUUM**: Schedule maintenance tasks

```sql
-- Analyze query performance
EXPLAIN ANALYZE SELECT * FROM products WHERE category = 'Rings';

-- Update table statistics
ANALYZE products;

-- Vacuum tables
VACUUM ANALYZE products;
```