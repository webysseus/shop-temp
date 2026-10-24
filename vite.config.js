import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Standard Vite + React setup. Nothing exotic here on purpose —
// if you add another project later, you can copy this file as-is.
export default defineConfig({
  plugins: [react()],

  // GitHub Pages serves a project repo at username.github.io/REPO-NAME/,
  // not at the domain root — this tells Vite to build asset paths (JS,
  // CSS) expecting that subfolder. Change YOUR-REPO-NAME to your actual
  // repo name (exact spelling/casing) before deploying. If you're
  // hosting this at the root of its own domain (or a username.github.io
  // repo) instead, change this back to '/'.
  base: '/YOUR-REPO-NAME/',
});
