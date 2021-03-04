import typescript from '@rollup/plugin-typescript';
import { dependencies } from './package.json';

const deps = Object.keys(dependencies);
export default [
	{
		input: './src/MMM-NiceHash.ts',
		plugins: [typescript()],
		external: [...deps],
		output: {
			file: './MMM-NiceHash.js',
			format: 'umd',
			globals: {
				axios: 'axios',
			},
		},
	},
	{
		input: './src/node_helper.ts',
		plugins: [typescript()],
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
