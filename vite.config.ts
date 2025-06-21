import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'
import { TanStackRouterVite } from '@tanstack/router-plugin/vite'
// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tailwindcss(), 
    TanStackRouterVite({ target: 'react', autoCodeSplitting: true }),
    react()
    
  ],
   server: {
    host: '0.0.0.0', // ¡Crucial para que sea accesible desde la red!
    port: 5173, // Asegúrate de que este es el puerto que quieres usar
  },
})
