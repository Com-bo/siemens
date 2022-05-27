import { Api } from './api';

const MEDALENV = process.env.MEDALENV; // 读取.umirc.{ENV}.ts中配置的环境变量值
const Config = {
  Api,
};
console.log(MEDALENV);
// console.log(process.env.NODE_ENV)
// // 打包时进入此分支，build
// if (process.env.NODE_ENV === 'production') {
//   // 根据当前所选择的环境配置进行项目配置控制
//   // if (MEDALENV === '{ENV}') {
//   // } else {
//   // }
//   Config.Api.Base = process.env.BASE_URL;
// }

// // // 调试开发时进入此分支，start
if (process.env.NODE_ENV === 'development') {
  //   //   // Config.Api.Base =
  //   //   // 'https://mockapi.eolinker.com/WyaD2SK61a2a249209ed642b22eadfa97ce23ce731bf141';
  Config.Api.Base = 'http://localhost:8005';
} else {
  Config.Api.Base = process.env.BASE_URL;
}
// Config.Api.Base =
//   'https://distributor-test.shdchina.siemens-healthineers.cn/api';

export default Config;
