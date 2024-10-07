// import express from 'express';
// import productsRouter from './routes/products.router.js'

// const app = express();
// const PORT = 9090;

// //Preparar la configuracion del servidor para recibir objetos JSON.
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));


// // Routes
// app.use("/api/products", productsRouter)


// app.listen(PORT, () => {
//     console.log("listening on port: " + PORT);
// });

import express from 'express';
import productsRouter from './routes/products.router.js';
import cartsRouter from './routes/carts.js';  // Importa el router de carritos

const app = express();
const PORT = 8080;  // Cambié el puerto a 8080 según las especificaciones

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);  // Usa el router de carritos

app.listen(PORT, () => {
    console.log(`listening on port: ${PORT}`);
});
