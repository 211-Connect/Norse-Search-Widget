import { defineConfig } from "vite";
import preact from "@preact/preset-vite";
import { resolve } from "path";
import { vanillaExtractPlugin } from "@vanilla-extract/vite-plugin";
import { copyFileSync } from "fs";

const copyPublicPlugin = {
  name: "copy-public",
  writeBundle() {
    // Copy public files to dist for preview
    try {
      copyFileSync(
        resolve(__dirname, "public/index.html"),
        resolve(__dirname, "dist/index.html"),
      );
      copyFileSync(
        resolve(__dirname, "public/index.css"),
        resolve(__dirname, "dist/index.css"),
      );
    } catch (e) {
      console.error("Error copying public files:", e);
    }
  },
};

export default defineConfig({
  plugins: [preact(), vanillaExtractPlugin(), copyPublicPlugin],
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.tsx"),
      name: "SearchWidget",
      formats: ["umd", "es"],
      fileName: (format) => `search-widget.${format}.js`,
    },
    outDir: resolve(__dirname, "dist"),
    emptyOutDir: true,
    minify: "esbuild",
    cssMinify: "esbuild",
    rollupOptions: {
      external: [],
      output: {
        exports: "default",
      },
    },
    sourcemap: true,
  },
  resolve: {
    alias: {
      react: "preact/compat",
      "react-dom": "preact/compat",
    },
  },
});
