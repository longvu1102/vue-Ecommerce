const { defineConfig } = require('@vue/cli-service');
const path = require('path');

module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/vue-sport/'
    : '/',
  transpileDependencies: [
    'vue-router', // Thêm vue-router vào danh sách transpileDependencies
    // Các phụ thuộc khác nếu cần
  ],
  
  configureWebpack: {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
        'views': path.resolve(__dirname, 'src/views'),
        'components': path.resolve(__dirname, 'src/components'),
      },
    },
  },
 
  // Các cấu hình khác ở đây...
};
