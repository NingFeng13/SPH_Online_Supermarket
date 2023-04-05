1.vue-cli 脚手架初始化项目

node + webpack +淘宝镜像

### 项目结构

node_modules文件夹：项目依赖文件夹

public文件夹：放置一些静态资源（图片），放在public文件夹中的静态资源，webpack打包时会原封不动打包到dist文件夹中

src文件夹（程序员源代码文件夹）

> - assets文件夹：放置静态资源（一般放置多个），webpack打包时，webpack会把静态资源当做一个模块，打包到js文件夹中
> - component：非路由组件
> - Vue.app :唯一的根组件，Vue中的组件
> - main.js:程序入口文件，也是最先执行的文件

babel.config.js：翻译官，把es6的语法翻译成es5，提高兼容性

package.json文件：认为项目身份证，记录项目叫什么，项目有哪些依赖，项目怎么运行

package-lock.json:缓存性文件



# 路由

路由跳转有两种方式：

1.声明式导航：router-link ,必须要有to属性！

2编程式导航：利用组件实例的$router.push()/replace()    更好用一点


路由传参有几种方法？

1.params参数：属于路径中的一部分，配置路由时,需要占位

2.query参数：不属于路径中的一部分，类似于ajax中的queryString     /home?key=1&kv=18，不需要占位


路由传参面试题：

路由传递参数（对象写法）path是否可以和params一起使用？

不可以


如何指定params参数可传可不传？

如果路由要求传，但你不传，url会出现问题。

在配置路由的时候，在params后面加上？，那么可穿可不传
