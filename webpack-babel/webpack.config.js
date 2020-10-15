const path = require("path");

module.exports = {
  mode: "development",
  entry: "./src/js/main.js",
  output: {
    path: path.resolve(__dirname, "dist/js"),
    filename: "bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: [path.resolve(__dirname, "src/js")],
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
            plugins: ["@babel/plugin-syntax-class-properties"],
          },
        },
      },
    ],
  },
  devtool: "source-map",
};
