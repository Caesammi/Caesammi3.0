import vue from '@vitejs/plugin-vue'

export default ({
  plugins: [vue()],
// 公共样式
  css: {
    // 🔥此处添加全局scss🔥
    preprocessorOptions: {
      scss: {
        additionalData: '@import "./src/assets/common.scss";'
      }
    }
  },
// 服务
  server: {
    open: false,
    port: 8080,
// 代理配置
    proxy: {
      // '/api': 'http://192.168.20.88:8888',
    }
  },
  build: {
// 打包后目录,默认dist
    outDir: 'dist',
  },
// 引入第三方的配置
  optimizeDeps: {
    include: []
  },
// 生产环境路径，类似webpack的assetsPath
  base: './',
})
