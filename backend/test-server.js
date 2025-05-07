const http = require('http');

// Criar servidor HTTP
const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ message: 'Servidor de teste funcionando!' }));
});

// Porta
const PORT = 5001;

// Iniciar servidor com log de erros
server.on('error', (e) => {
  console.error('Erro ao iniciar servidor:', e.message);
});

// Iniciar escuta
server.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor HTTP básico rodando em http://localhost:${PORT}`);
  console.log(`Pressione Ctrl+C para encerrar`);
}); 