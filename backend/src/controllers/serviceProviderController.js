const ServiceProvider = require('../models/ServiceProvider');
const Service = require('../models/Service');

// Listar todos os provedores de serviço
exports.getAllProviders = async (req, res) => {
  try {
    const providers = await ServiceProvider.find()
      .select('-products'); // Não retorna a lista de produtos, já que não estamos implementando esta parte

    res.status(200).json(providers);
  } catch (error) {
    res.status(500).json({ message: 'Erro no servidor', error: error.message });
  }
};

// Obter detalhes de um provedor específico
exports.getProviderById = async (req, res) => {
  try {
    const providerId = req.params.id;

    const provider = await ServiceProvider.findById(providerId)
      .populate({
        path: 'services',
        select: 'serviceId name description price'
      });

    if (!provider) {
      return res.status(404).json({ message: 'Provedor de serviço não encontrado' });
    }

    res.status(200).json(provider);
  } catch (error) {
    res.status(500).json({ message: 'Erro no servidor', error: error.message });
  }
};

// Criar um novo provedor de serviço (função administrativa)
exports.createProvider = async (req, res) => {
  try {
    const { name, CNPJ } = req.body;

    // Verificar se já existe um provedor com este CNPJ
    const existingProvider = await ServiceProvider.findOne({ CNPJ });
    if (existingProvider) {
      return res.status(400).json({ message: 'CNPJ já cadastrado' });
    }

    // Gerar ID único
    const serviceProviderId = await ServiceProvider.getNextServiceProviderId();

    // Criar novo provedor
    const provider = new ServiceProvider({
      serviceProviderId,
      name,
      CNPJ,
      services: [],
      products: []
    });

    const savedProvider = await provider.save();

    res.status(201).json(savedProvider);
  } catch (error) {
    res.status(500).json({ message: 'Erro no servidor', error: error.message });
  }
};

// Adicionar um serviço a um provedor (função administrativa)
exports.addService = async (req, res) => {
  try {
    const providerId = req.params.id;
    const { name, description, price } = req.body;

    // Verificar se o provedor existe
    const provider = await ServiceProvider.findById(providerId);
    if (!provider) {
      return res.status(404).json({ message: 'Provedor de serviço não encontrado' });
    }

    // Gerar ID único para o serviço
    const serviceId = await Service.getNextServiceId();

    // Criar novo serviço
    const service = new Service({
      serviceId,
      name,
      description,
      price,
      provider: providerId,
      pets: []
    });

    const savedService = await service.save();

    // Adicionar serviço ao provedor
    provider.services.push(savedService._id);
    await provider.save();

    res.status(201).json(savedService);
  } catch (error) {
    res.status(500).json({ message: 'Erro no servidor', error: error.message });
  }
};

// Remover um serviço de um provedor (função administrativa)
exports.removeService = async (req, res) => {
  try {
    const providerId = req.params.providerId;
    const serviceId = req.params.serviceId;

    // Verificar se o provedor existe
    const provider = await ServiceProvider.findById(providerId);
    if (!provider) {
      return res.status(404).json({ message: 'Provedor de serviço não encontrado' });
    }

    // Verificar se o serviço existe
    const service = await Service.findById(serviceId);
    if (!service) {
      return res.status(404).json({ message: 'Serviço não encontrado' });
    }

    // Verificar se o serviço pertence ao provedor
    if (!provider.services.includes(serviceId)) {
      return res.status(400).json({ message: 'Serviço não pertence a este provedor' });
    }

    // Remover serviço do provedor
    const serviceIndex = provider.services.indexOf(serviceId);
    provider.services.splice(serviceIndex, 1);
    await provider.save();

    // Excluir o serviço
    await Service.deleteOne({ _id: serviceId });

    res.status(200).json({ message: 'Serviço removido com sucesso' });
  } catch (error) {
    res.status(500).json({ message: 'Erro no servidor', error: error.message });
  }
}; 