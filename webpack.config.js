const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebPackPlugin = require('copy-webpack-plugin');

const sourceMapTool = process.env.NODE_ENV == 'production' ? 'source-map' : 'cheap-module-eval-source-map';

const config = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: '[name].js?[chunkhash]',
        chunkFilename: '[name].js?[chunkhash]',
        sourceMapFilename: 'maps/[file].map?[chunkhash]'
        // publicPath: 'build/'
    },
    devtool: sourceMapTool,
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
        new ExtractTextPlugin('[name]-style.css?[contenthash]'),
        new HtmlWebpackPlugin(
            {
                inject: false,
                template: 'src/index.ejs'
            }
        ),
        new CopyWebPackPlugin([{from: 'assets', to: './'}], {ignore:['.*'] })
    ]
}

module.exports = config;