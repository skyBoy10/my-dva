export default {
    proxy: {
    "/api/": {
      //target: "http://11.167.57.6:7001/gid/",
      "target": "http://127.0.0.1:8000",
      changeOrigin: true,
      pathRewrite: {
        "^/api": "",
      },
    },
  },
  theme: {
    "primary-color": "#00C1DE",
  },
  "extraBabelPlugins": [
      ["import", {
          "libraryName": "antd",
          "libraryDirectory": "es",
          "style": true
      }]
  ],
  "disableCSSModules": true,
  "publicPath": "/"
}
