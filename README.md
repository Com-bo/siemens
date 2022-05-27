# Medalsoft Framework说明V2.0

## 项目结构

```
├─public
│  └─images      			# 公共资源，目录下所有文件会被 copy 到输出路径
└─src
│  ├─app					# 业务弱相关，项目强相关内容，请求处理、项目配置、api等
│  │  ├─index				# config全局配置
│  │  ├─config     			# 项目其他配置
│  │  ├─theme				# 主题配置，antd主题配置、styledComponents配置
│  │  └─api          		# api文件
│  ├─assets          		# 静态资源
│  ├─components     		# 通用组件，存放完全通用组件/项目通用组件，按组件功能进行划分存放
│  │  ├─Comment      		# 通用组件，业务、项目无关，components下存放
│  │  │  └─Comment.stories.tsx # 组件文档
│  │  │  └─index.tsx  		# 视图元素集合，无任何逻辑，逻辑、状态由同级useXXXService文件提供
│  │  │  └─useCommentService.ts  		# 自定义服务逻辑
│  ├─layouts        		# 顶层组件，全局服务注入/布局相关组件
│  ├─locales   				# 多语言，参考umi文件
│  ├─modules  				# 功能领域模块，基于业务模块进行划分
│  │  ├─components			# 业务模块公用的组件，项目强相关、业务弱相关（不跟特定业务模块强关联），按组件功能进行划分存放
│  │  ├─News				# 功能领域A
│  │  │  ├─NewsList			# 业务资源A1
│  │  │  │  └─index.tsx  	# 视图元素集合，无任何逻辑，逻辑、状态由同级useXXXService文件提供
│  │  │  │  └─useNewsListService.ts  	# 自定义服务逻辑
│  │  │  │  └─style.ts  	# 视图元素css封装
│  │  │  └─NewsDetail		# 业务资源A2
│  │  └─User				# 功能领域B
│  │      ├─Login			# 业务资源B1
│  │      └─Personal		# 业务资源B2
│  ├─pages  				# 与页面路由地址对应，纯视图/布局/领域资源组合组件、注入Service，无业务逻辑
│  │  ├─document.ejs		# 自定义html模板
│  │  └─App   			
│  │     ├─components 		# Header、Footer等当前路由层级通用组件，纯视图/领域资源组合组件
│  │     ├─news.tsx  		# 路由页面,对当前页面用到的资源组件进行组合
│  │     └─_layout.tsx   	# 当前路由层级路由公用容器，公用页面布局/Service注入
│  ├─tools       			# 通用工具方法，按功能进行划分
│  └─app.tsx				# umi运行时配置、项目全局运行时配置（antd组件配置）
├─.editorconfig				# 编辑器配置文件
├─.prettierignore 			# prettier格式化忽略文件清单
├─.prettierrc	  			# prettier格式化配置
├─.umirc.ts		  			# umi配置文件
├─.umirc.XXX.ts		  		# umi XXX环境配置文件
└─typings.d.ts	  			# 全局类型声明

```









## 约定

### 核心要求

Medalsoft UISperate要求代码划分以**功能领域设计模型**为设计原则进行结构层次划分，以**UIService分离**为编码原则来编写代码。



### UISperate

功能领域下存放各个业务资源组件，资源组件均以视图、逻辑分离原则进行编码，要求视图层只有UI元素，逻辑层只有逻辑代码。



### Pages



#### 路由模式

