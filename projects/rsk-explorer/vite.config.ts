import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/ai-class/rsk-explorer/',
  build: {
    outDir: '../../docs/rsk-explorer',
    emptyOutDir: true,
  },
  plugins: [react()],
})
