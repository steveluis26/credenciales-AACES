const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// El pool lo recibe desde server.js y se inyecta aquí
module.exports = (pool) => {
  router.post('/login', authController.login(pool));
  return router;
};
