const http = require('http');
const url = require('url');
const fs = require('fs');
const path = require('path');

// Diretório para armazenar dados
const DATA_DIR = path.join(__dirname, 'data');
const USERS_FILE = path.join(DATA_DIR, 'users.json');
const PETS_FILE = path.join(DATA_DIR, 'pets.json');

// Garantir que o diretório de dados exista
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// Carregar usuários do arquivo ou inicializar com valores padrão
let registeredUsers = [];
try {
  if (fs.existsSync(USERS_FILE)) {
    const data = fs.readFileSync(USERS_FILE, 'utf8');
    registeredUsers = JSON.parse(data);
    console.log(`Carregados ${registeredUsers.length} usuários do arquivo`);
  } else {
    // Usuários padrão para iniciar
    registeredUsers = [
      { id: 1, email: 'teste@exemplo.com', name: 'Usuário Teste', password: '123456' },
      { id: 2, email: 'admin@petconnect.com', name: 'Administrador', password: 'admin123' }
    ];
    
    // Salvar usuários iniciais no arquivo
    fs.writeFileSync(USERS_FILE, JSON.stringify(registeredUsers, null, 2), 'utf8');
    console.log('Arquivo de usuários criado com valores padrão');
  }
} catch (error) {
  console.error('Erro ao carregar usuários:', error);
  // Continuar com valores padrão
  registeredUsers = [
    { id: 1, email: 'teste@exemplo.com', name: 'Usuário Teste', password: '123456' },
    { id: 2, email: 'admin@petconnect.com', name: 'Administrador', password: 'admin123' }
  ];
}

// Carregar pets do arquivo ou inicializar com valores padrão
let userPets = [];
try {
  if (fs.existsSync(PETS_FILE)) {
    const data = fs.readFileSync(PETS_FILE, 'utf8');
    userPets = JSON.parse(data);
    console.log(`Carregados ${userPets.length} pets do arquivo`);
  } else {
    // Pets padrão para iniciar
    userPets = [
      { _id: 'pet1', petId: 1, userId: 1, name: 'Luna', type: 'Cachorro', age: 3, weight: 8, createdAt: new Date().toISOString() },
      { _id: 'pet2', petId: 2, userId: 1, name: 'Felix', type: 'Gato', age: 2, weight: 4, createdAt: new Date().toISOString() },
      { _id: 'pet3', petId: 3, userId: 2, name: 'Max', type: 'Cachorro', age: 5, weight: 12, createdAt: new Date().toISOString() },
      { _id: 'pet4', petId: 4, userId: 2, name: 'Nina', type: 'Pássaro', age: 1, weight: 0.2, createdAt: new Date().toISOString() },
      { _id: 'pet5', petId: 5, userId: 1, name: 'Rex', type: 'Cachorro', age: 7, weight: 25, createdAt: new Date().toISOString() }
    ];
    
    // Salvar pets iniciais no arquivo
    fs.writeFileSync(PETS_FILE, JSON.stringify(userPets, null, 2), 'utf8');
    console.log('Arquivo de pets criado com valores padrão');
  }
} catch (error) {
  console.error('Erro ao carregar pets:', error);
  // Continuar com valores padrão
  userPets = [
    { _id: 'pet1', petId: 1, userId: 1, name: 'Luna', type: 'Cachorro', age: 3, weight: 8, createdAt: new Date().toISOString() },
    { _id: 'pet2', petId: 2, userId: 1, name: 'Felix', type: 'Gato', age: 2, weight: 4, createdAt: new Date().toISOString() },
    { _id: 'pet3', petId: 3, userId: 2, name: 'Max', type: 'Cachorro', age: 5, weight: 12, createdAt: new Date().toISOString() },
    { _id: 'pet4', petId: 4, userId: 2, name: 'Nina', type: 'Pássaro', age: 1, weight: 0.2, createdAt: new Date().toISOString() },
    { _id: 'pet5', petId: 5, userId: 1, name: 'Rex', type: 'Cachorro', age: 7, weight: 25, createdAt: new Date().toISOString() }
  ];
}

// Função para salvar usuários no arquivo
function saveUsers() {
  try {
    fs.writeFileSync(USERS_FILE, JSON.stringify(registeredUsers, null, 2), 'utf8');
    console.log(`Salvos ${registeredUsers.length} usuários no arquivo`);
    return true;
  } catch (error) {
    console.error('Erro ao salvar usuários:', error);
    return false;
  }
}

