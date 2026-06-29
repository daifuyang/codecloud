import tailwindcss from '@tailwindcss/vite';
import { devtools } from '@tanstack/devtools-vite';

import { tanstackStart } from '@tanstack/react-start/plugin/vite';

import viteReact from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

const config = defineConfig({
  resolve: { tsconfigPaths: true },
  // Allow FRP tunnel host + LAN hostnames so dev server doesn't reject
  // requests from the public debug URL or other devices on the LAN.
  // See https://vite.dev/config/server-options.html#server-allowedhosts
  server: {
    allowedHosts: ['opdebug.daifuyang.com', 'localhost', '192.168.71.100'],
  },
  plugins: [devtools(), tailwindcss(), tanstackStart(), viteReact()],
});

export default config;
