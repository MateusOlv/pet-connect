const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Gerar token JWT
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET || 'secretkey', {
    expiresIn: '30d'
  });
};

// Registro de usuário
exports.register = async (req, res) => {
  try {
    const { name, email, password, CPF } = req.body;

    // Verificar se o usuário já existe
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Usuário já existe' });
    }

    // Verificar se o CPF já existe
    const existingCPF = await User.findOne({ CPF });
    if (existingCPF) {
      return res.status(400).json({ message: 'CPF já cadastrado' });
    }

    // Gerar ID único
    const userId = await User.getNextUserId();

    // Criar novo usuário
    const user = new User({
      userId,
      name,
      email,
      password,
      CPF
    });

    await user.save();

    res.status(201).json({
      userId: user.userId,
      name: user.name,
      email: user.email,
      token: generateToken(user._id)
    });
  } catch (error) {
    res.status(500).json({ message: 'Erro no servidor', error: error.message });
  }
};

// Login de usuário
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Buscar usuário pelo email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    // Verificar senha
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Email ou senha inválidos' });
    }

    res.status(200).json({
      userId: user.userId,
      name: user.name,
      email: user.email,
      token: generateToken(user._id)
    });
  } catch (error) {
    res.status(500).json({ message: 'Erro no servidor', error: error.message });
  }
};

// Obter perfil do usuário
exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Erro no servidor', error: error.message });
  }
};

// Registrar pet
exports.registerPet = async (req, res) => {
  try {
    const userId = req.user.id;
    
    res.status(200).json({ 
      message: 'Método para registro de pet no userController. Esta função foi movida para petController.'
    });
  } catch (error) {
    res.status(500).json({ message: 'Erro no servidor', error: error.message });
  }
};

// Atualizar perfil do usuário
exports.updateUserProfile = async (req, res) => {
  try {
    const { name, email, CPF } = req.body;
    const userId = req.user.id;

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    if (name) user.name = name;
    if (email) user.email = email;
    if (CPF) user.CPF = CPF;

    const updatedUser = await user.save();

    res.status(200).json({
      userId: updatedUser.userId,
      name: updatedUser.name,
      email: updatedUser.email,
      CPF: updatedUser.CPF
    });
  } catch (error) {
    res.status(500).json({ message: 'Erro no servidor', error: error.message });
  }
}; 