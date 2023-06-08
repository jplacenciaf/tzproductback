const fs = require('fs');
const cache = require('../utils/cache');
const { v4: uuidv4  } = require('uuid');

const archivo = './src/db/data.json';

const generateProductId = () => {
  const productId = uuidv4();
  return productId;
};

const getAllProducts = (req, res) => {

  // Verificar si los productos están en la caché
  const cachedProducts = cache.getCacheValue('products');
  if (cachedProducts) {
    return res.json(cachedProducts);
  }

  fs.readFile(archivo, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Error al leer los productos' });
    }
    const products = JSON.parse(data).products;
    
    // Guardar los productos en la caché
    cache.setCacheValue('products', products);
    
    res.json(products);
  });
};

const getProductById = (req, res) => {
  const productId = req.params.id;
  fs.readFile(archivo, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Error al leer los productos' });
    } else {
      const products = JSON.parse(data).products;
      const product = products.find((p) => p.id === productId);
      if (product) {
        res.json(product);
      } else {
        res.status(404).json({ error: 'Producto no encontrado' });
      }
    }
  });
};

const createProduct = (req, res) => {
  const { name, description, price } = req.body;
  fs.readFile(archivo, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Error al leer los productos' });
    } else {
      const products = JSON.parse(data).products;
      const newProduct = {
        id: generateProductId(),
        name,
        description,
        price,
      };
      products.push(newProduct);
      const updatedData = { products };
      fs.writeFile(archivo, JSON.stringify(updatedData), (err) => {
        if (err) {
          console.error(err);
          res.status(500).json({ error: 'Error al guardar el producto' });
        } else {
          res.status(201).json(newProduct);
        }
      });
    }
  });
};

const updateProduct = (req, res) => {
  const productId = req.params.id;
  const { name, description, price } = req.body;
  fs.readFile(archivo, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Error al leer los productos' });
    } else {
      const products = JSON.parse(data).products;
      const product = products.find((p) => p.id === productId);
      if (product) {
        product.name = name || product.name;
        product.description = description || product.description;
        product.price = price || product.price;
        const updatedData = { products };
        fs.writeFile(archivo, JSON.stringify(updatedData), (err) => {
          if (err) {
            console.error(err);
            res.status(500).json({ error: 'Error al guardar el producto' });
          } else {
            res.json(product);
          }
        });
      } else {
        res.status(404).json({ error: 'Producto no encontrado' });
      }
    }
  });
};

const deleteProduct = (req, res) => {
  const productId = req.params.id;
  fs.readFile(archivo, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: 'Error al leer los productos' });
    } else {
      const products = JSON.parse(data).products;
      const productIndex = products.findIndex((p) => p.id === productId);
      if (productIndex !== -1) {
        const deletedProduct = products.splice(productIndex, 1);
        const updatedData = { products };
        fs.writeFile(archivo, JSON.stringify(updatedData), (err) => {
          if (err) {
            console.error(err);
            res.status(500).json({ error: 'Error al eliminar el producto' });
          } else {
            res.json(deletedProduct[0]);
          }
        });
      } else {
        res.status(404).json({ error: 'Producto no encontrado' });
      }
    }
  });
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
