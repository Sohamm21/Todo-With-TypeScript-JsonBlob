import { defineConfig } from "file:///C:/Users/soham/OneDrive/Documents/SandBox/todo-typescript-react/node_modules/vite/dist/node/index.js";
import react from "file:///C:/Users/soham/OneDrive/Documents/SandBox/todo-typescript-react/node_modules/@vitejs/plugin-react/dist/index.mjs";
import tailwindcss from "file:///C:/Users/soham/OneDrive/Documents/SandBox/todo-typescript-react/node_modules/@tailwindcss/vite/dist/index.mjs";
var vite_config_default = defineConfig({
  plugins: [react(), tailwindcss()]
});
export {
  vite_config_default as default
};
