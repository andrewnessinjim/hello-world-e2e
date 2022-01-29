const path = require("path");

module.exports = {
    entry: {
        app:  "./src/client/main.tsx"
    },
    output: {
        path: path.join(__dirname, "public", "build"),
        clean: true
    },
    resolve: {
        extensions: ["", ".js", ".jsx", ".ts", ".tsx"]
    },
    module: {
        rules: [
            {test: /\.(j|t)sx?$/, use: "babel-loader", exclude: /node_modules/},
			{test: /\.json$/, use: "json-loader"},
			{test: /\.(png|jpg|jpeg|gif|woff|ttf|eot|svg|woff2)/, type: 'asset/resource'}
        ]
    },
    optimization: {
        runtimeChunk: "single"
    }
}