const path = require('path')

module.exports = {
  entry: './npm/taja-fastopt.js',
  output: {
    filename: 'index.js',
    path: path.join(__dirname, 'npm', 'dist')
  }
}