import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  history:{
    type: 'hash'
  },
  base: './',
  publicPath: './',
  routes: [
    { path: '/', component: '@/pages/index' },
  ],
  fastRefresh: {},
});
