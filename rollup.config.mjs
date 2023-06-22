import { terser } from "rollup-plugin-terser";
import resolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";

export default {
    input: "web/main.js",
    output: {
        file: "public/main.min.js",
        format: "umd",
        name: "main",
    },
    plugins: [commonjs(), terser({ mangle: false }), resolve()],
};
