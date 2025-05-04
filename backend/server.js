const express  = require('express');
const mongoose = require('mongoose');
const cors     = require('cors');
const multer   = require('multer');
const upload   = multer();

const productRoute = require('./routes/api/productRoute');

// Get the MongoDB URI from environment variables
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error('❌ MONGODB_URI not set!');
  process.exit(1);
}

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch(err => console.error("❌ MongoDB connection error:", err));


const db = mongoose.connection;
db.once('open', () => console.log('✅ Database connected successfully'));
db.on('error', err => console.error('❌ MongoDB connection error:', err));

const app = express();
app.use(express.json());
app.use(upload.array());
app.use(cors());


// 👉 Root route to avoid "Cannot GET /"
app.get('/', (req, res) => {
  res.send('🎉 Backend is running!');
});

app.use('/api/products', productRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server listening on port ${PORT}`);
});
