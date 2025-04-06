import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import * as selfsigned from "selfsigned";

const ReactCompilerConfig = {
  /* ... */
};

const attrs = [{ name: "commonName", value: "localhost" }];
const pems = selfsigned.generate(attrs, { days: 365 });

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
    https: {
      key: pems.private,
      cert: pems.cert,
    },
    host: true,
    port: 5173,
  },
  // server: {
  //   proxy: {
  //     "/reckon": {
  //       target: "https://api.reckon.com/r1/v2",
  //       changeOrigin: true,
  //       secure: true,
  //       rewrite: (path) => path.replace(/^\/reckon/, ""),
  //     },
  //   },
  // },
});