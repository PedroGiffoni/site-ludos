import { defineConfig } from 'vite';
export default defineConfig({ build: { outDir: 'dist-element', emptyOutDir: true, copyPublicDir: false, lib: { entry: 'src/scene.js', name: 'LudosScene', formats: ['iife'], fileName: () => 'ludos-scene.js' } } });
