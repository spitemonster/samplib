// webpack.server.config.js
import path from 'path'
import nodeExternals from 'webpack-node-externals'
import { fileURLToPath } from 'url'
const __dirname = path.dirname(fileURLToPath(import.meta.url))

export default {
    mode: 'development',
    target: 'node',
    entry: './src/server/js/server.ts',
    externals: [nodeExternals()],
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: [
                    {
                        loader: 'ts-loader',
                        options: {
                            configFile: 'tsconfig.server.json',
                        },
                    },
                ],
                exclude: /node_modules|src\/client/,
            },
        ],
    },
    resolve: {
        extensions: ['.ts', '.js'],
    },
    output: {
        filename: 'server.cjs',
        path: path.resolve(__dirname, 'dist/server'),
        library: {
            type: 'commonjs2',
        },
    },
}
