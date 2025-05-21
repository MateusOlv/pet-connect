const mongoose = require('mongoose');

const ServiceProviderSchema = new mongoose.Schema({
  serviceProviderId: {
    type: Number,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  CNPJ: {
    type: String,
    required: true,
    unique: true
  },
/* 
  services: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Service'
  }],
  products: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product'
  }], 
*/
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Método para registrar um serviço
ServiceProviderSchema.methods.registerService = async function(serviceId) {
  if (!this.services.includes(serviceId)) {
    this.services.push(serviceId);
    await this.save();
    return true;
  }
  return false;
};

// Método para registrar um produto
ServiceProviderSchema.methods.registerProduct = async function(productId) {
  if (!this.products.includes(productId)) {
    this.products.push(productId);
    await this.save();
    return true;
  }
  return false;
};

// Garantir que o próximo ID seja único
ServiceProviderSchema.statics.getNextServiceProviderId = async function() {
  const lastProvider = await this.findOne().sort('-serviceProviderId');
  return lastProvider ? lastProvider.serviceProviderId + 1 : 1;
};

module.exports = mongoose.model('ServiceProvider', ServiceProviderSchema); 