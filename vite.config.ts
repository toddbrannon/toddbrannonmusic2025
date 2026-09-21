import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // Vite's default asset matching is case-sensitive on the extension, so files like
  // BandLife.PNG / ToddLive12.JPG are otherwise parsed as JS and fail the build.
  assetsInclude: ['**/*.PNG', '**/*.JPG', '**/*.JPEG'],
  server: {
    host: '0.0.0.0',
    port: 5000,
    allowedHosts: true,
    strictPort: true,
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
      },
    },
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
