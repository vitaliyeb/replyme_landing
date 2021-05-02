const path = require('path');
const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const PAGES_DIR = `${__dirname}/views/pages/`;
const PAGES = fs.readdirSync(PAGES_DIR).filter(fileName => fileName.endsWith('.pug'));

async function setAlImages(){
    let pathImg = path.resolve(__dirname, 'public',  'images');
    let cd = await fs.readdirSync(pathImg);
    
    let arrayPath = cd.map((el)=> ` import "./../public/images/${el}";`);
    await fs.writeFileSync(path.resolve(__dirname, 'dev', 'ImagesImport.js'), arrayPath.join(' '), 'utf-8');

}


async function returnProgectConfig (){
  return {
      entry: './dev/common.js',
      watch: true,
      output: {
          path: path.resolve(__dirname, 'build'),
          filename: 'bundle.js'
      },
      module: {
          rules: [
            { 
                test: /\.styl$/, 
                use: [
                  {loader: MiniCssExtractPlugin.loader},
                  {
                      loader: 'css-loader',
                      options: {
                          url: true,
                      },
                  },
                  {loader: 'stylus-loader'},
                ] 
              },
              {
                  test: /\.pug$/,
                  loader: 'pug-loader'
              },
              {
                  test: /\.(png|jpe?g|gif)$/i,
                  use: [
                    {
                      loader: 'file-loader',
                      options: {
                          outputPath: 'images',
                          name: '[name].[ext]'
                        },
                    },
                  ],
                },
                {
                  test: /\.(woff(2)?|ttf|otf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
                  use: [
                    {
                      loader: 'file-loader',
                      options: {
                        name: '[name].[ext]',
                        outputPath: 'fonts/'
                      }
                    }
                  ]
                }
          ]
      },
      plugins: [
          new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[id].css',
          }),
          ...PAGES.map(page => new HtmlWebpackPlugin({
              template: `${PAGES_DIR}/${page}`,
              filename: `./${page.replace(/\.pug/,'.html')}`
            }))
      ],
      devServer: {
        contentBase: path.join(__dirname, 'build'),
      }
  }
}


module.exports = async (el)=>{
  await setAlImages();
  return await returnProgectConfig();
};