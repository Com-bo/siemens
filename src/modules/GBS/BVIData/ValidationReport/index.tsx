import {
  Button,
  Divider,
  Form,
  InputNumber,
  message,
  Table,
  Tabs,
  Typography,
} from 'antd';
import React, { useEffect, useRef, useState } from 'react';
const { TabPane } = Tabs;
import TableList from '@/modules/components/TableMixInline';
import FilterGroup from '@/modules/components/FilterGroup';
import search from '@/assets/images/search.png';
import { TabWrapDiv } from './style';
import {
  deferenceDataExport,
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
  const [months, setMonths] = useState([]);
  const [totalSum, setTotalSum] = useState([]);
  const [deltaInPercentage, setDeltaInPercentage] = useState(null);
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
      name: 'deltaInPercentage',
      title: 'Delta in %',
      width: '100px',
      fixed: 'right',
      render: (text, record, index) => {
        // return <Text type="danger" strong={true}><span style={{fontSize:'30px',verticalAlign:'sub'}}>·</span>11%</Text>
        // return <Text type="success" strong={true}><span style={{fontSize:'30px',verticalAlign:'sub'}}>·</span>11%</Text>
        return (
          <Text
            strong={true}
            style={{ color: record.deltaInPercentageColor || '' }}
          >
            <span style={{ fontSize: '30px', verticalAlign: 'sub' }}>·</span>
            {text}%
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
  const _getData = async () => {
    let params = {
      searchCondition: {
        filterGroup: {
          recordId: latestGroupIdRef.current,
        },
        listHeader: form.getFieldsValue(),
        deltaInPercentage,
      },
      pageIndex: current,
      pageSize: pageSize,
    };

    let res = await getIntergrityReportData(params);
    if (res.isSuccess) {
      setTableData(res.data);
      setTotal(res.totalCount);
    } else {
      message.error(res.msg);
    }

    // let delta=await getDeltaInPercent();
    // if(delta.isSuccess){
    //   setDeltaInPercentage(delta.data)
    // }
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
        setDiffData(res.data?.dataList || []);
        if (res.data?.monthList) {
          setMonths(
            res.data?.monthList.map((item, index) => {
              return {
                name: item,
                title: item,
                width: '120px',
                render: (text, record) => record?.monthOfBVI[index],
              };
            }),
          );
        } else {
          setMonths([]);
        }
        setDiffTotal(res.totalCount);
        setTotalSum(res.data?.monthOfTotalBVI || []);
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
  const exportExcelDiffAction = () => {
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

    deferenceDataExport(params).then((res: any) => {
      if (res.response.status == 200) {
        let elink = document.createElement('a');
        // 设置下载文件名
        elink.download = 'Difference Validation List.xlsx';
        elink.href = window.URL.createObjectURL(new Blob([res.response?.data]));
        elink.click();
        window.URL.revokeObjectURL(elink.href);
      } else {
        message.error(res.response.statusText);
      }
    });
  };
  return (
    <TabWrapDiv>
      <Tabs defaultActiveKey="1" type="card">
        <TabPane tab="Integrity Validation" key="1">
          <TableList
            headerSearch={_getData}
            form={form}
            data={tableData.map((item) => {
              return {
                ...item,
                key: Math.random(),
              };
            })}
            columns={orignalCols}
            total={total}
            onPageChange={onPageChange}
            changePageSize={changePageSize}
            current={current}
            search={isSearch}
            selection={false}
            scrollY={'calc(100vh - 509px)'}
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
              <>
                <span style={{ marginRight: '10px' }}>Delta in Value:</span>
                <InputNumber
                  value={deltaInPercentage}
                  min={0}
                  onChange={(val) => {
                    if (val === 0) {
                      setDeltaInPercentage(null);
                    } else {
                      setDeltaInPercentage(val);
                    }
                  }}
                />
                <span>%</span>
                <Divider
                  type="vertical"
                  style={{ height: '20px', borderColor: '#999' }}
                />
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
              </>
            }
          />
        </TabPane>
        <TabPane tab="Difference Validation" key="2">
          <TableList
            headerSearch={_getDiffData}
            form={diffForm}
            data={differenceData.map((item) => {
              return {
                ...item,
                key: Math.random(),
              };
            })}
            columns={originalColsSecond}
            total={diffTotal}
            scrollY={'calc(100vh - 509px)'}
            onPageChange={onDiffPageChange}
            changePageSize={changeDiffPageSize}
            current={diffCurrent}
            search={isDiffSearch}
            selection={false}
            listName="Validation Report"
            summary={(currentData) => (
              // <Table.Summary fixed>
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
                      <Table.Summary.Cell index={index} align="center">
                        {months.length &&
                        index > 3 &&
                        index <= 3 + months.length
                          ? totalSum[index - 4]
                          : ''}
                      </Table.Summary.Cell>
                    );
                  }
                })}
              </Table.Summary.Row>
              // </Table.Summary>
            )}
            renderFilterGroup={
              <FilterGroup
                moudleName="BVI Difference Report"
                onSearch={(val) => {
                  latestDiffGroupIdRef.current = val;
                  _getDiffData();
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
