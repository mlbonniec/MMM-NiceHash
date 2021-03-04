import commonjs from '@rollup/plugin-commonjs';
// import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import pkg from './package.json';

export default [
	{
		input: './src/MMM-NiceHash.ts',
		plugins: [
			typescript(),
			// resolve(),
			commonjs(),
		],
		external: ['axios'],
		output: {
			file: './MMM-NiceHash.js',
			format: 'iife',
			globals: {
				axios: 'axios'
			}
		},
	},
	{
		input: './src/node_helper.ts',
		plugins: [
			typescript(),
			// resolve(),
			// commonjs(),
		],
		external: ['node_helper', 'crypto', ...Object.keys(pkg.dependencies)],
		output: {
			file: './node_helper.js',
			format: 'umd',
			globals: {
				axios: 'axios',
				uuid: 'uuid',
				crypto: 'crypto'
			}
		},
	},
];