根据项目页面路由创建文件，默认情况下采用UMI的[约定式路由模式](#路由配置)，框架对`src/pages`文件及文件夹自动进行路由映射



#### 命名

`pages`下内容在[基于UMI的路由约定](https://umijs.org/zh-CN/docs/convention-routing)基础上，会存在以下几种内容

- 文件夹：pages下除了特殊文件夹，所有文件夹均会对路由产生层次划分用的作用
  - 命名规则：全小写，多个单词以`-`拼接
- 文件：除umi定义的特殊文件外，均作为页面路由
  - 命名规则：全小写，多个单词以`-`拼接
- `**\components\**`：路由公用布局组件
  - 命名规则：文件夹下组件，按常规组件命名，使用大驼峰命名，`index`使用小写
- `document.ejs`: `html`模板
- `**\_layout.tsx`：框架限定布局组件，作为每个路由层次下所有路由的公用布局



#### 组件

`pages`下组件通常为业务无关的`纯视图/领域资源组合组件/领域Service注入组件`，组件应只有少量逻辑（Service注入、路由跳转）不需拆分Service，根据作用可分为以下几种

- 页面容器：`pages`下的`_layout.tsx`文件，基于UMI路由模式，渲染时自动对当前路由下所有页面进行包裹，提供公用的布局、模板
- 页面通用组件：非领域资源组件，存放于pages下components文件夹中，被当前路由层级下多个页面/_layout使用

- 页面组件：页面通用组件、领域资源组件的整合



### Modules

modules是以[功能领域设计模型](#功能领域设计模型)为设计原则设计出的各功能领域层，领域内根据页面组件划分为各个资源组件，资源组件以[UISperate](#UISperate)编码原则进行代码编写。



#### 命名

- 组件文件夹、文件：`index`小写，其他使用大驼峰命名
- `service`： 统一使用`useXXXService.ts`
- 样式： `style.ts`/`style.css`/`index.css`



#### 组件

根据组件所包含的业务逻辑，将组件划分到特定领域下，同时领域资源组件根据依赖关系进行存放，一个完整的组件通常有以下几个文件

- `index.tsx`：视图元素 + 服务组合
- `useXXXService.ts`：逻辑层服务
- `style.ts`：css视图元素<可选>



## 功能领域设计模型

#### 概念说明

领域模型是跨前端-后端-产品-设计的统一的语言，是统一的、有共识的结构化的模型。它要求在技术人员在开发前将所有页面组件与模块内的业务行为都抽离出来，放在合适的领域模块中的一种设计方式。需要注意的是，业务行为一定是落在领域中的，否则需要重新检查领域模型的设计。

需要强调的是领域层的设计一定不是两个页面同时发了个请求，于是把这个请求抽出来，给与一个领域的名字。他一定被**提前建立好**的、在开始进行前端设计之前就被设计出来的一层。



#### 设计原则

**抽象：**领域模型是对具有某个边界的领域的一个抽象，反映了领域内用户业务需求的本质；

**边界**：领域模型是有边界的，只反应了我们在领域内所关注的部分。

**集中：**领域模型确保了我们的软件的业务逻辑都在一个模型中，都在一个地方；这样对提高软件的可维护性，业务可理解性以及可重用性方面都有很好的帮助。



#### 设计目的

驱动领域层分离的目的并不是简单的理解为可被页面复用，而是：

**保持稳定**：页面以及与页面绑定的模块都是不稳定的，会随需求变动

**解耦合**：页面是会耦合的，页面的数据会来自多个接口，多个领域

**便于管理**：领域层具有`极高复杂度`，值得单独管理。view层处理页面渲染以及页面逻辑控制，复杂度已经够高，领域层解耦可以轻view层。

**可复用**：领域层以层为单位是可以复用的，它的构建应当是纯js或ts代码，不依赖于任何特定框架。现有的前端开发框架vue react 等应该只负责展示和交互。这样的好处是方便单元测试和项目迁移，甚至可以将领域模型直接迁移到node层。

**代码文档化**：领域内模型只关注业务逻辑。经过精细领域划分后，领域层已经可以比较直观的反映出业务逻辑，同时应当对领域模型的代码编写较为详细的文档和注释，以更好的理解。

**持续衍进**：模型存在的目的是聚焦，聚焦的好处是加强了团队对于业务的理解，思考业务的过程才能让系统前进。



#### 命名原则

以业务性核心名词命名领域层，划分功能领域层要避免开发者思维。

​                   

#### 领域间交互

不同领域的功能不可在其他领域代码中直接使用，当领域间需要进行交互时，应在领域内新增`useXXXService.ts`服务并于系统顶层组件或领域之上的业务层处注入该服务。

> 例：权限



## Umi

### 文件说明

- `.umirc.ts`：[umi配置文件](https://umijs.org/zh-CN/docs/config)

- `app.tsx`：[运行时配置](https://umijs.org/zh-CN/docs/runtime-config)

- `src/layouts/index` ：全局布局



### 路由配置

- [约定式路由](https://umijs.org/zh-CN/docs/convention-routing)：使用约定式路由时不配置`.umirc.ts`中的routes属性
- `.umirc.ts` 中手动配置路由，会覆盖自动生成的约定式路由





### 多环境配置

`{ENV}`表示环境变量名，根据项目需要替换为所需的字符串



**1、根目录下新建`.umirc.{ENV}.ts`文件**

```ts
export default {
  define: {
    'process.env.MEDALENV': '{ENV}',
  },
}
```



**2、`package.json`中`scripts`添加命令**

```json
 {
    "start": "umi dev",
    "build:{ENV}": "cross-env UMI_ENV={ENV} umi build",
 }
```

执行`build:{ENV}`命令将会查找`.umirc.{ENV}.ts`作为打包配置文件进行打包



**3、`src/app/config/config.js`中根据需要进行系统环境变量设置**





## Storybook

框架集成代码文档工具storybook，支持组件预览、属性文档预览

**PS**：当文档所引用的组件`import`umi内置功能时，需先执行`start`确保src下有.umi文件夹



### 运行

执行以下命令，完成后会自动在浏览器打开文档页面

storybook会自动匹配src下`*.stories.mdx`、`*.stories.js`、`*.stories.jsx`、`*.stories.ts`、`*.stories.tsx`文件生成文档

```bash
npm run storybook
yarn storybook
pnpm storybook
```



### 静态文档部署

执行`build-storybook`命令，将在根目录下生成`storybook-static`目录，内容为组件文档打包

```bash
npm run build-storybook
yarn build-storybook
pnpm build-storybook
```





### 文档编写

参考`src/components/StorybookExample`进行组件文档编写

- `.stories`文档应与组件放置在同一路径下
- 组件必须export，只export default会导致无法读取typescript定义
- default import时使用`import * as Module from 'module'`
- 页面刷新后看不到变化的内容（属性注释、属性变化），修改组件注释保存



## 常用库资料

- [ahooks](https://ahooks.js.org/zh-CN/hooks/async/#%E5%9F%BA%E7%A1%80-api)
- [antd](https://ant.design/components/overview-cn/)
- [ProComponents](https://procomponents.ant.design/)
- [umi](https://umijs.org/)
- [react](https://reactjs.org/)
- [typescript](https://www.typescriptlang.org/)
- [pnpjs](https://pnp.github.io/pnpjs/)
- [wangEditor](https://www.wangeditor.com/)





## 功能清单（TBD）

### 自动路由映射（不符合新规范，不建议使用）

#### 安装(记得连接VPN)：

`yarn add  git+http://192.168.20.9:10080/medalsoft_south_china_gzbg/teg/umi-plugin-route-mapper --dev`

#### 使用方法

src目录下modules文件夹，以_Module结尾的文件夹都会视为路由，自动生成代码并插到.umirc.ts文件中，具体规律可查看该文件及umi文档。

### 自动生成Service 代码

TBD

### 自动生成枚举值

TBD









