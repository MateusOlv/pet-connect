const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const connectDB = require('./config/db');

// Configurar variáveis de ambiente
dotenv.config({ path: path.resolve(__dirname, '../config.env') });

// Importar rotas
const userRoutes = require('./routes/userRoutes');
const petRoutes = require('./routes/petRoutes');
const serviceRoutes = require('./routes/serviceRoutes');
const serviceProviderRoutes = require('./routes/serviceProviderRoutes');

// Inicializar o app
const app = express();

// Configurar CORS para permitir todas as origens
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Middleware para processar JSON
app.use(express.json());

// Conectar ao banco de dados
connectDB();

// Middleware para logging de requisições
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

// Rotas
app.use('/api/users', userRoutes);
app.use('/api/pets', petRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/providers', serviceProviderRoutes);

// Rota de teste
app.get('/', (req, res) => {
  res.json({ message: 'API Pet Connect funcionando!' });
});

// Porta - fixa em 5001
const PORT = 5001;

// Tratamento de erros global
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: 'Erro interno do servidor',
    error: process.env.NODE_ENV === 'production' ? {} : err.message
  });
});

// Iniciar o servidor na porta 5001 (apenas esta chamada listen deve existir)
const server = app.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
  console.log(`Data e hora do início: ${new Date().toISOString()}`);
});

// Tratamento para fechamento gracioso
process.on('SIGTERM', () => {
  console.log('SIGTERM recebido. Encerrando servidor...');
  server.close(() => {
    console.log('Servidor encerrado.');
    process.exit(0);
  });
}); 