import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import svgr from "vite-plugin-svgr";

export default defineConfig({
  plugins: [react(), svgr()],
  server: {
    cors: {
      origin: "https://festivalteama.shop",
      methods: ["GET", "POST", "PUT", "DELETE"],
      credentials: true,
    },
    host: true,
    port: 5173,
    allowedHosts: ["festivalteama.shop"], // 이 줄을 추가하여 허용할 호스트를 명시합니다.
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@screens": path.resolve(__dirname, "./src/screens"),
      "@components": path.resolve(__dirname, "./src/components"),
      "@css": path.resolve(__dirname, "./src/screens/css"),
      "@assets": path.resolve(__dirname, "./src/assets"),
      "@utils": path.resolve(__dirname, "./src/utils"),
      "@hooks": path.resolve(__dirname, "./src/hooks"),
      "@contexts": path.resolve(__dirname, "./src/contexts"),
      "@routes": path.resolve(__dirname, "./src/routes"),
      "@store": path.resolve(__dirname, "./src/store"),
    },
  },
});
