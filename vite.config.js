import { defineConfig } from 'vite'
import Vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import Delete from 'rollup-plugin-delete'
import dtsPlugin from 'vite-plugin-dts'

const bundleBuild = {
  lib: {
    entry: resolve(__dirname, '/src/components/splitpanes/index.js'),
    name: 'splitpanes',
    fileName: 'splitpanes',
    formats: ['es', 'umd', 'cjs']
  },
  rollupOptions: {
    plugins: [
      // Rollup also copies the files in the public folder.
      // @todo: find a way to prevent adding them at all.
      Delete({ targets: ['dist/*.{ico,png,html}'], hook: 'generateBundle' })
    ],
    // Make sure to externalize deps that shouldn't be bundled into library.
    external: ['vue'],
    output: {
      // Provide global variables to use in the UMD build for externalized deps.
      globals: { vue: 'Vue' },
      entryFileNames: 'splitpanes.[format].js',
      chunkFileNames: '[name].js'
    }
  }
}

export default defineConfig({
  plugins: [
    Vue({
      template: {
        compilerOptions: {
          whitespace: 'preserve'
        }
      }
    }),
    process.env.BUNDLE ? [dtsPlugin()] : []
  ], // https://vitejs.dev/config/
  resolve: {
    alias: {
      '@': resolve(__dirname, '/src')
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler',
        additionalData: '@use "@/scss/_variables.scss" as *;'
      }
    }
  },
  build: process.env.BUNDLE ? bundleBuild : { outDir: 'docs' },
  define: {
    __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: false
  }
})
