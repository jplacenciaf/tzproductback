const express = require('express');
const serverless = require("serverless-http");
const logger = require('./utils/logger');
const productRoutes = require('./routes/productRoutes');

const app = express();
const port = process.env.PORT || 3030

// Middleware
app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    logger(`Tiempo de respuesta: ${duration}ms`);
  });

    // // Website you wish to allow to connect
    // // res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3001');
    // res.setHeader('Access-Control-Allow-Origin', 'https://productfront.netlify.app');

    // // Request methods you wish to allow
    // res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // // Request headers you wish to allow
    // res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // // Set to true if you need the website to include cookies in the requests sent
    // // to the API (e.g. in case you use sessions)
    // res.setHeader('Access-Control-Allow-Credentials', true);

  next();
});

// Parseo formato JSON
app.use(express.json());

// Rutas para los productos
app.use('/products', productRoutes);

// Iniciar el servidor
app.listen(port, () => {
  console.log('Servidor iniciado en el puerto ' + port);
});
