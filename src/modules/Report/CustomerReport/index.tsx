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
  DatePicker,
  Upload,
  Checkbox,
  Modal,
  Tooltip
} from 'antd';
const { RangePicker } = DatePicker;
const { Option } = Select;
import React, { useEffect, useRef, useState } from 'react';
const { TabPane } = Tabs;

import noData from '@/assets/images/noData.png';
import ReactECharts from "echarts-for-react";
import * as echarts from 'echarts';
import {lastMonth} from "@/tools/validator/lastMonth"

import { isNull } from 'lodash';
import {
  BtnTextRedWrap,
  BtnBlueWrap,
  BtnGreenWrap,
  BtnOrangeWrap,
  BtnThemeWrap,
  TableTopDiv,
  TableTitleDiv,
  TaleTitleIconDiv,
  TableWrapDiv,
  ContentWrap, FilterGroupDiv
} from '@/assets/style';
import {
  DownOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
  UploadOutlined,
  ClearOutlined
} from '@ant-design/icons';
import TableList from '@/modules/components/TableMixInline';
import FilterGroup from '@/modules/components/FilterGroup';
import search from '@/assets/images/search.png';
import { TabWrapDiv,FilterGroupDivReport,ReactEChartsDiv,ReactEChartsDivWrap ,SelectAnt} from './style';
import {
  deferenceDataExport,
  exportIntergrityReport,
  getDiffData,
  getIntergrityReportData,
  detalInPercentageConfigQuery,
} from '@/app/request/apiValidReport';
import {
  CustomerReportQueryChartData,
  CustomerReportQueryListData,
  CustomerReportExportListData,
  CustomerReportImportListData,
  CustomerReportDeleteListData,
  CustomerReportQueryBVIData,
  CustomerReportQueryReportMonth
} from '@/app/request/apiCustomerReport';

