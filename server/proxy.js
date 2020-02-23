const chokidar = require('chokidar');

chokidar.watch(__dirname).on('all', (event, path) => {
  console.log(`Clearing require.cache ${path}`);
  delete require.cache[path];
});

module.exports = (...args) => require('./api')(...args);
