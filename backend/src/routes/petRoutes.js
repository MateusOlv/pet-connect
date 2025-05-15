const express = require('express');
const router = express.Router();
const { createPet, getPetsByUser, getPetById, updatePet, deletePet } = require('../controllers/petController');
const { protect } = require('../middleware/authMiddleware');

// Todas as rotas de pets são protegidas
router.use(protect);

router.route('/')
  .post(createPet)
  .get(getPetsByUser);

router.route('/:id')
  .get(getPetById)
  .put(updatePet)
  .delete(deletePet);

module.exports = router; 