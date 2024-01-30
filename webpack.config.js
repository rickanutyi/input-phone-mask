const path = require("path");

module.exports = {
  entry: "./index.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  resolve: {
    modules: [path.resolve(__dirname, "node_modules")],
    alias: {
        'core': path.resolve(__dirname, 'src/core'),
        'utils': path.resolve(__dirname, 'src/utils'),
    }
  },
};
