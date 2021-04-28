const currentTask = process.env.npm_lifecycle_event;
const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const { WebpackManifestPlugin } = require("webpack-manifest-plugin");
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");

const config = {
  entry: "./src/index.js",
  output: {
    filename: "myBundle.[hash].js",
    path: path.resolve(__dirname, "dist"),
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),
  ],
  mode: "development",
  devtool: "eval-cheap-source-map",
  devServer: {
    port: 8080,
    contentBase: path.resolve(__dirname, "dist"),
    hot: true,
  },

  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      //   {
      //     test: /\.(png|jpe?g|webp|git|svg|)$/i,
      //     use: [
      //       {
      //         loader: "img-optimize-loader",
      //       },
      //     ],
      //   },
      // {
      //   test: /\.(png|jpe?g|gif)$/i,
      //   use: [
      //     {
      //       loader: "file-loader",
      //     },
      //   ],
      // },
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              [
                "@babel/preset-env",
                { useBuiltIns: "usage", corejs: 3, targets: "defaults" },
              ],
              "@babel/preset-react",
            ],
          },
        },
      },
    ],
  },
};

if (currentTask == "build") {
  config.mode = "production";
  config.module.rules[0].use[0] = MiniCssExtractPlugin.loader;
  config.plugins.push(
    new MiniCssExtractPlugin({ filename: "css/main.[hash].css" }),
    new CleanWebpackPlugin(),
    new WebpackManifestPlugin()
  );
}

module.exports = config;
