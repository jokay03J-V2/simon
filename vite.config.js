import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  base: "/simon",
  plugins: [
    VitePWA({
      includeAssets: ["apple-touch-icon.png", "masked-icon.svg"],
      manifest: {
        name: "simon",
        short_name: "simon",
        description: "simon est un jeu de mémoire",
        theme_color: "#242424",
        icons: [
          {
            src: "apple-touch-icon.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "apple-touch-icon.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
    }),
  ],
});
