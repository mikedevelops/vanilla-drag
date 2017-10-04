const path = require('path');

const config = {
    entry: {
        'vanillaDrag': path.join(__dirname, 'src/VanillaDrag.ts')
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
    }
};

if (process.env.NODE_ENV === 'dev') {
    config.output['libraryTarget'] = 'var';
    config.output['library'] = 'Draggable';
    config['devtool'] = 'inline-source-map';
}

module.exports = config;
