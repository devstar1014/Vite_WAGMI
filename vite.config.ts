import { resolve } from 'path'

import react from '@vitejs/plugin-react'
// import legacy from '@vitejs/plugin-legacy'
import Unocss from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import IconsResolver from 'unplugin-icons/resolver'
import Icons from 'unplugin-icons/vite'
import { defineConfig, splitVendorChunkPlugin } from 'vite'
import EslintPlugin from 'vite-plugin-eslint'
import Pages from 'vite-plugin-pages'

export default defineConfig({
  resolve: {
    alias: {
      '@/': `${resolve(__dirname, 'src')}/`,
    },
  },
  plugins: [
    react(),
    Icons({
      compiler: 'jsx',
      jsx: 'react',
    }),
    Pages({
      exclude: ['**/![index.tsx]'],
    }),
    Unocss(),
    AutoImport({
      imports: ['react'],
      dts: './src/auto-imports.d.ts',
      resolvers: [
        IconsResolver({
          componentPrefix: 'Icon',
        }),
      ],
    }),
    EslintPlugin(),
    splitVendorChunkPlugin(),
    // legacy({
    //   targets: ['defaults', 'not IE 11'],
    // }),
  ],
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
      },
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-router-dom', 'react-dom', 'recoil', 'buffer'],
          'eth-vendor': ['ethers', 'wagmi'],
          'antd-vendor': ['antd', 'axios'],
        },
      },
    },
  },
})
