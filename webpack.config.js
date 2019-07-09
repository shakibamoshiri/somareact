var path = require('path');

module.exports = {
    mode: 'production',
    entry: path.resolve( __dirname, './src/index.js'),
    output: {
        path: path.resolve(__dirname, './build/js/'),
        filename: 'somaract.js',
        libraryTarget: 'commonjs2'
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules)/,
                use: 'babel-loader'
            }
        ]
    }
}
