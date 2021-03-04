import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
// import typescript from '@rollup/plugin-typescript';
import pkg from './package.json';

export default [
	/**
	 * The core module file
	 * Written in Typescript and bundled with all dependencies.
	 */
	{
		// input: './src/MMM-NiceHash.ts',
		input: './dist/MMM-NiceHash.js',
		plugins: [
			// typescript(),
			resolve({ browser: true }),
			commonjs(),
		],
		output: {
			file: './MMM-NiceHash.js',
			format: 'iife',
		},
	},
	/**
	 * The module helper file
	 * Written in Typescript and only compiled to be used within node.
	 */
	{
		// input: './src/node_helper.ts',
		input: './dist/node_helper.js',
		plugins: [
			// typescript(),
			resolve(),
			commonjs(),
		],
		external: ['node_helper', ...Object.keys(pkg.dependencies)],
		output: {
			file: './node_helper.js',
			format: 'umd',
			name: 'default',
		},
	},
];
