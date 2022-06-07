import React, { useEffect, useState } from 'react';
import TableList from '@/modules/TableMixInline'
import { Button, Divider, Dropdown, Menu, Radio, Space } from 'antd';
import { DownOutlined, EditOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { BtnTextRedWrap, BtnBlueWrap, BtnGreenWrap, BtnOrangeWrap, BtnThemeWrap } from '@/assets/style';
import search from '@/assets/images/search.png'
import FilterGroup from '@/modules/FilterGroup'
export default (props: any) => {
  const [tableData, setTableData] = useState([])
  const [isSearch, setIsSearch] = useState(true)


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
    name: 'StartDate',
    title: 'Start Date',
    width: "100px",
    titleRender: 'input'
  }, {
    name: 'EndDate',
    title: 'End Date',
    width: "100px",
    titleRender: 'input'
  }, {
    name: 'ProductName',
    title: 'Product Name',
    width: "200px",
    titleRender: 'input'
  },
//    {
//     name: 'TotalAmount',
//     title: 'Total Amount',
//     width: "100px",
//     titleRender: 'input'
//   }, {
//     name: 'DataType',
//     title: 'Data Type',
//     width: "100px",
//     titleRender: 'input'
//   }, 
  {
    name: 'Signed',
    title: 'Signed',
    width: "100px",
    titleRender: 'input'
  },
  {
    name: 'Operate',
    title: 'Operate',
    width: "200px",
    fixed: 'right',
    render: () => <Space>
      <Button type="text" key="1" icon={<EditOutlined />}></Button>
      <Button type="text" key="2" icon={<i className='gbs gbs-delete'></i>}></Button>
      <Button type="text" key="3" icon={<i className='gbs gbs-submit'></i>}></Button>
      <Button type="text" key="4" icon={<i className='gbs gbs-logs'></i>}></Button>
    </Space>
  }]
  useEffect(() => {
    setTableData([{
      BusinessLine: "1",
      ARE: 3,
      CompanyCode: 1111
    }, {
      BusinessLine: "2",
      ARE: 4,
      CompanyCode: 222
    }, {
      BusinessLine: "3",
      ARE: 38,
      CompanyCode: 444
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
      total={0}
      onChange={()=>{
        
      }}
      current={1}
      search={isSearch}
      rowKey="BusinessLine"
      listName="Product"
      renderFilterGroup={
        <FilterGroup onSaveFilterGroup={savefilterGroup} fields={orignalCols}  />
      }
      renderBtns={<Space>
        {/* <BtnThemeWrap><Button>Export Original</Button></BtnThemeWrap> */}
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
        <BtnThemeWrap><Button>Copys</Button></BtnThemeWrap>
        <BtnThemeWrap><Button>Submit</Button></BtnThemeWrap>
        <Button>Delete</Button>
        <Divider type="vertical" style={{ height: '20px', borderColor: "#999" }} />
        <Button style={{ width: '40px' }} onClick={() => setIsSearch(!isSearch)} icon={<img style={{ verticalAlign: 'middle', marginTop: '-2px' }} src={search} />}></Button>
      </Space>}
    />
  </div>;
};
