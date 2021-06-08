module.exports = {
    // 选项...
    configureWebpack: {
      externals: {
        "AMap": "AMap",
      },
      devtool: false
    },

    
    devServer: {
      open: true,
      host: '192.168.1.110',
      port: 8080,
      https: false,
    // //   proxy: {
    // //       '/api': {
    // //           target: 'http://192.168.1.119:9053',
    // //           changeOrigin: true,
    // //           ws: true,
    // //           pathRewrite: {
    // //               '^/api': ''
    // //           }
    // //       }
    // //   }
    },
}