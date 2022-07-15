export default {
  define: {
    'process.env.MEDALENV': 'test',
    'process.env.CLIENT_ID': 'c83fe4f5-571f-456c-a20f-559a2d258b63',
    'process.env.TENANTID': '5dbf1add-202a-4b8d-815b-bf0fb024e033',
    'process.env.SCOPE':
      'api://4839a57f-9979-47a3-9c92-a372700137e6/user_impersonation',
    'process.env.WEB_URL': 'http://192.168.30.241:8821',
    'process.env.BASE_URL': 'http://192.168.30.241:8821',
    'process.env.REDIRECT_URL': 'http://192.168.30.241:8821/callback.html',
    'process.env.IDENTITY': 'http://192.168.30.241:8989/',
  },
  outputPath: 'wwwroot',
};
