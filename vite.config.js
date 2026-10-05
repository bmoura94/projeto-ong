import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  root: './',
  base: '/projeto-ong/',
  build: {
    outDir: 'dist',
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: false
      },
      mangle: true
    },
    reportCompressedSize: true,
    sourcemap: false,
    rollupOptions: {
      input: resolve(__dirname, 'html/index.html'),
      output: {
        entryFileNames: 'js/[name].[hash].js',
        chunkFileNames: 'js/[name].[hash].js',
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name.split('.')
          const ext = info[info.length - 1]
          if (/png|jpe?g|gif|svg|webp/.test(ext)) {
            return `imagens/[name].[hash][extname]`
          } else if (/css/.test(ext)) {
            return `css/[name].[hash][extname]`
          }
          return `assets/[name].[hash][extname]`
        }
      }
    }
  },
  server: {
    open: 'html/index.html'
  }
})
