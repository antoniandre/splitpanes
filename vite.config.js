import { defineConfig } from 'vite'
import { resolve } from 'path'
import Delete from 'rollup-plugin-delete'
import { createVuePlugin } from 'vite-plugin-vue2'

const build = process.env.BUNDLE ? {
  lib: {
    entry: resolve(__dirname, '/src/components/splitpanes/index.js'),
    name: 'splitpanes',
    fileName: 'splitpanes',
    formats: ['es', 'umd', 'cjs']
  },
  rollupOptions: {
    plugins: [
      Delete({ targets: ['dist/*.{ico,png,html}'], hook: 'generateBundle' })
    ],
    // Make sure to externalize deps that shouldn't be bundled into library.
    external: ['vue'],
    output: {
      // Provide global variables to use in the UMD build for externalized deps.
      globals: {
        vue: 'Vue'
      }
    }
  }
} : {
  outDir: 'docs'
}

export default defineConfig({
  plugins: [
    createVuePlugin({
      vueTemplateOptions: {
        compilerOptions: {
          whitespace: 'preserve'
        }
      }
    })
  ], // https://vitejs.dev/config/
  resolve: {
    alias: {
      '@': resolve(__dirname, '/src')
    }
  },
  build
})
