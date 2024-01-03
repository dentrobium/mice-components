/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-var-requires */

const CracoAlias = require("craco-alias");
const TerserPlugin = require("terser-webpack-plugin");

const ENV = process.env.REACT_APP_AUTH_MODE === "dev";

module.exports = {
    devServer: {
        allowedHosts: "all",
        port: 7777,
    },
    plugins: [
        {
            plugin: CracoAlias,
            options: {
                source: "tsconfig",
                tsConfigPath: "./tsconfig.paths.json",
            },
        },
    ],
    webpack: {
        configure: (webpackConfig, { env, paths }) => {
            webpackConfig.devtool = false; // 소스맵 비활성화
            webpackConfig.optimization = {
                ...webpackConfig.optimization,

                minimizer: [
                    new TerserPlugin({
                        terserOptions: {
                            compress: {
                                drop_console: true,
                                passes: 2,
                            },
                            // mangle: true,
                            mangle: {
                                eval: true, // eval 표현식 난독화
                                toplevel: true, // 최상위 스코프 식별자 난독화
                                reserved: ["$"], // 제외할 식별자
                            },

                            output: {
                                beautify: false, // 가독성을 위한 공백 및 줄 바꿈 추가 여부 (기본값: true)
                                comments: false, // 주석 제거 여부 (기본값: true)
                            },
                            sourceMap: ENV,
                        },
                    }),
                ],
            };
            return webpackConfig;
        },
    },
};
