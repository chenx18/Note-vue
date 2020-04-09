
module.exports = {
  
  // 基本路径
  publicPath: '/',
 
  // outputDir: 在npm run build 或 yarn build 时 ，生成文件的目录名称（要和baseUrl的生产环境路径一致）
  outputDir: 'dist',

  //用于放置生成的静态资源 (js、css、img、fonts) 的；（项目打包之后，静态资源会放在这个文件夹下）
  assetsDir: "assets",

  //指定生成的 index.html 的输出路径  (打包之后，改变系统默认的index.html的文件名)
  // indexPath: "myIndex.html",

  //默认情况下，生成的静态资源在它们的文件名中包含了 hash 以便更好的控制缓存。你可以通过将这个选项设为 false 来关闭文件名哈希。(false的时候就是让原来的文件名不改变)
  filenameHashing: false,

  // eslint-loader 是否使用eslint
  lintOnSave: true,

  /**
   * 如果你不需要生产环境的 source map，可以将其设置为 false 以加速生产环境构建。
   *  打包之后发现map文件过大，项目文件体积很大，设置为false就可以不输出map文件
   *  map文件的作用在于：项目打包后，代码都是经过压缩加密的，如果运行时报错，输出的错误信息无法准确得知是哪里的代码报错。
   *  有了map就可以像未加密的代码一样，准确的输出是哪一行哪一列有错。
   * */
  productionSourceMap: false,
  
  // webpack配置
  chainWebpack: () => {},
  // css相关配置
  // css: {
  //   modules:false,
  //   requireModuleExtension: false,
  //   extract: true,
  //   sourceMap: false,
  // },
  // 支持webPack-dev-server的所有选项
  devServer: {
    host: "localhost",
    port: 8068, // 端口号
    https: false, // https:{type:Boolean}
    open: true, //配置自动启动浏览器
    // proxy: 'http://localhost:4000' // 配置跨域处理,只有一个代理
    // baseUrl: '/',
 
    // 配置多个代理
    proxy: {
      "/api": {
        target: 'http://localhost:3000/api',  // target: 将所有以 /api 为开头的请求转发到 http://localhost:8088/api
        changeOrigin: true,
        pathRewrite: {     // 重写地址。 '^/api': '' 表示将以 /api 开头的请求的地址中的 '/api' 替换为 ''           
          '^/api': ''
        }
      },
    }
  }
  
 }
 