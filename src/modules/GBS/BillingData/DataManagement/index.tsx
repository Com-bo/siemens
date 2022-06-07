import React, { useEffect, useState } from 'react';
import TableList from '@/modules/components/TableMixInline'
import { Button, Divider, Dropdown, Menu, Radio, Space, Form } from 'antd';
import { DownOutlined, EditOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { BtnTextRedWrap, BtnBlueWrap, BtnGreenWrap, BtnOrangeWrap, BtnThemeWrap } from '@/assets/style';
import search from '@/assets/images/search.png'
import FilterGroup from '@/modules/components/FilterGroup'
import { history } from 'umi'
export default (props: any) => {


  const [tableData, setTableData] = useState([])
  const [isSearch, setIsSearch] = useState(true)
  const [form] = Form.useForm();

  const orignalCols = [{
    name: 'BusinessLine',
    title: 'Business Line',
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
    name: 'BillingCostCenter',
    title: 'Billing Cost Center',
    width: "100px",
    titleRender: 'input'
  }, {
    name: 'ProductName',
    title: 'Product Name',
    width: "200px",
    titleRender: 'input'
  }, {
    name: 'BVI',
    title: 'BVI',
    width: "100px",
    titleRender: 'input'
  }, {
    name: 'TotalAmount',
    title: 'Total Amount',
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
    name: 'Sales',
    title: 'Sales',
    width: "100px",
    titleRender: 'input'
  },
  {
    name: ' BillingDoc',
    title: 'Billing Doc.',
    width: "100px",
    titleRender: 'input'
  },
  {
    name: 'Operate',
    title: 'Operate',
    width: "100px",
    fixed: 'right',
    render: () => <Space>
      <Button type="text" key="1" icon={<EditOutlined />}></Button>
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
    }])

  }, [])

  const savefilterGroup = () => {
    console.log("please save  filter group interface")
  }

  return <div>
    <TableList
      data={tableData}
      columns={orignalCols}
      pageSize={10}
      form={form}
      total={0}
      current={1}
      onChange={() => {

      }}
      search={isSearch}
      rowKey="BusinessLine"
      listName="Data Management"
      renderFilterGroup={
        <FilterGroup onSaveFilterGroup={savefilterGroup} fields={orignalCols} customComponet={<Radio>View all uncompleted Billing Data</Radio>} />
      }
      renderBtns={<Space>
        <BtnOrangeWrap><Button >Freeze</Button></BtnOrangeWrap>
        <BtnThemeWrap color="grass"><Button>Quick Edit</Button></BtnThemeWrap>
        <BtnThemeWrap color="blue">
          <Dropdown trigger={["click"]} overlay={() => (
            <Menu>
              <Menu.Item key="1" >
                <span style={{ margin: "0 10px" }}>Freeze</span>
              </Menu.Item>
              <Menu.Item key="2" >
                <span style={{ margin: "0 10px" }}>Unfreeze</span>
              </Menu.Item>
              <Menu.Item key="3" >
                <span style={{ margin: "0 10px" }}>Auto To SAP</span>
              </Menu.Item>
              <Menu.Item key="4" >
                <span style={{ margin: "0 10px" }}>Manual To SAP</span>
              </Menu.Item>
              <Menu.Item key="5" >
                <span style={{ margin: "0 10px" }}>PostPone</span>
              </Menu.Item>
              <Menu.Item key="6" >
                <span style={{ margin: "0 10px" }}>Obsolete</span>
              </Menu.Item>
            </Menu>
          )
          }>
            <Button>
              <Space>
                Set Status
                <DownOutlined />
              </Space>
            </Button>
          </Dropdown>
        </BtnThemeWrap>
        <Divider type="vertical" style={{ height: '20px', borderColor: "#999" }} />
        <BtnThemeWrap><Button>Export</Button></BtnThemeWrap>
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
        <BtnThemeWrap><Dropdown overlay={undefined} ><Button>Import SO&Itme No</Button></Dropdown></BtnThemeWrap>
        <BtnThemeWrap><Button>build Report</Button></BtnThemeWrap>
        <Divider type="vertical" style={{ height: '20px', borderColor: "#999" }} />
        <Button style={{ width: '40px' }} onClick={() => setIsSearch(!isSearch)} icon={<img style={{ verticalAlign: 'middle', marginTop: '-2px' }} src={search} />}></Button>
      </Space>}
    />
  </div>;
};
