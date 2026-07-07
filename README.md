# Avyaya E-commerce Platform

Avyaya is a luxury jewelry e-commerce platform featuring lab-grown diamonds, built with Spring Boot backend and Next.js frontend.

## Project Structure

```
avyaya/
├── backend/                 # Spring Boot API
│   ├── src/main/java/
│   │   └── com/avyaya/
│   │       ├── controller/  # REST API controllers
│   │       ├── service/     # Business logic
│   │       ├── repository/  # Data access layer
│   │       ├── model/       # Entity classes
│   │       ├── dto/         # Data transfer objects
│   │       ├── security/    # JWT security
│   │       ├── config/      # Configuration
│   │       └── exception/   # Exception handling
│   ├── src/main/resources/
│   │   └── application.properties
│   └── pom.xml
├── frontend/                # Next.js application
│   ├── app/                 # App router pages
│   ├── components/          # React components
│   ├── lib/                 # Utilities & API calls
│   ├── public/              # Static assets
│   └── package.json
└── README.md
```

## Features

### Backend (Spring Boot)
- **Authentication & Authorization**: JWT-based auth with Spring Security
- **Product Management**: CRUD operations for jewelry products
- **Shopping Cart**: Add, update, remove cart items
- **Order Management**: Order creation and status tracking
- **Payment Integration**: Razorpay payment gateway
- **Database**: PostgreSQL with JPA/Hibernate
- **API Documentation**: RESTful APIs with proper error handling

### Frontend (Next.js)
- **Modern UI**: Responsive design with TailwindCSS
- **Animations**: Smooth animations with Framer Motion
- **State Management**: Zustand for client-side state
- **Type Safety**: TypeScript for better development experience
- **Authentication**: JWT token management
- **Payments**: Razorpay integration for secure payments

### Key Brand Features
- **Lab-Grown Diamonds**: Ethically sourced diamonds
- **BIS Hallmark**: Certified quality assurance  
- **90-Day Buyback**: Investment protection guarantee
- **Free Shipping**: Pan-India delivery
- **Hypoallergenic**: Safe for sensitive skin

## Prerequisites

- Java 17+
- Node.js 18+
- PostgreSQL 12+
- Maven 3.6+

## Quick Start

### Backend Setup

1. **Clone the repository**
   ```bash
   cd backend
   ```

2. **Configure Database**
   Update `src/main/resources/application.properties`:
   ```properties
   spring.datasource.url=jdbc:postgresql://localhost:5432/avyaya_db
   spring.datasource.username=your_username
   spring.datasource.password=your_password
   ```

3. **Start PostgreSQL and create database**
   ```sql
   CREATE DATABASE avyaya_db;
   ```

4. **Run the application**
   ```bash
   mvn clean install
   mvn spring-boot:run
   ```

   Backend will start on `http://localhost:8080`

### Frontend Setup

1. **Navigate to frontend directory**
   ```bash
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   Create `.env.local`:
   ```env
   NEXT_PUBLIC_API_BASE_URL=http://localhost:8080/api
   NEXT_PUBLIC_RAZORPAY_KEY_ID=your_razorpay_key_id
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

   Frontend will start on `http://localhost:3000`

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

### Products
- `GET /api/products` - Get all products
- `GET /api/products/{id}` - Get product by ID
- `GET /api/products/category/{category}` - Get products by category
- `GET /api/products/search?name={query}` - Search products
- `POST /api/products` - Create product (Admin)
- `PUT /api/products/{id}` - Update product (Admin)
- `DELETE /api/products/{id}` - Delete product (Admin)

### Cart
- `GET /api/cart` - Get user's cart
- `POST /api/cart/add` - Add item to cart
- `PUT /api/cart/{id}` - Update cart item
- `DELETE /api/cart/{id}` - Remove cart item
- `DELETE /api/cart/clear` - Clear cart

### Orders
- `GET /api/orders` - Get user's orders
- `GET /api/orders/{id}` - Get specific order
- `GET /api/orders/admin/all` - Get all orders (Admin)
- `PUT /api/orders/admin/{id}/status` - Update order status (Admin)

### Payment
- `POST /api/payment/create-order` - Create Razorpay order
- `POST /api/payment/verify` - Verify payment and create order

## Database Schema

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
    user_id BIGINT REFERENCES users(id),
    total_price DECIMAL(10,2) NOT NULL,
    status VARCHAR(50) NOT NULL,
    razorpay_order_id VARCHAR(100),
    razorpay_payment_id VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Order Items Table
```sql
CREATE TABLE order_items (
    id BIGSERIAL PRIMARY KEY,
    order_id BIGINT REFERENCES orders(id),
    product_id BIGINT REFERENCES products(id),
    quantity INTEGER NOT NULL,
    price DECIMAL(10,2) NOT NULL
);
```

### Cart Table
```sql
CREATE TABLE cart (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT REFERENCES users(id),
    product_id BIGINT REFERENCES products(id),
    quantity INTEGER NOT NULL
);
```

## Frontend Pages

- **Home** (`/`) - Hero section with featured categories and products
- **Shop** (`/shop`) - Product catalog with filtering and search
- **Product Details** (`/product/[id]`) - Individual product page
- **Cart** (`/cart`) - Shopping cart management
- **Checkout** (`/checkout`) - Order summary and payment
- **Login/Register** (`/login`, `/register`) - Authentication
- **Account** (`/account`) - User profile and order history
- **About** (`/about`) - Brand story and values
- **Contact** (`/contact`) - Contact information and form

## Technologies Used

### Backend
- **Spring Boot 3.2** - Framework
- **Java 17** - Programming language
- **Spring Security** - Authentication & authorization
- **JWT** - Token-based authentication
- **Spring Data JPA** - Data persistence
- **PostgreSQL** - Database
- **Razorpay Java SDK** - Payment processing
- **Maven** - Dependency management

### Frontend
- **Next.js 13** - React framework
- **TypeScript** - Type safety
- **TailwindCSS** - Styling
- **Framer Motion** - Animations
- **Zustand** - State management
- **Axios** - HTTP client
- **React Hook Form** - Form handling
- **React Hot Toast** - Notifications

## Deployment

### Backend Deployment (Railway/Render/AWS)

1. **Environment Variables**
   ```env
   SPRING_DATASOURCE_URL=your_postgres_url
   SPRING_DATASOURCE_USERNAME=your_db_username
   SPRING_DATASOURCE_PASSWORD=your_db_password
   AVYAYA_JWT_SECRET=your_jwt_secret
   RAZORPAY_KEY_ID=your_razorpay_key_id
   RAZORPAY_KEY_SECRET=your_razorpay_key_secret
   ```

2. **Build and Deploy**
   ```bash
   mvn clean package
   java -jar target/avyaya-backend-0.0.1-SNAPSHOT.jar
   ```

### Frontend Deployment (Vercel)

1. **Environment Variables**
   ```env
   NEXT_PUBLIC_API_BASE_URL=https://your-backend-url.com/api
   NEXT_PUBLIC_RAZORPAY_KEY_ID=your_razorpay_key_id
   ```

2. **Build and Deploy**
   ```bash
   npm run build
   npm start
   ```

## Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, email hello@avyaya.com or join our community Discord.

---

**Avyaya - Eternal as your love** ✨