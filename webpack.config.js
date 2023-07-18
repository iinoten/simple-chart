const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// HTMLファイルのビルド設定
const htmlWebpackPlugin = new HtmlWebpackPlugin({
    template: path.join(__dirname, 'examples/src/index.html'),
    filename: './index.html'
});
module.exports = {
    // 依存関係解決の起点となる資産を指定します。
    mode: 'development',
    entry: path.join(__dirname, 'examples/src/index.js'),
    entry: './src/index.tsx',
    output: {
      filename: 'index.js',
      path: path.join(__dirname, 'dist'),
      libraryTarget: 'commonjs2',
    },
    // Babelのトランスパイル対象資産を指定します。
    module: {
        rules: [
            {
                test: /\.(js|jsx)/,
                use: 'babel-loader',
                exclude: /node_modules/
            },
            {
                // 拡張子 .ts の場合
                test: /\.(ts|tsx)/,
                // TypeScript をコンパイルする
                use: 'ts-loader',
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"]
            }
        ]
    },
    plugins: [htmlWebpackPlugin],
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx'],
    },
    // 開発用Webサーバのポートを指定します。
    devServer: {
        port: 3001
    }
}