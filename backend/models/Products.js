const mongoose = require('mongoose');

if (process.env.NODE_ENV === 'production') {
  // Use a mock in-memory database
  const products = [
    {
      name: 'Mock Product 1',
      description: 'This is a mock product.',
      price: 10.0,
      quantity: 100,
      photo: 'mock1.jpg',
    },
    // Add more mock products
  ];

  module.exports = {
    find: () => Promise.resolve(products),
    findById: (id) => Promise.resolve(products.find(p => p.id === id)),
    // Add other mock functions if needed
  };
} else {
  // Use real MongoDB connection in development
  const Schema = mongoose.Schema;

  let productSchema = new Schema({
    name: String,
    description: String,
    price: Number,
    quantity: Number,
    photo: String,
  });

  let Product = mongoose.model('Product', productSchema);
  module.exports = Product;
}
