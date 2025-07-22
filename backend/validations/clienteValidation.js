const Joi = require('joi');

const createClienteSchema = Joi.object({
  nombre: Joi.string().min(3).max(100).required(),
  email: Joi.string().email().required(),
  rfc: Joi.string().pattern(/^[A-ZÑ&]{3,4}\d{6}[A-V1-9][0-9A-Z]$/).allow(null, '')
});

const updateClienteSchema = Joi.object({
  nombre: Joi.string().min(3).max(100),
  rfc: Joi.string().pattern(/^[A-ZÑ&]{3,4}\d{6}[A-V1-9][0-9A-Z]$/).allow(null, '')
});

module.exports = {
  createClienteSchema,
  updateClienteSchema
};