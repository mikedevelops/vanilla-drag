const path = require('path');
const HTML = require('webpack-html-plugin'); 

const config = {
    entry: path.join(__dirname, 'src/services/Draggable.ts'),
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'draggable.bundle.js'
    },
    resolve: {
        extensions: ['.js', '.json', '.ts']
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
            inject: 'head'
        })
    ]
}

if (process.env.NODE_ENV === 'dev') {
    config.output['libraryTarget'] = 'var';
    config.output['library'] = 'Draggable';
}

module.exports = config;