const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');

module.exports = (env, argv) => {
	const isProd = argv.mode === 'production';
	const isDev = !isProd;

	const filename = (ext) => isProd ? `[name].[contenthash].bundle.${ext}` : `[name].bundle.${ext}`;

	const plugins = () => {
		const base = [
			new HtmlWebpackPlugin({
				template: 'index.html',
			}),
			new CopyPlugin({
				patterns: [
					{ from: 'favicon.ico', to: './' },
				],
			}),
			new MiniCssExtractPlugin({
				filename: filename('css'),
			}),
		];

		// if (isDev) {
		// 	base.push(new ESLintPlugin({
		// 		// eslintPath: path.resolve(__dirname, '.eslintrc.js'),
		// 	}));
		// }

		return base;
	};
	return {
		context: path.resolve(__dirname, 'src'),
		entry: {
			main: './index.js',
		},
		output: {
			path: path.resolve(__dirname, 'dist'),
			filename: filename('js'),
			clean: true,
		},

		resolve: {
			// './path/file.js' to './path/file'
			extensions: ['.js'],
			// '../../path/file to @/path/file
			alias: {
				'@': path.resolve(__dirname, 'src'),
				'@core': path.resolve(__dirname, 'src/core'),
			},
		},

		devtool: isDev ? 'source-map' : false,

		devServer: {
			port: 3000,
			open: false,
			hot: true,
		},

		plugins: plugins(),
		module: {
			rules: [
				{
					test: /\.s[ac]ss$/i,
					use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
				},
				{
					test: /\.m?js$/,
					exclude: /node_modules/,
					use: {
						loader: 'babel-loader',
						options: {
							presets: ['@babel/preset-env'],
						},
					},
				},
				{
					test: /\.(png|svg|jpg|jpeg|gif)$/i,
					type: 'asset/resource',
				},
			],
		},
	};
};
