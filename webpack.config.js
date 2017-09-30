const path = require('path');
const HTML = require('webpack-html-plugin');

module.exports = {
    entry: path.join(__dirname, 'src/index.ts'),
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'draggable.bundle.js'
    },
    devtool: 'inline-source-map',
    module: {
        rules: [
            { test: /\.ts?$/, loader: 'source-map-loader', enforce: 'pre' },
            { test: /\.ts?$/, loader: 'ts-loader' }
        ]
    },
    plugins: [
        new HTML({
            filename: 'index.html',
            template: 'example/index.html',
            inject: 'body'
        })
    ]
}