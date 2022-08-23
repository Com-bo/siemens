export default {
  define: {
    'process.env.MEDALENV': 'pro',
    'process.env.LOGIN_IDENTITY': 'PE', //正式环境的登录认证方式打包Production Environment的缩写
    'process.env.CLIENT_ID': 'c83fe4f5-571f-456c-a20f-559a2d258b63',
    'process.env.TENANTID': '5dbf1add-202a-4b8d-815b-bf0fb024e033',
    'process.env.SCOPE':
      'api://4839a57f-9979-47a3-9c92-a372700137e6/user_impersonation',
    'process.env.WEB_URL': 'https://bvi-billing-system.siemens.com.cn',
    'process.env.BASE_URL': 'https://bvi-billing-system.siemens.com.cn',
    'process.env.REDIRECT_URL':
      'https://bvi-billing-system.siemens.com.cn/callback.html',
    'process.env.IDENTITY': 'https://bvi-billing-system.siemens.com.cn:8081',
  },
};
