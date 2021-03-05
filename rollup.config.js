import typescript from '@rollup/plugin-typescript';
import commonJS from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import { dependencies } from './package.json';

const deps = Object.keys(dependencies);
export default [
  {
    input: './src/MMM-NiceHash.ts',
    plugins: [
      nodeResolve(),
      typescript(),
      commonJS(),
    ],
    external: [...deps],
    output: {
      file: './MMM-NiceHash.js',
      format: 'umd',
      globals: {
        axios: 'axios',
        uuid: 'uuid',
      },
    },
  },
  {
    input: './src/node_helper.ts',
    plugins: [
      nodeResolve(),
      typescript(),
      commonJS(),
    ],
    external: ['node_helper', 'crypto', ...deps],
    output: {
      file: './node_helper.js',
      format: 'umd',
      globals: {
        axios: 'axios',
        uuid: 'uuid',
        crypto: 'crypto',
      },
    },
  },
];
