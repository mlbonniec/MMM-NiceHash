import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import pkg from './package.json';

export default [
	{
		input: './dist/MMM-NiceHash.js',
		plugins: [
			resolve({ browser: true }),
			commonjs(),
		],
		output: {
			file: './MMM-NiceHash.js',
			format: 'iife',
		},
	},
	{
		input: './dist/node_helper.js',
		plugins: [
			resolve(),
			commonjs(),
		],
		external: ['node_helper', ...Object.keys(pkg.dependencies)],
		output: {
			file: './node_helper.js',
			format: 'cjs',
			name: 'default',
		},
	},
];
