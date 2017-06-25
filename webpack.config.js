const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin');


const config = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'bundle.js?[chunkhash]'/*,
        publicPath: 'build/'*/
    },
    module: {
        rules: [
            {
                use: 'babel-loader',
                test: /\.js$/
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: 'css-loader',
                    //publicPath: '/build'
                })
            },
            {
                test:/\.(jpe?g|png|gif|svg)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {limit:40000}
                    },
                    'image-webpack-loader'
                    ]
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin('[name]-style.css?=[chunkhash]'),
        new HtmlWebpackPlugin(
            {
                inject: false,
                template: 'src/index.ejs'
            }
        )
    ]
}

module.exports = config;