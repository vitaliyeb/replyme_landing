const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const vocobulary = require('./dev/vocabulary');

module.exports = {
    entry: path.resolve(__dirname, 'dev'),
    devtool: 'inline-source-map',
    output: {
        filename: '[hash].bundle.js',
        path: path.resolve(__dirname, 'dist'),
        clean: true,
    },
    module: {
        rules: [
            {
                test: /\.styl$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader
                    },
                    {
                        loader: "css-loader",
                    },
                    {
                        loader: "stylus-loader"
                    }
                ]
            },
            {
                test: /\.(svg|png|jpe?g|gif)$/i,
                loader: 'file-loader',
                options: {
                    outputPath: 'images',
                    name: '[name].[ext]',
                }
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin(),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'public', 'index.html'),
            vocobulary: vocobulary.ru,
            langMode: 'ru'
        }),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'public', 'index.html'),
            vocobulary: vocobulary.en,
            filename: 'index_en.html',
            langMode: 'en'
        })
    ],
    devServer: {
        contentBase: path.join(__dirname, 'public'),
        compress: true,
        port: 3000,
    },
};