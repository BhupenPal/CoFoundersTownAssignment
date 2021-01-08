const webpack = require('webpack');
const dotenv = require('dotenv');
const { resolve } = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

// Set the path parameter in the dotenv config
const EnvFile = dotenv.config({
	path: './config/.env',
}).parsed;

// reduce it to a nice object, the same as before (but with the variables from the file)
const EnvKeys = Object.keys(EnvFile).reduce((prev, next) => {
	prev[`process.env.${next}`] = JSON.stringify(EnvFile[next]);
	return prev;
}, {});

// Setting NODE_ENV
process.env.NODE_ENV = 'development';

module.exports = {
	mode: 'development',
	devServer: {
		host: process.env.HOST_IP,
		port: process.env.CLIENT_PORT,
		disableHostCheck: true,
		historyApiFallback: true,
		contentBase: './',
		hot: true,
		proxy: {
			'/api': {
				target: `http://${process.env.HOST_IP}:${process.env.PORT}`,
				changeOrigin: true,
			},
		},
	},
	entry: {
		main: resolve(__dirname, 'src', 'index.js'),
	},
	output: {
		path: resolve(__dirname, '..', 'dist'),
		publicPath: '/',
		filename: '[name].[contenthash].bundle.js',
		chunkFilename: '[name].[contenthash].bundle.js',
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx)/,
				exclude: /node_modules/,
				use: { loader: 'babel-loader' },
			},
			{
				test: /\.css$/i,
				use: [MiniCssExtractPlugin.loader, 'css-loader'],
			},
			{
				test: /\.s[ac]ss$/i,
				use: ['style-loader', 'css-loader', 'sass-loader'],
			},
			{
				test: /\.(png|jpg|jpeg|gif|ttf|svg|woff|eot)$/i,
				use: {
					loader: 'url-loader',
					options: {
						limit: 15360,
						name: '[path][name].[ext]',
					},
				},
			},
		],
	},
	resolve: {
		extensions: ['.js', '.jsx', '.es6'],
		alias: { path: require.resolve('path-browserify') },
	},
	plugins: [
		new MiniCssExtractPlugin(),
		new webpack.HotModuleReplacementPlugin(),
		new ReactRefreshWebpackPlugin(),
		new CleanWebpackPlugin(),
		new webpack.DefinePlugin(EnvKeys),
		new HTMLWebpackPlugin({
			filename: 'index.html',
			favicon: './assets/img/branding/favicon.ico',
			inject: true,
			template: resolve(__dirname, 'index.html'),
		}),
	],
	watch: true,
};
