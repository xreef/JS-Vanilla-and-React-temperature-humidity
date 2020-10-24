const fs = require('fs');
const path = require('path');
const webpack = require("webpack");

const EXAMPLES_DIR = path.resolve(__dirname, 'examples');
const AUTOPREFIXER_LOADER = 'autoprefixer-loader?{browsers:['
    + '"Android 2.3", "Android >= 4", "Chrome >= 20", "Firefox >= 24", '
    + '"Explorer >= 8", "iOS >= 6", "Opera >= 12", "Safari >= 6"]}';

function isDirectory(dir) {
    return fs.lstatSync(dir).isDirectory();
}

function buildEntries() {
    return fs.readdirSync(EXAMPLES_DIR).reduce((entries, dir) => {
        if (dir === 'build') return entries;

        const isDraft = dir.charAt(0) === '_';

        if (!isDraft && isDirectory(path.join(EXAMPLES_DIR, dir))) entries[dir] = path.join(EXAMPLES_DIR, dir, 'app.js');

        return entries;
    }, {});
}


module.exports = function (env) {
    return {
        mode: 'development',

        entry: buildEntries(),
        // externals: externalFile,
        watch: true,
        watchOptions: {
            poll: true
        },
        devtool: "source-map",
        output: {
            filename: '[name].js',
            chunkFilename: '[id].chunk.js',
            path: path.join(EXAMPLES_DIR, '__build__'),
            publicPath: '/__build__/'
        },
        stats: {
            hash: true,
            version: true,
            timings: true,
            assets: true,
            chunks: true,
            modules: true,
            reasons: true,
            children: true,
            source: true,
            errors: true,
            errorDetails: true,
            warnings: true,
            publicPath: true
        },

        module: {

            rules: [
                {
                    test: /\.css$/,
                    use: [
                        { loader: 'style-loader', options: { sourceMap: true } },
                        { loader: 'css-loader', options: { sourceMap: true } },
                        { loader: 'postcss-loader', options: { sourceMap: true } },
                    ]
                },
                {
                    test: /\.less$/,
                    use: [
                        { loader: 'style-loader', options: { sourceMap: true } },
                        { loader: 'css-loader', options: { sourceMap: true } },
                        { loader: 'postcss-loader', options: { sourceMap: true } },
                        { loader: 'less-loader', options: { sourceMap: true } }
                    ]
                },
                {
                    test: /\.gif/,
                    loader: 'url-loader?mimetype=image/gif'
                },
                {
                    test: /\.jpg/,
                    loader: 'url-loader?mimetype=image/jpg'
                },
                {
                    test: /\.png/,
                    loader: 'url-loader?mimetype=image/png'
                },
                {
                    test: /\.svg/,
                    loader: 'url-loader?mimetype=image/svg+xml'
                }, {
                    test: /\.json$/,
                    type: 'javascript/auto',
                    loader: 'json-loader'
                },
                {
                    test: /\.jsx?$/,
                    exclude: /node_modules/,
                    loader: 'babel-loader',
                    query: {
                        presets: ['@babel/react', '@babel/preset-env'],
                        plugins: [['@babel/plugin-proposal-object-rest-spread', { loose: true, useBuiltIns: true }],
                            ['@babel/plugin-proposal-class-properties', { loose: true }],
                            ['@babel/transform-runtime', {
                                'react-intl': {
                                    messagesDir: './build/messages',
                                    enforceDescriptions: false
                                }
                            }
                            ]
                        ]
                    }

                }, {
                    test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
                    loader: 'url-loader?limit=10000&mimetype=application/font-woff'
                }, {
                    test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
                    loader: 'url-loader?limit=10000&mimetype=application/font-woff'
                }, {
                    test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
                    loader: 'url-loader?limit=10000&mimetype=application/octet-stream'
                }, {
                    test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
                    loader: 'file-loader'
                },
                {
                    test: /\.txt$/,
                    loader: 'raw-loader'
                },
                {
                    test: /\.CSV$/,
                    loader: 'raw-loader'
                }
            ]
        },

        plugins: [
            new webpack.DefinePlugin({
                'process.env': {
                    NODE_ENV: JSON.stringify('develop')
                }
            }),
            // Compress, but don't print warnings to console
            // new webpack.optimize.UglifyJsPlugin({compress: {warnings: false}, sourceMap: true})
            // new webpack.HotModuleReplacementPlugin(),
            // new webpack.optimize.OccurrenceOrderPlugin(),
            // new webpack.optimize.UglifyJsPlugin()
            new webpack.LoaderOptionsPlugin({
                debug: true
            }),
            new webpack.HotModuleReplacementPlugin()

        ],

        resolve: {
            extensions: ['.webpack.js', '.web.js', '.js', '.jsx']
        },

        devServer: {
            // publicPath: '/'
            // // ,compress: true
            port: 8889,
             inline: true,
             stats: {
                colors: true
            },
             contentBase: 'examples',

             open: true,
             hot: true
        }
    }
};
