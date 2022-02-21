module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/splitpanes' : '',
  outputDir: 'docs',
  lintOnSave: true,
  devServer: {
    overlay: {
      errors: false,
      warnings: false
    }
  },
  chainWebpack: config => {
    // Preserve white spaces for ssh-pre component.
    config.module
      .rule('vue')
      .use('vue-loader')
      .loader('vue-loader')
      .tap(options => {
        options.compilerOptions.whitespace = 'preserve'
        return options
      })
  },
  css: {
    loaderOptions: {
      scss: {
        additionalData: '@import "@/scss/_variables.scss";'
      }
    }
  }
}
