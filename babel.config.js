module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    // plugins: [
    //   [
    //     require.resolve("babel-plugin-module-resolver"),
    //     {
    //       cwd: "babelrc",
    //       extensions: [".ts", ".tsx", ".js", ".ios.js", ".android.js"],
    //       alias: {
    //         app: "./src/app",
    //         shared: "./src/shared/",
    //         components: "./src/components/",
    //       },
    //     },
    //   ],
    // ],
  };
};
