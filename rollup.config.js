import nodeResolve from '@rollup/plugin-node-resolve'
import { babel } from '@rollup/plugin-babel'
import commonjs from '@rollup/plugin-commonjs'
import { terser } from 'rollup-plugin-terser'

const EXTENSIONS = ['.js', '.jsx', '.json']
const CODES = [
	'THIS_IS_UNDEFINED',
	'MISSING_GLOBAL_NAME',
	'CIRCULAR_DEPENDENCY',
]

const discardWarning = warning => {
	if (CODES.includes(warning.code)) {
		return
	}

	// eslint-disable-next-line no-console
	console.error(warning)
}

const commonPlugins = () => [
	babel({
		extensions: EXTENSIONS,
		exclude: 'node_modules/**',
		babelHelpers: 'bundled',
	}),
	commonjs({
		include: /node_modules/,
	}),
	nodeResolve({
		extensions: EXTENSIONS,
		preferBuiltins: false,
	}),
	terser({
		output: {
			comments: false,
		},
	}),
]

export default [
	{
		onwarn: discardWarning,
		external: ['react', 'react-dom'],
		input: 'src/index.js',
		output: [
			{
				file: 'lib/bundle.cjs.js',
				format: 'cjs',
				sourcemap: true,
			},
			{
				file: 'lib/bundle.esm.js',
				format: 'esm',
				sourcemap: true,
			},
		],
		plugins: commonPlugins(),
	},
]
