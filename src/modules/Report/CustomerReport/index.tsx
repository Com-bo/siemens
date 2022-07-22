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
  Modal
} from 'antd';
const { RangePicker } = DatePicker;
const { Option } = Select;
import React, { useEffect, useRef, useState } from 'react';
const { TabPane } = Tabs;

import noData from '@/assets/images/noData.png';
import ReactECharts from "echarts-for-react";
import * as echarts from 'echarts';

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
} from '@ant-design/icons';
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
import {
  CustomerReportQueryChartData,
  CustomerReportQueryListData,
  CustomerReportExportListData,
  CustomerReportImportListData,
  CustomerReportDeleteListData,
  CustomerReportQueryBVIData,
} from '@/app/request/apiCustomerReport';

import { AuthWrapper, checkAuth } from '@/tools/authCheck';
import moment from 'moment';
const businesslineOptions = JSON.parse(sessionStorage.getItem('businessLines'));
const pageName = 'BVIValidationReport';
const { Text } = Typography;
export default (props: any) => {
  const [tableData, setTableData] = useState([]);
  const [isSearch, setIsSearch] = useState(true);
  const [isCheckOriginal, setIsCheckOriginal] = useState(false);
  const [checkOriginalParam, setCheckOriginalParam] = useState({});
  const [checkData, setCheckData] = useState([]);
  const [columns, setCols] = useState([]);
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
  const [business, setBusiness] = useState(businesslineOptions[0]);
  const [formSearch] = Form.useForm();
  const [FYDataOption, setFYDataOption] = useState(["FY2021","FY2022","FY2023"]);
  const [serverLineDataOption, setServerLineDataOption] = useState(["AR"]);
  const [productNameDataOption, setProductNameDataOption] = useState(["OneSRM Change Management"]);
  const [EchartsOption,setEchartsOption]=useState({
    // title: {
    //   text: 'BVI Volume'
    // },
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
  })
  // 
  useEffect(() => {
    formSearch.setFieldsValue({
      businessLine:
        businesslineOptions && businesslineOptions.length
          ? businesslineOptions[0]
          : null,
      fy:FYDataOption[0],
      serverLine:serverLineDataOption[0],
      productName:productNameDataOption[0]
    });
    getData();
    getChartData()
  }, [current, pageSize, orderField, orderType, business]);
  const getData = (recordId?: any) => {
    // const params = {
    //   pageIndex: current,
    //   current,
    //   pageSize,
    //   ...form.getFieldsValue(),
    // };
    // if (conditions) {
    //   params.groupId = conditions.groupId || null;
    // }
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
        userBusinessLineList: [business],
        reportMonthList:[
          "202206"
        ],
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
        userBusinessLineList: [business],
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
      name: 'actualChargeCNYGoss',
      title: 'Actual charge(In CNY) Goss',
      width: '200px',
      sorter: true,
    },
    {
      name: 'actualChargeCurrencyGoss',
      title: 'Actual charge(In Currency) Goss',
      width: '220px',
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
      title: 'Actual Usage(In Currency) Goss',
      width: '220px',
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
      title: 'AdjustTag',
      width: '100px',
      titleRender: 'input',
    },
    {
      name: 'isFlatCharge',
      title: 'isFlatCharge',
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
      name: 'importTag',
      title: 'Import Tag',
      width: '200px',
      titleRender: 'input',
      sorter: true,
    }
  ];


  // Chart Report 

  const getChartData = (recordId?: any) => {
    formSearch
      .validateFields()
      .then((valid) => {
        let params = {
          searchCondition: {
            userBusinessLineList:
              [formSearch.getFieldValue("businessLine")],
            pageTop: {
              fiscalYear: formSearch.getFieldValue("fy"),
              serviceLine: formSearch.getFieldValue("serverLine"),
              productName: formSearch.getFieldValue("productName")
            }
          }
        };
        CustomerReportQueryChartData(params).then((res) => {
          if (res.isSuccess) {
            const ChartOption={...EchartsOption}
            ChartOption.xAxis.data=res.data.option
            setEchartsOption(ChartOption)
            console.log(EchartsOption)
          } else {
            message.error(res.msg);
          }
        });
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
                      {FYDataOption.map((item, index) => (
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
                        value={business}
                        onChange={(val) => {
                          console.log(val)
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
                  <Form.Item
                    label="Server Line"
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
                <Col span={4}>
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
                <Col span={4}>
                  <Form.Item>
                    <Space>
                      <Button
                        type="primary"
                        icon={<i className="gbs gbs-search"></i>}
                        onClick={getChartData}
                      ></Button>
                    </Space>
                  </Form.Item>
                </Col>
              </Row>
            </Form>
            {/* <Space> */}
              <ReactECharts
                option={EchartsOption}
                echarts={echarts}
                style={{ height: 400 }}
                opts={{ locale: 'FR' }}
              />
            {/* </Space> */}
          </FilterGroupDiv>
        </TabPane>
        <TabPane tab="Report List" key="2">
        <TableList
        data={tableData}
        headerSearch={getData}
        form={form}
        columns={orignalCols}
        total={total}
        // rowClick={(record) => rowClick(record)}
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
        listName="Data Management"
        renderFilterGroup={
          <FilterGroup
            businessLineRender={
              <>
                <label>BVI Business Line:</label>
                <Select
                  placeholder="Please select"
                  value={business}
                  onChange={(val) => {
                    setBusiness(val);
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
            moudleName=""
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
            <AuthWrapper functionName={pageName} authCode={`${pageName}-Edit`}>
              <Space>
                <BtnOrangeWrap>
                  <Button
                    disabled={!selectedRowKeys.length}
                    // onClick={toRecheck}
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
                <label>Report Month</label>
                <DatePicker
                  disabled={false}
                  picker="month"
                  format="YYYYMM"
                  style={{ width: '100px' }}
                />
                </BtnThemeWrap>
        
                <BtnThemeWrap>
                  <Button
                    disabled={selectedRowKeys.length !== 1}
                    // onClick={copyData}
                  >
                    Export
                  </Button>
                </BtnThemeWrap>
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




