// @ts-nocheck
const path = require('path');
const Html = require('html-webpack-plugin');
const MiniCSS = require('mini-css-extract-plugin');

module.exports = {
    entry: './src/js/index.js',

    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'bundle.js',
    },

    devServer: {
        contentBase: path.join(__dirname, `public`),
        publicPath: '/public/',
        compress: true,
        port: 9000,
    },

    mode: 'development',

    watch: true,

    module: {
        rules: [
            {
                test: /\.scss$/,
                use: ['style-loader', MiniCSS.loader, 'css-loader', 'sass-loader'],
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
            },
        ],
    },

    plugins: [
        new Html({
            filename: 'index.html',
            template: './public/index.html',
        }),
        new MiniCSS({
            filename: 'style.css',
        }),
    ],
};
