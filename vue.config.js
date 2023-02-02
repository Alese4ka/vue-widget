// eslint-disable-next-line import/no-extraneous-dependencies, @typescript-eslint/no-var-requires
const webpack = require('webpack');

const assetsDir = 'assets';
module.exports = {
  assetsDir,
  configureWebpack: {
    output: {
      filename: `${assetsDir}/[name].js`,
      chunkFilename: `${assetsDir}/[name].js`,
    },
    plugins: [
      new webpack.optimize.LimitChunkCountPlugin({
        maxChunks: 1,
      }),
    ],
  },
  chainWebpack: (config) => {
    config.optimization.delete('splitChunks');

    if (config.plugins.has('extract-css')) {
      const extractCSSPlugin = config.plugin('extract-css');
      // eslint-disable-next-line no-unused-expressions, operator-linebreak
      extractCSSPlugin &&
        extractCSSPlugin.tap(() => [
          {
            filename: `${assetsDir}/[name].css`,
            chunkFilename: `${assetsDir}/[name].css`,
          },
        ]);
    }
  },
};
