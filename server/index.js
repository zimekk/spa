const express = require('express');
const path = require('path');
const app = express();
const { PORT = 3000 } = process.env;
const { homepage = '/' } = require('../package');
const { path: staticPath } = require('url').parse(homepage);

app.get('/', (req, res) => res.sendFile(path.resolve(__dirname, '../build/index.html')))
  .use(staticPath, express.static(path.resolve(__dirname, '../build')))
  .use('/api', require('./api'));

app.listen(PORT, () => console.log(`Example app listening on port ${PORT}!`))
