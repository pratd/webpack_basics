const webpack = require('webpack');
const { join, resolve } = require('path');
const HTMLWebpackPlugin  = require('html-webpack-plugin');
var path = require('path');
let {imageminLoader} = require("imagemin-webpack");
const ImageminPlugin = require("imagemin-webpack-plugin");
let imageminGifsicle = require("imagemin-gifsicle");
const imageminPngquant = require("imagemin-pngquant");
const imageminSvgo = require("imagemin-svgo");
const imageminMozjpeg = require('imagemin-mozjpeg');
const imgPath = './assets/images';
require('es6-promise').polyfill();
module.exports = {
    entry: './src/index.js',
    output:{
        path: __dirname + '/dist',
        filename:'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.html$/,
                use: [
                    {
                        loader: "html-loader",
                        options: {
                            minimize: true
                        }
                    }
                ]
            },
            {
                test: /\.js$/,
                exclude:/node_modules/,
                use:{
                    loader:'babel-loader'
                }
            },
            {
                test:/\.(s*)css$/,
                use: [
                    {
                        // Adds CSS to the DOM by injecting a `<style>` tag
                        loader: 'style-loader'
                    },
                    {
                        //interprets `@import` and `url()` like `import/require()` and will resolve them
                        loader:'css-loader'
                    },
                    {
                        //loader for webpack to process css with postcss
                        loader: 'postcss-loader',
                        options: {
                            plugins: function(){
                                return [
                                    require('autoprefixer')
                                ];
                            }
                        }
                    },
                    {
                        loader:'sass-loader'
                    }
                    
                ]
            },
            {
                test: /\.(png)$/,  
                use: [{
                    loader: 'url-loader',
                    options: { 
                        limit: 8000, // Convert images < 8kb to base64 strings
                        name: 'images/[hash]-[name].[ext]'
                    } 
                }]
            },
            {
                test: /\.(svg)$/,  
                use: [{
                    loader: 'url-loader',
                    options: { 
                        limit: 12000, // Convert images < 12kb to base64 strings
                        name: 'images/[hash]-[name].[ext]'
                    } 
                }]
            },
            {
                test:/\.(jpe?g|png|gif|svg)$/i, //compressing the images
                loaders:[
                    {
                        loader:'file-loader',
                        options:{
                            name:''+imgPath+'[name].[ext]'
                        }
                    },
                    {
                        loader:'img-loader',
                        options:{
                            plugins:[
                                imageminGifsicle({
                                    interlaced: false,
                                    threshold: 1000000 //compressing images of certain size
                                }),
                                imageminMozjpeg({
                                    progressive: true,
                                    arithmetic: false,
                                    threshold: 1000000 //compressing images of certain size
                                }),
                                imageminPngquant({
                                    floyd: 0.5,
                                    speed: 2,
                                    threshold: 1000000
                                }),
                                imageminSvgo({
                                    threshold: 1000000,
                                    plugins: [
                                        { removeTitle: true },
                                        { convertPathData: false }
                                    ]
                                })
                            ]
                        }
                    }
                ]
            }
        ]
    },
    resolve: {
        alias:{
            // bind version of jquery-ui
            "jquery-ui": "jquery-ui/jquery-ui.js",      
            // bind to modules;
            modules: path.join(__dirname, "node_modules"),
        }
    },
    plugins:[
      
        //new axiosPlugin(),
        new HTMLWebpackPlugin({
            template: "./src/index.html",
            filename: "./index.html"
        }),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery":"jquery"
        })
    ]
};