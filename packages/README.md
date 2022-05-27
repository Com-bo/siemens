### 使用

当 `package.json` > `devDependencies` 包含有 `"umi-plugin-sharepoint": "file:./packages/umi-plugin-sharepoint"`时会在umi dev时启用

添加后使用yarn等命令刷新依赖

第一次启用会在终端提示输入以下内容，并在项目根路径生成private.json文件
```json
{
  "siteUrl": "SharePoint URL",
  "strategy": "Authentication strategy SP认证方式选择，一般选择第一项即可",
  "username": "User name: xxx@medalsoft.com",
  "password": "Password, Password会自动加密，不同设备加密结果不同，不可公用",
}
```

### 注意

默认会在当前设备的8765端口启动服务进行代理，如需修改接口，需在dist/index.js内修改port
