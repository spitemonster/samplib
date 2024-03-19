import path from 'path'
import { VueLoaderPlugin } from 'vue-loader'
import HtmlWebpackPluginPackage from 'html-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'

import { fileURLToPath } from 'url'
const __dirname = path.dirname(fileURLToPath(import.meta.url))
const HtmlWebpackPlugin =
    HtmlWebpackPluginPackage.default || HtmlWebpackPluginPackage

export default {
    mode: 'development',
    target: 'web',
    entry: './src/client/js/client.ts',
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
            },
            {
                test: /\.ts$/,
                use: [
                    {
                        loader: 'ts-loader',
                        options: {
                            configFile: 'tsconfig.client.json',
                            appendTsSuffixTo: [/\.vue$/],
                        },
                    },
                ],
                exclude: /node_modules|src\/server/,
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
            },
        ],
    },
    resolve: {
        extensions: ['.ts', '.js', '.vue'],
    },
    plugins: [
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
            template: 'src/index.html',
            filename: 'index.html',
            inject: true,
        }),
        new MiniCssExtractPlugin({
            filename: 'client/style/[name].css',
        }),
    ],
    output: {
        filename: 'client/client.js',
        path: path.resolve(__dirname, 'dist'),
    },
}
