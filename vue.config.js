const webpack = require('webpack');
// 开启 gzip 
const CompressionWebpackPlugin = require('compression-webpack-plugin');
const MomentLocalesPlugin = require('moment-locales-webpack-plugin');
const path = require('path');
const proxy = require('./vue.proxy.config');


// const pageMethod = require('./util/getPages.js');
// pages = pageMethod.pages();

module.exports = {
    pages:{
        zbl:{
            entry:'src/pages/zbl/zbl.js',
            template:"src/pages/zbl/zbl.html",
            filename:"zbl.html"
        },
        zbr:{
            entry:'src/pages/zbr/zbr.js',
            template:"src/pages/zbr/zbr.html",
            filename:"zbr.html"
        }
    },
    publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
    outputDir: 'dist',
    productionSourceMap: false,
    runtimeCompiler: true,

    chainWebpack: config => {
        config.plugins.delete('prefetch');
        if (process.env.NODE_ENV === 'production') {
            config.plugin('compression').use(CompressionWebpackPlugin, [{
                test: /\.js$|\.css$/,
                algorithm: 'gzip',
                threshold: 1024 * 512
            }]);
        }
    },
    devServer: {
        port: 8080,
        host: '0.0.0.0',
        https: false,
        // open: true,
        // proxy: proxy
    },
    configureWebpack: {
        resolve: {
            alias: {
                '@': path.resolve(__dirname, 'src'),
                // '@views': path.resolve(__dirname, 'src/app/views'),
            }
        },
        plugins: [
            new MomentLocalesPlugin(),
            new webpack.ProvidePlugin({
                _: 'lodash',
                Axios: 'axios',
                $:"jquery",
                jQuery:"jquery",
                "window.jQuery":"jquery"
            })
        ]
    },

};