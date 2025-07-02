require('dotenv').config();

module.exports = {
  secreteWord: process.env.JWT_SECRET || 'clave-super-secreta'
};