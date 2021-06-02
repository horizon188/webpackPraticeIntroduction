// webpack.config.js
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// const UglifyJSPlugin = require("uglifyjs-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HappyPack = require("happypack");
const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const ParallelUglifyPlugin = require("webpack-parallel-uglify-plugin");
const WorkboxPlugin = require('workbox-webpack-plugin');

console.log(process.env.NODE_ENV, "当前环境");
if (process.env.NODE_ENV !== "production") {
  console.log("Looks like we are in development mode!");
}
let build = JSON.stringify(process.env.NODE_ENV);
module.exports = {
  mode: "development",
  devtool: "eval-source-map",
  entry: __dirname + "/src/index.js", //唯一入口文件,

  output: {
    path: __dirname + "/dist", //打包后的文件存放的地方、
    publicPath: "/",
    chunkFilename: "[name].bundle.js",
    filename: "[name].[contenthash].bundle.js", //打包后输出文件的文件名
  },
  plugins: [
    new webpack.BannerPlugin("版权所有，翻版必究"),
    new HtmlWebpackPlugin({
      template: __dirname + "/index.tmpl.html", //new 一个这个插件的实例，并传入相关的参数
      title: "Output Management",
    }),
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash:16].css",
      chunkFilename: "[name].[contenthash:16].css",
    }),
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        { from: path.resolve(__dirname, "./src/assets"), to: "assets" },
      ],
    }),
    // new webpack.NamedModulesPlugin(), // 便更容易查看要修补(patch)的依赖。
    new webpack.HotModuleReplacementPlugin(), //热加载插件,HMR??去掉了也能实时更新
    new webpack.DefinePlugin({
      NODE_ENV: build,
    }),
    // new WorkboxPlugin.GenerateSW({
    //   // 这些选项帮助快速启用 ServiceWorkers
    //   // 不允许遗留任何“旧的” ServiceWorkers
    //   clientsClaim: true,
    //   skipWaiting: true,
    // }),
    // new UglifyJSPlugin(), // 不知道怎么其他已经开启js压缩了
    // new OptimizeCssAssetsPlugin(),
  ],
  // doto：分包后面优化
  optimization: {
    // webpack 在入口 chunk 中，包含了某些样板(boilerplate)，特别是 runtime 和 manifest
    // 利用runtimeChunk提取模板，防止每次改动入口文件不管有没变化都会变化
    runtimeChunk: {
      name: (entryPoint) => `runtime~${entryPoint.name}`,
    },
    moduleIds: "deterministic", // 我们期望的是，只有 main bundle 的 hash 发生变化，然而vendor文件名也随着改变。
    chunkIds: "deterministic",
    usedExports: true, //无效， 在压缩工具中的无用代码清除会受益于该选项，而且能够去除未使用的导出内容。
    sideEffects: true, //无效， 告知 webpack 去辨识 package.json 中的 副作用 标记或规则，以跳过那些当导出不被使用且被标记不包含副作用的模块。
    removeEmptyChunks: false, // 如果 chunk 为空，告知 webpack 检测或移除这些 chunk。
    providedExports:true,
    splitChunks: {
      chunks: 'all',
      minSize: 20000, // 生成 chunk 的最小体积,单位1kb = 1024B（bytes）
      minRemainingSize: 0,
      minChunks: 1,
      maxAsyncRequests: 30,
      maxInitialRequests: 30,
      enforceSizeThreshold: 50000,
      cacheGroups: {
        libs: {
          name: "chunk-libs",
          test: /[\\/]node_modules[\\/]/,
          priority: 10,
          chunks: "initial", // 只打包初始时依赖的第三方
        },
        // antd: {
        //   name: "chunk-antd", // 单独将 antd和其图标 拆包
        //   priority: 20, // 权重要大于 libs 不然会被打包进 libs 或者
        //   test: /[\\/]node_modules[\\/](@ant-design|antd)[\\/]/,
        //   chunks: "initial" // 只打包入口文件依赖的antd
        // },
        // chart: {
        //   name: "chunk-chart",//图表chunk
        //   priority: 20,
        //   test: /[\\/]node_modules[\\/](bizcharts|@antv)[\\/]/,
        //   chunks: "async" // 图表是异步chunk的，当加载才加载这个大chunk
        // },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
      },
    },
    minimizer: [
      // 压缩插件
      new ParallelUglifyPlugin({
        cacheDir: ".cache/",
        uglifyJS: {
          output: {
            comments: false, //去掉注释
          },
          warnings: false,
          compress: {},
        },
      }),
    ],
  },
  module: {
    rules: [
      {
        test: /(\.jsx|\.js)$/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["es2015", "react"],
            cacheDirectory: true, // 提升构建/编译速度
          },
        },
        exclude: /node_modules/,
      },
      {
        test: /\.css$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              esModule: false,
              modules: {
                namedExport: true,
              },
              // publicPath: './',
            },
          },
          {
            loader: "css-loader",
            options: {
              esModule: false,
              modules: {
                namedExport: false,
                localIdentName: "foo__[name]__[local]",
              },
            },
          },
        ],
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              // name: '[path][name].[ext]?[hash]'
            },
          },
        ],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          {
            loader: "file-loader",
          },
        ],
      },
    ],
  },
  resolve:{
    extensions: [".js", ".json", ".jsx", ".css"],
    alias:{
      '@': path.join(__dirname, '/src'),
      '@static': path.join(__dirname, '/static'),
      '@pages': path.join(__dirname, '/src/pages'),
      
    }
  },
  devServer: {
    contentBase: "./dist", //设置本地服务器所加载的页面所在的目录
    port: "8082", //设置默认监听端口，如果省略，默认为”8082“
    historyApiFallback: true, //不跳转，在开发单页应用时非常有用，它依赖于HTML5 history API，如果设置为true，所有的跳转将指向index.html
    inline: true, //是否实时刷新,HMR??去掉了也能实时更新
    hot: true, // ,HMR??去掉了也能实时更新
  },
};
