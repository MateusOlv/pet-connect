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
const appointmentRoutes = require('./routes/appointmentRoutes');
const productRoutes = require('./routes/productRoutes');
const cartRoutes = require('./routes/cartRoutes');

// Inicializar o app
const app = express();

// Middleware CORS
app.use(cors());

// Middleware para processar JSON
app.use(express.json());

// Conectar ao banco de dados
connectDB();

// Middleware para logging
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

// Rotas
app.use('/api/users', userRoutes);
app.use('/api/pets', petRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/providers', serviceProviderRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/product', productRoutes);
app.use('/api/cart', cartRoutes);

// Rota de teste
app.get('/', (req, res) => {
  res.json({ message: 'API Pet Connect funcionando!' });
});

// Porta fixa em 5001 - IMPORTANTE!
const PORT = 5001;

// Tratamento de erros global
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: 'Erro interno do servidor',
    error: process.env.NODE_ENV === 'production' ? {} : err.message
  });
});

// Iniciar o servidor
const server = app.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
  console.log(`Data e hora do início: ${new Date().toISOString()}`);
}); 