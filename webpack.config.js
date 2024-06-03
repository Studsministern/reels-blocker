const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const glob = require('glob');
// const Dotenv = require('dotenv-webpack');

const path = require('path');
const outputPath = 'dist';
const entryPoints = {};

glob.sync('./src/**/*.ts').forEach(file => {
    const entry = path.resolve('/', file).replace('.ts', ''); // In Linux (makes sense)
    // const entry = ('./\\' + file).replace('.ts', ''); // In Windows (really stupid, but it works)

    entryPoints[entry] = entry;
});

module.exports = {
    entry: entryPoints,
    output: {
        path: path.resolve(__dirname, outputPath),
        filename: '[name].js',
    },
    resolve: {
        extensions: ['.ts', '.js'],
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.css$/, // test: /\.(sa|sc)ss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    // 'sass-loader'
                ]
            },
            {
                test: /\.(jpg|jpeg|png|gif|woff|woff2|eot|ttf|svg)$/i,
                use: 'url-loader?limit=1024'
            }
        ],
    },
    plugins: [
        new CopyPlugin({
            patterns: [
                { from: '.', to: '.', context: 'public' },
                {
                    from: './src',
                    to: './src',
                    context: '.',
                    globOptions: {
                        ignore: ['**/*.ts'],
                    },
                },
            ],
        }),
        new MiniCssExtractPlugin({
            filename: '[name].css',
        }),
        // new Dotenv(),
    ]
};