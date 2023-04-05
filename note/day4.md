mock:模拟和拦截ajax

1.创建mock文件夹

2.新建.json文件，写入json格式

3.在public文件夹中加入静态资源

4.编写mock.js文件，实现拦截逻辑

5.mock.js在入口文件中引入

（json文件自动暴露）

webpack默认对外暴露的：图片，json格式数据



组件通信的方式有哪些

1.props：父子组件通信

2.自定义事件  \$on \$emit 可以实现子给父通信

3.全局时间总线：$bus  全能

4.插槽

5.vuex

6.pubsub-js ：vue中几乎不用  全能
