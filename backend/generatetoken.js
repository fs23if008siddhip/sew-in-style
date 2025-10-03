// generateToken.js
const jwt = require('jsonwebtoken');

const token = jwt.sign(
  { id: 'admin123', email: 'admin@shop.com', isAdmin: true },
  'mysecretkey123',  // Replace with your real JWT_SECRET later
  { expiresIn: '7d' }
);

console.log('Generated Token:', token);
