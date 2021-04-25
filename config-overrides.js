const {
  override,
  fixBabelImports,
  addLessLoader,
  addBabelPreset,
} = require("customize-cra");
const { primaryTheme } = require("./theme");
// 关闭css与js的map文件。。
process.env.GENERATE_SOURCEMAP = "false";

module.exports = override(
  fixBabelImports("import", {
    libraryName: "antd",
    libraryDirectory: "es",
    style: true,
  }),
  addLessLoader({
    lessOptions: {
      modifyVars: {
        ...primaryTheme,
      }, // 修改主题颜色
      javascriptEnabled: true,
    },
  })
  // addBabelPreset('@emotion/babel-preset-css-prop')
);
