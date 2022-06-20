import { Button, Form, Tabs } from 'antd';
import React, { useRef, useState } from 'react';
const { TabPane } = Tabs;
import TableList from '@/modules/components/TableMixInline';
import FilterGroup from '@/modules/components/FilterGroup';
import search from '@/assets/images/search.png';
import { TabWrapDiv } from './style';
export default (props: any) => {
  const [form] = Form.useForm();
  const [diffForm] = Form.useForm();
  const [tableData, setTableData] = useState([]);
  const [differenceData, setDiffData] = useState([]);
  const [total, setTotal] = useState(0);
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [diffTotal, setDiffTotal] = useState(0);
  const [diffCurrent, setDiffCurrent] = useState(1);
  const [diffPageSize, setDiffPageSize] = useState(20);
  const [isSearch, setIsSearch] = useState(true);
  const [isDiffSearch, setIsDiffSearch] = useState(true);
  const [months, setMonths] = useState([]);
  const orignalCols = [
    {
      name: 'businessLine',
      title: 'Business Line',
      width: '180px',
      titleRender: 'input',
    },
    {
      name: 'are',
      title: 'ARE',
      width: '120px',
      titleRender: 'input',
    },
    {
      name: 'customerDivision',
      title: 'Customer Division',
      width: '120px',
      titleRender: 'input',
    },
    {
      name: 'productName',
      title: 'Product Name',
      width: '200px',
      titleRender: 'input',
    },
    {
      name: 'SystemTagofProduct',
      title: 'System Tag of Product',
      width: '180px',
      titleRender: 'input',
    },
    {
      name: 'SystemTagofBVI',
      title: 'System Tag of BVI',
      width: '180px',
      titleRender: 'input',
    },
    {
      name: 'isThereBVI',
      title: 'IS There BVI',
      width: '100px',
      titleRender: 'input',
    },
    {
      name: 'MandatoryBVI',
      title: 'MandatoryBVI',
      width: '100px',
      titleRender: 'input',
    },
    {
      name: 'BVIMonth',
      title: 'BVI Month',
      width: '100px',
    },
  ];

  const originalColsSecond = [
    {
      name: 'businessLine',
      title: 'Business Line',
      width: '180px',
      titleRender: 'input',
    },
    {
      name: 'are',
      title: 'ARE',
      width: '120px',
      titleRender: 'input',
    },
    {
      name: 'customerDivision',
      title: 'Customer Division',
      width: '120px',
      titleRender: 'input',
    },
    {
      name: 'productName',
      title: 'Product Name',
      width: '200px',
      titleRender: 'input',
    },
    ...months,
    {
      name: 'delta',
      title: 'Delta',
      width: '100px',
      titleRender: 'input',
    },
    {
      name: 'delta',
      title: 'Delta in %',
      width: '100px',
      titleRender: 'input',
      fixed: 'right',
    },
  ];
  const latestDiffGroupIdRef = useRef<any>();
  const latestGroupIdRef = useRef<any>();
  const _getData = (recordId?: string) => {};
  const onPageChange = () => {};
  const changePageSize = () => {};
  const exportExcelAction = () => {};
  const exportExcelDiffAction = () => {};
  return (
    <TabWrapDiv>
      <Tabs defaultActiveKey="1" type="card">
        <TabPane tab="Integrity Validation" key="1">
          <TableList
            headerSearch={_getData}
            form={form}
            data={tableData}
            columns={orignalCols}
            total={total}
            onPageChange={onPageChange}
            changePageSize={changePageSize}
            current={current}
            search={isSearch}
            selection={false}
            rowKey="orgId"
            listName="Validation Report"
            renderFilterGroup={
              <FilterGroup
                moudleName="Flat Charge"
                onSearch={(val) => {
                  latestGroupIdRef.current = val;
                  _getData(val);
                }}
                onClear={() => {
                  latestGroupIdRef.current = '';
                  form.resetFields();
                  if (current != 1) {
                    setCurrent(1);
                  } else {
                    _getData();
                  }
                }}
                exportAction={exportExcelAction}
              />
            }
            renderBtns={
              <Button
                style={{ width: '40px' }}
                onClick={() => setIsSearch(!isSearch)}
                icon={
                  <img
                    style={{ verticalAlign: 'middle', marginTop: '-2px' }}
                    src={search}
                  />
                }
              ></Button>
            }
          />
        </TabPane>
        <TabPane tab="Difference Validation" key="2">
          <TableList
            headerSearch={_getData}
            form={diffForm}
            data={differenceData}
            columns={originalColsSecond}
            total={diffTotal}
            onPageChange={onPageChange}
            changePageSize={changePageSize}
            current={diffCurrent}
            search={isDiffSearch}
            selection={false}
            rowKey="orgId"
            listName="Validation Report"
            renderFilterGroup={
              <FilterGroup
                moudleName="Flat Charge"
                onSearch={(val) => {
                  latestDiffGroupIdRef.current = val;
                  _getData(val);
                }}
                onClear={() => {
                  latestDiffGroupIdRef.current = '';
                  diffForm.resetFields();
                  if (diffCurrent != 1) {
                    setDiffCurrent(1);
                  } else {
                    _getData();
                  }
                }}
                exportAction={exportExcelDiffAction}
              />
            }
            renderBtns={
              <Button
                style={{ width: '40px' }}
                onClick={() => setIsDiffSearch(!isDiffSearch)}
                icon={
                  <img
                    style={{ verticalAlign: 'middle', marginTop: '-2px' }}
                    src={search}
                  />
                }
              ></Button>
            }
          />
        </TabPane>
      </Tabs>
    </TabWrapDiv>
  );
};