// Função para salvar pets no arquivo
function savePets() {
  try {
    fs.writeFileSync(PETS_FILE, JSON.stringify(userPets, null, 2), 'utf8');
    console.log(`Salvos ${userPets.length} pets no arquivo`);
    return true;
  } catch (error) {
    console.error('Erro ao salvar pets:', error);
    return false;
  }
}

// Função para validar formato de email
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Função para analisar o corpo da requisição (JSON)
function parseRequestBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', (chunk) => {
      body += chunk.toString();
    });
    req.on('end', () => {
      try {
        const parsedBody = body ? JSON.parse(body) : {};
        resolve(parsedBody);
      } catch (error) {
        reject(error);
      }
    });
    req.on('error', (error) => {
      reject(error);
    });
  });
}

// Verificar token de autenticação
function authenticateToken(req) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  
  if (!token) {
    return { authenticated: false, userId: null, message: 'Token não fornecido' };
  }
  
  // Na versão simplificada do servidor, não verificamos assinatura JWT
  // Apenas simulamos uma autenticação básica
  // Em um servidor real, você usaria jwt.verify()
  
  // Formato simulado de token: jwt-token-simulado-<userId>
  // Verificar se o token segue um formato esperado
  if (token.startsWith('jwt-token-simulado-')) {
    const userId = parseInt(token.split('-').pop(), 10);
    const user = registeredUsers.find(u => u.id === userId);
    
    if (user) {
      return { authenticated: true, userId: user.id, user };
    }
  }
  
  return { authenticated: false, userId: null, message: 'Token inválido' };
}

