import reactRefresh from '@vitejs/plugin-react-refresh';
import { defineConfig } from 'vite';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [reactRefresh()],
  resolve: {
    alias: [
      {
        find: /^@material-ui\/icons\/(.*)/,
        replacement: '@material-ui/icons/esm/$1',
      },
      {
        find: /^@material-ui\/pickers\/(.*)/,
        replacement: '@material-ui/pickers/esm/$1',
      },
      {
        find: /^@material-ui\/core\/(.+)/,
        replacement: '@material-ui/core/es/$1',
      },
      {
        find: /^@material-ui\/core$/,
        replacement: '@material-ui/core/es',
      },
      {
        find: '@/',
        replacement: path.resolve(__dirname, './src'),
      },
      {
        find: '@/ui',
        replacement: path.resolve(__dirname, './src/ui'),
      },
      {
        find: '@/components',
        replacement: path.resolve(__dirname, './src/components'),
      },
      {
        find: '@/types',
        replacement: path.resolve(__dirname, './src/types'),
      },
      {
        find: '@/assets',
        replacement: path.resolve(__dirname, './src/assets'),
      },
      {
        find: '@/utils',
        replacement: path.resolve(__dirname, './src/utils'),
      },
      {
        find: '@/hooks',
        replacement: path.resolve(__dirname, './src/hooks'),
      },
      {
        find: '@/pages',
        replacement: path.resolve(__dirname, './src/pages'),
      },
      {
        find: '@/api',
        replacement: path.resolve(__dirname, './src/api'),
      },
      {
        find: '@/hocs',
        replacement: path.resolve(__dirname, './src/hocs'),
      },
      {
        find: '@/store',
        replacement: path.resolve(__dirname, './src/store'),
      },
      {
        find: '@/contexts',
        replacement: path.resolve(__dirname, './src/contexts'),
      },
      {
        find: '@/models',
        replacement: path.resolve(__dirname, './src/models'),
      },
    ],
  },
});
