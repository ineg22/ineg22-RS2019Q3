const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: {
    app: './src/app.js',
    landing: './src/screens/landing/app.landing.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.[name].js',
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader'],
        }),
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: {
          loader: 'file-loader',
          options: {
            outputPath: 'assets',
            name: '[name].[ext]',
          },
        },
      },
      // {
      //   test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
      //   use: {
      //     loader: 'file-loader',
      //     options: {
      //       outputPath: 'fonts',
      //     },
      //   },
      // },
    ],
  },
  plugins: [
    new ExtractTextPlugin('style.[name].css'),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './src/screens/landing/index.html',
      chunks: ['landing'],
      favicon: './src/screens/landing/assets/favicon-landing.png',
    }),
    new HtmlWebpackPlugin({
      filename: 'sprite.html',
      template: './src/screens/sprite/index.html',
      chunks: ['app'],
      favicon: './src/screens/sprite/assets/favicon-sprite.png',
    }),
    new CopyWebpackPlugin([
      {
        from: './node_modules/gif.js-upgrade/dist/gif.worker.js',
        to: './',
      },
    ]),
  ],
};
