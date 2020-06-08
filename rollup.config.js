import { terser } from 'rollup-plugin-terser'
import resolve from 'rollup-plugin-node-resolve'
import commonjs from 'rollup-plugin-commonjs';

export default {
    input: 'main.js',
    output: {
        file: 'main.min.js',
        format: 'iife',
        sourcemap: 'inline'
    },
    plugins: [
        commonjs(),
        terser(),
        resolve()
    ]
}

