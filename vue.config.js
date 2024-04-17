const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: {
      '^/api': {
        target: 'http://openapi.kepco.co.kr',
        changeOrigin: true,
        pathRewrite: {'^/api': '/service/EvInfoServiceV2'},
        logLevel: 'debug' // 프록시 프로세스의 로그 레벨을 'debug'로 설정하여 디버깅을 돕습니다.
      },
    },
  },
});
