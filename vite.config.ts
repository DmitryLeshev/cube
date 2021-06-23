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
        find: /^@material-ui\/core\/(.+)/,
        replacement: '@material-ui/core/es/$1',
      },
      {
        find: /^@material-ui\/core$/,
        replacement: '@material-ui/core/es',
      },
    ],
    // alias: {
    //   '@/': path.resolve(__dirname, './src'),
    //   '@/config': path.resolve(__dirname, './src/config'),
    //   '@/components': path.resolve(__dirname, './src/components'),
    //   '@/styles': path.resolve(__dirname, './src/styles'),
    //   '@/utils': path.resolve(__dirname, './src/utils'),
    //   '@/common': path.resolve(__dirname, './src/common'),
    //   '@/assets': path.resolve(__dirname, './src/assets'),
    //   '@/pages': path.resolve(__dirname, './src/pages'),
    //   '@/routes': path.resolve(__dirname, './src/routes'),
    //   '@/layouts': path.resolve(__dirname, './src/layouts'),
    //   '@/hooks': path.resolve(__dirname, './src/hooks'),
    //   '@/store': path.resolve(__dirname, './src/store'),
    // },
  },
});
