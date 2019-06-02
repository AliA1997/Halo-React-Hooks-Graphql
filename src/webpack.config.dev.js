require('dotenv').config();
const htmlPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const path = require('path');

console.log('WEBPACK PROCESS>ENV_________________', process.env);

module.exports = {
    entry: {
        app: ['whatwg-fetch', '@babel/polyfill', path.resolve(__dirname, 'index.js')]
    },
    devtool: 'source-map',
    output: {
        path: path.resolve(__dirname, 'dist'),
        //Have it bundled using a unique hash generated on every build.
        //Can customize hash using the hashDigest, and hashDigestLength
        //hashDigest used indicating what type of hash is it.
        //and hashDigestLength to indicate the length of the hash.
        filename: 'index.bundle.js',
        //Define your sourceMapFIleName
        sourceMapFilename: '[hash].sourceBundle.js', 
        //Defien your chunkFileName for code splitting
        chunkFilename: '[id].bundle.js',
        //To have the bundled file mounted on both browsers and nodejs use this as the global object property
        globalObject: 'this',
        // publicPath: path.resolve(__dirname, '/dist')
    },
    devServer: {
        //Used when routing to have your url fallback to the public path
        historyApiFallback: true,
        //Base of all your content.
        contentBase: './dist',
        publicPath: '/',
        open: 'Google Chrome',
        port: 9000
    },
    module: {
        rules: [
            {
                test: /.(js|jsx)$/,
                use: ['source-map-loader'],
                enforce: 'pre'
            },
            {
                test: /.bundle.js$/,
                use: [
                    {
                        loader: 'bundle-loader',
                        options: {
                            lazy: true
                        }
                    }
                ]
            },
            {
                test: /.(jsx|js)$/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            cacheDirectory: true
                        }
                    }
                ]
            },
            //Also load end of files.
            {
                test: /\.eot(\?=v\d+.\d+.\d+)?$/,
                use: ['file-loader']
            },
            //Also load woff files.
            {
                test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 10000,
                            mimetype: 'application/font-woff'
                        }
                    }
                ]
            },
            //For loading fonts also use url-loader.
            {
                //Have your test for finding otf files.
                test: /.\.[ot]tf(\?v=[0-9]\.[0-9])?$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 10000,
                            mimetype: 'application/octet-stream'
                        }
                    }
                ]
            },
            //For loading svg's using url-loader
            {
                //Have it be a svg
                test: /.\.svg(\?v=\d+\.\d+\.\d+)?$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 10000,
                            mimetype: 'image/svg+xml'
                        }
                    }
                ]
            },
            //Define your rule for loading images non-svg such as jpg, jpeg, png, gif and ico
            {
                test: /\.(jpe?g|png|gif|ico)$/i,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name:  '[name].[ext]'
                        }
                    }
                ]
            },
            //Define your rules for css, sass, and less files.
            {
                test:  /\.(le|sc|c)ss$/,
                use: [
                    "style-loader",
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true,
                        }
                    },
                    // {
                    //     loader: 'fast-sass-loader',
                    //     options: {
                    //         includePaths: [path.resolve(__dirname, 'src', 'scss', 'src/sass')],
                    //         sourceMap: true
                    //     }
                    // },
                    // {
                    //     loader: 'postcss-loader',
                    //     options: {
                    //         plugins: () => [require("autoprefixer")],
                    //         sourceMap: true
                    //     }
                    // },
                    'postcss-loader',
                    {
                        loader: 'less-loader',
                        options: {
                            includePaths: [path.resolve(__dirname, '/node_modules')]
                        }
                    }
                ],
                enforce: 'pre'
            }
        ]
    },
    resolve: {
        extensions: [ '.ts', '.tsx', '.js', '.jsx', '.css', '.postcss', '.scss', '.less']
    },
    plugins: [
        new htmlPlugin({
            template: path.resolve(__dirname, 'index.html'),
            // chunks: [chunks],
            filename: path.resolve(__dirname, 'dist/index.html')
        }),
        new webpack.DefinePlugin({
            'process.env': {
                'FIREBASE_API_KEY': JSON.stringify(process.env.REACT_APP_FIREBASE_API_KEY),
                'FIREBASE_AUTH_DOMAIN': JSON.stringify(process.env.REACT_APP_FIREBASE_AUTH_DOMAIN),
                'FIREBASE_DB_URL': JSON.stringify(process.env.REACT_APP_FIREBASE_DB_URL),
                'PROJECT_ID': JSON.stringify(process.env.REACT_APP_FIREBASE_PROJECT_ID),
                'FIREBASE_STORAGE_BUCKET': JSON.stringify(process.env.REACT_APP_FIREBASE_STORAGE_BUCKET),
                'FIREBASE_MESSAGE_ID': JSON.stringify(process.env.REACT_APP_FIREBASE_MESSAGE_ID)
            }
        })
    ]
}