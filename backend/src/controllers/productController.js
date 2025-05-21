const Product = require('../models/Product');

// Listar todos os produtos
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().populate('provider', 'name CNPJ _id');

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: 'Erro no servidor', error: error.message });
  }
};

// Obter detalhes de um produto específico
exports.getProductById = async (req, res) => {
  try {
    const productId = req.params.id;

    const product = await Product.findById(productId).populate('provider', 'name CNPJ _id');

    if (!product) {
      return res.status(404).json({ message: 'Produto não encontrado' });
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: 'Erro no servidor', error: error.message });
  }
};

// Criar um novo produto
exports.createProduct = async (req, res) => {
  try {
    const { name, imageUrl, description, price, provider } = req.body;

    const productId = await Product.getNextProductId();
    
    const newProduct = new Product({
      productId,
      name,
      imageUrl,
      description,
      price,
      provider
    });

    await newProduct.save();

    res.status(201).json({ message: 'Produto criado com sucesso', product: newProduct });
  } catch (error) {
    res.status(500).json({ message: 'Erro no servidor', error: error.message });
  }
};

// Atualizar um produto existente
exports.updateProduct = async (req, res) => {
  try {
    const productId = req.params.id;
    const updates = req.body;

    const updatedProduct = await Product.findByIdAndUpdate(productId, updates, { new: true });
    if (!updatedProduct) {
      return res.status(404).json({ message: 'Produto não encontrado' });
    }

    res.status(200).json({ message: 'Produto atualizado com sucesso', product: updatedProduct });
  } catch (error) {
    res.status(500).json({ message: 'Erro no servidor', error: error.message });
  }
};

// Excluir um produto
exports.deleteProduct = async (req, res) => {
  try {
    const productId = req.params.id;

    const deletedProduct = await Product.findByIdAndDelete(productId);
    if (!deletedProduct) {
      return res.status(404).json({ message: 'Produto não encontrado' });
    }

    res.status(200).json({ message: 'Produto excluído com sucesso' });
  } catch (error) {
    res.status(500).json({ message: 'Erro no servidor', error: error.message });
  }
};
