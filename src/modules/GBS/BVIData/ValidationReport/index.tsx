import { Button, Form, message, Table, Tabs, Typography } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
const { TabPane } = Tabs;
import TableList from '@/modules/components/TableMixInline';
import FilterGroup from '@/modules/components/FilterGroup';
import search from '@/assets/images/search.png';
import { TabWrapDiv } from './style';
import {
  exportIntergrityReport,
  getDiffData,
  getIntergrityReportData,
} from '@/app/request/apiValidReport';
import moment from 'moment';
const { Text } = Typography;
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
  const [months, setMonths] = useState([
    {
      name: '202109',
      title: '202109',
      width: '100px',
    },
    {
      name: '202110',
      title: '202110',
      width: '100px',
    },
    {
      name: '202111',
      title: '202111',
      width: '100px',
    },
    {
      name: '202112',
      title: '202112',
      width: '100px',
    },
    {
      name: '202201',
      title: '202201',
      width: '100px',
    },
    {
      name: '202202',
      title: '202202',
      width: '100px',
    },
  ]);
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
      name: 'systemTagOfProduct',
      title: 'System Tag of Product',
      width: '180px',
      titleRender: 'input',
    },
    {
      name: 'systemTagOfBVI',
      title: 'System Tag of BVI',
      width: '180px',
      titleRender: 'input',
    },
    {
      name: 'isThereBVI',
      title: 'IS There BVI',
      width: '100px',
      render: (text) => (text == 1 ? 'Yes' : 'No'),
    },
    {
      name: 'mandatoryBVI',
      title: 'MandatoryBVI',
      width: '100px',
      render: (text) => (text == 1 ? 'Yes' : 'No'),
    },
    {
      name: 'bviMonth',
      title: 'BVI Month',
      width: '100px',
      render: (text) =>
        text && moment(text).isValid() ? moment(text).format('YYYYMM') : text,
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
      name: 'deltain',
      title: 'Delta in %',
      width: '100px',
      titleRender: 'input',
      fixed: 'right',
      render: (text, record, index) => {
        // return <Text type="danger" strong={true}><span style={{fontSize:'30px',verticalAlign:'sub'}}>·</span>11%</Text>
        // return <Text type="success" strong={true}><span style={{fontSize:'30px',verticalAlign:'sub'}}>·</span>11%</Text>
        return (
          <Text strong={true}>
            <span style={{ fontSize: '30px', verticalAlign: 'sub' }}>·</span>11%
          </Text>
        );
      },
    },
  ];
  useEffect(() => {
    _getData();
  }, [current, pageSize]);
  useEffect(() => {
    _getDiffData();
  }, [diffCurrent, diffPageSize]);
  const latestDiffGroupIdRef = useRef<any>();
  const latestGroupIdRef = useRef<any>();
  const _getData = () => {
    let params = {
      searchCondition: {
        filterGroup: {
          recordId: latestGroupIdRef.current,
        },
        listHeader: form.getFieldsValue(),
      },
      pageIndex: current,
      pageSize: pageSize,
    };

    getIntergrityReportData(params).then((res) => {
      if (res.isSuccess) {
        setTableData(res.data);
        setTotal(res.totalCount);
      } else {
        message.error(res.msg);
      }
    });
  };
  const _getDiffData = () => {
    let params = {
      searchCondition: {
        filterGroup: {
          recordId: latestDiffGroupIdRef.current,
        },
        listHeader: diffForm.getFieldsValue(),
      },
      pageIndex: diffCurrent,
      pageSize: diffPageSize,
    };

    getDiffData(params).then((res) => {
      if (res.isSuccess) {
        setDiffData(res.data);
        setDiffTotal(res.totalCount);
      } else {
        message.error(res.msg);
      }
    });
  };
  const onPageChange = (pagination) => {
    setCurrent(pagination.current);
  };

  const onDiffPageChange = (pagination) => {
    setDiffCurrent(pagination.current);
  };
  const changePageSize = (val: number) => {
    setPageSize(val);
  };
  const changeDiffPageSize = (val: number) => {
    setDiffPageSize(val);
  };
  const exportExcelAction = () => {
    let params = {
      searchCondition: {
        filterGroup: {
          recordId: latestGroupIdRef.current,
        },
        listHeader: form.getFieldsValue(),
      },
      pageIndex: current,
      pageSize: pageSize,
    };

    exportIntergrityReport(params).then((res: any) => {
      if (res.response.status == 200) {
        let elink = document.createElement('a');
        // 设置下载文件名
        elink.download = 'Integrity Validation List.xlsx';
        elink.href = window.URL.createObjectURL(new Blob([res.response?.data]));
        elink.click();
        window.URL.revokeObjectURL(elink.href);
      } else {
        message.error(res.response.statusText);
      }
    });
  };
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
            scrollY={'calc(100vh - 533px)'}
            rowKey="orgId"
            listName="Validation Report"
            renderFilterGroup={
              <FilterGroup
                moudleName="BVI Integrity Report"
                onSearch={(val) => {
                  latestGroupIdRef.current = val;
                  _getData();
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
            headerSearch={_getDiffData}
            form={diffForm}
            data={differenceData}
            columns={originalColsSecond}
            total={diffTotal}
            scrollY={'calc(100vh - 533px)'}
            onPageChange={onDiffPageChange}
            changePageSize={changeDiffPageSize}
            current={diffCurrent}
            search={isDiffSearch}
            selection={false}
            rowKey="orgId"
            listName="Validation Report"
            summary={(currentData) => (
              <>
                <Table.Summary.Row>
                  {originalColsSecond.map((item, index) => {
                    if (index == 3) {
                      return (
                        <Table.Summary.Cell index={index} align="center">
                          Total
                        </Table.Summary.Cell>
                      );
                    } else {
                      return (
                        <Table.Summary.Cell
                          index={index}
                          align="center"
                        ></Table.Summary.Cell>
                      );
                    }
                  })}
                </Table.Summary.Row>
              </>
            )}
            renderFilterGroup={
              <FilterGroup
                moudleName="Flat Charge"
                onSearch={(val) => {
                  latestDiffGroupIdRef.current = val;
                  _getData();
                }}
                onClear={() => {
                  latestDiffGroupIdRef.current = '';
                  diffForm.resetFields();
                  if (diffCurrent != 1) {
                    setDiffCurrent(1);
                  } else {
                    _getDiffData();
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
