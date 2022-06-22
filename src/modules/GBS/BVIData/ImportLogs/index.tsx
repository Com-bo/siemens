import { ContentWrap } from '@/assets/style';
import React, { useEffect, useState } from 'react';
import TableList from '@/modules/components/CommentTable';
import { Button, Divider, Dropdown, Menu, Radio, Space } from 'antd';
import {
  DownOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons';
import {
  BtnTextRedWrap,
  BtnBlueWrap,
  BtnGreenWrap,
  BtnOrangeWrap,
  BtnThemeWrap,
} from '@/assets/style';
import search from '@/assets/images/search.png';
import FilterGroup from '@/modules/components/FilterGroup';
export default (props: any) => {
  const [tableData, setTableData] = useState([]);
  const [isSearch, setIsSearch] = useState(true);

  const orignalCols = [
    {
      name: 'BusinessLine',
      title: 'Business Line',
      width: '100px',
    },
    {
      name: 'Upload File',
      title: 'Upload File',
      width: '100px',
    },
    {
      name: 'Tempate Type',
      title: 'Tempate Type',
      width: '100px',
    },
    {
      name: 'Upload Date',
      title: 'Upload Date',
      width: '100px',
    },
    {
      name: 'Upload User',
      title: 'Upload User',
      width: '100px',
    },
    {
      name: 'Upload Result',
      title: 'Upload Result',
      width: '100px',
    },
    {
      name: 'Status',
      title: 'Status',
      width: '100px',
    },
  ];
  useEffect(() => {
    setTableData([
      {
        BusinessLine: '1',
        ARE: 3,
        CompanyCode: 1111,
      },
      {
        BusinessLine: '2',
        ARE: 4,
        CompanyCode: 222,
      },
      {
        BusinessLine: '3',
        ARE: 38,
        CompanyCode: 444,
      },
    ]);
  }, []);

  const savefilterGroup = () => {
    console.log('please save  filter group interface');
  };

  return (
    <ContentWrap>
      <TableList
        data={tableData}
        columns={orignalCols}
        pageSize={10}
        total={0}
        onChange={() => {}}
        current={1}
        search={isSearch}
        rowKey="BusinessLine"
        listName="Product"
        renderBtns={
          <Space>
            <Button>Search</Button>
          </Space>
        }
      />
    </ContentWrap>
  );
};
