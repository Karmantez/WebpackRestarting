var path = require("path");
// CSS 파일을 별도로 분리하기 위해 MiniCssExtractPlugin 플러그인 설정 추가
var MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  mode: "none", // production(배포), development(개발), none
  entry: "./index.js",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  /**
   * ❗ module 없이 build를 하게 되면 오류가 발생한다.
   */
  module: {
    rules: [
      //   {
      //         test: /\.css$/,     // 모든 .css 확장자 파일들은 아래의 모듈을 적용한다.
      //       /**
      //        * 💡 순서가 중요하다. (❗ 순서는 오른쪽에서 왼쪽으로)
      //        *
      //        * style-loader: webpack에 정의된 .css 파일들을 <head>에 선언해준다.
      //        * css-loader: css파일을 webpack에서 사용할 수 있도록 넣어준다. 
      //        */
      //     use: ["style-loader", "css-loader"],
      //   },
      {
        test: /\.css$/,
        use: [{ loader: MiniCssExtractPlugin.loader }, "css-loader"],
      },
    ],
  },
  /**
   * 💡 플러그인(plugin)은 웹팩의 기본적인 동작에 추가적인 기능을 제공하는 속성이다.
   * 로더랑 비교하면 로더는 파일을 해석하고 변환하는 과정에 관여하는 반면,
   *  플러그인은 해당 결과물의 형태를 바꾸는 역할을 한다고 보면 된다.
   */
  plugins: [new MiniCssExtractPlugin()],
};
