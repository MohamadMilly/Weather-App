// webpack.config.js
import path from "node:path";
import HtmlWebpackPlugin from "html-webpack-plugin";

export default {
  mode: "development",
  entry: "./src/main.js",
  output: {
    filename: "index.js",
    path: path.resolve(import.meta.dirname, "dist"),
    clean: true,
  },
  devtool: "eval-source-map",
  devServer: {
    watchFiles: ["./src/index.html"],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(avif|jpe?g|png|webp)$/i,
        type: "asset/resource",
      },
    ],
  },
};
