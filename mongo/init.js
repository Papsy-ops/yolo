db = db.getSiblingDB('products');
db.createCollection('items');
db.items.insertMany([
  { name: 'Item 1', price: 10 },
  { name: 'Item 2', price: 20 }
]);
