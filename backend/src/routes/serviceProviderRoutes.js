const express = require('express');
const router = express.Router();
const { 
  getAllProviders, 
  getProviderById, 
  createProvider, 
  addService, 
  removeService 
} = require('../controllers/serviceProviderController');

// Rotas públicas
router.get('/', getAllProviders);
router.get('/:id', getProviderById);

// Rotas administrativas (em uma aplicação real, estas precisariam de um middleware de autorização)
router.post('/', createProvider);
router.post('/:id/services', addService);
router.delete('/:providerId/services/:serviceId', removeService);

module.exports = router; 