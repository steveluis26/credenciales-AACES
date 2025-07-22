const express = require('express');
const router = express.Router();
const clienteController = require('../controllers/clienteController');
const { authenticate, authorize } = require('../middlewares/auth');
const { validate } = require('../middlewares/validate');
const { createClienteSchema, updateClienteSchema } = require('../validations/clienteValidation');

// Rutas protegidas para admin
router.use(authenticate, authorize(['admin']));

router.get('/', clienteController.getAllClientes);
router.post('/', validate(createClienteSchema), clienteController.createCliente);
router.get('/proximos-vencimientos', clienteController.getClientesProximosVencimientos);
router.patch('/:id/toggle-status', clienteController.toggleClienteStatus);
router.put('/:id', validate(updateClienteSchema), clienteController.updateCliente);
router.get('/:id/cursos', clienteController.getCursosByCliente);

module.exports = router;