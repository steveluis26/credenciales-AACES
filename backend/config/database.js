const { Sequelize } = require('sequelize');
const { dbConfig } = require('../utils/constants');

const sequelize = new Sequelize(
  dbConfig.database,
  dbConfig.user,
  dbConfig.password,
  {
    host: dbConfig.host,
    port: dbConfig.port,
    dialect: 'postgres',
    logging: process.env.NODE_ENV === 'development' ? console.log : false,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
);

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Conexión a PostgreSQL establecida.');

    if (process.env.NODE_ENV === 'development') {
      await sequelize.sync({ alter: true });
      console.log('🔄 Modelos sincronizados (alter).');
    }
  } catch (error) {
    console.error('❌ Error al conectar a PostgreSQL:', error);
    process.exit(1);
  }
};

module.exports = { sequelize, connectDB };
