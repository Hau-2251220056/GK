# DevOps Mini Project - Full Stack

A complete full-stack DevOps mini project with React frontend, Node.js backend, and MySQL database, all containerized with Docker.

## 🎯 Features

- **Backend API**: Node.js + Express
  - GET /health - Health check
  - GET /about - Student information
  - GET /items - List all items
  - POST /items - Create new item
  
- **Frontend**: React + Vite
  - /about - Display student information
  - /items - List and add items
  - Responsive UI with CSS styling
  - Axios for API communication

- **Database**: MySQL
  - Persistent data storage
  - Auto-initialization with sample data
  
- **Containerization**: Docker & Docker Compose
  - Separate containers for each service
  - Automatic networking
  - Health checks

## 📁 Project Structure

```
DevOps/
├── backend/
│   ├── index.js              # Express server
│   ├── init.sql              # Database schema
│   ├── package.json          # Dependencies
│   ├── Dockerfile            # Backend image
│   ├── .env                  # Environment variables
│   └── .env.example          # Environment template
├── frontend/
│   ├── src/
│   │   ├── App.jsx           # Main app
│   │   ├── App.css           # Styling
│   │   ├── About.jsx         # About page
│   │   ├── Items.jsx         # Items page
│   │   └── main.jsx          # Entry point
│   ├── package.json          # Dependencies
│   ├── vite.config.js        # Vite config
│   ├── Dockerfile            # Frontend image
│   └── .env.example          # Environment template
├── docker-compose.yml        # Orchestration
├── .env                      # Root environment
└── README.md                 # This file
```

## 🚀 Quick Start

### Option 1: Docker Compose (Recommended)

#### Prerequisites
- Docker & Docker Compose installed
- Port 3000, 5000, 3306 available

#### Steps

1. **Clone or navigate to project**
   ```bash
   cd DevOps
   ```

2. **Update environment variables (optional)**
   ```bash
   cp .env.example .env
   # Edit .env if needed
   ```

3. **Build and run**
   ```bash
   docker-compose up --build
   ```

4. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000
   - MySQL: localhost:3306

5. **Stop services**
   ```bash
   docker-compose down
   ```

### Option 2: Local Development

#### Prerequisites
- Node.js v18+
- MySQL v8+
- npm

#### Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Setup database
mysql -u root -p < init.sql

# Update .env
cp .env.example .env
# Edit .env with your MySQL credentials

# Start backend
npm start
# Server runs on http://localhost:5000
```

#### Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Create .env if needed
cp .env.example .env

# Start development server
npm run dev
# Frontend runs on http://localhost:5173
```

## 📡 API Documentation

### Health Check
```
GET /health
Response: { "status": "ok" }
```

### Get About Information
```
GET /about
Response:
{
  "name": "Phan Minh Hậu",
  "studentId": "2251220056",
  "class": "22CT2",
  "appName": "Dự Án DevOps Nhỏ"
}
```

### Get All Items
```
GET /items
Response:
{
  "status": "success",
  "items": [
    {
      "id": 1,
      "name": "Item name",
      "created_at": "2024-01-01T10:00:00.000Z"
    }
  ]
}
```

### Create New Item
```
POST /items
Content-Type: application/json

Body: { "name": "Item name" }

Response:
{
  "status": "success",
  "message": "Item created successfully",
  "id": 1,
  "name": "Item name"
}
```

## 🗄️ Database Schema

### Items Table
```sql
CREATE TABLE items (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

## 🐳 Docker Commands

### Build Images
```bash
docker-compose build
```

### Start Services
```bash
docker-compose up
```

### Start in Background
```bash
docker-compose up -d
```

### View Logs
```bash
docker-compose logs -f
# Or specific service
docker-compose logs -f backend
```

### Stop Services
```bash
docker-compose down
```

### Stop and Remove Volumes
```bash
docker-compose down -v
```

## 🔧 Environment Variables

### Root .env
```env
DB_HOST=mysql
DB_USER=root
DB_PASSWORD=rootpassword
DB_NAME=devops_db
STUDENT_NAME=Your Name
STUDENT_ID=Your ID
STUDENT_CLASS=Your Class
APP_NAME=Your App
```

### Backend .env
```env
PORT=5000
DB_HOST=mysql (docker) or localhost (local)
DB_USER=root
DB_PASSWORD=rootpassword
DB_NAME=devops_db
STUDENT_NAME=Your Name
STUDENT_ID=Your ID
STUDENT_CLASS=Your Class
APP_NAME=Your App
```

### Frontend .env
```env
VITE_API_URL=http://localhost:5000 (local)
              http://backend:5000 (docker)
