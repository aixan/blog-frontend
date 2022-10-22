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
});

