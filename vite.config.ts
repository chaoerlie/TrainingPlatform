import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server:{
    proxy:{
      '/api':{
        target:'http://139.9.245.28:8800/api',
        //192.168.31.54
        //192.168.26.1
        changeOrigin:true,
        secure: false,
        rewrite:path=>path.replace(/^\/api/,'')
      }

    }
  }
})

