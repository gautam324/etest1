import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'


// https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()], 
// })

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), ''); // Carga las variables de entorno según el modo (development, production)
  return {
    define: {
      'process.env': env                        // Establece `process.env` con las variables de entorno cargadas
    },
    plugins: [react()],
  }
})