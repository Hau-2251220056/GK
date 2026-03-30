require('dotenv').config({ path: __dirname + '/.env' });
const express = require('express');
const cors = require('cors');
const mysql = require('mysql2/promise');

const app = express();
const PORT = process.env.PORT || 5000;

// Log environment variables at startup
console.log('\n=== ENVIRONMENT VARIABLES ===');
console.log('STUDENT_NAME:', process.env.STUDENT_NAME);
console.log('STUDENT_ID:', process.env.STUDENT_ID);
console.log('STUDENT_CLASS:', process.env.STUDENT_CLASS);
console.log('APP_NAME:', process.env.APP_NAME);
console.log('DB_HOST:', process.env.DB_HOST);
console.log('DB_USER:', process.env.DB_USER);
console.log('DB_PASSWORD:', process.env.DB_PASSWORD);
console.log('============================\n');

// Middleware
app.use(cors());
app.use(express.json());

// MySQL connection pool
let pool;

// Initialize database
async function initializeDatabase() {
  try {
    pool = mysql.createPool({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '2701',
      database: process.env.DB_NAME || 'devops_db',
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0
    });

    const connection = await pool.getConnection();
    console.log('✓ Database connected successfully');
    connection.release();
  } catch (error) {
    console.error('✗ Database connection failed:', error.message);
    throw error;
  }
}

// Routes
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.get('/about', (req, res) => {
  console.log('DEBUG /about - STUDENT_NAME:', process.env.STUDENT_NAME);
  console.log('DEBUG /about - STUDENT_ID:', process.env.STUDENT_ID);
  console.log('DEBUG /about - STUDENT_CLASS:', process.env.STUDENT_CLASS);
  console.log('DEBUG /about - APP_NAME:', process.env.APP_NAME);
  res.json({
    name: process.env.STUDENT_NAME || 'Phan Minh Hậu',
    studentId: process.env.STUDENT_ID || '2251220056',
    class: process.env.STUDENT_CLASS || '22CT2',
    appName: process.env.APP_NAME || 'Dự Án DevOps Nhỏ'
  });
});

// Get all data items
app.get('/items', async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.execute('SELECT * FROM items ORDER BY created_at DESC');
    connection.release();
    res.json({ status: 'success', items: rows });
  } catch (error) {
    console.error('Error fetching items:', error);
    res.status(500).json({ error: 'Failed to fetch items' });
  }
});

// Post new data item
app.post('/items', async (req, res) => {
  try {
    const { name } = req.body;
    if (!name || name.trim() === '') {
      return res.status(400).json({ error: 'Item name is required' });
    }

    const connection = await pool.getConnection();
    const [result] = await connection.execute(
      'INSERT INTO items (name) VALUES (?)',
      [name.trim()]
    );
    connection.release();

    res.status(201).json({
      status: 'success',
      message: 'Item created successfully',
      id: result.insertId,
      name: name.trim()
    });
  } catch (error) {
    console.error('Error creating item:', error);
    res.status(500).json({ error: 'Failed to create item' });
  }
});

// Error handling
app.use((err, req, res, next) => {
  console.error('Error:', err.message);
  res.status(500).json({ error: 'Internal server error' });
});

// Start server
async function start() {
  try {
    console.log('Initializing database...');
    await initializeDatabase();

    app.listen(PORT, () => {
      console.log(`\n🚀 Server is running on http://localhost:${PORT}`);
      console.log('\n📝 Available Endpoints:');
      console.log('  GET  /health  - Health check');
      console.log('  GET  /about   - Student information');
      console.log('  GET  /items   - Get all items');
      console.log('  POST /items   - Create new item\n');
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

start();
