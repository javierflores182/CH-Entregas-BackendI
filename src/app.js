// import express from 'express';
// import mongoose from 'mongoose';
// import { createServer } from 'http';
// import { Server } from 'socket.io';
// import { engine } from 'express-handlebars';

// import productsRouter from './routes/products.router.js';
// import cartsRouter from './routes/carts.js';

// import ProductManager from './services/ProductManager.js';

// const app = express();
// const PORT = 8080; 

// // Configuración de Handlebars
// app.engine('handlebars', engine());
// app.set('view engine', 'handlebars');
// app.set('views', './src/views');


// // Configuración de MongoDB Atlas
// const mongoURI = 'mongodb+srv://<username>:<password>@cluster0.mongodb.net/mi_base_de_datos?retryWrites=true&w=majority';


// mongoose.connect(mongoURI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })
// .then(() => console.log('Conectado a la base de datos MongoDB Atlas'))
// .catch((error) => console.error('Error al conectar a MongoDB:', error));

// // Configuración del servidor HTTP y Socket.io
// const httpServer = createServer(app);
// const io = new Server(httpServer);

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // Rutas
// app.use('/api/products', productsRouter);
// app.use('/api/carts', cartsRouter);


// // Rutas de vistas
// // app.get('/', (req, res) => {
// //   res.render('home', { products: [] }); // Inicialmente vacío
// // });

//  const productManager = new ProductManager();
//  app.get('/', async (req, res) => {
//    const products = await productManager.getAllProducts(); // Obtiene los productos
//    res.render('home', { products }); // Los pasa a la vista
//  });

// app.get('/realtimeproducts', (req, res) => {
//   res.render('realTimeProducts');
// });

// // Manejo de eventos con Socket.io
// io.on('connection', (socket) => {
//   console.log('Cliente conectado');

//   socket.on('disconnect', () => {
//     console.log('Cliente desconectado');
//   });
// });

// // Iniciar el servidor
// httpServer.listen(PORT, () => {
//   console.log(`Servidor escuchando en http://localhost:${PORT}`);
// });

// export { io }; // Exportamos `io` para utilizarlo en otras partes


import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { engine } from 'express-handlebars';
import productsRouter from './routes/products.router.js';
import cartsRouter from './routes/carts.router.js';

dotenv.config();

const app = express();
const PORT = 8080;

// Conexión a MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Conectado a MongoDB Atlas'))
.catch(error => console.error('Error al conectar a MongoDB Atlas:', error));

// Configuración de Handlebars
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);

// Ruta de inicio
app.get('/', (req, res) => {
  res.render('home', { products: [] });
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
