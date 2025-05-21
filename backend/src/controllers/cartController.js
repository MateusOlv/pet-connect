const Cart = require('../models/Cart');
const Product = require('../models/Product');

// Adicionar produto ao carrinho
exports.addToCart = async (req, res) => {
  const userId = req.user.id;
  const { productId, quantity } = req.body;

  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Produto não encontrado' });
    }

    let cart = await Cart.findOne({ user: userId });

    // Criar carrinho se não existir
    if (!cart) {
      cart = new Cart({ user: userId, items: [] });
    }

    const productIndex = cart.items.findIndex(item => item.product.toString() === productId);

    if (productIndex > -1) {
      // Produto já no carrinho -> atualizar quantidade
      cart.items[productIndex].quantity += quantity;
    } else {
      // Novo produto no carrinho
      cart.items.push({ product: productId, quantity });
    }

    await cart.save();

    res.status(200).json({ message: 'Produto adicionado ao carrinho', cart });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao adicionar ao carrinho', error: error.message });
  }
};

// Obter carrinho do usuário
exports.getCart = async (req, res) => {
  const userId = req.user.id;

  try {
    const cart = await Cart.findOne({ user: userId }).populate('items.product');

    if (!cart) {
      return res.status(200).json({ message: 'Carrinho vazio', items: [] });
    }

    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: 'Erro ao obter carrinho', error: error.message });
  }
};

// Remover produto do carrinho
exports.removeFromCart = async (req, res) => {
  const userId = req.user.id;
  const { productId } = req.params;

  try {
    const cart = await Cart.findOne({ user: userId });

    if (!cart) return res.status(404).json({ message: 'Carrinho não encontrado' });

    cart.items = cart.items.filter(item => item.product.toString() !== productId);
    await cart.save();

    res.status(200).json({ message: 'Produto removido do carrinho', cart });
  } catch (error) {
    res.status(500).json({ message: 'Erro ao remover do carrinho', error: error.message });
  }
};
