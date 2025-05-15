const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/petconnect';
    
    // Opções de conexão atualizadas para MongoDB mais recente
    const options = {
      serverSelectionTimeoutMS: 5000,
      maxPoolSize: 10
    };

    console.log(`Tentando conectar ao MongoDB em: ${mongoURI}`);
    
    const conn = await mongoose.connect(mongoURI, options);
    
    console.log(`MongoDB Conectado: ${conn.connection.host}`);
    console.log(`Nome do banco de dados: ${conn.connection.name}`);
    
    // Verificar estado da conexão
    mongoose.connection.on('connected', () => {
      console.log('Mongoose conectado');
    });

    mongoose.connection.on('error', (err) => {
      console.error(`Erro na conexão Mongoose: ${err.message}`);
    });

    mongoose.connection.on('disconnected', () => {
      console.log('Mongoose desconectado');
    });

  } catch (error) {
    console.error(`Erro ao conectar MongoDB: ${error.message}`);
    // Não terminamos o processo para dar chance de reconexão
    setTimeout(connectDB, 5000);
  }
};

module.exports = connectDB; 