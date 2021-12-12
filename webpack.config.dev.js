const {merge} = require("webpack-merge"),
    common = require("./webpack.config.common"),
    webpack = require("webpack");

const webpackDevConfig = merge(common, {
    mode: "development",
    devtool: "eval-cheap-module-source-map",
    module: {
        rules: [
            { test: /\.css$/, use: ["style-loader", "css-loader"] },
			{ test: /\.scss$/, use: [
				"style-loader",
				{loader: "css-loader", options: {sourceMap: true}},
				{loader: "sass-loader", options: {sourceMap: true}}] 
			}
        ]
    }
});

module.exports = webpackDevConfig;