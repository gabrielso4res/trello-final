var path = require('path');

module.exports = {
    entry: {
        index: './src/index.js',
        app: './src/components/App.js'
    },
    output: {
        path: path.join(__dirname, './src/'),
        publicPath: './src/',
        filename: 'bundle-[name].js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                include: path.join(__dirname, 'src/'),
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ["react", ["es2015", {"modules": false}]],
                        plugins: ["transform-class-properties"]
                    }
                }
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader'
                ]
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                use: {
                    loader: 'url-loader?limit=10000&prefix=src/!img'
                }
            }
        ]
    }
};