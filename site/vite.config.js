import {defineConfig} from 'vite';
import {fileURLToPath} from 'node:url';

export default defineConfig({
  build:{rolldownOptions:{input:{main:fileURLToPath(new URL('./index.html',import.meta.url)),modelos:fileURLToPath(new URL('./modelos.html',import.meta.url))}}}
});
