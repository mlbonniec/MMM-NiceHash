import typescript from '@rollup/plugin-typescript';
import common from '@rollup/plugin-commonjs';
import noderesolve from '@rollup/plugin-node-resolve';
import { dependencies } from './package.json';

const deps = Object.keys(dependencies);
export default [
  {
    input: './src/MMM-NiceHash.ts',
    plugins: [
      typescript(),
      common(),
      noderesolve(),
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
      typescript(),
      common(),
      noderesolve(),
    ],
    external: ['node_helper', 'crypto', ...deps],
    output: {
      file: './node_helper.js',
      format: 'cjs',
      globals: {
        axios: 'axios',
        uuid: 'uuid',
        crypto: 'crypto',
      },
    },
  },
];
