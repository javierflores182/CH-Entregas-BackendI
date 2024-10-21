import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { engine } from 'express-handlebars';

import productsRouter from './routes/products.router.js';
import cartsRouter from './routes/carts.js';  // Importa el router de carritos

import ProductManager from './services/ProductManager.js'; // Asegúrate que existe

const app = express();
const PORT = 8080;  // Cambié el puerto a 8080 según las especificaciones

// Configuración de Handlebars
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './src/views');

// Configuración del servidor HTTP y Socket.io
const httpServer = createServer(app);
const io = new Server(httpServer);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);  // Usa el router de carritos


// Rutas de vistas
// app.get('/', (req, res) => {
//   res.render('home', { products: [] }); // Inicialmente vacío
// });

const productManager = new ProductManager();

app.get('/', async (req, res) => {
  const products = await productManager.getAllProducts(); // Obtiene los productos
  res.render('home', { products }); // Los pasa a la vista
});

app.get('/realtimeproducts', (req, res) => {
  res.render('realTimeProducts');
});

// Manejo de eventos con Socket.io
io.on('connection', (socket) => {
  console.log('Cliente conectado');

  socket.on('disconnect', () => {
    console.log('Cliente desconectado');
  });
});

// Iniciar el servidor
httpServer.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});

export { io }; // Exportamos `io` para utilizarlo en otras partes