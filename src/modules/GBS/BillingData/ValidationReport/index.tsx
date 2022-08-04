import {
  Button,
  Divider,
  Form,
  InputNumber,
  message,
  Select,
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
  //
  BillingIntegrityDataQuery,
  BillingIntegrityDataExport,
  BillingDeferenceDataQuery,
  BillingDeferenceDataExport,
  BillingDetalInPercentageConfigQuery,
} from '@/app/request/apiValidReport';
import moment from 'moment';
const pageName = 'BillingValidationReport';
const businesslineOptions = JSON.parse(sessionStorage.getItem('businessLines'));
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
  const [deltaTotal, setDeltaTotal] = useState(0);
  const [totalSum, setTotalSum] = useState([]);
  const [deltaInPercentage, setDeltaInPercentage] = useState({
    percentage: 0,
    plusColorCode: '',
    minusColorCode: '',
  });
  const [first, setFirst] = useState(true);
  const [business, setBusiness] = useState([businesslineOptions[0]]);
  const [businessDiff, setBusinessDiff] = useState([businesslineOptions[0]]);
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
      name: 'systemTagOfBilling',
      title: 'System Tag of Billing',
      width: '180px',
      titleRender: 'input',
    },
    {
      name: 'isThereBilling',
      title: 'Is There Billing',
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
      name: 'billingMonth',
      title: 'Billing Month',
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
      fixed: 'left',
    },
    {
      name: 'are',
      title: 'ARE',
      width: '120px',
      titleRender: 'input',
      fixed: 'left',
    },
    {
      name: 'customerDivision',
      title: 'Customer Division',
      width: '120px',
      titleRender: 'input',
      fixed: 'left',
    },
    {
      name: 'productName',
      title: 'Product Name',
      width: '200px',
      titleRender: 'input',
      fixed: 'left',
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
    if (first) {
      BillingDetalInPercentageConfigQuery().then((res) => {
        if (res.isSuccess) {
          // 默认配置
          setDeltaInPercentage(res.data);
          _getDiffData(res.data);
        } else {
          console.error(res.msg);
        }
      });
    } else {
      setFirst(false);
      _getDiffData();
    }
  }, [diffCurrent, diffPageSize]);
  const latestDiffGroupIdRef = useRef<any>();
  const latestGroupIdRef = useRef<any>();
  const _getData = async () => {
    if (!business || !business.length) {
      message.warning('Please select [Bussiness Line]!'); //暂无权限提示
      return;
    }
    let params = {
      searchCondition: {
        filterGroup: {
          recordId: latestGroupIdRef.current,
        },
        listHeader: form.getFieldsValue(),
        userBusinessLineList: business,
      },
      pageIndex: current,
      pageSize: pageSize,
    };

    let res = await BillingIntegrityDataQuery(params);
    if (res.isSuccess) {
      setTableData(res.data);
      setTotal(res.totalCount);
    } else {
      message.error(res.msg);
    }
  };
  const _getDiffData = (deltaParam?: {
    percentage: number;
    plusColorCode: string;
    minusColorCode: string;
  }) => {
    if (!businessDiff || !businessDiff.length) {
      message.warning('Please select [Bussiness Line]!'); //暂无权限提示
      return;
    }
    let _deltaInPercentage = {};
    if (deltaParam) {
      _deltaInPercentage = deltaParam;
    } else {
      _deltaInPercentage = deltaInPercentage;
    }
    let params = {
      searchCondition: {
        filterGroup: {
          recordId: latestDiffGroupIdRef.current,
        },
        listHeader: diffForm.getFieldsValue(),
        deltaInPercentage: _deltaInPercentage,
        userBusinessLineList: businessDiff,
      },
      pageIndex: diffCurrent,
      pageSize: diffPageSize,
    };
    BillingDeferenceDataQuery(params).then((res) => {
      if (res.isSuccess) {
        setDiffData(res.data?.dataList || []);
        if (res.data?.monthList) {
          setMonths(
            res.data?.monthList.map((item, index) => {
              return {
                name: item,
                title: item,
                width: '120px',
                render: (text, record) => record?.monthOfTotalAmout[index],
              };
            }),
          );
          setDeltaTotal(res.data.deltaTotal);
        } else {
          setMonths([]);
        }
        setDiffTotal(res.totalCount);
        setTotalSum(res.data?.monthOfSummaryTotalAmout || []);
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

    BillingIntegrityDataExport(params).then((res: any) => {
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
        deltaInPercentage,
      },
      pageIndex: diffCurrent,
      pageSize: diffPageSize,
    };

    BillingDeferenceDataExport(params).then((res: any) => {
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
                businessLineRender={
                  <>
                    <label>Business Line:</label>
                    <Select
                      placeholder="Please select"
                      mode="multiple"
                      value={business}
                      onChange={(val) => {
                        setBusiness(val);
                      }}
                    >
                      {businesslineOptions.map((item, index) => (
                        <Select.Option key={index} value={item}>
                          {item}
                        </Select.Option>
                      ))}
                    </Select>
                  </>
                }
                moudleName="Billing Integrity Report"
                authPagename={pageName}
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
                  if (item.name == 'delta') {
                    return (
                      <Table.Summary.Cell
                        index={originalColsSecond.length - 1}
                        align="center"
                      >
                        {deltaTotal}
                      </Table.Summary.Cell>
                    );
                  }
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
                businessLineRender={
                  <>
                    <label>Business Line:</label>
                    <Select
                      placeholder="Please select"
                      mode="multiple"
                      value={businessDiff}
                      onChange={(val) => {
                        setBusinessDiff(val);
                      }}
                    >
                      {businesslineOptions.map((item, index) => (
                        <Select.Option key={index} value={item}>
                          {item}
                        </Select.Option>
                      ))}
                    </Select>
                  </>
                }
                moudleName="Billing Difference Report"
                authPagename={pageName}
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
              <>
                <span style={{ marginRight: '10px' }}>Delta in Value:</span>
                <InputNumber
                  value={deltaInPercentage.percentage}
                  min={0}
                  onChange={(val) => {
                    if (val === 0) {
                      setDeltaInPercentage({
                        ...deltaInPercentage,
                        percentage: null,
                      });
                    } else {
                      setDeltaInPercentage({
                        ...deltaInPercentage,
                        percentage: val,
                      });
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
                  onClick={() => setIsDiffSearch(!isDiffSearch)}
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
      </Tabs>
    </TabWrapDiv>
  );
};
