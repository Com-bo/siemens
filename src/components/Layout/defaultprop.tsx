
// 权限控制的tree。根据此tree显示菜单
// handler为例子
export const defaultRoute =
{
  redirect: '/home',
  path: '/',
  routes: [
    {
      name: 'Home',
      path: '/home',
    },
    {
      name: 'GBS',
      key:"GBS",
      path: '/GBS',
   
      routes: [
        {
          name: 'Flat Charge',
          path: '/GBS/FlatCharge',
        },
        {
          name: 'BVI Data',
          path: '/GBS/BVIData' ,
          routes: [{
            name: 'Data Management',
            path: '/GBS/BVIData/DataManagement', 
          },{
            name: 'Validation Report',
            path: '/GBS/BVIData/ValidationReport', 
          },{
            name: 'Import Logs',
            path: '/GBS/BVIData/ImportLogs', 
          }]      
        },
        {
          name: 'Billing Data',
          path: '/GBS/BillingData',
          routes:[
            {
              name: 'Data Management',
              path: '/GBS/BillingData/DataManagement', 
            },{
              name: 'Validation Report',
              path: '/GBS/BillingData/ValidationReport', 
            } 
          ]
        },

      ],
    },
    {
      name: 'Report',
      key:"Report",
      path: '/Report',
      routes: [{
        name:'Customer Report',
        key:"CustomerReport",
        path: '/Report/CustomerReport', 
      }]
    },
    {
      name: 'Master Data',
      key:'MasterData',
      path: '/MasterData',
      routes: []
    },
    {
      name: 'System Setting',
      path: '/sysConfig',
      redirect: '/sysConfig/user/dealer/list',
      routes: [
        {
          name: '用户管理',
          path: '/sysConfig/user',
          redirect: '/sysConfig/user/dealer/list',
          routes: [
            {
              name: '经销商管理',
              path: '/sysConfig/user/dealer/list',
            },
            {
              name: '用户账号管理',
              path: '/sysConfig/user/dealer/list',
            },
          ],
        },
      ],
    },
  ]
};

// 根据接口的菜单结构解析前端菜单
