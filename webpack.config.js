const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

const devMode = process.env.NODE_ENV !== "production";

const fileName = ext => devMode ? `[name].${ext}` : `[name].[hash].${ext}`;

const babelOptions = preset => {
    const opts = {
        presets: [
            '@babel/preset-env'
        ]
      }

    if (preset) {
        opts.presets.push(preset);
    }

    return opts
}

module.exports = {
    context: path.resolve(__dirname,'src'),
    mode: 'development',
    entry: {
        main: ['@babel/polyfill', './js/index.jsx'],
        second: './js/second.ts'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: fileName('js'),
        clean: true,
    },
    plugins: [
        new HTMLWebpackPlugin({
            template: './index.html'
        }),
        new CopyPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, 'src/favicon.svg'),
                    to: path.resolve(__dirname, 'dist')
                },
            ]
        }),
        new MiniCssExtractPlugin({
            filename: fileName('css')
        }),
    ],
    module: {
        rules:[
            {
                test: /\.css$/,
                use: [
                    devMode ? "style-loader" : MiniCssExtractPlugin.loader,
                    'css-loader',
                ]
            },
            {
                test: /\.less$/,
                use: [
                    devMode ? "style-loader" : MiniCssExtractPlugin.loader,
                    'css-loader',
                    'less-loader',
                ]
            },
            {
                test: /\.s[ac]ss$/,
                use: [
                    devMode ? "style-loader" : MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader',
                ]
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                type: 'asset/resource'
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: 'asset/resource',
            },
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                  loader: "babel-loader",
                },
            },
            {
                test: /\.m?ts$/,
                exclude: /node_modules/,
                use: {
                  loader: "babel-loader",
                  options: babelOptions('@babel/preset-typescript')
                },
            },
            {
                test: /\.m?jsx$/,
                exclude: /node_modules/,
                use: {
                  loader: "babel-loader",
                  options: babelOptions('@babel/preset-react')
                },
            },
        ]
    },
    optimization: {
        runtimeChunk: 'single',
        minimizer: [
            new CssMinimizerPlugin(),
            new TerserPlugin()
        ]
    },
    devServer: {
        port: 8080,
        hot: true,
    }
  };
  