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
    css: {
        loaderOptions: {
            postcss: {
                plugins: [
                    require('postcss-pxtorem')({
                        rootValue : 16, // 换算的基数
                        // 忽略转换正则匹配项。插件会转化所有的样式的px。比如引入了三方UI，也会被转化。目前我使用 selectorBlackList字段，来过滤
                        //如果个别地方不想转化px。可以简单的使用大写的 PX 或 Px 。
                        // selectorBlackList  : ['ig','mu'], 
                        propList: ['*'],
                        exclude: /node_modules/
                    }),
                ]
            }
        }
    },
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
        proxy: proxy
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