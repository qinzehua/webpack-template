# 1.0.0 (2021-01-11)


### Bug Fixes

* **changelog.md:** 安装conventional-changelog-cli c888bb3
* **loaders:** 修复eslint 报错 75e5f88


### Features

* bundle analyze fc0f800
* **git change log:** 安装conventional-changelog，它的功能是生成git 修改log 7bbace1
* 测试commit lint e2f9554
* git commit msg 标准 19ffc2c


### Performance Improvements

* **根目录:** 在项目中配置conventional-changelog 8814a8e
* **dllplugin:** 使用DLLPlugin 提取公共包，使用DLLReferencePlugin引用公共包的映射,但是还要再html文件中手动引入公共包的js文件。 d8512d7
* **lib/webpack.prod.js:** 使用purgecss-webpack-plugin 对css代码做tree shaking cfefd48, closes #233333
* **lib/webpack.prod.js:** 在html文件引入动态polyfill地址，它会根据浏览的useragent动态返回需要的polyfill c0b8288
* **lib/webpack.prod.js:** image-webpack-loader开启图片压缩，它基于库Imagemin. 依赖于mozjpeg,pngquant等库来压缩不同格式的图片 1401dd5
* **webpack.prod.js:** 缓存：开启babel缓存提升打包速度。 hard-source-webpack-plugin由于webpack版本问题添加失败 e248500
* **webpack.prod.js:** 缩减构建目标（指定src为搜索目录，指定react，react-dom所在目录，指定查找文件后缀，指定包的main字段）来提升构建时间 fd81dc3
* 并行压缩 c34bc45



