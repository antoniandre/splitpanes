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
    // Disabled until Vue 3 is capable.
    // https://github.com/vuejs/vue-next/pull/1600
    // config.module
    //   .rule('vue')
    //   .use('vue-loader')
    //   .loader('vue-loader')
    //   .tap(options => {
    //     options.compilerOptions.whitespace = 'preserve'
    //     return options
    //   })
  }
}