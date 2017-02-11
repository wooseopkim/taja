const path = require('path')

module.exports = {
  entry: './npm/index.js',
  output: {
    filename: 'dist.js',
    path: path.join(__dirname, 'npm')
  }
}