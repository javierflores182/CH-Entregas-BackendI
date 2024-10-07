import { Router } from 'express';
import CartManager from '../services/CartManager.js';

const router = Router();

// Instanciamos la clase CartManager
const cartManager = new CartManager();


// POST: Crear un nuevo carrito
router.post('/', async (req, res) => {
    try {
        const newCart = await cartManager.createCart();
        res.status(201).json(newCart);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error al crear el carrito' });
    }
});


// GET: Obtener los productos de un carrito por su ID
router.get('/:cid', async (req, res) => {
    try {
        const cartId = parseInt(req.params.cid);
        const cart = await cartManager.getCartById(cartId);

        if (cart) {
            res.json(cart.products);
        } else {
            res.status(404).json({ error: 'Carrito no encontrado' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error al obtener los productos del carrito' });
    }
});


// POST: Agregar un producto al carrito
router.post('/:cid/product/:pid', async (req, res) => {
    try {
        const cartId = parseInt(req.params.cid);
        const productId = parseInt(req.params.pid);

        const updatedCart = await cartManager.addProductToCart(cartId, productId);

        if (updatedCart) {
            res.json(updatedCart);
        } else {
            res.status(404).json({ error: 'Carrito o producto no encontrado' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error al agregar el producto al carrito' });
    }
});

export default router;
