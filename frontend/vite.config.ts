import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

const ReactCompilerConfig = {
  /* ... */
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [["babel-plugin-react-compiler", ReactCompilerConfig]],
      },
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    proxy: {
      "/reckon": {
        target: "https://api.reckon.com/r1/v2",
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/reckon/, ""),
      },
    },
  },
})
