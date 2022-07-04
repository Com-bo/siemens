
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
      icon: 'home'
    },
    {
      name: 'GBS',
      key: "GBS",
      path: '/GBS',
      icon:'GBS',
      routes: [
        {
          name: 'Flat Charge',
          path: '/GBS/FlatCharge',
        },
        {
          name: 'BVI Data',
          path: '/GBS/BVIData',
          routes: [{
            name: 'Data Management',
            path: '/GBS/BVIData/DataManagement',
          }, {
            name: 'Validation Report',
            path: '/GBS/BVIData/ValidationReport',
          }, {
            name: 'Import Logs',
            path: '/GBS/BVIData/ImportLogs',
          }]
        },
        {
          name: 'Billing Data',
          path: '/GBS/BillingData',
          routes: [
            {
              name: 'Data Management',
              path: '/GBS/BillingData/DataManagement',
            }, {
              name: 'Validation Report',
              path: '/GBS/BillingData/ValidationReport',
            }
          ]
        },

      ],
    },
    {
      name: 'Report',
      key: "Report",
      path: '/Report',
      icon:'report',
      routes: [{
        name: 'Customer Report',
        key: "CustomerReport",
        path: '/Report/CustomerReport',
      }]
    },
    {
      name: 'Master Data',
      key: 'MasterData',
      path: '/MasterData',
      icon:'masterData',
      routes: [
        {
          name: 'Business Line',
          key: "BusinessLine",
          path: '/MasterData/BusinessLine',
        },
        {
          name: 'Cost Center',
          key: "CostCenter",
          path: '/MasterData/CostCenter',
        },
        {
          name: 'ICB Customer',
          key: "ICBCustomer",
          path: '/MasterData/ICBCustomer',
        },{
          name: 'ServiceLine Basic',
          key: "ServiceLineBasic",
          path: '/MasterData/ServiceLineBasic',
        }
        ,
        {
          name: 'Product',
          key: "Product",
          path: '/MasterData/Product',
        }
        
        ,
        {
          name: 'SpecialDivision',
          key: "SpecialDivision",
          path: '/MasterData/SpecialDivision',
        }
        ,
        {
          name: 'DivisionMapping-ICB',
          key: "DivisionMapping-ICB",
          path: '/MasterData/DivisionMappingICB',
        }
        ,
        {
          name: 'DivisionMapping-OC',
          key: "DivisionMapping-OC",
          path: '/MasterData/DivisionMappingOC',
        }
        ,
        {
          name: 'O2CUserID',
          key: "O2CUserID",
          path: '/MasterData/O2CUserID',
        }
        ,
        {
          name: 'Currency',
          key: "Currency",
          path: '/MasterData/Currency',
        }
    ]
    },
    {
      name: 'System Setting',
      path: '/sysConfig',
      icon:'sysSetting',
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
