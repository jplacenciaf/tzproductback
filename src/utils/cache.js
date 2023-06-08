const NodeCache = require('node-cache');

// Crea una nueva instancia de NodeCache
const cache = new NodeCache();

// Agrega un valor al caché
const setCacheValue = (key, value) => {
  cache.set(key, value);
};

// Obtiene un valor del caché
const getCacheValue = (key) => {
  return cache.get(key);
};

// Elimina un valor del caché
const deleteCacheValue = (key) => {
  cache.del(key);
};

module.exports = {
  setCacheValue,
  getCacheValue,
  deleteCacheValue
};
