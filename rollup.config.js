import nodent from "rollup-plugin-nodent";
import babel from "@rollup/plugin-babel";
import cleanup from "rollup-plugin-cleanup";
import { terser } from "rollup-plugin-terser";
import analyze from "rollup-plugin-analyzer";
import sizes from "rollup-plugin-sizes";

// Library Name
const libName = "typedataSuggestions";
// Build Environment
const isProduction = process.env.NODE_ENV === "production";
// Library Max. Size Allowed
const limitBytes = 3 * 1024 * 1024;
// Library Size Analyzer
const onAnalysis = ({ bundleSize }) => {
    if (bundleSize < limitBytes) return;
    console.log(`Bundle size exceeds ${limitBytes} bytes: ${bundleSize} bytes`);
    return process.exit(1);
};

// Rollup Config.
export default [
    {
        input: "src/typedata-suggestions.js",
        output: [
            {
                file: `dist/typedata-suggestions.min.js`,
                name: libName,
                format: "umd",
            }
        ],
        plugins: [
            nodent({
                es7: true,
                promises: true,
                // sourcemap: isProduction ? false : true,
                noRuntime: true,
                es6target: true,
            }),
            babel({
                babelHelpers: "bundled",
                exclude: "node_modules/**",
                presets: ["@babel/preset-env"],
            }),
            cleanup(),
            terser({
                compress: {
                    drop_console: true,
                },
                toplevel: true,
            })
        ],
    },
    {
        input: "src/typedata-suggestions.js",
        output: [
            {
                file: `dist/typedata-suggestions.js`,
                name: libName,
                format: "umd",
            },
        ],
        plugins: [
            nodent({
                es7: true,
                promises: true,
                // sourcemap: isProduction ? false : true,
                noRuntime: true,
                es6target: true,
            }),
            babel({
                babelHelpers: "bundled",
                exclude: "node_modules/**",
                presets: ["@babel/preset-env"],
            }),
            cleanup(),
            // Analyzer
            analyze({
                onAnalysis,
                summaryOnly: true,
                showExports: true,
            }),
            sizes(),
        ],
    },
];