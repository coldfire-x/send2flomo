const webpack = require("webpack");
const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
const srcDir = path.join(__dirname, "..", "src");

module.exports = {
    entry: {
        popup: path.join(srcDir, 'ts/popup.tsx'),
        options: path.join(srcDir, 'ts/options.tsx'),
        background: path.join(srcDir, 'ts/background.tsx'),
        content_script: path.join(srcDir, 'ts/content_script.tsx'),
    },
    output: {
        path: path.join(__dirname, "../dist/"),
        filename: "js/[name].js",
    },
    optimization: {
        splitChunks: {
            name: "vendor",
            chunks(chunk) {
                return chunk.name !== 'background';
            }
        },
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: "ts-loader",
                exclude: /node_modules/,
            }, {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
        ],
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js"],
    },
    plugins: [
        new CopyPlugin({
            patterns: [
                { from: "./", to: "../dist/", context: "public" },
            ],
            options: {},
        })
    ],
};
