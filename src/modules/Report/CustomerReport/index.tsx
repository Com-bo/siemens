import {
  Button,
  Divider,
  Form,
  InputNumber,
  message,
  Select,
  Table,
  Tabs,
  Row,
  Col,
  Space,
  Typography,
} from 'antd';
const { Option } = Select;
import React, { useEffect, useRef, useState } from 'react';
const { TabPane } = Tabs;

import noData from '@/assets/images/noData.png';
import ReactECharts from "echarts-for-react";
import * as echarts from 'echarts';

import { isNull } from 'lodash';

import TableList from '@/modules/components/TableMixInline';
import FilterGroup from '@/modules/components/FilterGroup';
import search from '@/assets/images/search.png';
import { TabWrapDiv } from './style';
import {
  deferenceDataExport,
  exportIntergrityReport,
  getDiffData,
  getIntergrityReportData,
  detalInPercentageConfigQuery,
} from '@/app/request/apiValidReport';
import { ContentWrap, FilterGroupDiv } from '@/assets/style';
import { AuthWrapper, checkAuth } from '@/tools/authCheck';
import moment from 'moment';
const businesslineOptions = JSON.parse(sessionStorage.getItem('businessLines'));
const pageName = 'BVIValidationReport';
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

  // 
  const [formSearch] = Form.useForm();

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
      // titleRender: 'input',
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
  const option = {
    // title: {
    //   text: 'BVI Volume'
    // },
    grid: { top: 8, right: 8, bottom: 24, left: 36 },
    legend: {
      data:['销量']
    },
    xAxis: {
      type: 'category',
      data: ['Oct.', 'Nov.', 'Dec.', 'Jan.', 'Feb.', 'Mar.', 'Apr.',"May.","Jun.","Jul.","Aug.","Sept."],
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        name:'line1',
        data: [200, 333, 700, 800, 900,900, 1290,200, 333, 700, 800, 900],
        type: 'line',
        // smooth: true,
      },
      {
        name:'line2',
        data: [900, 222, 200, 333, 700, 800, 900,900, 222, 200, 333, 700],
        type: 'line',
        // smooth: true,
      },
    ],
    tooltip: {
      trigger: 'axis',
    },
  };
  useEffect(() => {
    _getData();
  }, [current, pageSize]);
  useEffect(() => {
    if (first) {
      detalInPercentageConfigQuery().then((res) => {
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
      message.warning('Please select [BVI Bussiness Line]!');
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

    let res = await getIntergrityReportData(params);
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
      message.warning('Please select [BVI Bussiness Line]!'); //暂无权限提示
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
          setDeltaTotal(res.data.deltaTotal);
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
    setCurrent(1);
    setPageSize(val);
  };
  const changeDiffPageSize = (val: number) => {
    setDiffCurrent(1);
    setDiffPageSize(val);
  };
  const exportExcelAction = () => {
    if (!business || !business.length) {
      message.warning('Please select [Bussiness Line]!');
      return;
    }
    let params = {
      searchCondition: {
        filterGroup: {
          recordId: latestGroupIdRef.current,
        },
        userBusinessLineList: business,
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
    if (!businessDiff || !businessDiff.length) {
      message.warning('Please select [Bussiness Line]!'); //暂无权限提示
      return;
    }
    let params = {
      searchCondition: {
        filterGroup: {
          recordId: latestDiffGroupIdRef.current,
        },
        userBusinessLineList: businessDiff,
        listHeader: diffForm.getFieldsValue(),
        deltaInPercentage,
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
  const templateTypeData = [
    { value: 'BVI Manual Template', label: 'BVI Manual Template' },
    { value: 'R2R MD Import Template', label: 'R2R MD Import Template' },
    { value: 'H2R BVI Template', label: 'H2R BVI Template' },
    { value: 'H2R T&E BVI Template', label: 'H2R T&E BVI Template' },
    { value: 'H2R GMM Template', label: 'H2R GMM Template' },
    { value: 'O2C BVI Template', label: 'O2C BVI Template' },
    { value: 'O2C TI BVI Template', label: 'O2C TI BVI Template' },
    { value: 'P2P BCS Template', label: 'P2P BCS Template' },
  ];
  const renderOption = (fieldList) => {
    const options = [];
    fieldList.map((item, index) => {
      options.push(
        <Option key={index} value={item.value}>
          {item.label}
        </Option>,
      );
    });
    return options;
  };
  const getData = (recordId?: any) => {
    formSearch
      .validateFields()
      .then((valid) => {
        let startDate = '';
        let endDate = '';
        let uploadDate = formSearch.getFieldValue('uploadDate');
        if (uploadDate && uploadDate.length) {
          startDate = uploadDate[0];
          endDate = uploadDate[1];
        }
        let params = {
          businessLine: formSearch.getFieldValue('businessLine'),
          templateType: formSearch.getFieldValue('templateType'),
          startUploadDate: startDate,
          endUploadDate: endDate,
          uploadUser: formSearch.getFieldValue('uploadUser'),
          pageIndex: current,
          pageSize: pageSize,
        };
        // QueryImportLog(params).then((res) => {
        //   if (res.isSuccess) {
        //     setTableData(res.data);
        //     setTotal(res.totalCount);
        //   } else {
        //     message.error(res.msg);
        //   }
        // });
      })
      .catch((e) => {});
  };
  return (
    <TabWrapDiv>
      <Tabs defaultActiveKey="1" type="card">
        <TabPane tab="Chart Report" key="1">
          <FilterGroupDiv >
            <Form form={formSearch}>
              <Row className="importData"  justify="start">
                <Col span={4}>
                  <Form.Item
                    label="FY"
                    name="fy"
                  >
                    <Select>
                      {businesslineOptions.map((item, index) => (
                        <Select.Option key={index} value={item}>
                          {item}
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={4}>
                  <Form.Item
                    label="Business Line"
                    name="businessLine"
                  >
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
                  </Form.Item>
                </Col>
                <Col span={4}>
                  <Form.Item
                    label="Server Line"
                    name="serverLine"
                  >
                    <Select>
                      {businesslineOptions.map((item, index) => (
                        <Select.Option key={index} value={item}>
                          {item}
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={4}>
                  <Form.Item
                    label="Product Name"
                    name="productName"
                  >
                    <Select>
                      {businesslineOptions.map((item, index) => (
                        <Select.Option key={index} value={item}>
                          {item}
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={4}>
                  <Form.Item>
                    <Space>
                      <Button
                        type="primary"
                        icon={<i className="gbs gbs-search"></i>}
                        onClick={getData}
                      ></Button>
                    </Space>
                  </Form.Item>
                </Col>
              </Row>
            </Form>
            {/* <Space> */}
              <ReactECharts
                option={option}
                echarts={echarts}
                style={{ height: 400 }}
                opts={{ locale: 'FR' }}
              />
              <ReactECharts
                option={option}
                echarts={echarts}
                style={{ height: 400 }}
                opts={{ locale: 'FR' }}
              />
            {/* </Space> */}
          </FilterGroupDiv>
        </TabPane>
        <TabPane tab="Report List" key="2">
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
              // listName="Validation Report"
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
                  moudleName="BVI Difference Report"
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
                   <Button
                    // disabled={!selectedRowKeys.length}
                    // onClick={toRecheck}
                  >
                    Check BVI
                  </Button>
                   <Button
                    // disabled={!selectedRowKeys.length}
                    // onClick={toRecheck}
                  >
                    Delete
                  </Button>
                   <Button
                    // disabled={!selectedRowKeys.length}
                    // onClick={toRecheck}
                  >
                    Export
                  </Button>
                   <Button
                    // disabled={!selectedRowKeys.length}
                    // onClick={toRecheck}
                  >
                    Import
                  </Button>
                   <Button
                    // disabled={!selectedRowKeys.length}
                    // onClick={toRecheck}
                  >
                    Download Template
                  </Button>

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




