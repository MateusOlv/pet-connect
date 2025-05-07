const express = require('express');
const app = express();

// Rota simples
app.get('/', (req, res) => {
  res.json({ message: 'Servidor simples funcionando na porta 5001' });
});

// Definir porta diretamente
const PORT = 5001;

// Iniciar servidor
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor simples rodando em http://localhost:${PORT}`);
}); 