// Criar servidor HTTP
const server = http.createServer(async (req, res) => {
  // Configurar CORS para qualquer origem
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  // Tratar requisições OPTIONS (CORS preflight)
  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  // Parse da URL
  const parsedUrl = url.parse(req.url, true);
  const path = parsedUrl.pathname;
  
  // Logging
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);

  // Roteamento básico
  if (path === '/' && req.method === 'GET') {
    // Rota principal
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'API Pet Connect funcionando!' }));
  } 
  else if (path === '/api/users/register' && req.method === 'POST') {
    try {
      const body = await parseRequestBody(req);
      
      // Validar email
      if (!body.email || !isValidEmail(body.email)) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Email inválido' }));
        return;
      }
      
      // Verificar se o email já está registrado
      const existingUser = registeredUsers.find(user => user.email === body.email);
      if (existingUser) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Este email já está registrado' }));
        return;
      }
      
      // Validar outros campos necessários
      if (!body.password || !body.name) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Dados incompletos' }));
        return;
      }
      
      // Criar novo usuário
      const newUser = {
        id: registeredUsers.length > 0 ? Math.max(...registeredUsers.map(u => u.id)) + 1 : 1,
        email: body.email,
        name: body.name,
        password: body.password
      };
      
      // Adicionar ao array e salvar no arquivo
      registeredUsers.push(newUser);
      saveUsers();
      
      // Responder com sucesso
      res.writeHead(201, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ 
        message: 'Usuário registrado com sucesso', 
        userId: newUser.id,
        name: newUser.name,
        email: newUser.email,
        token: `jwt-token-simulado-${newUser.id}`
      }));
    } catch (error) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'Erro ao processar dados: ' + error.message }));
    }
  }
  else if (path === '/api/users/login' && req.method === 'POST') {
    try {
      const body = await parseRequestBody(req);
      
      // Validar formato de email
      if (!body.email || !isValidEmail(body.email)) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Email inválido' }));
        return;
      }
      
      // Validar senha (simulação)
      if (!body.password) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Senha não fornecida' }));
        return;
      }
      
      // Verificar se o usuário existe
      const user = registeredUsers.find(user => user.email === body.email);
      
      if (!user) {
        res.writeHead(401, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Usuário não encontrado' }));
        return;
      }
      
      // Verificar se a senha está correta
      if (user.password !== body.password) {
        res.writeHead(401, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Senha incorreta' }));
        return;
      }
      
      // Login bem-sucedido
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ 
        message: 'Login realizado com sucesso', 
        userId: user.id,
        name: user.name, 
        email: user.email,
        token: `jwt-token-simulado-${user.id}`
      }));
    } catch (error) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'Erro ao processar dados: ' + error.message }));
    }
  }
  else if (path === '/api/users/profile' && req.method === 'GET') {
    // Nova rota para obter informações do usuário logado
    const auth = authenticateToken(req);
    
    if (!auth.authenticated) {
      res.writeHead(401, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: auth.message || 'Não autorizado' }));
      return;
    }
    
    // Buscar o usuário pelo ID
    const user = registeredUsers.find(u => u.id === auth.userId);
    
    if (!user) {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'Usuário não encontrado' }));
      return;
    }
    
    // Remover senha do objeto antes de enviar
    const { password, ...userWithoutPassword } = user;
    
    // Responder com os dados do usuário
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(userWithoutPassword));
  }
  else if (path === '/api/users' && req.method === 'GET') {
    // Retornar a lista de usuários (sem as senhas)
    const usersWithoutPasswords = registeredUsers.map(({ password, ...user }) => user);
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ users: usersWithoutPasswords }));
  }
  else if (path === '/api/services' && req.method === 'GET') {
    // Simulação de listagem de serviços
    const services = [
      { id: 1, name: 'Banho & Tosa', price: 75.0, provider: 'Pet Shop Feliz', image: 'https://cdn.builder.io/api/v1/image/assets/TEMP/b45a36da7e56cf45c6575e1bba44a936c52b7a9a' },
      { id: 2, name: 'Consulta Veterinária', price: 120.0, provider: 'Clínica Vet Amigo', image: 'https://cdn.builder.io/api/v1/image/assets/TEMP/fae18511cfc30143a51fb2c7a7fa25eff4c34bf8' },
      { id: 3, name: 'Hospedagem', price: 60.0, provider: 'Hotel Pet Paradise', image: 'https://cdn.builder.io/api/v1/image/assets/TEMP/047dea9cf35a2720075cc45465ad9d807beee7fd' },
      { id: 4, name: 'Adestramento', price: 90.0, provider: 'Amigos de Patas', image: 'https://cdn.builder.io/api/v1/image/assets/TEMP/dd88683b186c5d28a56c05ef92f87c8a8ce0cd01' }
    ];
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ services }));
  }
  else if (path === '/api/pets' && req.method === 'GET') {
    // Verificar autenticação para a rota de pets
    const auth = authenticateToken(req);
    
    if (!auth.authenticated) {
      res.writeHead(401, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: auth.message || 'Não autorizado' }));
      return;
    }
    
    // Filtrar pets do usuário autenticado
    const userPetsList = userPets.filter(pet => pet.userId === auth.userId);
    
    console.log(`Enviando ${userPetsList.length} pets para o usuário ${auth.userId}`);
    
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(userPetsList));
  }
  else if (path === '/api/pets' && req.method === 'POST') {
    // Verificar autenticação
    const auth = authenticateToken(req);
    
    if (!auth.authenticated) {
      res.writeHead(401, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: auth.message || 'Não autorizado' }));
      return;
    }
    
    try {
      // Obter dados do pet do corpo da requisição
      const petData = await parseRequestBody(req);
      console.log('Dados recebidos para cadastro de pet:', petData);
      
      // Validar campos obrigatórios
      if (!petData.name || !petData.type) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Nome e tipo do pet são obrigatórios' }));
        return;
      }
      
      // Criar novo ID para o pet
      const petId = userPets.length > 0 
        ? Math.max(...userPets.map(p => p.petId || 0)) + 1 
        : 1;
      
      // Criar objeto do pet
      const newPet = {
        _id: `pet${Date.now()}`, // ID único baseado no timestamp
        petId,
        userId: auth.userId,
        name: petData.name,
        type: petData.type,
        breed: petData.breed,
        age: petData.age || 0,
        weight: petData.weight,
        createdAt: new Date().toISOString()
      };
      
      // Adicionar o pet à lista e salvar
      userPets.push(newPet);
      savePets();
      
      console.log(`Novo pet cadastrado: ${newPet.name} (ID: ${newPet.petId}) para o usuário ${auth.userId}`);
      
      // Retornar resposta de sucesso
      res.writeHead(201, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ 
        message: 'Pet cadastrado com sucesso',
        pet: newPet
      }));
    } catch (error) {
      console.error('Erro ao processar cadastro de pet:', error);
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'Erro interno ao cadastrar pet: ' + error.message }));
    }
  }
  else {
    // Rota não encontrada
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'Rota não encontrada' }));
  }
});

// Porta
const PORT = 5001;

// Iniciar servidor com log de erros
server.on('error', (e) => {
  console.error('Erro ao iniciar servidor:', e.message);
});

// Iniciar escuta
server.listen(PORT, '0.0.0.0', () => {
  console.log(`API Pet Connect rodando em http://localhost:${PORT}`);
  console.log(`Data e hora do início: ${new Date().toISOString()}`);
  console.log(`Usuários carregados: ${registeredUsers.length}`);
  console.log(`Pets carregados: ${userPets.length}`);
  console.log(`Pressione Ctrl+C para encerrar`);
}); 