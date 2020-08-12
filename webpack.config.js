const path = require("path"),
	HtmlWebPackPlugin = require("html-webpack-plugin"),
	MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
	context: __dirname,
	entry: [path.resolve(__dirname, "src/js/index.js")],
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: {
					loader: "babel-loader",
				},
			},
			{
				enforce: "pre",
				test: /\.js$/,
				exclude: /node_modules/,
				loader: "eslint-loader",
			},
			{
				test: /\.scss$/,
				loader: ["style-loader", "css-loader", "sass-loader"],
			},

			{
				test: /\.html$/,
				use: [
					{
						loader: "html-loader",
						options: { minimize: true },
					},
				],
			},
			{
				test: /\.css$/,
				use: [MiniCssExtractPlugin.loader, "css-loader"],
			},
			{
				test: /\.svg$/,
				use: [
					{
						loader: "babel-loader",
					},
					{
						loader: "react-svg-loader",
						options: {
							jsx: true,
						},
					},
				],
			},
			{
				test: /\.png$/,
				use: [
					{
						loader: "file-loader",
					},
				],
			},
		],
	},
	devServer: {
		historyApiFallback: {
			disableDotRule: true,
		},
		host: "127.0.0.1",
		port: 8080,
		stats: "minimal",
	},
	plugins: [
		new HtmlWebPackPlugin({
			template: "./src/index.html",
			filename: "./index.html",
		}),
		new MiniCssExtractPlugin({
			filename: "[name].css",
			chunkFilename: "[id].css",
		}),
	],
};
