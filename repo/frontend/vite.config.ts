import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import relay from 'vite-plugin-relay'

export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [
          ['relay', { 
            artifactDirectory: './src/components/__generated__',
            eagerEsModules: true
          }]
        ]
      }
    }),
    relay
  ],
  server: {
    host: '0.0.0.0',
    port: 5173
  },
  optimizeDeps: {
    include: ['relay-runtime', 'react-relay']
  }
})