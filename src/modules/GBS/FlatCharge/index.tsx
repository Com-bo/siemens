import React, { useEffect, useRef, useState } from 'react';
import TableList from '@/modules/components/TableMixInline';
import {
  Button,
  Checkbox,
  Col,
  DatePicker,
  Divider,
  Dropdown,
  Form,
  Input,
  InputNumber,
  Menu,
  message,
  Modal,
  Popconfirm,
  Radio,
  Row,
  Select,
  Space,
  Table,
  Tooltip,
  Upload,
} from 'antd';
import {
  DownOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons';
import {
  BtnTextRedWrap,
  BtnThemeWrap,
  ContentWrap,
  TableTitleDiv,
  TableTopDiv,
  TableWrapDiv,
  TaleTitleIconDiv,
} from '@/assets/style';
import search from '@/assets/images/search.png';
import FilterGroup from '@/modules/components/FilterGroup';
import TableMix from '@/components/Table';
import {
  deleteData,
  getFlatChargeData,
  submitMulti,
  copyData,
  logDataQuery,
  importFlatData,
  getProductData,
  exportExcel,
  queryBVIData,
  editDataSave,
  editDataSubmit,
  RecheckDataFlatCharge,
} from '@/app/request/apiFlat';
import './style.less';
import { AuthWrapper, checkAuth } from '@/tools/authCheck';
import moment from 'moment';
import { getCompanyCodeDrop, ProductPoDrop } from '@/app/request/common';
import { getCostCenterData } from '@/app/request/apiCostCenter';
import DebounceSelect from '@/components/Select/debounceSelect';
const businesslineOptions = JSON.parse(sessionStorage.getItem('businessLines'));
const pageName = 'FlatCharge';
export default (props: any) => {
  const [tableData, setTableData] = useState([]);
  const [isSearch, setIsSearch] = useState(true);
  const [total, setTotal] = useState(0);
  const [current, setCurrent] = useState(1);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [pageSize, setPageSize] = useState(20);
  const [showLog, setShowLog] = useState(false);
  const [logData, setLogData] = useState([]);
  const [logSize, setLogSize] = useState(20);
  const [logCurrent, setLogCurrent] = useState(1);
  const [logTotal, setLogTotal] = useState(0);
  const [logId, setLogId] = useState('');
  const [showFlatData, setShowFlatData] = useState(false);
  const [form] = Form.useForm();
  const [formData] = Form.useForm();
  const [proForm] = Form.useForm();
  const [componentDisabled, setComponentDisabled] = useState(false);
  const [productData, setProductData] = useState([]);
  const [proSize, setProSize] = useState(20);
  const [proCurrent, setProCurrent] = useState(1);
  const [proTotal, setProTotal] = useState(0);
  const [showPro, setShowPro] = useState(false);
  const [isCheckOriginal, setIsCheckOriginal] = useState(false);
  const [checkData, setCheckData] = useState([]);
  const [selectProKeys, setSelectProKeys] = useState([]);
  const [selectProductRow, setSelectProductRow] = useState([]);
  const [customerDivision, setCustomerDivision] = useState(''); //用于比对
  const [errorChecked, setErrorChecked] = useState(false);
  const [orderField, setOrderField] = useState('modifiedDate');
  const [orderType, setOrderType] = useState('descend');
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
  const [business, setBusiness] = useState(businesslineOptions[0]);
  // 多选
  const [isSelectAll, setIsSelectAll] = useState(false);
  const costcenterCols: any = [
    {
      title: 'Cost Center',
      dataIndex: 'costCenter',
      key: 'costCenter',
    },
    {
      dataIndex: 'companyCode',
      title: 'CompanyCode',
      key: 'CompanyCode',
    },
    {
      title: 'CustomerDivision',
      dataIndex: 'custemerDivision',
      key: 'custemerDivision',
    },
  ];

  const orignalCols = [
    {
      name: 'dataStatus',
      title: 'Status',
      width: '150px',
      titleRender: 'input',
      sorter: true,
    },
    {
      name: 'startMonth',
      title: 'Start Month',
      width: '150px',
      sorter: true,
      // titleRender: 'input'
    },
    {
      name: 'endMonth',
      title: 'End Month',
      width: '150px',
      sorter: true,
      // titleRender: 'input'
    },
    {
      name: 'are',
      title: 'ARE',
      width: '100px',
      titleRender: 'input',
      sorter: true,
    },
    {
      name: 'companyCode',
      title: 'Company Code',
      width: '150px',
      titleRender: 'input',
      sorter: true,
    },
    {
      name: 'customerDivision',
      title: 'Customer Division',
      width: '150px',
      titleRender: 'input',
      sorter: true,
    },
    {
      name: 'product',
      title: 'Product Name',
      width: '200px',
      titleRender: 'input',
      sorter: true,
    },
    {
      name: 'costCenter',
      title: 'Cost Center',
      width: '120px',
      titleRender: 'input',
      sorter: true,
    },
    {
      name: 'totalAmount',
      title: 'Total Amount',
      width: '140px',
      sorter: true,
      render: (text, record) => {
        if (record?.validationMsg) {
          return (
            <Tooltip title={record.validationMsg}>
              <BtnTextRedWrap color="red">
                <Button type="text" icon={<ExclamationCircleOutlined />}>
                  {text || '_'}
                </Button>
              </BtnTextRedWrap>
            </Tooltip>
          );
        }
        // 行内数据展示，暂时不用加权限，因为i没有view权限，列表数据按 逻辑其实不可能有，为了谨慎起见，还是加了行内调用接口的屏蔽
        return text ? (
          <Button
            type="link"
            onClick={(event) => {
              // view权限或者edit权限
              if (
                checkAuth(pageName, [`${pageName}-Edit`, `${pageName}-View`])
              ) {
                event.stopPropagation();
                queryBVIData({ recordId: record.orgId }).then((res) => {
                  if (res.isSuccess) {
                    setCheckData(res.data);
                    setIsCheckOriginal(true);
                  } else {
                    message.error(res.msg);
                  }
                });
              } else {
                message.warning('No permission temporarily');
              }
            }}
          >
            <span style={{ textDecoration: 'underline' }}>{text}</span>
          </Button>
        ) : (
          text
        );
      },
    },
    {
      name: 'po',
      title: 'PO',
      width: '180px',
      titleRender: 'input',
      sorter: true,
    },
    {
      name: 'comment',
      title: 'Comment',
      width: '200px',
      titleRender: 'input',
    },
    {
      name: 'chargeType',
      title: 'ChargeType',
      width: '200px',
      titleRender: 'input',
      sorter: true,
    },
    {
      name: 'system',
      title: 'System',
      width: '120px',
      titleRender: 'input',
      sorter: true,
    },
    {
      name: 'templateType',
      title: 'Template Type',
      width: '150px',
      titleRender: 'input',
      sorter: true,
    },

    {
      name: 'modifiedDate',
      title: 'Modified Date',
      width: '180px',
      sorter: true,
      render: (text) =>
        text && moment(text).isValid()
          ? moment(text).format('YYYY-MM-DD HH:mm:ss')
          : text,
    },
    {
      name: 'modifiedUser',
      title: 'Modified User',
      width: '120px',
      titleRender: 'input',
      sorter: true,
    },
    {
      name: 'bviBusinessLine',
      title: 'BVI Business Line',
      width: '180px',
      sorter: true,
    },
    {
      name: 'businessLine',
      title: 'Business Line',
      width: '150px',
      titleRender: 'input',
      sorter: true,
    },
    {
      name: 'serviceLine',
      title: 'Service Line',
      width: '150px',
      titleRender: 'input',
      sorter: true,
    },
    {
      name: 'Operate',
      title: 'Operate',
      width: '200px',
      fixed: 'right',
      render: (text, record, index) => (
        <Space>
          <AuthWrapper functionName={pageName} authCode={`${pageName}-Edit`}>
            <Tooltip title="Edit">
              <Button
                type="text"
                key="1"
                icon={<EditOutlined />}
                onClick={() => {
                  console.log('点击的数据', record);
                  setShowFlatData(true);
                  setComponentDisabled(record.dataStatus == 'Submit');
                  formData.setFieldsValue({
                    ...record,
                    productName: record.product,
                    customerDivision: record.customerDivision,
                    startMonth:
                      record.startMonth && moment(record.startMonth).isValid()
                        ? moment(record.startMonth)
                        : null,
                    endMonth:
                      record.endMonth && moment(record.endMonth).isValid()
                        ? moment(record.endMonth)
                        : null,
                    modifiedDate: record.modifiedDate
                      ? moment(record.modifiedDate)
                      : null,
                    createdDate: record.createdDate
                      ? moment(record.createdDate)
                      : null,
                  });
                }}
              ></Button>
            </Tooltip>
            <Popconfirm
              title="Confirm to delete?"
              onConfirm={(event) => deleteInfos([record.orgId], event)}
              okText="Confirm"
              cancelText="Cancel"
            >
              <Tooltip title="Delete">
                <Button
                  type="text"
                  key="2"
                  icon={<i className="gbs gbs-delete"></i>}
                  onClick={(event) => event.stopPropagation()}
                ></Button>
              </Tooltip>
            </Popconfirm>
            {record.dataStatus !== 'Submit' ? (
              <Popconfirm
                title="Confirm submission?"
                onConfirm={(event) => {
                  onSubmit([record.orgId], event);
                }}
                okText="Confirm"
                cancelText="Cancel"
              >
                <Tooltip title="Submit">
                  <Button
                    type="text"
                    key="3"
                    icon={<i className="gbs gbs-submit"></i>}
                    onClick={(event) => event.stopPropagation()}
                  ></Button>
                </Tooltip>
              </Popconfirm>
            ) : (
              ''
            )}
          </AuthWrapper>
          {checkAuth(pageName, `${pageName}-Edit`) ||
          checkAuth(pageName, `${pageName}-View`) ? (
            <Tooltip title="Log">
              <Button
                type="text"
                key="4"
                icon={<i className="gbs gbs-logs"></i>}
                onClick={(event) => {
                  event.stopPropagation();
                  toLog(record.orgId);
                  setShowLog(true);
                }}
              ></Button>
            </Tooltip>
          ) : (
            ''
          )}
        </Space>
      ),
    },
  ];
  const columns: any = [
    {
      title: 'Created Date',
      dataIndex: 'createdDate',
      key: 'createdDate',
      align: 'center',
      width: '160px',
      render: (text) =>
        text && moment(text).isValid()
          ? moment(text).format('YYYY-MM-DD HH:mm:ss')
          : text,
    },
    {
      title: 'Created User',
      dataIndex: 'createdUser',
      key: 'createdUser',
      align: 'center',
    },
    {
      title: 'Fields Name',
      dataIndex: 'fieldsName',
      key: 'fieldsName',
      align: 'center',
    },
    {
      title: 'Old Value',
      dataIndex: 'oldValue',
      key: 'oldValue',
      align: 'center',
    },
    {
      title: 'New Value',
      dataIndex: 'newValue',
      key: 'newValue',
      align: 'center',
    },
    {
      title: 'Modified Date',
      dataIndex: 'modifiedDate',
      // sorter: {
      //   compare: (a, b) => moment(a.modifiedDate) > moment(b.modifiedDate),
      // },
      key: 'modifiedDate',
      align: 'center',
      render: (text) =>
        text && moment(text).isValid()
          ? moment(text).format('YYYY-MM-DD HH:mm:ss')
          : text,
    },
    {
      title: 'Modified User',
      dataIndex: 'modifiedUser',
      key: 'modifiedUser',
      align: 'center',
    },
  ];
  const proColumns: any = [
    {
      dataIndex: 'businessLine',
      title: 'Business Line',
      key: 'serviceLine',
      width: '120px',
      align: 'center',
    },
    {
      dataIndex: 'serviceLine',
      title: 'Service Line',
      key: 'serviceLine',
      width: '150px',
      align: 'center',
    },
    {
      dataIndex: 'are',
      key: 'are',
      title: 'ARE',
      width: '100px',
      align: 'center',
    },
    {
      title: 'Product Name',
      width: '200px',
      dataIndex: 'productName',
      key: 'productName',
      align: 'center',
    },
    {
      title: 'Customer Division',
      width: '150px',
      dataIndex: 'customerDivision',
      key: 'customerDivision',
      align: 'center',
    },
    {
      title: 'Start Date',
      width: '180px',
      dataIndex: 'startDate',
      key: 'startDate',
      align: 'center',
      render: (text) =>
        text && moment(text).isValid()
          ? moment(text).format('YYYY-MM-DD HH:mm:ss')
          : text,
    },
    {
      title: 'End Date',
      width: '180px',
      dataIndex: 'endDate',
      key: 'endDate',
      align: 'center',
      render: (text) =>
        text && moment(text).isValid()
          ? moment(text).format('YYYY-MM-DD HH:mm:ss')
          : text,
    },
    {
      title: 'Product Name for Report',
      width: '180px',
      dataIndex: 'productNameForReport',
      key: 'productNameForReport',
      align: 'center',
    },
    {
      title: 'Signed',
      width: '180px',
      dataIndex: 'signed',
      key: 'signed',
      align: 'center',
      render: (text) => (text === true ? 'Yes' : 'No'),
    },
    {
      title: 'Signed Date',
      width: '180px',
      dataIndex: 'signedDate',
      key: 'signedDate',
      align: 'center',
      render: (text) =>
        text && moment(text).isValid()
          ? moment(text).format('YYYY-MM-DD HH:mm:ss')
          : text,
    },
    {
      title: 'Material Number',
      width: '180px',
      dataIndex: 'materialNumber',
      key: 'materialNumber',
      align: 'center',
    },
    {
      title: 'Unit_Price',
      width: '180px',
      dataIndex: 'unitPrice',
      key: 'unitPrice',
      align: 'center',
    },
    {
      title: 'Unit Price Currency',
      width: '180px',
      dataIndex: 'unitPriceCurrency',
      key: 'unitPriceCurrency',
      align: 'center',
    },
    {
      title: 'Alt.tax classific.',
      width: '180px',
      dataIndex: 'altTaxClassific',
      key: 'altTaxClassific',
      align: 'center',
    },
    {
      title: 'Sender PC',
      width: '150px',
      dataIndex: 'senderPC',
      key: 'senderPC',
      align: 'center',
    },
    {
      title: 'Individual Invoice',
      width: '150px',
      dataIndex: 'individualInvoice',
      key: 'individualInvoice',
      align: 'center',
    },
    {
      title: 'MandotoryBVI',
      width: '150px',
      dataIndex: 'mandotoryBVI',
      key: 'mandotoryBVI',
      align: 'center',
    },
    {
      title: 'SystemTag',
      width: '150px',
      dataIndex: 'systemTag',
      key: 'systemTag',
      align: 'center',
    },
    {
      title: 'Quarterly Charge',
      width: '150px',
      dataIndex: 'quarterlyCharge',
      key: 'quarterlyCharge',
      align: 'center',
    },
  ];
  const checkColumn: any = [
    {
      dataIndex: 'bviBusinessLine',
      title: 'BVI Business Line',
      width: '150px',
      key: 'bviBusinessLine',
      align: 'center',
    },
    {
      title: 'Business Line',
      dataIndex: 'businessLine',
      key: 'businessLine',
      width: '150px',
      align: 'center',
    },
    {
      dataIndex: 'serviceLine',
      title: 'Service Line',
      key: 'serviceLine',
      width: '150px',
    },
    {
      title: 'Product',
      dataIndex: 'product',
      key: 'product',
      width: '200px',
      align: 'center',
    },
    {
      title: 'ARE',
      dataIndex: 'are',
      width: '100px',
      key: 'are',
      align: 'center',
    },
    {
      title: 'Billing ARE',
      dataIndex: 'billingARE',
      width: '150px',
      key: 'billingARE',
      align: 'center',
    },
    {
      title: 'Company Code',
      width: '150px',
      dataIndex: 'companyCode',
      key: 'companyCode',
      align: 'center',
    },
    {
      title: 'Customer Division',
      width: '150px',
      dataIndex: 'customerDivision',
      key: 'customerDivision',
      align: 'center',
    },
    {
      title: 'Product Unit Price',
      width: '150px',
      dataIndex: 'productUnitPrice',
      key: 'productUnitPrice',
      align: 'center',
    },
    {
      title: 'Product Unit Price Currency',
      width: '200px',
      dataIndex: 'productUnitPriceCurrency',
      key: 'productUnitPriceCurrency',
      align: 'center',
    },
    {
      title: 'Cost Center',
      dataIndex: 'costCenter',
      width: '150px',
      key: 'costCenter',
      align: 'center',
    },
    {
      title: 'Billing Cost Center',
      dataIndex: 'billingCostCenter',
      width: '150px',
      key: 'billingCostCenter',
      align: 'center',
    },
    {
      title: 'BVI',
      dataIndex: 'bvi',
      width: '120px',
      key: 'bvi',
      align: 'center',
    },
    {
      title: 'Total Amount（Unit Price Currency）',
      dataIndex: 'totalAmount',
      key: 'totalAmount',
      width: '280px',
      align: 'center',
    },
    {
      title: 'Billing Currency',
      dataIndex: 'billingCurrency',
      key: 'billingCurrency',
      width: '150px',
      align: 'center',
    },
    {
      title: 'PO',
      dataIndex: 'po',
      width: '120px',
      key: 'po',
      align: 'center',
    },
    {
      title: 'PO Percentage',
      dataIndex: 'poPercentage',
      width: '150px',
      key: 'poPercentage',
      align: 'center',
    },
    {
      title: 'Comment',
      width: '200px',
      dataIndex: 'comment',
      key: 'comment',
      align: 'center',
    },
    {
      title: 'BVI Month',
      width: '160px',
      dataIndex: 'bviMonth',
      key: 'bviMonth',
      align: 'center',
    },
    {
      title: 'System',
      width: '150px',
      dataIndex: 'system',
      key: 'system',
      align: 'center',
    },
    {
      title: 'ID_H',
      width: '100px',
      dataIndex: 'idH',
      key: 'idH',
      align: 'center',
    },
    {
      title: 'ChargeType',
      width: '150px',
      dataIndex: 'chargeType',
      key: 'chargeType',
      align: 'center',
    },
    {
      title: 'AdjustTag',
      dataIndex: 'adjustTag',
      width: '150px',
      key: 'adjustTag',
      align: 'center',
      render: (text) => (text === null ? '' : text === false ? 'No' : 'Yes'),
    },
    {
      title: 'Template Type',
      width: '150px',
      dataIndex: 'templateType',
      key: 'templateType',
      align: 'center',
    },
    {
      //   title: 'Billing Location',
      //   dataIndex: 'billingLocation',
      //   key: 'billingLocation',
      //   align: 'center',
      // },{
      title: 'BVI Status',
      width: '150px',
      dataIndex: 'bviStatus',
      key: 'bviStatus',
      align: 'center',
    },
    {
      title: 'Modified User',
      width: '150px',
      dataIndex: 'modifiedUser',
      key: 'modifiedUser',
      align: 'center',
    },
    {
      title: 'Modified Date',
      width: '180px',
      dataIndex: 'modifiedDate',
      key: 'modifiedDate',
      align: 'center',
      render: (text) =>
        text && moment(text).isValid()
          ? moment(text).format('YYYY-MM-DD HH:mm:ss')
          : text,
    },
    {
      title: 'Z003',
      width: '150px',
      dataIndex: 'z003',
      key: 'z003',
      align: 'center',
    },
    {
      title: 'Sales Order',
      width: '150px',
      dataIndex: 'salesOrder',
      key: 'salesOrder',
      align: 'center',
    },
    {
      title: 'Billing Doc.',
      width: '180px',
      dataIndex: 'billingDoc',
      key: 'billingDoc',
      align: 'center',
    },
    {
      title: 'Billing Status',
      width: '150px',
      dataIndex: 'billingStatus',
      key: 'billingStatus',
      align: 'center',
    },
    {
      title: 'Item No.',
      width: '150px',
      dataIndex: 'itemNo',
      key: 'itemNo',
      align: 'center',
    },
    {
      title: 'Amount in Currecy',
      width: '150px',
      dataIndex: 'amountInCurrecy',
      key: 'amountInCurrecy',
      align: 'center',
    },
    {
      title: 'Currency in SAP',
      width: '150px',
      dataIndex: 'currencyInSAP',
      key: 'currencyInSAP',
      align: 'center',
    },
    {
      title: 'Amount in Local Currency(CNY)',
      width: '240px',
      dataIndex: 'amountInLocalCurrencyCNY',
      key: 'amountInLocalCurrencyCNY',
      align: 'center',
    },
    {
      title: 'Billing Date',
      width: '180px',
      dataIndex: 'billingDate',
      key: 'billingDate',
      align: 'center',
    },
    {
      title: 'SAP Exchange Rate',
      width: '150px',
      dataIndex: 'exchangeRate',
      key: 'exchangeRate',
      align: 'center',
      render: (text) =>
        text && moment(text).isValid()
          ? moment(text).format('YYYY-MM-DD HH:mm:ss')
          : text,
    },
  ];

  const latestGroupIdRef = useRef<any>();
  const errorCheckedRef = useRef<any>(false);
  useEffect(() => {
    _getData();
  }, [current, pageSize, orderField, orderType]);

  // 用于获取table接口方法
  const _getData = (recordId?: any) => {
    if (
      !checkAuth(pageName, `${pageName}-Edit`) &&
      !checkAuth(pageName, `${pageName}-View`)
    ) {
      message.warning('No permission temporarily'); //暂无权限提示
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
        isOnlyQueryErrorData: errorCheckedRef.current,
        userBusinessLineList: [business],
      },
      orderCondition: {
        [orderField]: orderType == 'ascend' ? 0 : 1,
      },
      pageIndex: current,
      pageSize: pageSize,
    };

    getFlatChargeData(params).then((res) => {
      if (res.isSuccess) {
        setSelectedRowKeys([]);
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
  const onProPageChange = (pagination, filters, sorter, extra) => {
    setProCurrent(pagination.current);
  };
  const changePageSize = (val: number) => {
    setCurrent(1);
    setPageSize(val);
  };
  const handleLogSize = (val: number) => {
    setLogCurrent(1);
    setLogSize(val);
  };
  const handleProSize = (val: number) => {
    setProCurrent(1);
    setProSize(val);
  };
  // 删除接口
  const deleteInfos = (recordIdList: Array<any>, event) => {
    event.stopPropagation();
    Modal.confirm({
      title: 'Tips',
      icon: <ExclamationCircleOutlined />,
      content: 'Confirm to delete the selected data?',
      okText: 'Confirm',
      cancelText: 'Cancel',
      onOk: () => {
        let params = {};
        if (isSelectAll) {
          params = {
            searchCondition: {
              filterGroup: {
                recordId: latestGroupIdRef.current,
              },
              listHeader: form.getFieldsValue(),
              isOnlyQueryErrorData: errorCheckedRef.current,
              userBusinessLineList: [business],
            },
            operationRecords: null,
          };
        } else {
          params = {
            searchCondition: null,
            operationRecords: {
              recordIdList: recordIdList,
            },
          };
        }
        deleteData(params).then((res) => {
          if (res.isSuccess) {
            message.success('Deletion succeeded!');
            _getData();
            setCurrent(1);
          } else {
            message.error(res.msg);
          }
        });
      },
      centered: true,
    });
  };
  // 批量提交
  const onSubmit = (data, event) => {
    event.stopPropagation();
    let params = {};
    if (isSelectAll) {
      params = {
        searchCondition: {
          filterGroup: {
            recordId: latestGroupIdRef.current,
          },
          listHeader: form.getFieldsValue(),
          isOnlyQueryErrorData: errorCheckedRef.current,
          userBusinessLineList: [business],
        },
        operationRecords: null,
      };
    } else {
      params = {
        searchCondition: null,
        operationRecords: {
          recordIdList: data,
        },
      };
    }
    submitMulti(params).then((res) => {
      if (res.isSuccess) {
        _getData();
        message.success(res.msg);
      } else {
        message.error(res.msg);
      }
    });
  };
  const toCopy = () => {
    Modal.confirm({
      title: 'Tips',
      icon: <ExclamationCircleOutlined />,
      content: 'Confirm to copy this record?',
      okText: 'Confirm',
      cancelText: 'Cancel',
      onOk: () => {
        copyData({
          recordId: selectedRowKeys[0],
        }).then((res) => {
          if (res.isSuccess) {
            _getData();
            message.success(res.msg);
          } else {
            message.error(res.msg);
          }
        });
      },
      centered: true,
    });
  };
  const toLog = (recordId: string) => {
    // 获取loglist数据
    setLogId(recordId);
    if (logCurrent !== 1) {
      setLogCurrent(1);
    } else {
      _getLogData(recordId);
    }
  };
  useEffect(() => {
    logId && _getLogData();
  }, [logCurrent, logSize]);
  const _getLogData = async (_id?: string) => {
    const res = await logDataQuery({
      recordId: _id || logId,
      pageIndex: logCurrent,
      pageSize: logSize,
    });
    if (res.isSuccess) {
      setLogData(res.data || []);
      setLogTotal(res.totalCount);
      setShowLog(true);
    } else {
      message.error(res.msg);
    }
    return res;
  };
  const onLogPageChange = (pagination, filters, sorter, extra) => {
    //   翻页|排序|筛选
    switch (extra.action) {
      case 'paginate':
        setLogCurrent(pagination.current);
        break;
      case 'sort':
        break;
      default:
        break;
    }
  };
  const importExcel = (file) => {
    const fd = new FormData();
    fd.append('file', file);
    importFlatData(fd).then((res) => {
      if (res.isSuccess) {
        message.success(res.msg);
        _getData();
      } else {
        message.error(res.msg,5);
      }
    });
  };
  const _getProduct = () => {
    proForm
      .validateFields()
      .then((values) => {
        getProductData({
          ...values,
          systemTag: 'Flat Charge',
          pageIndex: proCurrent,
          pageSize: proSize,
        }).then((res) => {
          if (res.isSuccess) {
            setSelectProKeys([]);
            setProductData(res.data);
            setProTotal(res.totalCount);
          } else {
            message.error(res.msg);
          }
        });
      })
      .catch((e) => {});
  };

  const exportExcelAction = () => {
    if (!business) {
      message.warning('Please select [BVI Bussiness Line]!');
      return;
    }
    let params = {
      searchCondition: {
        filterGroup: {
          recordId: latestGroupIdRef.current,
        },
        userBusinessLineList: [business],
        listHeader: form.getFieldsValue(),
        isOnlyQueryErrorData: errorCheckedRef.current,
      },
      orderCondition: {
        [orderField]: orderType == 'ascend' ? 0 : 1,
      },
      pageIndex: current,
      pageSize: pageSize,
    };

    exportExcel(params).then((res: any) => {
      let elink = document.createElement('a');
      // 设置下载文件名
      elink.download = 'Flat Charge List.xlsx';
      elink.href = window.URL.createObjectURL(new Blob([res.response?.data]));
      elink.click();
      window.URL.revokeObjectURL(elink.href);
    });
  };
  const selectProSure = () => {
    setShowPro(false);
    console.log(selectProductRow);
    let data = selectProductRow[0];
    console.log(data);
    formData.setFieldsValue({
      businessLine: data.businessLine,
      are: data.are,
      serviceLine: data.serviceLine,
      customerDivision: data.customerDivision,
      productName: data.productName,
      productId: data.id,
      po: null,
    });
    handlerCancelProSearch();
  };
  const validCostCenterRequired = (rule, value, callback) => {
    if (formData.getFieldValue('are') == '5547' && !value) {
      return Promise.reject(new Error('Cost Center Required;'));
    }
    if (
      formData.getFieldValue('are') == '5547' &&
      customerDivision &&
      value &&
      customerDivision != formData.getFieldValue('customerDivision')
    ) {
      return Promise.reject(
        new Error('Customer division conflict, unable to submit;'),
      );
    }
    return Promise.resolve();
  };
  const validEndMonth = (rule, value, callback) => {
    if (
      formData.getFieldValue('startMonth') &&
      value &&
      (formData.getFieldValue('startMonth') >= value ||
        value.format('YYYY-MM') ==
          formData.getFieldValue('startMonth').format('YYYY-MM'))
    ) {
      return Promise.reject(
        new Error('The end month must be greater than the start month;'),
      );
    }
    return Promise.resolve();
  };
  // 保存草稿
  const saveFormData = () => {
    formData
      .validateFields()
      .then((values) => {
        const params = {
          id: formData.getFieldValue('orgId') || null,
          are: formData.getFieldValue('are'),
          companyCode: formData.getFieldValue('companyCode'),
          product: formData.getFieldValue('productName'),
          costCenter: formData.getFieldValue('costCenter'),
          totalAmount: formData.getFieldValue('totalAmount'),
          po: formData.getFieldValue('po'),
          comment: formData.getFieldValue('comment') || '',
          startMonth: formData.getFieldValue('startMonth').format('YYYYMM'),
          endMonth: formData.getFieldValue('endMonth').format('YYYYMM'),
        };
        editDataSave(params).then((res) => {
          if (res.isSuccess) {
            message.success(res.msg);
            setShowFlatData(false);
            formData.resetFields();
            setCustomerDivision('');
            _getData();
          } else {
            message.error(res.msg);
          }
        });
      })
      .catch((e) => {});
  };
  // 提交
  const onSubmitData = () => {
    formData
      .validateFields()
      .then((values) => {
        editDataSubmit({
          id: formData.getFieldValue('orgId') || '',
          are: formData.getFieldValue('are'),
          companyCode: formData.getFieldValue('companyCode'),
          product: formData.getFieldValue('productName'),
          costCenter: formData.getFieldValue('costCenter'),
          totalAmount: formData.getFieldValue('totalAmount'),
          po: formData.getFieldValue('po'),
          comment: formData.getFieldValue('comment') || '',
          startMonth: formData.getFieldValue('startMonth').format('YYYYMM'),
          endMonth: formData.getFieldValue('endMonth').format('YYYYMM'),
        }).then((res) => {
          if (res.isSuccess) {
            message.success(res.msg);
            setShowFlatData(false);
            formData.resetFields();
            setCustomerDivision('');
            _getData();
          } else {
            message.error(res.msg);
          }
        });
      })
      .catch((e) => {});
  };

  useEffect(() => {
    showCostcenter && _getCostCenterData();
  }, [costcenterCurrent, costcenterPageSize]);
  // 获取costcenter
  const _getCostCenterData = () => {
    let params = {
      searchCondition: {
        pageTop: {
          isLocked: false,
        },
        listHeader: {
          are: formData.getFieldValue('are'),
          costCenter: costCenterVal,
          custemerDivision: customerDivisionVal,
        },
      },
      orderCondition: {
        //   [orderField]: orderType == 'ascend' ? 0 : 1,
      },
      pageIndex: costcenterCurrent,
      pageSize: costcenterPageSize,
    };
    getCostCenterData(params).then((res) => {
      if (res.isSuccess) {
        setcostcenterData(res.data);
        setCostcenterTotal(res.totalCount);
        setSelectCostCenterkeys([]);
        setSelectCostCenterRows([]);
      } else {
        setcostcenterData([]);
        message.success(res.msg);
      }
    });
  };
  const cancelCostCenter = () => {
    setShowCostcenter(false);
    setCostCenterVal('');
    setCustomerDivisionVal('');
    setSelectCostCenterRows([]);
    setSelectCostCenterkeys([]);
    setcostcenterData([]);
  };
  const handlerCostCenterPageSize = (_size: number) => {
    setCostCenterCurrent(1);
    setCostcenterPageSize(_size);
  };
  const oncostCenterPageChange = (pagination) => {
    setCostCenterCurrent(pagination.current);
  };
  // 确认选中costcenter
  const confirmCostCenterAction = () => {
    // 同步costcenter数据
    // console.log(selectCostCenterRows)
    let _data = selectCostCenterRows[0];
    if (_data.custemerDivision != formData.getFieldValue('customerDivision')) {
      message.warning(
        'Customer division conflict, this cost center is unabled;',
      );
      return;
    }
    formData.setFieldsValue({
      costCenter: _data.costCenter,
      customerDivision: _data.custemerDivision,
      companyCode: _data.companyCode,
    });
    cancelCostCenter();
  };
  const handlerCancelProSearch = () => {
    proForm.resetFields();
    setShowPro(false);
    setProductData([]);
    setProCurrent(1);
  };

  const toRecheck = () => {
    // if(isSelectAll){
    Modal.confirm({
      title: 'Tips',
      icon: <ExclamationCircleOutlined />,
      content: 'Are you sure to recheck the selected data?',
      okText: 'Confirm',
      cancelText: 'Cancel',
      onOk: () => {
        recheckDataAction();
      },
      centered: true,
    });
    // }else{
    //   const recheckMark = selectedRows.some((item) => {
    //     return item.error == null;
    //   });
    //   if (recheckMark) {
    //     message.error('Please select "Error" data to recheck!');
    //   } else {
    //     Modal.confirm({
    //       title: 'Tips',
    //       icon: <ExclamationCircleOutlined />,
    //       content: 'Are you sure to recheck the selected data?',
    //       okText: 'Confirm',
    //       cancelText: 'Cancel',
    //       onOk: () => {
    //         recheckDataAction();
    //       },
    //       centered: true,
    //     });
    //   }
    // }
  };
  const recheckDataAction = () => {
    let params = {};
    if (isSelectAll) {
      params = {
        searchCondition: {
          filterGroup: {
            recordId: latestGroupIdRef.current,
          },
          listHeader: form.getFieldsValue(),
          isOnlyQueryErrorData: errorCheckedRef.current,
          userBusinessLineList: [business],
        },
        operationRecords: null,
      };
    } else {
      // let recordList = selectedRows.filter((item) => !!item.error);
      // if (!recordList || !recordList.length) {
      //   message.error('No data to recheck is selected');
      //   return;
      // }
      if (!selectedRowKeys.length) {
        message.warning('No information selected!');
        return;
      }
      params = {
        searchCondition: null,
        operationRecords: {
          recordIdList: selectedRowKeys,
        },
      };
    }
    RecheckDataFlatCharge(params).then((res) => {
      if (res.isSuccess) {
        _getData();
        setSelectedRowKeys([]);
        message.success(res.msg);
      } else {
        message.error(res.msg);
      }
    });
  };

  return (
    <ContentWrap>
      {/* 选择costcenter */}
      <Modal
        width="1000px"
        title={
          <TableTopDiv style={{ margin: 0 }}>
            <TableTitleDiv style={{ float: 'left' }}>
              <TaleTitleIconDiv>
                <span></span>
              </TaleTitleIconDiv>
              <span style={{ verticalAlign: 'middle', fontSize: '20px' }}>
                Cost Center Data
              </span>
            </TableTitleDiv>
          </TableTopDiv>
        }
        footer={null}
        visible={showCostcenter}
        maskClosable={false}
        destroyOnClose={true}
        onCancel={cancelCostCenter}
      >
        <Form labelCol={{ flex: '150px' }}>
          <Row>
            <Col span={10}>
              <Form.Item label="Cost Center">
                <Input
                  value={costCenterVal}
                  onChange={(e) => {
                    setCostCenterVal(e.target.value);
                  }}
                  style={{ width: '100%' }}
                />
              </Form.Item>
            </Col>
            <Col span={10}>
              <Form.Item label="Customer Division">
                <Input
                  value={customerDivisionVal}
                  onChange={(e) => {
                    setCustomerDivisionVal(e.target.value);
                  }}
                  style={{ width: '100%' }}
                />
              </Form.Item>
            </Col>
            <Col span={3} offset={1}>
              <Button type="primary" onClick={_getCostCenterData}>
                Search
              </Button>
            </Col>
          </Row>
        </Form>
        <TableWrapDiv className="costcenter_wrap">
          <TableMix
            columns={costcenterCols}
            data={costcenterData}
            type="radio"
            selectedRowKeys={selectCostCenterkeys}
            current={costcenterCurrent}
            pageSize={costcenterPageSize}
            total={costcenterTotal}
            onChange={(_selectedRowKeys, _selectedRows) => {
              setSelectCostCenterRows(_selectedRows);
              setSelectCostCenterkeys(_selectedRowKeys);
            }}
            pagination={true}
            rowKey="id"
            scrollY={'calc(100vh - 450px)'}
            selection={true}
            onPageChange={oncostCenterPageChange}
            handlePageSize={handlerCostCenterPageSize}
          />
          <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <Space size={60}>
              <Button
                type="primary"
                onClick={confirmCostCenterAction}
                disabled={!selectCostCenterRows.length}
              >
                Confirm
              </Button>
              <Button onClick={cancelCostCenter}>Cancel</Button>
            </Space>
          </div>
        </TableWrapDiv>
      </Modal>
      <Modal
        maskClosable={false}
        title={
          <TableTopDiv style={{ margin: 0 }}>
            <TableTitleDiv style={{ float: 'left' }}>
              <TaleTitleIconDiv>
                <span></span>
              </TaleTitleIconDiv>
              <span style={{ verticalAlign: 'middle', fontSize: '20px' }}>
                BVI Data List
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
            columns={checkColumn}
            rowClassName={(record, index) => (index % 2 == 0 ? '' : 'stripe')}
            dataSource={checkData}
            rowKey="id"
            pagination={false}
            scroll={{ y: 'calc(100vh - 390px)' }}
          />
        </TableWrapDiv>
      </Modal>
      {/* 产品列表 */}
      <Modal
        width="1250px"
        title={
          <TableTopDiv style={{ margin: 0 }}>
            <TableTitleDiv style={{ float: 'left' }}>
              <TaleTitleIconDiv>
                <span></span>
              </TaleTitleIconDiv>
              <span style={{ verticalAlign: 'middle', fontSize: '20px' }}>
                Product List Data
              </span>
            </TableTitleDiv>
          </TableTopDiv>
        }
        footer={null}
        visible={showPro}
        maskClosable={false}
        destroyOnClose={true}
        onCancel={handlerCancelProSearch}
      >
        <Form form={proForm} labelCol={{ flex: '130px' }}>
          <Row gutter={20}>
            <Col span={8}>
              <Form.Item label="Business Line" name="businessLine">
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Service Line" name="serviceLine">
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="Customer Division"
                name="customerDivision"
                // rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="ARE" name="are" rules={[{ required: true }]}>
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="Product Name"
                name="productName"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item style={{ textAlign: 'right' }}>
                <Button type="primary" onClick={_getProduct}>
                  Search
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
        <TableWrapDiv className="selfTable" style={{ margin: '0 0px 0 -24px' }}>
          <TableMix
            columns={proColumns}
            type="radio"
            onChange={(rowkeys, rows) => {
              setSelectProKeys(rowkeys);
              setSelectProductRow(rows);
            }}
            data={productData}
            current={proCurrent}
            pageSize={proSize}
            total={proTotal}
            handlePageSize={handleProSize}
            rowKey="id"
            onPageChange={onProPageChange}
            pagination={true}
            scrollX={1000}
            selection={true}
            selectedRowKeys={selectProKeys}
          />
        </TableWrapDiv>
        <div style={{ textAlign: 'center' }}>
          <Button
            onClick={selectProSure}
            type="primary"
            disabled={!selectProductRow.length}
          >
            Confirm
          </Button>
        </div>
      </Modal>
      {/* 日志查询 */}
      <Modal
        width="1000px"
        title={
          <TableTopDiv style={{ margin: 0 }}>
            <TableTitleDiv style={{ float: 'left' }}>
              <TaleTitleIconDiv>
                <span></span>
              </TaleTitleIconDiv>
              <span style={{ verticalAlign: 'middle', fontSize: '20px' }}>
                Log List Data
              </span>
            </TableTitleDiv>
          </TableTopDiv>
        }
        footer={null}
        visible={showLog}
        maskClosable={false}
        destroyOnClose={true}
        onCancel={() => {
          // formImport.resetFields();
          setShowLog(false);
        }}
      >
        <div className="selfTable" style={{ margin: '0 0px 0 -24px' }}>
          <TableMix
            columns={columns}
            data={logData}
            current={logCurrent}
            pageSize={logSize}
            total={logTotal}
            scrollY="calc(100vh - 420px)"
            handlePageSize={handleLogSize}
            onPageChange={onLogPageChange}
            pagination={true}
          />
        </div>
      </Modal>
      {/* 新增、编辑flat Charge */}
      <Modal
        maskClosable={false}
        width="1000px"
        title={
          <TableTopDiv style={{ margin: 0 }}>
            <TableTitleDiv style={{ float: 'left' }}>
              <TaleTitleIconDiv>
                <span></span>
              </TaleTitleIconDiv>
              <span style={{ verticalAlign: 'middle', fontSize: '20px' }}>
                Flat Charge Data
              </span>
            </TableTitleDiv>
          </TableTopDiv>
        }
        visible={showFlatData}
        footer={null}
        onCancel={() => {
          setShowFlatData(false);
          formData.resetFields();
          setCustomerDivision('');
        }}
      >
        <Form form={formData} labelCol={{ flex: '120px' }}>
          <Row gutter={20}>
            <Col span={20}>
              <Form.Item
                label="Product Name"
                name="productName"
                rules={[{ required: true }]}
              >
                <Input disabled={true} />
              </Form.Item>
            </Col>
            {formData.getFieldValue('orgId') && componentDisabled ? (
              ''
            ) : (
              <Col span={4}>
                <Button type="primary" onClick={() => setShowPro(true)}>
                  Search Product
                </Button>
              </Col>
            )}

            <Col span={8}>
              <Form.Item label="Bussiness Line" name="businessLine">
                <Input disabled={true} />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Service Line" name="serviceLine">
                <Input disabled={true} />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="ARE" name="are">
                <Input
                  onChange={(e) => {
                    formData.setFieldsValue({
                      chargeType: e.target.value == '5547' ? 'ICB' : 'ICC',
                    });
                  }}
                  disabled
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="Cost Center"
                name="costCenter"
                rules={[{ validator: validCostCenterRequired,required: formData.getFieldValue('are') == '5547' }]}
              >
                {formData.getFieldValue('are') == '5547' &&
                formData.getFieldValue('productName') ? (
                  // <DebounceSelect
                  //   initFlag
                  //   onChange={(value, data) => {
                  //     if (
                  //       value &&
                  //       data.customerDivision !=
                  //         formData.getFieldValue('customerDivision')
                  //     ) {
                  //       setCustomerDivision(data.data.custemerDivision);
                  //     }
                  //     value &&
                  //       formData.setFieldsValue({
                  //         companyCode: data.data.companyCode,
                  //       });
                  //   }}
                  //   getoptions={(options) => {
                  //     return options?.map((x, index) => {
                  //       return (
                  //         <Select.Option
                  //           key={index}
                  //           data={x}
                  //           value={x.costCenter}
                  //         >
                  //           {x.costCenter}
                  //         </Select.Option>
                  //       );
                  //     });
                  //   }}
                  //   delegate={(e) => {
                  //     if (!formData.getFieldValue('are')) {
                  //       return Promise.resolve({
                  //         code: 200,
                  //         isSuccess: true,
                  //         data: [],
                  //       });
                  //     }
                  //     return getCostCenterDrop({
                  //       are: formData.getFieldValue('are'),
                  //       costCenter: e,
                  //       isOnlyUnlocked: true,
                  //     });
                  //   }}
                  // />
                  <Input.Search
                    readOnly
                    onSearch={() => {
                      setShowCostcenter(true);
                      if (costcenterCurrent != 1) {
                        setCostCenterCurrent(1);
                      } else {
                        _getCostCenterData();
                      }
                    }}
                  />
                ) : (
                  <Input disabled={!formData.getFieldValue('productName')} />
                )}
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="Company Code"
                name="companyCode"
                rules={[{ required: true }]}
              >
                {!formData.getFieldValue('are') ||
                formData.getFieldValue('are') == '5547' ? (
                  <Input disabled />
                ) : (
                  <DebounceSelect
                    initFlag
                    getoptions={(options) => {
                      return options?.map((x, index) => {
                        return (
                          <Select.Option
                            key={index}
                            data={x}
                            value={x.companyCode}
                          >
                            {x.companyCode}
                          </Select.Option>
                        );
                      });
                    }}
                    delegate={(e) => {
                      if (!formData.getFieldValue('are')) {
                        return Promise.resolve({
                          code: 200,
                          isSuccess: true,
                          data: [],
                        });
                      }
                      return getCompanyCodeDrop({
                        are: formData.getFieldValue('are'),
                        companyCode: e,
                      });
                    }}
                  />
                )}
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Customer Division" name="customerDivision">
                <Input disabled />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="Total Amount"
                name="totalAmount"
                rules={[
                  { required: true, message: 'Total Amount is Required;' },
                  {
                    pattern:
                      /^([1-9]\d*(\.\d{1,2})?|([0](\.([0][1-9]|[1-9]\d{0,1}))))$/,
                    message: 'Greater than zero and two decimal places at most',
                  },
                ]}
              >
                <InputNumber
                  disabled={componentDisabled}
                  style={{ width: '100%' }}
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              {/* {formData.getFieldValue('are') != '5547' ? ( */}
              <Form.Item
                labelCol={{ flex: '50px' }}
                label="PO"
                name="po"
                rules={[{ required: formData.getFieldValue('are') != '5547' }]}
              >
                <DebounceSelect
                  initFlag
                  disabled={componentDisabled}
                  getoptions={(options) => {
                    return options?.map((x, index) => {
                      return (
                        <Select.Option
                          style={{ width: '100%' }}
                          key={index}
                          data={x}
                          value={x.poNumber}
                        >
                          {x.poNumber}
                        </Select.Option>
                      );
                    });
                  }}
                  delegate={(e) => {
                    if (!formData.getFieldValue('productId')) {
                      return Promise.resolve({
                        code: 200,
                        isSuccess: true,
                        data: [],
                      });
                    }
                    return ProductPoDrop({
                      productId: formData.getFieldValue('productId'),
                      poNumber: e,
                    });
                  }}
                />
              </Form.Item>
              {/* ) : (
                <Form.Item labelCol={{ flex: '50px' }} label="PO" name="po">
                  <Input style={{ width: '100%' }} />
                </Form.Item>
              )} */}
            </Col>
            <Col span={8}>
              <Form.Item
                label="Start Month"
                name="startMonth"
                rules={[{ required: true }]}
              >
                <DatePicker
                  disabled={componentDisabled}
                  picker="month"
                  format="YYYYMM"
                  style={{ width: '100%' }}
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="End Month"
                name="endMonth"
                rules={[
                  { required: true },
                  {
                    validator: validEndMonth,
                  },
                ]}
              >
                <DatePicker
                  picker="month"
                  format="YYYYMM"
                  style={{ width: '100%' }}
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="ChargeType" name="chargeType">
                <Input disabled />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="System" name="system">
                <Input disabled />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Template Type" name="templateType">
                <Input disabled />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Upload Date" name="createdDate">
                <DatePicker disabled style={{ width: '100%' }} />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Upload User" name="createdUser">
                <Input disabled />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Modified Date" name="modifiedDate">
                <DatePicker disabled style={{ width: '100%' }} />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Modified User" name="modifiedUser">
                <Input disabled />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item label="Comment" name="comment">
                <Input.TextArea />
              </Form.Item>
            </Col>
            {
              <Col span={24}>
                <Form.Item style={{ textAlign: 'center' }}>
                  <Space size={60}>
                    {!componentDisabled ? (
                      <Button type="primary" onClick={saveFormData}>
                        Save
                      </Button>
                    ) : (
                      ''
                    )}
                    <Button type="primary" onClick={onSubmitData}>
                      Submit
                    </Button>
                    <Button
                      onClick={() => {
                        setShowFlatData(false);
                        formData.resetFields();
                        setCustomerDivision('');
                      }}
                    >
                      Cancel
                    </Button>
                  </Space>
                </Form.Item>
              </Col>
            }
          </Row>
        </Form>
      </Modal>

      <TableList
        headerSearch={_getData}
        form={form}
        data={tableData}
        columns={orignalCols}
        selectedRowKeys={selectedRowKeys}
        total={total}
        onPageChange={onPageChange}
        onChange={(_selectedRowKeys, _selectedRows) => {
          setSelectedRowKeys(_selectedRowKeys);
          setSelectedRows(_selectedRows);
        }}
        changePageSize={changePageSize}
        current={current}
        search={isSearch}
        rowKey="orgId"
        listName="Flat Charge"
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
                  {businesslineOptions.map((item, index) => (
                    <Select.Option key={index} value={item}>
                      {item}
                    </Select.Option>
                  ))}
                </Select>
              </>
            }
            moudleName="Flat Charge"
            authPagename={pageName}
            onSearch={(val) => {
              latestGroupIdRef.current = val;
              if (current != 1) {
                setCurrent(1);
              } else {
                _getData();
              }
            }}
            onClear={() => {
              setErrorChecked(false);
              setIsSelectAll(false)
              errorCheckedRef.current = false;
              latestGroupIdRef.current = '';
              form.resetFields();
              if (current != 1) {
                setCurrent(1);
              } else {
                _getData();
              }
            }}
            exportAction={exportExcelAction}
            customComponet={
              <>
                <Checkbox
                  checked={errorChecked}
                  onChange={(e) => {
                    errorCheckedRef.current = e.target.checked;
                    setErrorChecked(e.target.checked);
                  }}
                >
                  View all Error Data
                </Checkbox>

                <Checkbox
                  checked={isSelectAll}
                  onChange={(e) => {
                    setIsSelectAll(e.target.checked);
                  }}
                >
                  Select All
                </Checkbox>
              </>
            }
          />
        }
        renderBtns={
          <>
            {/* <BtnThemeWrap><Button>Export Original</Button></BtnThemeWrap> */}
            <AuthWrapper functionName={pageName} authCode={`${pageName}-Edit`}>
              <Space>
                <BtnThemeWrap>
                  <Button
                    disabled={
                      selectedRowKeys.length == 0
                        ? isSelectAll
                          ? false
                          : true
                        : false
                    }
                    onClick={toRecheck}
                  >
                    Recheck
                  </Button>
                </BtnThemeWrap>
                <BtnThemeWrap>
                  <Dropdown
                    overlay={() => (
                      <Menu>
                        <Menu.Item
                          key="1"
                          icon={<i className="gbs gbs-import"></i>}
                        >
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
                        </Menu.Item>
                        <Menu.Item
                          key="2"
                          icon={<i className="gbs gbs-add"></i>}
                        >
                          <Button
                            style={{ margin: '0 10px' }}
                            type="text"
                            onClick={() => {
                              setShowFlatData(true);
                              formData.setFieldsValue({
                                templateType: 'Flat Charge',
                                system: 'Flat Charge',
                                uploadUser: sessionStorage.getItem('user'),
                              });
                              setComponentDisabled(false);
                            }}
                          >
                            Add
                          </Button>
                        </Menu.Item>
                        <Menu.Item
                          key="3"
                          icon={<i className="gbs gbs-download"></i>}
                        >
                          <span style={{ margin: '0 10px' }}>
                            <a href="./template/Flat Charge.xlsx">
                              Download Template
                            </a>
                          </span>
                        </Menu.Item>
                      </Menu>
                    )}
                  >
                    <Button>
                      <Space>
                        Add
                        <DownOutlined />
                      </Space>
                    </Button>
                  </Dropdown>
                </BtnThemeWrap>
                <BtnThemeWrap>
                  <Button
                    disabled={selectedRowKeys.length != 1}
                    onClick={toCopy}
                  >
                    Copy
                  </Button>
                </BtnThemeWrap>
                <BtnThemeWrap>
                  <Button
                    disabled={
                      selectedRowKeys.length == 0
                        ? isSelectAll
                          ? false
                          : true
                        : false
                    }
                    onClick={(event) => onSubmit(selectedRowKeys, event)}
                  >
                    Submit
                  </Button>
                </BtnThemeWrap>
                <Button
                  onClick={(event) => deleteInfos(selectedRowKeys, event)}
                  disabled={
                    selectedRowKeys.length == 0
                      ? isSelectAll
                        ? false
                        : true
                      : false
                  }
                >
                  Delete
                </Button>
              </Space>
            </AuthWrapper>
            <Space>
              <Divider
                type="vertical"
                style={{
                  height: '20px',
                  borderColor: '#999',
                  marginLeft: '15px',
                }}
              />
              <Tooltip title="Filter">
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
              </Tooltip>
            </Space>
          </>
          // </Space>
        }
      />
    </ContentWrap>
  );
};
