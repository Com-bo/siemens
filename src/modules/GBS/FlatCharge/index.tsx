import React, { useEffect, useState } from 'react';
import TableList from '@/modules/components/TableMixInline'
import { Button, Divider, Dropdown, Menu, message, Popconfirm, Radio, Space } from 'antd';
import { DownOutlined, EditOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { BtnTextRedWrap, BtnBlueWrap, BtnGreenWrap, BtnOrangeWrap, BtnThemeWrap } from '@/assets/style';
import search from '@/assets/images/search.png'
import FilterGroup from '@/modules/components/FilterGroup'
export default (props: any) => {
  const [tableData, setTableData] = useState([])
  const [isSearch, setIsSearch] = useState(true)
  const [total, setTotal] = useState(0)
  const [current, setCurrent] = useState(1)
  const [selectedRowKeys, setSelectedRowKeys] = useState([])
  const [selectedRows, setSelectedRows] = useState([])
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
    name: 'StartMonth',
    title: 'Start Month',
    width: "100px",
    titleRender: 'input'
  }, {
    name: 'EndMonth',
    title: 'End Month',
    width: "100px",
    titleRender: 'input'
  }, {
    name: 'ProductName',
    title: 'Product Name',
    width: "200px",
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
  },
  {
    name: 'Operate',
    title: 'Operate',
    width: "200px",
    fixed: 'right',
    render: (text, record, index) => <Space>
      <Button type="text" key="1" icon={<EditOutlined />}></Button>
      <Popconfirm
        title="Are you sure?"
        onConfirm={() => deleteInfos([record.id])}
        okText="Yes"
        cancelText="Cancel"
      >
        <Button type="text" key="2" icon={<i className='gbs gbs-delete'></i>}></Button>
      </Popconfirm>
      <Button type="text" key="3" icon={<i className='gbs gbs-submit'></i>}></Button>
      <Button type="text" key="4" icon={<i className='gbs gbs-logs'></i>}></Button>
    </Space>
  }]
  useEffect(() => {
    _getData()
  }, [current])

  // 用于获取table接口方法
  const _getData = (pageSize?: number) => {
    const params = {
      current,
      pageSize: pageSize ?? 20,


    }
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
    },
    {
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
    }, {
      BusinessLine: "13",
      BVI: 3,
      bviFlag: true
    }, {
      BusinessLine: "14",
      BVI: 4,

    }, {
      BusinessLine: "15",
      BVI: 38,
      bviFlag: true
    }, {
      BusinessLine: "16",
      BVI: 3,
      bviFlag: true
    }, {
      BusinessLine: "17",
      BVI: 4,

    }, {
      BusinessLine: "18",
      BVI: 38,
      bviFlag: true
    }])
  }

  const savefilterGroup = () => {
    console.log("please save  filter group interface")
  }
  const onPageChange = (pagination, filters, sorter, extra) => {
    //   翻页|排序|筛选
    setCurrent(pagination.current);
    switch (extra.action) {
      case "paginate":
        setCurrent(pagination.current)
        break;
      case "sort":
        break;
      default:
        break;
    }
  }
  const changePageSize = (val: number) => {
    _getData(val)
  }
  // 删除接口
  const deleteInfos = (ids: Array<any>) => {
    message.success("success");
    setSelectedRowKeys([])
    setCurrent(1)
  }

  return <div>
    <TableList
      data={tableData}
      columns={orignalCols}
      total={total}
      onPageChange={onPageChange}
      onChange={(_selectedRowKeys, _selectedRows) => {
        setSelectedRowKeys(_selectedRowKeys)
        setSelectedRows(_selectedRows)
      }}
      changePageSize={changePageSize}
      current={current}
      search={isSearch}
      rowKey="BusinessLine"
      listName="Flat Charge"
      renderFilterGroup={
        <FilterGroup onSaveFilterGroup={savefilterGroup} fields={orignalCols} />
      }
      renderBtns={<Space>
        {/* <BtnThemeWrap><Button>Export Original</Button></BtnThemeWrap> */}
        <BtnThemeWrap>
          <Dropdown overlay={() => (
            <Menu >
              <Menu.SubMenu key="1" title={<span style={{ margin: "0 10px" }}>Import</span>} icon={<i className='gbs gbs-import'></i>}>
                <Menu.Item key="h2r"><a href="#">H2R Template</a></Menu.Item>
              </Menu.SubMenu>
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
        <BtnThemeWrap><Button disabled={selectedRowKeys.length != 1}>Copy</Button></BtnThemeWrap>
        <BtnThemeWrap><Button>Submit</Button></BtnThemeWrap>
        <Button onClick={() => deleteInfos(selectedRowKeys)} disabled={selectedRowKeys.length == 0}>Delete</Button>
        <Divider type="vertical" style={{ height: '20px', borderColor: "#999" }} />
        <Button style={{ width: '40px' }} onClick={() => setIsSearch(!isSearch)} icon={<img style={{ verticalAlign: 'middle', marginTop: '-2px' }} src={search} />}></Button>
      </Space>}
    />
  </div>;
};
