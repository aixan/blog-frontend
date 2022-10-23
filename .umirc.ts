import { defineConfig } from '@umijs/max';
import routes from './src/configs/routes';

export default defineConfig({
  antd: {},
  access: {},
  model: {},
  initialState: {},
  theme: { '@primary-color': '#0000ff' },
  request: {},
  layout: {},
  // @ts-ignore
  mock: false,
  routes,
  npmClient: 'pnpm',
  analytics: {
    baidu: '57aa18127dd4715bfb9744b7d3bc5964'
  }
});

