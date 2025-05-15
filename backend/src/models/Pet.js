const mongoose = require('mongoose');

const PetSchema = new mongoose.Schema({
  petId: {
    type: Number,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  breed: {
    type: String,
    required: false
  },
  age: {
    type: Number,
    required: true
  },
  weight: {
    type: Number,
    required: false
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Garantir que o próximo ID seja único
PetSchema.statics.getNextPetId = async function() {
  const lastPet = await this.findOne().sort('-petId');
  return lastPet ? lastPet.petId + 1 : 1;
};

module.exports = mongoose.model('Pet', PetSchema); 