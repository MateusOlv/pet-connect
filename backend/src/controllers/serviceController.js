const Service = require('../models/Service');
const Pet = require('../models/Pet');
const ServiceProvider = require('../models/ServiceProvider');

// Listar todos os serviços disponíveis
exports.getAllServices = async (req, res) => {
  try {
    const services = await Service.find()
      .populate('provider', 'name')
      .select('-pets');

    res.status(200).json(services);
  } catch (error) {
    res.status(500).json({ message: 'Erro no servidor', error: error.message });
  }
};

// Obter detalhes de um serviço específico
exports.getServiceById = async (req, res) => {
  try {
    const serviceId = req.params.id;

    const service = await Service.findById(serviceId)
      .populate('provider', 'name CNPJ')
      .populate('pets', 'name type');

    if (!service) {
      return res.status(404).json({ message: 'Serviço não encontrado' });
    }

    res.status(200).json(service);
  } catch (error) {
    res.status(500).json({ message: 'Erro no servidor', error: error.message });
  }
};

// Agendar serviço para um pet
exports.scheduleService = async (req, res) => {
  try {
    const serviceId = req.params.id;
    const { petId } = req.body;
    const userId = req.user.id;

    // Verificar se o serviço existe
    const service = await Service.findById(serviceId);
    if (!service) {
      return res.status(404).json({ message: 'Serviço não encontrado' });
    }

    // Verificar se o pet existe e pertence ao usuário
    const pet = await Pet.findOne({ _id: petId, owner: userId });
    if (!pet) {
      return res.status(404).json({ message: 'Pet não encontrado ou não pertence ao usuário' });
    }

    // Verificar se o pet já está agendado para este serviço
    if (service.pets.includes(petId)) {
      return res.status(400).json({ message: 'Pet já agendado para este serviço' });
    }

    // Adicionar pet ao serviço
    service.pets.push(petId);
    await service.save();

    res.status(200).json({ 
      message: 'Serviço agendado com sucesso',
      service: {
        id: service._id,
        name: service.name,
        description: service.description,
        price: service.price,
        scheduledFor: pet.name
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Erro no servidor', error: error.message });
  }
};

// Cancelar agendamento de serviço
exports.cancelSchedule = async (req, res) => {
  try {
    const serviceId = req.params.id;
    const { petId } = req.body;
    const userId = req.user.id;

    // Verificar se o serviço existe
    const service = await Service.findById(serviceId);
    if (!service) {
      return res.status(404).json({ message: 'Serviço não encontrado' });
    }

    // Verificar se o pet existe e pertence ao usuário
    const pet = await Pet.findOne({ _id: petId, owner: userId });
    if (!pet) {
      return res.status(404).json({ message: 'Pet não encontrado ou não pertence ao usuário' });
    }

    // Verificar se o pet está agendado para este serviço
    const petIndex = service.pets.indexOf(petId);
    if (petIndex === -1) {
      return res.status(400).json({ message: 'Pet não está agendado para este serviço' });
    }

    // Remover pet do serviço
    service.pets.splice(petIndex, 1);
    await service.save();

    res.status(200).json({ message: 'Agendamento cancelado com sucesso' });
  } catch (error) {
    res.status(500).json({ message: 'Erro no servidor', error: error.message });
  }
};

// Listar serviços agendados para o usuário (por pet)
exports.getScheduledServices = async (req, res) => {
  try {
    const userId = req.user.id;

    // Obter todos os pets do usuário
    const userPets = await Pet.find({ owner: userId });
    const petIds = userPets.map(pet => pet._id);

    // Buscar serviços que contenham algum dos pets do usuário
    const services = await Service.find({ pets: { $in: petIds } })
      .populate('provider', 'name')
      .populate('pets', 'name type');

    // Formatar resposta
    const formattedServices = services.map(service => {
      // Filtrar apenas os pets do usuário que estão agendados
      const userPetsScheduled = service.pets.filter(pet => 
        petIds.some(id => id.toString() === pet._id.toString())
      );

      return {
        id: service._id,
        name: service.name,
        description: service.description,
        price: service.price,
        provider: service.provider.name,
        petsScheduled: userPetsScheduled
      };
    });

    res.status(200).json(formattedServices);
  } catch (error) {
    res.status(500).json({ message: 'Erro no servidor', error: error.message });
  }
}; 