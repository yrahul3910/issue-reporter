const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    entry: [
        path.resolve(__dirname, "src/index")
    ],
    output: {
        path: path.resolve(__dirname, "dist"),
        publicPath: "/",
        filename: "bundle.js"
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "src/index.html",
            inject: true
        })
    ],
    module: {
        loaders: [
            {test: /\.jsx$/, exclude: /node_modules/, loaders: ["babel-loader"]},
            {test: /\.js$/, exclude: /node_modules/, loaders: ["babel-loader"]},
            {test: /\.css$/, loaders: ["style-loader","css-loader"]},
            {test: /\.sass$/, loaders: ["sass-loader"]}
        ]
    }
};
