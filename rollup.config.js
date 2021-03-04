import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import pkg from './package.json';

export default [
	/**
	 * The core module file
	 * Written in Typescript and bundled with all dependencies.
	 */
	{
		input: './src/NiceHash.ts',
		plugins: [
			typescript(),
			resolve(),
			commonjs(),
		],
		output: {
			file: './NiceHash.js',
			format: 'iife',
		},
	},
	/**
	 * The module helper file
	 * Written in Typescript and only compiled to be used within node.
	 */
	{
		input: './src/node_helper.ts',
		plugins: [
			typescript(),
		],
		external: ['node_helper', ...Object.keys(pkg.dependencies)],
		output: {
			file: './node_helper.js',
			format: 'umd',
		},
	},
];