```

## 🛠️ Development

### Backend Changes
1. Edit files in `backend/`
2. Backend automatically reloads (if using nodemon)
3. Or restart with `npm start`

### Frontend Changes
1. Edit files in `frontend/src/`
2. Changes auto-refresh with Vite hot reload
3. Or restart with `npm run dev`

### Database Changes
1. Connect to MySQL: `mysql -u root -p devops_db`
2. Run SQL commands
3. Or update `init.sql` for future initializations

## 🔍 Troubleshooting

### Port Already in Use
```bash
# Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Mac/Linux
lsof -ti:5000 | xargs kill -9
```

### Database Connection Failed
- Ensure MySQL is running
- Check credentials in .env
- Verify database exists: `mysql -u root -p -e "SHOW DATABASES;"`

### Frontend Can't Connect to Backend
- Check backend is running on correct port
- Verify API_URL in frontend .env
- In Docker, use `http://backend:5000`

### Docker Issues
```bash
# Remove all containers
docker-compose down -v

# Rebuild from scratch
docker-compose build --no-cache

# Check logs
docker-compose logs -f
```

## 📝 Testing

### Test Backend Endpoints
```bash
# Health check
curl http://localhost:5000/health

# Get about info
curl http://localhost:5000/about

# Get items
curl http://localhost:5000/items

# Add item
curl -X POST http://localhost:5000/items \
  -H "Content-Type: application/json" \
  -d '{"name":"New Item"}'
```

### Test with Postman
1. Import endpoints
2. Set base URL: `http://localhost:5000`
3. Test each endpoint

## 🚀 Deployment

### To Production
1. Update .env with production credentials
2. Build images: `docker-compose build`
3. Push to registry: `docker tag devops-backend <registry>/devops-backend`
4. Deploy to cloud platform (AWS, Azure, GCP, etc.)

## 📚 Technologies

| Component | Technology | Version |
|-----------|-----------|---------|
| Frontend | React | 19.2 |
| Frontend Build | Vite | 8.0 |
| Backend | Express | 4.18 |
| Runtime | Node.js | 18 |
| Database | MySQL | 8.0 |
| Container | Docker | Latest |
| Orchestration | Docker Compose | 3.8 |

## 📦 Dependencies

### Backend
- express: Web framework
- mysql2: MySQL driver
- cors: Cross-origin support
- dotenv: Environment variables

### Frontend
- react: UI library
- react-dom: DOM rendering
- react-router-dom: Client-side routing
- axios: HTTP client
- vite: Build tool

## ✅ Checklist

- [x] Backend API with health, about, items endpoints
- [x] Frontend with React and Vite
- [x] MySQL database integration
- [x] Docker containers for all services
- [x] Docker Compose orchestration
- [x] Environment variable management
- [x] CORS configuration
- [x] Error handling
- [x] Responsive UI
- [x] Health checks
- [x] Sample data initialization
- [x] Production-ready structure

## 📞 Support

For issues or questions:
1. Check the Troubleshooting section
2. Review environment variables
3. Check Docker logs
4. Verify database connection
5. Test endpoints with curl

## 📄 License

MIT

## 👤 Author

Created for DevOps Mini Project - March 2026

---

**Ready to run with:** `docker-compose up --build`

**Access points:**
- 🌐 Frontend: http://localhost:3000
- 🔌 Backend: http://localhost:5000
- 🗄️ Database: localhost:3306
