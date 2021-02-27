import path from "path";
import webpack from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";
// import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import ESLintPlugin from "eslint-webpack-plugin";
// import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';

const outDir = path.resolve('build');

function checkNodeEnv(
  nodeEnv: string | undefined,
): nodeEnv is 'development' | 'production' {
  return !!nodeEnv && ['development', 'production'].includes(nodeEnv);
}

const { NODE_ENV } = process.env;
if (!checkNodeEnv(NODE_ENV)) {
  console.error('NODE_ENV must be set to development or production');
  process.exit(1);
}

const config: webpack.Configuration = {
  mode: NODE_ENV,
  output: {
    filename:
      NODE_ENV === 'development'
        ? '[name].[fullhash].js'
        : '[name].[contenthash].js',
    path: outDir,
    publicPath: '/'
  },
  entry: "./src/index.tsx",
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/i,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js", ".jsx"],
    // alias: {
    //   '@': '/src',
    //   '@components': '/src/components'
    // }
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: "src/public/index.html",
      // minify:
      //   NODE_ENV === 'production'
      //     ? {
      //       collapseWhitespace: true,
      //       removeComments: true,
      //       removeRedundantAttributes: true,
      //       removeScriptTypeAttributes: true,
      //       removeStyleLinkTypeAttributes: true,
      //       useShortDoctype: true,
      //       minifyCSS: true,
      //     }
      //     : false,
    }),
    // new ForkTsCheckerWebpackPlugin({
    //   typescript: {
    //     configFile: './tsconfig.json',
    //   },
    // }),
    // new webpack.HotModuleReplacementPlugin(),
    // new ReactRefreshWebpackPlugin(),
    new ESLintPlugin({
      extensions: ["js", "jsx", "ts", "tsx"],
    }),
  ],
  // devtool: NODE_ENV === 'development' ? 'source-map' : 'source-map',
  devServer: {
    contentBase: path.join(__dirname, "build"),
    historyApiFallback: true,
    disableHostCheck: true,
    port: +(process.env.PORT ?? 3333),
    open: true,
    hot: true
  }
};

export default config;
