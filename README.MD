# 1.热更新失效，
- 添加了babelrc文件和修改了， babel-plugin-react-transform react-transform-hmr
- webpack的new webpack.HotModuleReplacementPlugin()//热加载插件
- hot: true,

# 解决方案：去掉上面的配置

# 2.样式提取失败和样式引入undefined错误
- ExtractTextPlugin的用法？
- styles undefined
- react-dom.production.min.js?885e:216 TypeError: Cannot read property 'root' of undefined at TestCon.render (test.js?84b8:8)

# 解决思路：导入样式对象为空对象了，css编译问题，修改css-loader编译设置，解决问题

# 3.css样式图片打包后路径有问题


