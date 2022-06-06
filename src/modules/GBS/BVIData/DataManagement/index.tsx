import React, { useEffect, useState } from 'react';
import TableList from '@/modules/components/TableMixInline'
import { Button, Divider, Dropdown, Menu, Modal, Popconfirm, Space, Table } from 'antd';
import { DownOutlined, EditOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { BtnTextRedWrap, BtnBlueWrap, BtnGreenWrap, BtnOrangeWrap, BtnThemeWrap, TableTopDiv, TableTitleDiv, TaleTitleIconDiv, TableWrapDiv } from '@/assets/style';
import search from '@/assets/images/search.png'
import FilterGroup from '@/modules/components/FilterGroup'
export default (props: any) => {

  const [tableData, setTableData] = useState([])
  const [isSearch, setIsSearch] = useState(true)
  const [isCheckOriginal, setIsCheckOriginal] = useState(false)
  const [checkData, setCheckData] = useState([])

  const getCheckOriginalData = () => {
    setIsCheckOriginal(true)
    setCheckData([{
      id: 1,
      BusinessLine: 'R2R',
      ARE: '563s',
      CompanyCode: '563s',
      CustomerDevision: 'DI',
      CostCenter: 'A22885020',
      CostLocation: 'SAS03570',
      ProductName: '3rd party VendorMaster Data Maintenance - ERP',
      ErrorMessage: '不能匹配到Unit Price'
    },
    {
      id: 2,
      BusinessLine: 'R2R',
      ARE: '563s',
      CompanyCode: '563s',
      CustomerDevision: 'DI',
      CostCenter: 'A22885020',
      CostLocation: 'SAS03570',
      ProductName: '3rd party VendorMaster Data Maintenance - ERP',
      ErrorMessage: '不能匹配到Unit Price'
    },
    {
      id: 3,
      BusinessLine: 'R2R',
      ARE: '563s',
      CompanyCode: '563s',
      CustomerDevision: 'DI',
      CostCenter: 'A22885020',
      CostLocation: 'SAS03570',
      ProductName: '3rd party VendorMaster Data Maintenance - ERP',
      ErrorMessage: '不能匹配到Unit Price'
    },
    {
      id: 4,
      BusinessLine: 'R2R',
      ARE: '563s',
      CompanyCode: '563s',
      CustomerDevision: 'DI',
      CostCenter: 'A22885020',
      CostLocation: 'SAS03570',
      ProductName: '3rd party VendorMaster Data Maintenance - ERP',
      ErrorMessage: '不能匹配到Unit Price'
    },
    {
      id: 5,
      BusinessLine: 'R2R',
      ARE: '563s',
      CompanyCode: '563s',
      CustomerDevision: 'DI',
      CostCenter: 'A22885020',
      CostLocation: 'SAS03570',
      ProductName: '3rd party VendorMaster Data Maintenance - ERP',
      ErrorMessage: '不能匹配到Unit Price'
    },
    {
      id: 6,
      BusinessLine: 'R2R',
      ARE: '563s',
      CompanyCode: '563s',
      CustomerDevision: 'DI',
      CostCenter: 'A22885020',
      CostLocation: 'SAS03570',
      ProductName: '3rd party VendorMaster Data Maintenance - ERP',
      ErrorMessage: '不能匹配到Unit Price'
    },
    {
      id: 7,
      BusinessLine: 'R2R',
      ARE: '563s',
      CompanyCode: '563s',
      CustomerDevision: 'DI',
      CostCenter: 'A22885020',
      CostLocation: 'SAS03570',
      ProductName: '3rd party VendorMaster Data Maintenance - ERP',
      ErrorMessage: '不能匹配到Unit Price'
    },
    {
      id: 8,
      BusinessLine: 'R2R',
      ARE: '563s',
      CompanyCode: '563s',
      CustomerDevision: 'DI',
      CostCenter: 'A22885020',
      CostLocation: 'SAS03570',
      ProductName: '3rd party VendorMaster Data Maintenance - ERP',
      ErrorMessage: '不能匹配到Unit Price'
    },
    {
      id: 9,
      BusinessLine: 'R2R',
      ARE: '563s',
      CompanyCode: '563s',
      CustomerDevision: 'DI',
      CostCenter: 'A22885020',
      CostLocation: 'SAS03570',
      ProductName: '3rd party VendorMaster Data Maintenance - ERP',
      ErrorMessage: '不能匹配到Unit Price'
    },
    {
      id: 10,
      BusinessLine: 'R2R',
      ARE: '563s',
      CompanyCode: '563s',
      CustomerDevision: 'DI',
      CostCenter: 'A22885020',
      CostLocation: 'SAS03570',
      ProductName: '3rd party VendorMaster Data Maintenance - ERP',
      ErrorMessage: '不能匹配到Unit Price'
    },
    {
      id: 11,
      BusinessLine: 'R2R',
      ARE: '563s',
      CompanyCode: '563s',
      CustomerDevision: 'DI',
      CostCenter: 'A22885020',
      CostLocation: 'SAS03570',
      ProductName: '3rd party VendorMaster Data Maintenance - ERP',
      ErrorMessage: '不能匹配到Unit Price'
    },
    {
      id: 12,
      BusinessLine: 'R2R',
      ARE: '563s',
      CompanyCode: '563s',
      CustomerDevision: 'DI',
      CostCenter: 'A22885020',
      CostLocation: 'SAS03570',
      ProductName: '3rd party VendorMaster Data Maintenance - ERP',
      ErrorMessage: '不能匹配到Unit Price'
    }])
  }
  const columns: any = [{
    title: 'Business Line',
    dataIndex: 'BusinessLine',
    key: 'BusinessLine',
    align: 'center',
  }, {
    title: 'ARE',
    dataIndex: 'ARE',
    key: 'ARE',
    align: 'center',
  }, {
    title: 'Company Code',
    dataIndex: 'CompanyCode',
    key: 'CompanyCode',
    align: 'center',
  }, {
    title: 'Customer Devision',
    dataIndex: 'CustomerDevision',
    key: 'CustomerDevision',
    width: '160px',
    align: 'center',
  }, {
    title: 'Cost Center',
    dataIndex: 'CostCenter',
    key: 'CostCenter',
    align: 'center',
  }, {
    title: 'Cost Location',
    dataIndex: 'CostLocation',
    key: 'CostLocation',
    align: 'center',
  }, {
    title: 'Product Name',
    dataIndex: 'ProductName',
    key: 'ProductName',
    align: 'center',
  }, {
    title: 'Error Message',
    dataIndex: 'ErrorMessage',
    key: 'ErrorMessage',
    align: 'center',
    render: (text) => <span style={{ color: "red" }}>{text}</span>
  }]
  const orignalCols = [{
    name: 'BusinessLine',
    title: 'Business Line',
    width: "100px",
    titleRender: 'input'
  }, {
    name: 'ARE',
    title: 'ARE',
    width: "100px",
    titleRender: 'input'
  }, {
    name: 'BillingARE',
    title: 'Billing ARE',
    width: "100px",
    titleRender: 'input'
  }, {
    name: 'CompanyCode',
    title: 'Company Code',
    width: "100px",
    titleRender: 'input'
  }, {
    name: 'CustomerDevision',
    title: 'Customer Devision',
    width: "100px",
    titleRender: 'input'
  }, {
    name: 'CostCenter',
    title: 'Cost Center',
    width: "100px",
    titleRender: 'input'
  }, {
    name: 'BillingCostCenter',
    title: 'Billing Cost Center',
    width: "100px",
    titleRender: 'input'
  }, {
    name: 'ProductName',
    title: 'Product Name',
    width: "100px",
    titleRender: 'input'
  }, {
    name: 'DataType',
    title: 'Data Type',
    width: "100px",
    titleRender: 'input'
  }, {
    name: 'Status',
    title: 'Status',
    width: "100px",
    titleRender: 'input'
  }, {
    name: 'BVI',
    title: 'BVI',
    width: "100px",
    titleRender: 'number',
    render: (text, record, index) => {
      if (record.bviFlag) {
        return <BtnTextRedWrap color="red"><Button type="text" onClick={getCheckOriginalData} icon={<ExclamationCircleOutlined />}>{text}</Button></BtnTextRedWrap>
      } else {
        return <BtnTextRedWrap ><Button type="text" onClick={getCheckOriginalData}>{text}</Button></BtnTextRedWrap>
      }
    }
  }, {
    name: 'Operate',
    title: 'Operate',
    width: "140px",
    fixed: 'right',
    render: () => <Space>
      <Button type="text" key="1" icon={<EditOutlined />}></Button>
      <Popconfirm
        title="Are you sure?"
        onConfirm={() => { }}
        okText="Yes"
        cancelText="Cancel"
      >
        <Button type="text" key="2" icon={<i className='gbs gbs-delete'></i>}></Button>
      </Popconfirm>

      <Button type="text" key="3" icon={<i className='gbs gbs-confirm'></i>}></Button>
    </Space>
  }]
  useEffect(() => {
    setTableData([{
      BusinessLine: "1",
      BVI: 3,
      bviFlag: true
    }, {
      BusinessLine: "2",
      BVI: 4,

    }, {
      BusinessLine: "3",
      BVI: 38,
      bviFlag: true
    }, {
      BusinessLine: "4",
      BVI: 3,
      bviFlag: true
    }, {
      BusinessLine: "5",
      BVI: 4,

    }, {
      BusinessLine: "6",
      BVI: 38,
      bviFlag: true
    }, {
      BusinessLine: "7",
      BVI: 3,
      bviFlag: true
    }, {
      BusinessLine: "8",
      BVI: 4,

    }, {
      BusinessLine: "9",
      BVI: 38,
      bviFlag: true
    }, {
      BusinessLine: "10",
      BVI: 3,
      bviFlag: true
    }, {
      BusinessLine: "11",
      BVI: 4,

    }, {
      BusinessLine: "12",
      BVI: 38,
      bviFlag: true
    }])
  }, [])

  const savefilterGroup = () => {
    console.log("please save  filter group interface")
  }

  return <div>
    <Modal title={
      <TableTopDiv style={{margin:0}}>
        <TableTitleDiv style={{ float: 'left' }}>
          <TaleTitleIconDiv>
            <span></span>
          </TaleTitleIconDiv>
          <span style={{ verticalAlign: 'middle', fontSize: '20px' }}>Check Original List</span>
        </TableTitleDiv>
      </TableTopDiv>} width="1300px" visible={isCheckOriginal} footer={null} onCancel={() => setIsCheckOriginal(false)}>

      <TableWrapDiv>
        <Table columns={columns} rowClassName={(record, index) => (index % 2 == 0 ? '' : 'stripe')} dataSource={checkData} rowKey="id" pagination={false} scroll={{ y: 'calc(100vh - 390px)' }} />
      </TableWrapDiv>

      <div style={{ margin: "20px auto 40px", textAlign: 'center' }}>
        <Button type="primary">Export</Button>
      </div>
    </Modal>
    <TableList
      data={tableData}
      columns={orignalCols}
      pageSize={10}
      total={0}
      onChange={() => {

      }}
      current={1}
      search={isSearch}
      rowKey="BusinessLine"
      listName="Data Management"
      renderFilterGroup={
        <FilterGroup onSaveFilterGroup={savefilterGroup} fields={orignalCols} />
      }
      renderBtns={<Space>
        <BtnOrangeWrap><Button onClick={() => { }}>Recheck</Button></BtnOrangeWrap>
        <BtnGreenWrap><Button>Confirm</Button></BtnGreenWrap>
        <BtnBlueWrap><Button>Unconfirm</Button></BtnBlueWrap>
        <Divider type="vertical" style={{ height: '20px', borderColor: "#999" }} />
        <BtnThemeWrap><Button>Export Original</Button></BtnThemeWrap>
        <BtnThemeWrap>
          <Dropdown trigger={["click"]} overlay={() => (
            <Menu>
              <Menu.Item key="1" icon={<i className='gbs gbs-import'></i>}>
                <span style={{ margin: "0 10px" }}>Import</span>
              </Menu.Item>
              <Menu.Item key="2" icon={<i className='gbs gbs-add'></i>}>
                <span style={{ margin: "0 10px" }}>Add</span>
              </Menu.Item>
              <Menu.Item key="3" icon={<i className='gbs gbs-download'></i>}>
                <span style={{ margin: "0 10px" }}>Download Template</span>
              </Menu.Item>
            </Menu>
          )
          }>
            <Button>
              <Space>
                Add
                <DownOutlined />
              </Space>
            </Button>
          </Dropdown></BtnThemeWrap>
        <BtnThemeWrap><Button>Copy</Button></BtnThemeWrap>
        <BtnThemeWrap><Button>Edit</Button></BtnThemeWrap>
        <Button>Delete</Button>
        <Divider type="vertical" style={{ height: '20px', borderColor: "#999" }} />
        <Button style={{ width: '40px' }} onClick={() => setIsSearch(!isSearch)} icon={<img style={{ verticalAlign: 'middle', marginTop: '-2px' }} src={search} />}></Button>
      </Space>}
    />
  </div>;
};
