import Vue from '@vitejs/plugin-vue';
import UnoCSS from 'unocss/vite';
import { presetWind4, presetWebFonts, transformerDirectives, transformerVariantGroup } from "unocss"
import { defineConfig } from 'vite';
import { fileURLToPath } from 'url';

export default defineConfig({
  plugins: [
    Vue(),
    UnoCSS({
      presets: [
        presetWind4(),
        presetWebFonts({
          provider: "fontshare",
          fonts: {
            sora: "Sora",
            jet: "JetBrains Mono",
          }
        })
      ],
      transformers: [
        transformerDirectives({
          applyVariable: "--uno",
        }),
        transformerVariantGroup(),
      ],
    })
  ],
  resolve: {
    alias: {
      "@db": fileURLToPath(new URL("./src/db.ts", import.meta.url)),
    },
  },
})
