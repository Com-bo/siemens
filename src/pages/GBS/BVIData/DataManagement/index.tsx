import React, { useEffect, useState } from 'react';
import TableList from '@/modules/TableMixInline'
import { Button, Divider, Space } from 'antd';
import orignalCols from './title'
import { EditOutlined } from '@ant-design/icons';
import { BtnBlueWrap, BtnGreenWrap, BtnOrangeWrap, BtnThemeWrap } from '@/assets/style';
import search from '@/assets/images/search.png'
import FilterGroup from '@/modules/FilterGroup'
export default (props: any) => {
  const getOperRender = (text, index, record) => {
    return <Space>
      <Button type="text" key="1" icon={<EditOutlined />}></Button>
      <Button type="text" key="2" icon={<i className='gbs gbs-delete'></i>}></Button>
      <Button type="text" key="3" icon={<i className='gbs gbs-confirm'></i>}></Button>
    </Space>
  }
  const [tableData, setTableData] = useState([])
  useEffect(() => {
    setTableData([{
      BusinessLine: "1"
    }, {
      BusinessLine: "2"
    }, {
      BusinessLine: "3"
    }])

  }, [])

  const savefilterGroup = () => {
    console.log("please save  filter group interface")
  }

  return <div>
    <TableList
      data={tableData}
      columns={orignalCols}
      renderOper={getOperRender}
      pageSize={10}
      total={0}
      current={1}
      rowKey="BusinessLine"
      listName="Data Management"
      renderFilterGroup={
        <FilterGroup onSaveFilterGroup={savefilterGroup} fields={orignalCols} />
      }
      renderBtns={<Space>
        <BtnOrangeWrap><Button >Recheck</Button></BtnOrangeWrap>
        <BtnGreenWrap><Button>Confirm</Button></BtnGreenWrap>
        <BtnBlueWrap><Button>Unconfirm</Button></BtnBlueWrap>
        <Divider type="vertical" style={{ height: '20px', borderColor: "#999" }} />
        <BtnThemeWrap><Button>Export Original</Button></BtnThemeWrap>
        <BtnThemeWrap><Button>Add</Button></BtnThemeWrap>
        <BtnThemeWrap><Button>Copy</Button></BtnThemeWrap>
        <BtnThemeWrap><Button>Edit</Button></BtnThemeWrap>
        <Button>Delete</Button>
        <Divider type="vertical" style={{ height: '20px', borderColor: "#999" }} />
        <Button style={{ width: '40px' }} onClick={() => { }} icon={<img style={{ verticalAlign: 'middle', marginTop: '-2px' }} src={search} />}></Button>
      </Space>}
    />
  </div>;
};
