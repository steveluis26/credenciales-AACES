const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const bcrypt = require('bcryptjs');

const Cliente = sequelize.define('Cliente', {
  nombre: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  email: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  password_hash: {
    type: DataTypes.STRING,
    allowNull: false
  },
  activo: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  fecha_vencimiento_pago: {
    type: DataTypes.DATEONLY
  },
  rfc: {
    type: DataTypes.STRING(20)
  }
}, {
  hooks: {
    beforeCreate: async (cliente) => {
      if (cliente.password) {
        cliente.password_hash = await bcrypt.hash(cliente.password, 10);
      }
    }
  },
  timestamps: true,
  createdAt: 'fecha_registro',
  updatedAt: false
});

Cliente.prototype.validPassword = async function(password) {
  return await bcrypt.compare(password, this.password_hash);
};

module.exports = Cliente;