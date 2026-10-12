import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
export default defineConfig({base:'/ai-class/triple-triad/',build:{outDir:'../../docs/triple-triad',emptyOutDir:true},plugins:[react()]})