const pageName = 'CustomerReport';
import { AuthWrapper, checkAuth } from '@/tools/authCheck';
import moment from 'moment';
const businesslineOptions = JSON.parse(sessionStorage.getItem('businessLines'));
const { Text } = Typography;
export default (props: any) => {
  const [tableData, setTableData] = useState([]);
  const [isSearch, setIsSearch] = useState(true);
  const [checkOriginalParam, setCheckOriginalParam] = useState({});
  const [checkData, setCheckData] = useState([]);
  const [total, setTotal] = useState(0);
  const [current, setCurrent] = useState(1);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [pageSize, setPageSize] = useState(20);
  const [componentDisabled, setComponentDisabled] = useState(false);
  const [showBviData, setShowBviData] = useState(false);
  const [showImport, setShowImport] = useState(false);
  const [form] = Form.useForm();
  const [formData] = Form.useForm();
  const [formImport] = Form.useForm();
  const [groupName, setGroupName] = useState('');
  //
  const [groupId, setGroupId] = useState('');
  const [orderField, setOrderField] = useState('modifiedDate');
  const [orderType, setOrderType] = useState('descend');
  const latestGroupIdRef = useRef<any>();
  const [showPro, setShowPro] = useState(false);
  const [proForm] = Form.useForm();
  const [proCurrent, setProCurrent] = useState(1);
  const [proSize, setProSize] = useState(20);
  const [productData, setProductData] = useState([]);
  const [proTotal, setProTotal] = useState(0);
  const [selectProKeys, setSelectProKeys] = useState([]);
  const [selectProductRow, setSelectProductRow] = useState([]);
  const [editListMark, setEditListMark] = useState(false);
  const [isP2PMark, setIsP2PMark] = useState(false);
  const [customerDivision, setCustomerDivision] = useState(''); //用于比对
  const [formDataEdit] = Form.useForm();
  const [isViewMark, setIsViewMark] = useState(false);
  // 针对costcenter数据
  const [showCostcenter, setShowCostcenter] = useState(false);
  const [costcenterData, setcostcenterData] = useState([]);
  const [costCenterVal, setCostCenterVal] = useState(''); //用于检索的字段
  const [customerDivisionVal, setCustomerDivisionVal] = useState(''); //用于检索的字段
  const [selectCostCenterkeys, setSelectCostCenterkeys] = useState([]);
  const [selectCostCenterRows, setSelectCostCenterRows] = useState([]); //选中的costcenter行
  const [costcenterCurrent, setCostCenterCurrent] = useState(1);
  const [costcenterPageSize, setCostcenterPageSize] = useState(20);
  const [costcenterTotal, setCostcenterTotal] = useState(0);
  const [first, setFirst] = useState(true);
  const [isCheckOriginal, setIsCheckOriginal] = useState(false);
  const [columns, setCols] = useState([]);
  const [business, setBusiness] = useState([businesslineOptions[0]]);
  const [businessDiff, setBusinessDiff] = useState([businesslineOptions[0]]);
  const [formSearch] = Form.useForm();
  const [FYDataOption, setFYDataOption] = useState(["FY2021","FY2022","FY2023"]);
  const [serverLineDataOption, setServerLineDataOption] = useState(["AR"]);
  const [productNameDataOption, setProductNameDataOption] = useState(["OneSRM Change Management"]);
  const [ReportMonthApiData, setReportMonthApiData] = useState([]);
  const [ReportMonth, setReportMonth] = useState([]);
  const [EchartsOption1,setEchartsOption1]=useState({
    grid: { top: 8, right: 8, bottom: 24, left: 36 },
    legend: {
      data:['销量']
    },
    xAxis: {
      type: 'category',
      data: [],
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        name:'BVI Volume',
        data: [200, 333, 700, 800, 900,900, 1290,200, 333, 700, 800, 900],
        type: 'line',
      }
    ],
    tooltip: {
      trigger: 'axis',
    },
  })
  const [EchartsOption2,setEchartsOption2]=useState({
    grid: { top: 8, right: 8, bottom: 24, left: 36 },
    legend: {
      data:['销量']
    },
    xAxis: {
      type: 'category',
      data: [],
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        name:'usage',
        data: [200, 333, 700, 800, 900,900, 1290,200, 333, 700, 800, 900],
        type: 'line',
        // smooth: true,
      },
      {
        name:'charge',
        data: [900, 222, 200, 333, 700, 800, 900,900, 222, 200, 333, 700],
        type: 'line',
        // smooth: true,
      },
    ],
    tooltip: {
      trigger: 'axis',
    },
  })
  // 
  useEffect(() => {
  
    formSearch.setFieldsValue({
      businessLine:
        businesslineOptions && businesslineOptions.length
          ? businesslineOptions[0]
          : null,
      fy:FYDataOption[0],
      // serverLine:serverLineDataOption[0],
      // productName:productNameDataOption[0]
    });
    QueryReportMonth()
    getChartData()
  }, [current, pageSize, orderField, orderType]);
  const QueryReportMonth=()=>{
    CustomerReportQueryReportMonth({}).then((res) => {
      if (res.isSuccess) {
        setReportMonthApiData(res.data)
        // setReportMonth([res.data[0]])
        console.log(ReportMonth)
        getData();
      } else {
        message.error(res.msg);
      }
    });
  }
  const getData = (recordId?: any) => {
    if (!business) {
      message.warning('Please select [BVI Bussiness Line]!'); //暂无权限提示
      return;
    }
    let params = {
      searchCondition: {
        filterGroup: {
          recordId: latestGroupIdRef.current,
        },
        listHeader: form.getFieldsValue(),
        userBusinessLineList: businessDiff,
        reportMonthList:
          ReportMonth,
      },
      orderCondition: {
        [orderField]: orderType == 'ascend' ? 0 : 1,
      },
      pageIndex: current,
      pageSize: pageSize,
    };

    CustomerReportQueryListData(params).then((res) => {
      if (res.isSuccess) {
        setTableData(res.data);
        setTotal(res.totalCount);
      } else {
        message.error(res.msg);
      }
    });
  };
  const onPageChange = (
    pagination,
    filters,
    { column, columnKey, field, order },
    { currentDataSource, action },
  ) => {
    //   翻页|排序|筛选
    switch (action) {
      case 'sort':
        setOrderField(field);
        setOrderType(order);
        break;
      default:
        setCurrent(pagination.current);
        break;
    }
  };
  const changePageSize = (val: number) => {
    setPageSize(val);
  };
  const exportExcelAction = () => {
    console.log(ReportMonth)
    if (!ReportMonth) {
      message.warning('Please select [Report Month]!'); 
      return;
    }
    if (!business) {
      message.warning('Please select [BVI Bussiness Line]!'); //暂无权限提示
      return;
    }
    let params = {
      searchCondition: {
        filterGroup: {
          recordId: latestGroupIdRef.current,
        },
        listHeader: form.getFieldsValue(),
        userBusinessLineList: businessDiff,
        reportMonthList: 
          ReportMonth
        ,
      },
      orderCondition: {
        [orderField]: orderType == 'ascend' ? 0 : 1,
      },
      current,
      pageSize: pageSize,
    };
    CustomerReportExportListData(params).then((res: any) => {
      let elink = document.createElement('a');
      // 设置下载文件名
      elink.download = 'Customer Report List.xlsx';
      elink.href = window.URL.createObjectURL(new Blob([res.response?.data]));
      elink.click();
      window.URL.revokeObjectURL(elink.href);
    });
  };
  const importExcel = (file) => {
    const fd = new FormData();
    fd.append('file', file);
    CustomerReportImportListData(fd).then((res) => {
      if (res.isSuccess) {
        message.success(res.msg);
        getData();
        setSelectedRowKeys([]);
      } else {
        message.error(res.msg);
      }
    });
  };
    // 删除接口
  const deleteInfos = (recordIdList: Array<any>, event) => {
    event.stopPropagation();
    CustomerReportDeleteListData({
      recordIdList,
    }).then((res) => {
      console.log(res)
      if (res.isSuccess) {
        message.success(res.msg);
        setSelectedRowKeys([]);
        getData();
        setCurrent(1);
      } else {
        message.error(res.msg);
      }
    });
  };
  // 
   const orignalCols = [
    {
      name: 'fiscalYear',
      title: 'Fiscal Year',
      width: '150px',
      sorter: true,
      titleRender: 'input',
    },
    {
      name: 'billingMonth',
      title: 'Billing Month',
      width: '150px',
      sorter: true,
      titleRender: 'input',
    },
    {
      name: 'calendarMonth',
      title: 'Calendar Month',
      width: '150px',
      sorter: true,
      titleRender: 'input',
    },
    {
      name: 'businessLine',
      title: 'Business Line',
      width: '150px',
      sorter: true,
      titleRender: 'input',
    },
    {
      name: 'serviceLine',
      title: 'ServiceLine',
      width: '150px',
      titleRender: 'input',
      sorter: true,
    },
    {
      name: 'senderProfitCenter',
      title: 'Sender Profit Center',
      width: '300px',
      titleRender: 'input',
      sorter: true,
    },
    {
      name: 'customerARE',
      title: 'Customer ARE',
      width: '200px',
      titleRender: 'input',
      sorter: true,
    },
    {
      name: 'customerCompanyCode',
      title: 'Customer Company Code',
      width: '200px',
      titleRender: 'input',
      sorter: true,
    },
    {
      name: 'customerDivision',
      title: 'Customer Division',
      width: '200px',
      titleRender: 'input',
      sorter: true,
    },
    {
      name: 'bu',
      title: 'BU',
      width: '200px',
      titleRender: 'input',
      sorter: true,
    },
    {
      name: 'customerCostCenter',
      title: 'Customer Cost Center',
      width: '200px',
      titleRender: 'input',
      sorter: true,
    },
    {
      name: 'productGSCCode',
      title: 'Product GSC Code',
      width: '200px',
      titleRender: 'input',
      sorter: true,
    },
    {
      name: 'productGSCDescription',
      title: 'Product GSC Description',
      width: '200px',
      titleRender: 'input',
      sorter: true,
    },
    {
      name: 'productName',
      title: 'Product Name',
      width: '200px',
      titleRender: 'input',
      sorter: true,
    },
    {
      name: 'productNameForReport',
      title: 'Product Name For Report',
      width: '200px',
      titleRender: 'input',
      sorter: true,
    },
    {
      name: 'bvi',
      title: 'BVI',
      width: '200px',
      sorter: true,
    },
    {
      name: 'bvI_YTD',
      title: 'BVI YTD',
      width: '200px',
      sorter: true,
    },
    {
      name: 'unitPrice',
      title: 'Unit Price',
      width: '200px',
      sorter: true,
    },
    {
      name: 'unitPriceCurrency',
      title: 'Unit Price Currency',
      width: '200px',
      titleRender: 'input',
      sorter: true,
    },
    {
      name: 'actualUsageCNYGoss',
      title: 'Actual Usage(In CNY) Goss',
      width: '200px',
      sorter: true,
    },
    
    {
      name: 'actualUsageCurrencyGoss',
      title: 'Actual Usage(In Unit Price Currency) Goss',
      width: '350px',
      sorter: true,
    },
    {
      name: 'actualChargeCNYGoss',
      title: 'Actual charge(In CNY) Goss',
      width: '200px',
      sorter: true,
    },
    {
      name: 'actualChargeCurrencyGoss',
      title: 'Actual charge(In Currency) Goss',
      width: '250px',
      sorter: true,
    },
    {
      name: 'billingCurrency',
      title: 'Billing Currency',
      width: '200px',
      titleRender: 'input',
      sorter: true,
    },
    {
      name: 'adjustTag',
      title: 'Adjust Tag',
      width: '100px',
      titleRender: 'input',
    },
    {
      name: 'isFlatCharge',
      title: 'Is Flat Charge',
      width: '100px',
      titleRender: 'input',
    },
    {
      name: 'comment',
      title: 'Comment',
      width: '200px',
      titleRender: 'input',
      sorter: true,
    },
    {
      name: 'reportMonth',
      title: 'Report Month',
      width: '200px',
      sorter: true,
    },
    {
      name: 'importTag',
      title: 'Import Tag',
      width: '200px',
      titleRender: 'input',
      sorter: true,
    }
  ];
  // const onReportMonthChange=(datestring)=>{
  //   setReportMonth(datestring)
  // }
  const _generateHead = (cols: any) => {
    let _columns = [];
    for (let _key in cols) {
      if (_key) {
        let start = _key[0];
        let end = _key.slice(1);
        let colKey = start + end;
        _columns.push({
          title: cols[_key],
          dataIndex: colKey,
          // width: '120px',
          key: colKey,
        });
      }
    }
    setCols(_columns);
  };
  const toCheckBVI=()=>{
    let params = {
      searchCondition: {
        recordIdList: selectedRowKeys
      },
      pageIndex: current,
      pageSize: pageSize,
    };
    CustomerReportQueryBVIData(params).then((res) => {
      if (res.isSuccess) {
        setIsCheckOriginal(true);
        setCheckData(res.data.body || []);
        _generateHead(res.data.header || []);
      } else {
        message.error(res.msg);
      }
    });
  }
  
  // Chart Report 

  const getChartData = (recordId?: any) => {
    formSearch
      .validateFields()
      .then((valid) => {
        let params = {
          searchCondition: {
            userBusinessLineList:business,
            pageTop: {
              fiscalYear: formSearch.getFieldValue("fy"),
              serviceLine: formSearch.getFieldValue("serverLine"),
              productName: formSearch.getFieldValue("productName")
            }
          }
        };
        CustomerReportQueryChartData(params).then((res) => {
          if (res.isSuccess) {
            const ChartOption1={...EchartsOption1}
            const ChartOption2={...EchartsOption2}
            ChartOption1.xAxis.data=res.data.option
            ChartOption1.series[0].data=res.data.bvi
            ChartOption2.xAxis.data=res.data.option
            ChartOption2.series[0].data=res.data.usage
            ChartOption2.series[1].data=res.data.charge
            setEchartsOption1({...ChartOption1})
            setEchartsOption2({...ChartOption2})
          } else {
            message.error(res.msg);
          }
        });
      })
      .catch((e) => {});
  };
  const checkOriginalOptions = {
    validationMsg: '100px',
    productName: '200px',
  };
  return (
    <TabWrapDiv>
        {/* 查看bvi */}
        <Modal
          maskClosable={false}
          title={
            <TableTopDiv style={{ margin: 0 }}>
              <TableTitleDiv style={{ float: 'left' }}>
                <TaleTitleIconDiv>
                  <span></span>
                </TaleTitleIconDiv>
                <span style={{ verticalAlign: 'middle', fontSize: '20px' }}>
                  Check BVI List
                </span>
              </TableTitleDiv>
            </TableTopDiv>
          }
          width="1300px"
          visible={isCheckOriginal}
          footer={null}
          onCancel={() => setIsCheckOriginal(false)}
        >
        <TableWrapDiv>
          <Table
            columns={columns?.map((_item) => {
              return {
                ..._item,
                fixed: _item.dataIndex == 'validationMsg' ? 'right' : null,
                align: 'center',
                width: checkOriginalOptions[_item.dataIndex] || '100px',
                render: (text) => {
                  if (_item.dataIndex == 'validationMsg') {
                    return (
                      <p style={{ color: 'red', textAlign: 'left' }}>{text}</p>
                    );
                  } else if (
                    _item.dataIndex == 'postingDate' ||
                    _item.dataIndex == 'entryDate' ||
                    _item.dataIndex == 'documentDate' ||
                    _item.dataIndex == 'netDueDate' ||
                    _item.dataIndex == 'billingDate'
                  ) {
                    return moment(text).format('YYYY-MM-DD');
                  } else {
                    return text;
                  }
                },
              };
            })}
            rowClassName={(record, index) => (index % 2 == 0 ? '' : 'stripe')}
            dataSource={checkData}
            rowKey="id"
            pagination={false}
            scroll={{ x: 3000, y: 'calc(100vh - 390px)' }}
          />
        </TableWrapDiv>
      </Modal>
      <Tabs defaultActiveKey="1" type="card">
        <TabPane tab="Chart Report" key="1">
            <AuthWrapper functionName={pageName} authCode={[
              `${pageName}-View`,
              `${pageName}-Edit`,
            ]}>
              <FilterGroupDivReport>
              <Form form={formSearch} labelCol={{ flex: '120px' }}>
                <Row className="importData">
                  <Col span={10}>
                    <Form.Item
                      label="FY"
                      name="fy"
                    >
                      <Select>
                        {FYDataOption.map((item, index) => (
                          <Select.Option key={index} value={item}>
                            {item}
                          </Select.Option>
                        ))}
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col span={10}>
                    <Form.Item
                      label="Business Line"
                      name="businessLine"
                    >
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
                    </Form.Item>
                  </Col>
                  <Col span={4}>
                    <Form.Item style={{ textAlign: 'right' }}>
                      <Space>
                        <Tooltip title="Clear">
                          <Button
                            icon={<ClearOutlined />}
                            onClick={() => {
                              formSearch.resetFields()
                            }}
                          ></Button>
                        </Tooltip>
                        <Button
                          type="primary"
                          icon={<i className="gbs gbs-search"></i>}
                          onClick={getChartData}
                        ></Button>
                      </Space>
                    </Form.Item>
                  </Col>
                  <Col span={10}>
                    <Form.Item
                      label="Service Line"
                      name="serverLine"
                    >
                      <Select>
                        {serverLineDataOption.map((item, index) => (
                          <Select.Option key={index} value={item}>
                            {item}
                          </Select.Option>
                        ))}
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col span={10}>
                    <Form.Item
                      label="Product Name"
                      name="productName"
                    >
                      <Select>
                        {productNameDataOption.map((item, index) => (
                          <Select.Option key={index} value={item}>
                            {item}
                          </Select.Option>
                        ))}
                      </Select>
                    </Form.Item>
                  </Col>
                  
                </Row>
              </Form>
              </FilterGroupDivReport>
            </AuthWrapper>
            <ReactEChartsDiv>
              <div className='ReactChart'>
                <ReactEChartsDivWrap>
                  <label>BVI Volume</label>
                  <ReactECharts
                    echarts={echarts}
                    option={EchartsOption1}
                    notMerge={true}
                    lazyUpdate={true}
                    style={{ height: 400 }}
                    opts={{ locale: 'FR' }}
                    key={Date.now()}
                  />
                </ReactEChartsDivWrap>
                <ReactEChartsDivWrap>
                  <label>Usage&Charge</label>
                  <ReactECharts
                    echarts={echarts}
                    option={EchartsOption2}
                    notMerge={true}
                    lazyUpdate={true}
                    style={{ height: 400 }}
                    opts={{ locale: 'FR' }}
                    key={Date.now()+1}
                  />
                </ReactEChartsDivWrap>
              </div>
            </ReactEChartsDiv>
          
        </TabPane>
        <TabPane tab="Report List" key="2">
        <TableList
        data={tableData}
        headerSearch={getData}
        form={form}
        columns={orignalCols}
        total={total}
        // rowClick={(record) => rowClick(record)}
        scrollY={'calc(100vh - 510px)'}
        onPageChange={onPageChange}
        selectedRowKeys={selectedRowKeys}
        onChange={(_selectedRowKeys, _selectedRows) => {
          setSelectedRowKeys(_selectedRowKeys);
          setSelectedRows(_selectedRows);
        }}
        changePageSize={changePageSize}
        current={current}
        search={isSearch}
        rowKey="id"
        listName="Customer Report"
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
                  {businesslineOptions?.map((item, index) => (
                    <Select.Option key={index} value={item}>
                      {item}
                    </Select.Option>
                  ))}
                </Select>
              </>
            }
            moudleName="Customer Report"
            authPagename={pageName}
            onSearch={(val) => {
              latestGroupIdRef.current = val;
              // getData(val);
              if (current != 1) {
                setCurrent(1);
              } else {
                getData(val);
              }
            }}
            onClear={() => {
              latestGroupIdRef.current = '';
              form.resetFields();
              if (current != 1) {
                setCurrent(1);
              } else {
                getData();
              }
            }}
            exportAction={exportExcelAction}
          />
        }
        renderBtns={
          <>
            
              <Space>
                <BtnThemeWrap>
                  <SelectAnt>
                  <label>Report Month : </label>
                   <Select 
                        mode="multiple"
                        onChange={(val) => {
                          setReportMonth(val)
                        }
                        } 
                        value={ReportMonth}
                        style={{ width: 200 }}>
                     {
                       ReportMonthApiData.map((item,index)=>{
                        return (
                          <Option value={item} key={index}>{item}</Option>
                        )
                       })
                     }
                    </Select>
                    </SelectAnt>
                </BtnThemeWrap>
                <AuthWrapper functionName={pageName} authCode={`${pageName}-Edit`}>
                  <Space>
                <Divider
                  type="vertical"
                  style={{ height: '20px', borderColor: '#999' }}
                />
                <BtnOrangeWrap>
                  <Button
                    disabled={!selectedRowKeys.length}
                    onClick={toCheckBVI}
                  >
                    Check BVI
                  </Button>
                </BtnOrangeWrap>
                <BtnGreenWrap>
                  <Button
                    disabled={!selectedRowKeys.length}
                    onClick={() => {
                      Modal.confirm({
                        title: 'Tips',
                        icon: <ExclamationCircleOutlined />,
                        content: 'Confirm delete selected data?',
                        okText: 'Confirm',
                        cancelText: 'Cancel',
                        onOk: () => {

                            deleteInfos(selectedRowKeys, event);

                        },
                        centered: true,
                      });
                    }}
                  >
                    Delete
                  </Button>
                </BtnGreenWrap>
                <Divider
                  type="vertical"
                  style={{ height: '20px', borderColor: '#999' }}
                />
                <BtnThemeWrap>
                    <Upload
                      style={{ margin: '0 10px' }}
                      maxCount={1}
                      showUploadList={false}
                      accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel"
                      beforeUpload={(file) => {
                        importExcel(file);
                        return false;
                      }}
                    >
                      <Button key="import" type="text">
                        <span>Import</span>
                      </Button>
                    </Upload>
                </BtnThemeWrap>
                <Button
                >
                  <a href="./template/Customer Report Template.xlsx">Download Template</a>
                </Button>
                </Space>
                </AuthWrapper>
              </Space>

            <Space>
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
            </Space>
          </>
        }
      />
        </TabPane>
      </Tabs>
    </TabWrapDiv>
  );
};




