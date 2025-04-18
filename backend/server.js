const express = require('express');
const cors = require('cors');
const multer = require('multer');
const mongoose = require('mongoose');
const productRoute = require('./routes/api/productRoute');

const app = express();
const upload = multer();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());
app.use(upload.array());

// Use mock DB if environment variable is set
if (process.env.USE_MOCK_DB === 'true') {
  console.log('🧪 Using mock DB');

  // Mock data example
  const mockData = [
    { name: 'Mock Product 1', price: 10, description: 'A mock item', quantity: 5, photo: '' },
    { name: 'Mock Product 2', price: 20, description: 'Another mock item', quantity: 3, photo: '' }
  ];

  // Serve mock products when the frontend requests
  app.get('/api/products', (req, res) => res.json(mockData));

} else {
  // Real MongoDB connection if no mock DB
  const mongodb_url = 'mongodb://mongo/';
  const dbName = 'yolomy';
  const MONGODB_URI = process.env.MONGODB_URI || mongodb_url + dbName;

  mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  const db = mongoose.connection;

  // Successful DB connection
  db.once('open', () => {
    console.log('✅ Database connected successfully');
  });

  // DB error handling
  db.on('error', (error) => {
    console.error('❌ MongoDB connection error:', error);
  });

  // Use the productRoute for actual data fetching
  app.use('/api/products', productRoute);
}

// Health check endpoint for verifying server status
app.get('/', (req, res) => {
  res.send('✅ Backend is running');
});

// Start the server
app.listen(PORT, () => {
  console.log(`🚀 Server listening on port ${PORT}`);
});
