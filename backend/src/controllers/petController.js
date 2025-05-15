const Pet = require('../models/Pet');
const User = require('../models/User');

// Criar pet
exports.createPet = async (req, res) => {
  try {
    const { name, type, breed, age, weight } = req.body;
    const userId = req.user.id;

    console.log(`Requisição de criação de pet recebida: ${JSON.stringify(req.body)}`);
    console.log(`Usuário ID: ${userId}`);

    // Verificar se os campos obrigatórios estão presentes
    if (!name || !type || !age) {
      return res.status(400).json({ 
        message: 'Dados incompletos. Nome, tipo e idade são obrigatórios.' 
      });
    }

    // Verificar se o usuário existe
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    // Gerar ID único para o pet
    const petId = await Pet.getNextPetId();

    const pet = new Pet({
      petId,
      name,
      type,
      breed: breed || undefined,
      age,
      weight: weight || undefined,
      owner: userId
    });

    const savedPet = await pet.save();
    console.log(`Pet salvo com sucesso: ${savedPet._id}`);

    res.status(201).json(savedPet);
  } catch (error) {
    console.error(`Erro ao criar pet: ${error.message}`);
    res.status(500).json({ message: 'Erro no servidor', error: error.message });
  }
};

// Obter todos os pets do usuário
exports.getPetsByUser = async (req, res) => {
  try {
    const userId = req.user.id;

    // Buscar todos os pets do usuário
    const pets = await Pet.find({ owner: userId });

    // Remover duplicados com base no nome e tipo
    const uniquePets = [];
    const nameTypeMap = new Map();

    // Agrupar os pets por combinação de nome e tipo (que consideraremos como duplicados)
    pets.forEach(pet => {
      const key = `${pet.name.toLowerCase()}-${pet.type.toLowerCase()}`;
      
      // Se este nome+tipo ainda não foi visto, ou se o pet atual tem um ID menor (provavelmente foi criado antes),
      // consideramos este como o "correto" a ser mantido
      if (!nameTypeMap.has(key) || pet.petId < nameTypeMap.get(key).petId) {
        nameTypeMap.set(key, pet);
      }
    });

    // Converter o Map de volta para um array
    const filteredPets = Array.from(nameTypeMap.values());
    
    console.log(`Pets encontrados: ${pets.length}, Após remoção de duplicados: ${filteredPets.length}`);

    res.status(200).json(filteredPets);
  } catch (error) {
    console.error(`Erro ao obter pets: ${error.message}`);
    res.status(500).json({ message: 'Erro no servidor', error: error.message });
  }
};

// Obter detalhes de um pet específico
exports.getPetById = async (req, res) => {
  try {
    const petId = req.params.id;
    const userId = req.user.id;

    const pet = await Pet.findOne({ 
      _id: petId, 
      owner: userId 
    });

    if (!pet) {
      return res.status(404).json({ message: 'Pet não encontrado ou não pertence ao usuário' });
    }

    res.status(200).json(pet);
  } catch (error) {
    res.status(500).json({ message: 'Erro no servidor', error: error.message });
  }
};

// Atualizar informações do pet
exports.updatePet = async (req, res) => {
  try {
    const { name, type, age } = req.body;
    const petId = req.params.id;
    const userId = req.user.id;

    const pet = await Pet.findOne({ 
      _id: petId, 
      owner: userId 
    });

    if (!pet) {
      return res.status(404).json({ message: 'Pet não encontrado ou não pertence ao usuário' });
    }

    if (name) pet.name = name;
    if (type) pet.type = type;
    if (age) pet.age = age;

    const updatedPet = await pet.save();

    res.status(200).json(updatedPet);
  } catch (error) {
    res.status(500).json({ message: 'Erro no servidor', error: error.message });
  }
};

// Excluir pet
exports.deletePet = async (req, res) => {
  try {
    const petId = req.params.id;
    const userId = req.user.id;

    const pet = await Pet.findOne({ 
      _id: petId, 
      owner: userId 
    });

    if (!pet) {
      return res.status(404).json({ message: 'Pet não encontrado ou não pertence ao usuário' });
    }

    await Pet.deleteOne({ _id: petId });

    res.status(200).json({ message: 'Pet excluído com sucesso' });
  } catch (error) {
    res.status(500).json({ message: 'Erro no servidor', error: error.message });
  }
}; 