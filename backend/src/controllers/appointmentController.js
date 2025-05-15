const asyncHandler = require('express-async-handler');
const Appointment = require('../models/Appointment');
const Pet = require('../models/Pet');
const Service = require('../models/Service');
const ServiceProvider = require('../models/ServiceProvider');

// @desc    Create a new appointment
// @route   POST /api/appointments
// @access  Private
const createAppointment = asyncHandler(async (req, res) => {
  const { pet, service, provider, appointmentDate, notes } = req.body;

  console.log('Dados recebidos para agendamento:', { 
    pet, service, provider, appointmentDate, 
    userId: req.user ? req.user._id || req.user.id : 'Usuário não encontrado'
  });

  if (!req.user) {
    res.status(401);
    throw new Error('Usuário não autenticado');
  }

  // Validações
  const petExists = await Pet.findById(pet);
  console.log('Pet encontrado:', petExists ? 'Sim' : 'Não encontrado');
  
  if (!petExists) {
    res.status(404);
    throw new Error('Pet não encontrado');
  }

  const serviceExists = await Service.findById(service);
  console.log('Serviço encontrado:', serviceExists ? 'Sim' : 'Não encontrado');
  
  if (!serviceExists) {
    res.status(404);
    throw new Error('Serviço não encontrado');
  }

  const providerExists = await ServiceProvider.findById(provider);
  console.log('Provedor encontrado:', providerExists ? 'Sim' : 'Não encontrado');
  
  if (!providerExists) {
    res.status(404);
    throw new Error('Provedor de serviço não encontrado');
  }

  // Verifique se o pet pertence ao usuário
  const petOwner = petExists.owner ? petExists.owner.toString() : '';
  const userId = req.user._id ? req.user._id.toString() : req.user.id.toString();
  
  console.log('Verificando permissão:', {
    petOwner,
    userId,
    match: petOwner === userId
  });
  
  if (petOwner !== userId) {
    res.status(401);
    throw new Error('Você não tem permissão para agendar com este pet');
  }

  const appointment = await Appointment.create({
    user: userId,
    pet,
    service,
    provider,
    appointmentDate,
    notes,
  });

  if (appointment) {
    console.log('Agendamento criado com sucesso');
    res.status(201).json(appointment);
  } else {
    res.status(400);
    throw new Error('Dados de agendamento inválidos');
  }
});

// @desc    Get user appointments
// @route   GET /api/appointments
// @access  Private
const getAppointments = asyncHandler(async (req, res) => {
  const appointments = await Appointment.find({ user: req.user._id })
    .populate('pet', 'name type')
    .populate('service', 'name price')
    .populate('provider', 'name address')
    .sort({ appointmentDate: 1 });

  res.json(appointments);
});

// @desc    Get appointment by ID
// @route   GET /api/appointments/:id
// @access  Private
const getAppointmentById = asyncHandler(async (req, res) => {
  const appointment = await Appointment.findById(req.params.id)
    .populate('pet', 'name type')
    .populate('service', 'name price')
    .populate('provider', 'name address');

  if (appointment) {
    // Verificar se o agendamento pertence ao usuário
    if (appointment.user.toString() !== req.user._id.toString()) {
      res.status(401);
      throw new Error('Não autorizado');
    }
    res.json(appointment);
  } else {
    res.status(404);
    throw new Error('Agendamento não encontrado');
  }
});

// @desc    Update appointment status
// @route   PUT /api/appointments/:id
// @access  Private
const updateAppointment = asyncHandler(async (req, res) => {
  const { status, appointmentDate, notes } = req.body;

  const appointment = await Appointment.findById(req.params.id);

  if (appointment) {
    // Verificar se o agendamento pertence ao usuário
    if (appointment.user.toString() !== req.user._id.toString()) {
      res.status(401);
      throw new Error('Não autorizado');
    }

    appointment.status = status || appointment.status;
    appointment.appointmentDate = appointmentDate || appointment.appointmentDate;
    appointment.notes = notes || appointment.notes;

    const updatedAppointment = await appointment.save();
    res.json(updatedAppointment);
  } else {
    res.status(404);
    throw new Error('Agendamento não encontrado');
  }
});

// @desc    Cancel appointment
// @route   DELETE /api/appointments/:id
// @access  Private
const cancelAppointment = asyncHandler(async (req, res) => {
  const appointment = await Appointment.findById(req.params.id);

  if (appointment) {
    // Verificar se o agendamento pertence ao usuário
    if (appointment.user.toString() !== req.user._id.toString()) {
      res.status(401);
      throw new Error('Não autorizado');
    }

    appointment.status = 'cancelado';
    const updatedAppointment = await appointment.save();
    res.json(updatedAppointment);
  } else {
    res.status(404);
    throw new Error('Agendamento não encontrado');
  }
});

module.exports = {
  createAppointment,
  getAppointments,
  getAppointmentById,
  updateAppointment,
  cancelAppointment,
}; 