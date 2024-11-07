// import { Router } from 'express';
// import CartManager from '../services/CartManager.js';

// const router = Router();

// // Instanciamos la clase CartManager
// const cartManager = new CartManager();


// // POST: Crear un nuevo carrito
// router.post('/', async (req, res) => {
//     try {
//         const newCart = await cartManager.createCart();
//         res.status(201).json(newCart);
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({ error: 'Error al crear el carrito' });
//     }
// });


// // GET: Obtener los productos de un carrito por su ID
// router.get('/:cid', async (req, res) => {
//     try {
//         const cartId = parseInt(req.params.cid);
//         const cart = await cartManager.getCartById(cartId);

//         if (cart) {
//             res.json(cart.products);
//         } else {
//             res.status(404).json({ error: 'Carrito no encontrado' });
//         }
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({ error: 'Error al obtener los productos del carrito' });
//     }
// });


// // POST: Agregar un producto al carrito
// router.post('/:cid/product/:pid', async (req, res) => {
//     try {
//         const cartId = parseInt(req.params.cid);
//         const productId = parseInt(req.params.pid);

//         const updatedCart = await cartManager.addProductToCart(cartId, productId);

//         if (updatedCart) {
//             res.json(updatedCart);
//         } else {
//             res.status(404).json({ error: 'Carrito o producto no encontrado' });
//         }
//     } catch (error) {
//         console.log(error);
//         res.status(500).json({ error: 'Error al agregar el producto al carrito' });
//     }
// });

// export default router;


import express from 'express';
import Cart from '../models/Cart.js';
import Product from '../models/Product.js';

const router = express.Router();

// Agregar un producto al carrito
router.post('/:cid/products/:pid', async (req, res) => {
  try {
    const { cid, pid } = req.params;
    const { quantity } = req.body;

    const cart = await Cart.findById(cid);
    if (!cart) return res.status(404).json({ message: 'Carrito no encontrado' });

    const productIndex = cart.products.findIndex(item => item.product.toString() === pid);
    if (productIndex > -1) {
      cart.products[productIndex].quantity += quantity;
    } else {
      cart.products.push({ product: pid, quantity });
    }

    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al agregar producto al carrito' });
  }
});

// Eliminar un producto del carrito
router.delete('/:cid/products/:pid', async (req, res) => {
  try {
    const { cid, pid } = req.params;

    const cart = await Cart.findByIdAndUpdate(cid, {
      $pull: { products: { product: pid } }
    }, { new: true });

    if (!cart) return res.status(404).json({ message: 'Carrito no encontrado' });

    res.status(200).json(cart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al eliminar producto del carrito' });
  }
});

export default router;
