// import { Router } from 'express';
// import ProductManager from '../services/ProductManager.js';


// const router = Router()


// // creamos instancia de la clase ProductManager
// const productManager = new ProductManager();


// // Endpoint configuration
// // GET
// router.get('/', async (req, res) => {
//     try {
//         // aplicando limit
//         const limit = req.query.limit ? parseInt(req.query.limit) : undefined;
//         const products = await productManager.getAllProducts(limit)
//         res.json(products)
//     } catch (error) {
//         console.log(error);
//     }
// })    



// // GET:pid
// router.get('/:pid', async (req, res) => {
//     try {
//         const productId = parseInt(req.params.pid)
//         const product = await productManager.getProductById(productId)

//         if (product) {
//             res.json(product)
//         } else {
//             res.status(404).json({ error: 'Producto no encontrado' })
//         }
//     } catch (error) {
//         console.log(error);
//     }
// })



// // POST
// router.post('/', async (req, res) => {
//     try {

//         const { title, description, code, price, stock, category, thumbnails } = req.body;

//         if (!title || !description || !code || !price || !stock || !category) {
//             return res.status(400).json({ error: 'Todos los campos son obligatorios' })
//         }


//         const product = await productManager.addProduct({ title, description, code, price, stock, category, thumbnails })

//         res.status(201).json(product)
//     } catch (error) {
//         console.log(error);
//     }
// })



// // PUT:pid
// router.put('/:pid', async (req, res) => {
//     try {
//         const productId = parseInt(req.params.pid);
//         const updatedProduct = await productManager.updateProduct(productId, req.body);
//         if (updatedProduct) {
//             res.json(updatedProduct);
//         } else {
//             res.status(404).json({ error: 'Producto no encontrado' });
//         }
//     } catch (error) {
//         console.log(error);
//     }
// });


// // DELETE:pid
// router.delete('/:pid', async (req, res) => {
//     try {
//         const productId = parseInt(req.params.pid);
//         const deletedProduct = productManager.deleteProduct(productId);
//         if (deletedProduct) {
//             res.json(deletedProduct);
//         } else {
//             res.status(404).json({ error: 'Producto no encontrado' });
//         }
//     } catch (error) {
//         console.log(error);
//     }
// });




// // Ruta principal que renderiza la vista con los productos
// router.get('/r', async (req, res) => {
//     try {
//     const limit = req.query.limit ? parseInt(req.query.limit) : undefined;
//       const products = await productManager.getAllProducts(limit); // Obtener productos
//       res.render('home', { products }); // Renderizar la vista con los productos
//     } catch (error) {
//       console.error('Error al obtener productos:', error);
//       res.status(500).send('Error interno del servidor');
//     }
//   });

// export default router


// // // Ejemplo para el Carrito
// // const carts = [
// //     {
// //         userId: 1,
// //         products: [
// //             { id: 1, quantity: 2 },
// //             { id: 2, quantity: 1 },
// //         ],
// //     },
// //     {
// //         userId: 2,
// //         products: [
// //             { id: 1, quantity: 3 },
// //             { id: 3, quantity: 1 },
// //         ],
// //     },
// //     //... more carts...
// // ]


import express from 'express';
import Product from '../models/Product.js';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const { limit = 10, page = 1, sort, query } = req.query;
    const filter = query ? { category: query } : {};

    const options = {
      limit: parseInt(limit),
      skip: (parseInt(page) - 1) * parseInt(limit),
      sort: sort === 'asc' ? { price: 1 } : sort === 'desc' ? { price: -1 } : {}
    };

    const products = await Product.find(filter, null, options);
    const totalProducts = await Product.countDocuments(filter);
    const totalPages = Math.ceil(totalProducts / limit);

    res.json({
      status: 'success',
      payload: products,
      totalPages,
      page: parseInt(page),
      hasPrevPage: page > 1,
      hasNextPage: page < totalPages,
      prevLink: page > 1 ? `/api/products?page=${page - 1}&limit=${limit}` : null,
      nextLink: page < totalPages ? `/api/products?page=${page + 1}&limit=${limit}` : null
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: 'error', message: 'Error al obtener productos' });
  }
});

export default router;
