const mongoose = require('mongoose');

const ServiceSchema = new mongoose.Schema({
  serviceId: {
    type: Number,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  provider: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ServiceProvider',
    required: true
  },
  pets: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Pet'
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Método para agendar um serviço
ServiceSchema.methods.scheduleService = async function(petId) {
  if (!this.pets.includes(petId)) {
    this.pets.push(petId);
    await this.save();
    return true;
  }
  return false;
};

// Garantir que o próximo ID seja único
ServiceSchema.statics.getNextServiceId = async function() {
  const lastService = await this.findOne().sort('-serviceId');
  return lastService ? lastService.serviceId + 1 : 1;
};

module.exports = mongoose.model('Service', ServiceSchema); 