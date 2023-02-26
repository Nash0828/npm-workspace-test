npm从7版本开始支持workspace特性, 在此之前, 我们一般使用lerna或yarn. workspace特性可以使我们很容易管理多个项目. 下面我们通过简单的demo演示workspace特性的基本使用.
# 一、在npm创建organization
在npm创建一个一个organization, 用来承载多个子项目. 如创建的一个名为npm-workspace-test的organization  

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/25888973642a415594713c0a76cf1560~tplv-k3u1fbpfcp-watermark.image?)

# 二、初始化项目
1. 使用 `npm init -y` 命令初始化一个npm项目, 添加 `workspaces` 字段. 
2. 在根目录下创建 `packages` 目录, 子项目创建在该目录下.
![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e5b813f4f40d471888adf308b3160bb3~tplv-k3u1fbpfcp-watermark.image?)
3. 我们将会在`packages`下创建三个项目, 分别是项目`a`、项目`b`和项目`cil`, `a`项目和`b`项目会被`cli`项目引用, `cli`项目会实现一个自定义命令行命令.  

- 3.1 使用workspace命令初始化`a` `b` `cli` 这几个子项目
```bash
npm init --workspace ./packages/a --workspace ./packages/b --workspace ./packages/cli
```

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8be1b249158d4dddaab3925570a2e4a3~tplv-k3u1fbpfcp-watermark.image?)

- 3.2 给各个子项目的名字加上organization前缀, 已确保可以正确发布到npm上.

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0ddeb9671c124f13b453f3394c038c10~tplv-k3u1fbpfcp-watermark.image?)

- 3.3 创建项目`a`和项目`b`的入口文件`index.mjs`, 并把`package.json`的`main`改成`index.mjs`(改成`.mjs`后缀不是必须的, 这里改成`.mjs`是因为没有使用 babel 而又想使用 esmodule 的特性)

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ccadb1ee686440288590ddf376c5c1b3~tplv-k3u1fbpfcp-watermark.image?)
- 3.4 因为我们要实现一个自定义的cli命令, 因此我们需要在`cli`项目下添加`bin`字段. 如图所示, 我们定义的自定义命令为 `my-demo-cli`, 这个命令会指向`bin/index.mjs`

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/137749f18a2f4518888d61b08aac5684~tplv-k3u1fbpfcp-watermark.image?)
# 三、编写业务代码
分别编写项目`a` `b` `cli`的业务代码  
1. 项目`a`使用chalk打印一句红色字体的话术
可以使用`--workspace`选项单独给`a`项目安装`chalk`依赖  
```
npm install chalk --workspace ./packages/a
```

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ed9800328bcd4b01826ba6f53a24dce3~tplv-k3u1fbpfcp-watermark.image?)

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2f66d4ac8b784121bdbe142ee6b4a1fd~tplv-k3u1fbpfcp-watermark.image?)
2. 项目 `b` 使用 `ora` 模拟 loading 效果
```
npm install ora -ws ./packages/b
```

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/eef1c7b503be481981cc91083548d93b~tplv-k3u1fbpfcp-watermark.image?)
3. 在项目 `cli` 中使用 `a` 和 `b`  
- `cli` 项目安装 `a` 和 `b`
```
npm i @npm-workspace-test/a -w ./packages/cli @npm-workspace-test/b -w ./packages/cli
```
- 使用

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f2e79a1a086b4287b477e08d4d21cc83~tplv-k3u1fbpfcp-watermark.image?)
- 执行 cli.mjs, 看运行是否符合预期
```
node ./packages/cli/bin/cli.mjs
```

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/cace1d1b8dbf4e81937be7ad8ab5dd31~tplv-k3u1fbpfcp-watermark.image?)
# 四、把 `a` `b` `cli` 这三个项目发布到npm
使用 `npm publish --workspaces` 命令把这三个项目发布到npm.

# 五、全局安装 
发布成功后, 我们可以全局安装cli
```
npm install @npm-workspace-test/cli -g
```
安装成功后, 可运行 `my-demo-cli` 看效果

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a629f6ae994a42209423a9f4ee5fb1ce~tplv-k3u1fbpfcp-watermark.image?)

源码: https://github.com/Nash0828/npm-workspace-test  
文章链接: https://juejin.cn/post/7201730884374167609