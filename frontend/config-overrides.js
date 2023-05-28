const webpack = require("webpack")
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin")

module.exports = function override(config, env){
    // Other rules...
    config.resolve.fallback = {
        process: require.resolve("process/browser"),
        zlib: require.resolve("browserify-zlib"),
        stream: require.resolve("stream-browserify"),
        util: require.resolve("util"),
        buffer: require.resolve("buffer"),
        asset: require.resolve("assert"),
        fs: require.resolve('browserify-fs'),
    }
    config.plugins.push(new webpack.ProvidePlugin({
        Buffer: ["buffer", "Buffer"],
        process: "process/browser.js",
      }));
    config.plugins.push(new NodePolyfillPlugin());
    return config;
};