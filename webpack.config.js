// webpack.config.js
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
  devtool: 'eval-source-map',
  entry:  __dirname + "/src/main.js",//唯一入口文件
  output: {
    path: __dirname + "/dist",//打包后的文件存放的地方
    filename: "bundle.js"//打包后输出文件的文件名
  },
  devServer: {
      contentBase: "./dist",//设置本地服务器所加载的页面所在的目录
      port:"8082",//设置默认监听端口，如果省略，默认为”8080“
      historyApiFallback: true,//不跳转，在开发单页应用时非常有用，它依赖于HTML5 history API，如果设置为true，所有的跳转将指向index.html
      inline: true,//是否实时刷新
      hot: true,
  },
  plugins: [
    new webpack.BannerPlugin('版权所有，翻版必究'),
    new HtmlWebpackPlugin({
      template: __dirname + "/index.tmpl.html"//new 一个这个插件的实例，并传入相关的参数
  }),
  new webpack.HotModuleReplacementPlugin()//热加载插件
],
  module: {
      rules: [{
          test: /(\.jsx|\.js)$/,
          use: {
              loader: "babel-loader",
          },
          exclude: /node_modules/
      },{
          test: /\.css$/,
          use: [{
              loader: "style-loader"
          },{
              loader: "css-loader",
              options: {
                modules: true// 指定启用css modules
            }
          },{
            loader: "postcss-loader"
        }]
      }]
  }
}