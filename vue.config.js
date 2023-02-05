// eslint-disable-next-line import/no-extraneous-dependencies
import { optimize } from 'webpack';

export const filenameHashing = false;
export const configureWebpack = {
  plugins: [
    new optimize.LimitChunkCountPlugin({
      maxChunks: 1,
    }),
  ],
};
export function chainWebpack(config) {
  config.optimization.delete('splitChunks');
}
