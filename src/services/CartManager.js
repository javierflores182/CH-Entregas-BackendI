import fs from 'fs/promises';
import path from 'path';

const cartsFilePath = path.resolve('data', 'carrito.json');

export default class CartManager {
    constructor() {
        this.carts = [];
        this.init();
    }

    async init() {
        try {
            const data = await fs.readFile(cartsFilePath, 'utf-8');
            this.carts = JSON.parse(data);
        } catch (error) {
            this.carts = [];
        }
    }

    async saveToFile() {
        await fs.writeFile(cartsFilePath, JSON.stringify(this.carts, null, 2));
    }

    async createCart() {
        const newCart = {
            id: this.carts.length ? this.carts[this.carts.length - 1].id + 1 : 1,
            products: [],
        };
        this.carts.push(newCart);
        await this.saveToFile();
        return newCart;
    }

    getCartById(id) {
        return this.carts.find(cart => cart.id === id);
    }

    async addProductToCart(cartId, productId) {
        const cart = this.getCartById(cartId);
        if (!cart) return null;

        const productInCart = cart.products.find(p => p.product === productId);
        if (productInCart) {
            // Incrementar la cantidad si el producto ya existe en el carrito
            productInCart.quantity += 1;
        } else {
            // Si no existe, agregar el nuevo producto con cantidad 1
            cart.products.push({ product: productId, quantity: 1 });
        }

        await this.saveToFile();
        return cart;
    }
}
