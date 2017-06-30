const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebPackPlugin = require('copy-webpack-plugin');

const extractSass = new ExtractTextPlugin({
    filename: "[name].css?[contenthash]",
    disable: process.env.NODE_ENV === "development"
});

const sourceMapTool = process.env.NODE_ENV == 'production' ? 'source-map' : 'inline-source-map';

// const sourceMapTool = 'source-map';

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
                test: /\.scss$/,
                use: extractSass.extract({
                    use:[
                        
                        {
                            loader: 'css-loader', options:{sourceMap:true}
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                plugins: () => [
                                    require('autoprefixer'),
                                    require('cssnano')],
                                sourceMap: true
                            }
                        },
                        {
                            loader: 'sass-loader', options:{sourceMap:true}
                        }
                    ],
                    fallback: 'style-loader'
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
        //new ExtractTextPlugin('[name]-style.css?[contenthash]'),
        extractSass,
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