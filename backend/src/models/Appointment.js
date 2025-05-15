const mongoose = require('mongoose');

const appointmentSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    pet: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Pet',
    },
    service: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Service',
    },
    provider: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'ServiceProvider',
    },
    appointmentDate: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: ['agendado', 'concluído', 'cancelado'],
      default: 'agendado',
    },
    notes: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Appointment = mongoose.model('Appointment', appointmentSchema);

module.exports = Appointment; 