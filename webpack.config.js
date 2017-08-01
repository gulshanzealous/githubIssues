
var debug = process.env.NODE_ENV !== "production";
var webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
var nodeExternals = require('webpack-node-externals');

var path = require('path');
const context = path.resolve(__dirname, 'frontEnd/src');

const frontend  = {
  context,
  devtool: debug ? "inline-sourcemap" : null,
  entry: "./index.js",
  resolve: {
    extensions: [".js", ".json", ".css"]
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader',
        query: {
        //   presets: ['react', 'es2015', 'stage-0'],
          plugins: ['react-html-attrs', 'transform-decorators-legacy', 'transform-class-properties', 'transform-react-jsx',
                     ['react-css-modules', { context } ]
                  ],
        }
      },
    
      {
        test   : /\.css$/,
        loaders: ['style-loader', 'css-loader', 'resolve-url-loader']
      },

    //   {
    //     test: /\.css$/,
    //     use: ExtractTextPlugin.extract({
    //       fallback: "style-loader",
    //       use: "css-loader"
    //     })
    //   },
 
      { test: /\.svg$/, loader: "url-loader?limit=10000&mimetype=image/svg+xml" },
      { test: /\.(png|jpg|jpeg|woff2?|ttf|eot|gif)$/, loader: "file-loader" }

    ]
  },
  output: {
    path: __dirname + "/frontEnd/public",
    filename: "index.min.js"
  },
  plugins: debug ? [] : [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: false }),
    new ExtractTextPlugin("styles.css"),
  ],
};

const backend = {
  context: path.join(__dirname, "backEnd"),
  // devtool: debug ? "inline-sourcemap" : null,
  devtool: debug ? "string" : false,
  entry: "./server.js",
  output: {
    path: __dirname + '/build',
    filename: "server.min.js"
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader',
        query: {
          presets: [ 'es2015', 'stage-0'],
          plugins: [],
        }
      },

    //   { test: /\.css$/, loader: "style-loader!css-loader" },

    //   { test: /\.(png|jpg|woff2?|ttf|eot|svg)$/, loader: "file-loader" }

    ]
  },

  target: 'node',
  externals: [nodeExternals()],
  node: {
  __dirname: false,
  __filename: false,
  },
  plugins: debug ? [] : [
    new webpack.DefinePlugin({$dirname: '__dirname',}),
  ],

  // specify for example node_modules to be not bundled
     // other loaders, plugins etc. specific for backend
};


module.exports = [
    Object.assign({} , frontend),
    Object.assign({} , backend)
];







// // when using the full css modules dependency for production, remove the corresponding babel plugin and install
// // react-css-modules and replace the css loaders with the following snippet to be used in production mode
// // for production
//       {
//         test: /\.css$/,
//         loader: ExtractTextPlugin.extract({
//             fallback: 'style-loader',
//             use: 'css-loader?modules&importLoaders=1&localIdentName=[path]___[name]__[local]___[hash:base64:5]!resolve-url!postcss',
//         }),
//       },

   
    //   {
    //     test: /\.css$/,
    //     use: [
    //         'style-loader?sourceMap',
    //         'css-loader?modules&importLoaders=1&localIdentName=[path]___[name]__[local]___[hash:base64:5]'
    //     ]
    //   },
    //   {
    //     test: /\.css$/,
    //     loader: ExtractTextPlugin.extract({
    //         fallback: 'style-loader',
    //         use: 'css-loader?modules&importLoaders=1&localIdentName=[path]___[name]__[local]___[hash:base64:5]!resolve-url-loader!postcss-loader',
    //     }),
    //   },
      