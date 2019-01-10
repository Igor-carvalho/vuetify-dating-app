const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    configureWebpack: {
        externals: {},

        plugins: [
            new CleanWebpackPlugin(['dist'])
        ],

        optimization: {
        }
    },
    css: {},
    filenameHashing: true,
    devServer: {
        public: '0.0.0.0:8081',
        hot: true,
        disableHostCheck: true
    }
}
