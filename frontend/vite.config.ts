import dns from 'node:dns';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Tvinga Node.js & Vite att prioritera IPv4 framför IPv6 på macOS
// Detta förhindrar att två dev-servrar binds till samma port (en på IPv4 127.0.0.1 och en på IPv6 ::1)
dns.setDefaultResultOrder('ipv4first');

export default defineConfig({
  plugins: [react()],
  server: {
    // Binda explicit till IPv4 localhost för att undvika macOS IPv4/IPv6 port-kollisioner
    host: '127.0.0.1',
    port: 5175,
    strictPort: false,
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:8000',
        changeOrigin: true,
      },
    },
  },
  preview: {
    host: '127.0.0.1',
    port: 5175,
    strictPort: false,
  },
});
