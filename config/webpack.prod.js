const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const TerserPlugin = require('terser-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const path = require('path');

module.exports = {
  /**
   * 💡 entry
   *
   *  시작점이 되는 파일
   */
  entry: './src/index.js',
  /**
   *  💡 output
   *
   *  webpack의 build process를 진행할 결과를
   *  어디에 저장하고 이름은 어떻게 지정할 것인지,
   *  option을 setting 하는 영역
   *
   *   1️⃣ publicPath
   *        browser에서 생성된 모든 file들을 load 하기 위해
   *        사용할 URL을 webpack에게 알려주는 property
   */
  output: {
    /**
     * ❓ content hash
     *  MD5(Message-Digest algorithm 5) 128비트 암호화 hash function을 사용하여,
     *  javascript의 code상의 변경점이 있을 때마다 hash 값이 바뀌게 된다.
     *  code에 영향이 없는 수정의 경우 반영되지 않는다.
     */
    filename: 'bundle.[contenthash:8].js',
    path: path.resolve(__dirname, '../dist'),
    publicPath: '',
    /**
     * ❓ clean
     *      clean webpack plugin의 기능과 동일
     *
     *  - dry: filedㄹ 삭제하지 않고 제거해야할 file list를 알려줌
     *  - keep: 보존해야할 file list를 webpack에게 알림
     */
    // clean: {
    //   dry: true,
    //   keep: /\.css/,
    // },
  },
  /**
   * 💡 mode
   *    3가지 option 존재한다.
   *      1️⃣ production
   *      2️⃣ development
   *      3️⃣ none
   *
   */
  mode: 'production',
  /**
   * 📌 Asset Moduel Typess
   *
   *   - asset/resource: URL을 사용 (ex: size가 큰 이미지, font 파일 등에 유용)
   *                     출력 파일을 지정한 folder에 생성함
   *   - asset/inline: bundle에 data uri가 inline(encoding base64)으로 입력됨 (ex: 사이즈가 작은 파일에 적당)
   *   - asset: 지정한 file size가 넘어서면 asset/resource 을 사용하는 방식
   *   - asset/source: javascript code에 주입되는 방식
   */
  module: {
    rules: [
      /**
       * 💡 rules object property
       *
       *   - test: 적용할 file들을 찾는 정규식
       */
      {
        test: /\.(png|jpg)$/,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 3 * 1024,
          },
        },
      },
      /**
       * 💡 CSS Loader
       *
       *    Loader는 사용하기 위해선 npm install 해야함
       *
       *    1️⃣ css-loader: css 파일의 내용을 읽고 내용을 반환하기만 함
       *    2️⃣ style-loader: css를 가져와 style tag를 사용하여 page에 삽입
       */
      {
        test: /\.(sass|scss|css)$/,
        use: [
          MiniCssExtractPlugin.loader,
          // 'style-loader',
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
              importLoaders: 1,
            },
          },
          'sass-loader',
        ],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            /**
             * @babel/env: 6,7,8,9,10 등의 ecma script를 script5로 pre-compile 한다.
             */
            presets: ['@babel/preset-env'],
            plugins: [
              [
                '@babel/plugin-proposal-pipeline-operator',
                {
                  proposal: 'minimal',
                },
              ],
            ],
          },
        },
      },
      {
        test: /\.hbs$/,
        use: ['handlebars-loader'],
      },
    ],
  },
  /**
   * 💡 Plugins
   *
   *      Plugin는 loader가 할 수 없는 모든 것들을 수행하는,
   *      추가적인 javascript libraries 입니다.
   */
  plugins: [
    /**
     * ❗ TerserPlugin은 production mode에서 default 이다.
     */
    // new TerserPlugin(),
    new MiniCssExtractPlugin({
      filename: 'styles.[contenthash:8].css',
    }),
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: [
        '**/*',
        path.join(process.cwd(), 'build/**/*'),
      ],
    }),
    new HtmlWebpackPlugin({
      title: 'Webpack5 - Boiler plate (production mode)',
      template: 'public/index.hbs',
      description: 'this is a javascript boiler plate made while studying.',
    }),
  ],
};
