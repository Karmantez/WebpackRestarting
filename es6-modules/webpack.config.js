var path = require('path');

module.exports = {
  mode: 'production',
  /**
   * 📌 Webpack 주요 속성 3가지
   * 
   * 1️⃣ entry
   *    Webpack에서 웹 자원을 변환하기 위해 필요한 최초 진입점이자 Javascript 파일 경로이다.
   *  아래의 코드는 웹팩을 실행했을 때 "src" 폴더 밑의 "js"의 "app.js"을 대상으로 웹팩이 빌드를 수행한다는 뜻이다.
   */
  entry: './js/app.js',
  /**
   * 2️⃣ output
   *    Webpack을 실행하고 난 후 결과물의 파일 경로를 의미한다.
   */
  output: {
    path: path.resolve(__dirname, 'build'),   // node.js api
    filename: 'main.bundle.js',
  },
  /**
   * 3️⃣ module (Loader)
   *    로더(Loader)는 웹팩이 웹 애플리케이션을 해석할 때 Javascript 파일이 아닌
   *  웹 자원(HTML, CSS, Image, Font 등)들을 변환할 수 있도록 도와준다. 
   */
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
    ],
  },
  stats: {
    colors: true,
  },
  devtool: 'source-map',
};
