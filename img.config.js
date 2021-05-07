const webpack = require('webpack')
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
module.exports = {
  entry:  __dirname + "/src/main.js",//唯一入口文件
  output: {
    path: __dirname + "/diste",//打包后的文件存放的地方
    filename: "bundle.js"//打包后输出文件的文件名
  },
  plugins: [
    new webpack.BannerPlugin('版权所有，翻版必究'),
    new HtmlWebpackPlugin({
      template: __dirname + "/index.tmpl.html"//new 一个这个插件的实例，并传入相关的参数
  }),
  new CleanWebpackPlugin(),

  // new webpack.HotModuleReplacementPlugin()//热加载插件
],
  module: {
    rules: [
      {
        test: /(\.jsx|\.js)$/,
        use: {
            loader: "babel-loader",
            options: {
              presets: [
                  "es2015", "react"
              ]
          }
        },
        exclude: /node_modules/
    },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
       {
         test: /\.(png|svg|jpg|gif)$/,
         use: [
           'file-loader'
         ]
       }
    ]
  }
};