const path = require('path');
const HTML = require('webpack-html-plugin'); 

const config = {
    entry: {
        'vanillaDrag': path.join(__dirname, 'src/VanillaDrag.ts'),
        'example': path.join(__dirname, 'src/example.ts')
    },
    output: {
        path: path.join(__dirname, 'dist'),
        filename: '[name].bundle.js',
        libraryTarget: 'umd'
    },
    resolve: {
        extensions: ['.js', '.json', '.ts']
    },
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
};

if (process.env.NODE_ENV === 'dev') {
    config.output['libraryTarget'] = 'var';
    config.output['library'] = 'Draggable';
    config['devtool'] = 'inline-source-map';
}

module.exports = config;