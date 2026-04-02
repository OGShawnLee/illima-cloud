import Vue from '@vitejs/plugin-vue';
import UnoCSS from 'unocss/vite';
import { presetWind4, presetWebFonts, transformerDirectives, transformerVariantGroup } from "unocss"
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [
    Vue(),
    UnoCSS({
      presets: [
        presetWind4(),
        presetWebFonts({
          provider: "fontshare",
          fonts: {
            satoshi: "Satoshi",
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

})
