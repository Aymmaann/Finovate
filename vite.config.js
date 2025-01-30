import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss({
      config: {
        theme: {
          extend: {
            backgroundImage: {
              'custom-button-gradient': 'linear-gradient(to right, #1dc8fd, #0890ff)',
            },
          },
        },
      },
    }),
  ],
})

// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'
// import tailwindcss from 'tailwindcss'

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [
//     react(),
//   ],
//   css: {
//     postcss: {
//       plugins: [
//         tailwindcss(),
//         require('autoprefixer'),
//       ],
//     },
//   },
// })

