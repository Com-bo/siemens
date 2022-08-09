import { useState, useEffect, useRef } from 'react';
import {
  bivCopyDta,
  bviGroupQuery,
  confirmData,
  deleteBVIData,
  exportExcel,
  importDataSave,
  unConfirmData,
  InsertBVIData,
  getProductData,
  EditBVIData,
  EditDataListSave,
  getAbnormalOriginDataByBVI,
  exportOriginalData,
  SyncDataSave,
  ReCheckDataBVIData,
} from '@/app/request/apiBVI';
import { formatDate, objectToFormData } from '@/tools/utils';
import { Form, message, Modal } from 'antd';
const businesslineOptions = JSON.parse(sessionStorage.getItem('businessLines'));
// 权限
const pageName = 'BVIDataManage';
import { AuthWrapper, checkAuth } from '@/tools/authCheck';
// 
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
  const [unconfirmChecked, setUnconfirmData] = useState(false);
  const [errorChecked, setErrorChecked] = useState(false);
  //
  const [groupId, setGroupId] = useState('');
  const [orderField, setOrderField] = useState('modifiedDate');
  const [orderType, setOrderType] = useState('descend');
  const latestGroupIdRef = useRef<any>();
  const errorCheckedRef = useRef<any>(false);
  const UnconfirmDataRef = useRef<any>(false);
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
  const [business, setBusiness] = useState(businesslineOptions[0]);
  // 
  const [bviComponentDisabled, setBviComponentDisabled] = useState(false);
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
    console.log(_columns)
    setCols(_columns);
  };
  const getCheckOriginalData = (event, _data) => {
    event.stopPropagation();
    setCheckOriginalParam(_data);
    getAbnormalOriginDataByBVI([_data]).then((res) => {
      if (res.isSuccess) {
        setIsCheckOriginal(true);
        setCheckData(res.data.body || []);
        _generateHead(res.data.header || []);
      } else {
        message.error(res.msg);
      }
    });
  };
  const onExportOriginal = () => {
    exportOriginalData([checkOriginalParam]).then((res) => {
      if (res.response.status == 200) {
        let elink = document.createElement('a');
        elink.download = 'Original List.xlsx';
        elink.href = window.URL.createObjectURL(
          new Blob([res.response?.data as unknown as BlobPart]),
        );
        elink.click();
        window.URL.revokeObjectURL(elink.href);
      } else {
        message.error(res.response.statusText);
      }
    });
  };
  const getData = (recordId?: any) => {
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
        isOnlyQueryUnconfirmData: UnconfirmDataRef.current,
        userBusinessLineList: [business],
      },
      orderCondition: {
        [orderField]: orderType == 'ascend' ? 0 : 1,
      },
      pageIndex: current,
      pageSize: pageSize,
    };

    bviGroupQuery(params).then((res) => {
      if (res.isSuccess) {
        setTableData(res.data);
        setTotal(res.totalCount);
      } else {
        message.error(res.msg);
      }
    });
  };
  const changePageSize = (val: number) => {
    setPageSize(val);
  };
  // const onPageChange = (pagination, filters, sorter, extra) => {
  //   //   翻页|排序|筛选
  //   setCurrent(pagination.current);
  //   switch (extra.action) {
  //     case 'paginate':
  //       setCurrent(pagination.current);
  //       break;
  //     case 'sort':
  //       break;
  //     default:
  //       break;
  //   }
  // };
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

  useEffect(() => {
    getData();
  }, [current, pageSize, orderField, orderType, business]);
  // useEffect(() => {
  //   let _lst = sessionStorage.getItem("businessLines")
  //   setBusinesslineOptions(JSON.parse(_lst))
  //   setBusiness(JSON.parse(_lst)[0])
  // }, [])
  // }导入数据
  const importExcel = () => {
    formImport
      .validateFields()
      .then((values) => {
        const fd = new FormData();
        objectToFormData(values.file[0], fd, 'file');
        importDataSave(fd, Number(values.type)).then((res) => {
          setShowImport(false);
          if (res.isSuccess) {
            message.success('Submit success!');
            getData();
          } else {
            message.error(res.msg);
          }
          formImport.resetFields();
        });
      })
      .catch((error) => {});
  };
  const copyDataMethod = () => {
    bivCopyDta({ recordIdList: selectedRowKeys }).then((res) => {
      if (res.isSuccess) {
        getData();
        setSelectedRowKeys([]);
        message.success(res.msg);
      } else {
        message.error(res.msg);
      }
    });
  };

  //
  const recheckDataAction = () => {
    let params = {}
    if(isSelectAll){
      params = {
        searchCondition: {
          filterGroup: {
            recordId: latestGroupIdRef.current,
          },
          listHeader: form.getFieldsValue(),
          isOnlyQueryErrorData: errorCheckedRef.current,
          isOnlyQueryUnconfirmData: UnconfirmDataRef.current,
          userBusinessLineList: [business],
        },
        operationRecords: null,
      };
    }else{
      let recordList = selectedRows.filter((item) => !!item.error);
      if (!recordList || !recordList.length) {
        message.error('No data to recheck is selected');
        return;
      }
      if (!selectedRowKeys.length) {
        message.warning('No information selected!');
        return;
      }
      params = {
        searchCondition: null,
        operationRecords: {
          recordIdList: selectedRowKeys
        }
      };
    }
    ReCheckDataBVIData(params).then((res) => {
      if (res.isSuccess) {
        getData();
        setSelectedRowKeys([]);
        message.success(res.msg);
      } else {
        message.error(res.msg);
      }
    });
  };
  const confirmDataAction = (recordIdList) => {
    let params = {}
    if(isSelectAll){
      params = {
        searchCondition: {
          filterGroup: {
            recordId: latestGroupIdRef.current,
          },
          listHeader: form.getFieldsValue(),
          isOnlyQueryErrorData: errorCheckedRef.current,
          isOnlyQueryUnconfirmData: UnconfirmDataRef.current,
          userBusinessLineList: [business],
        },
        operationRecords: null,
      };
    }else{
      params = {
        searchCondition: null,
        operationRecords: {
          recordIdList: recordIdList
        }
      };
    }
    confirmData(params).then((res) => {
      if (res.isSuccess) {
        getData();
        setSelectedRowKeys([]);
        message.success(res.msg);
      } else {
        message.error(res.msg);
      }
    });
  };
  const unconfirmDataAction = (recordIdList) => {
    let params = {}
    if(isSelectAll){
      params = {
        searchCondition: {
          filterGroup: {
            recordId: latestGroupIdRef.current,
          },
          listHeader: form.getFieldsValue(),
          isOnlyQueryErrorData: errorCheckedRef.current,
          isOnlyQueryUnconfirmData: UnconfirmDataRef.current,
          userBusinessLineList: [business],
        },
        operationRecords: null,
      };
    }else{
      params = {
        searchCondition: null,
        operationRecords: {
          recordIdList: recordIdList
        }
      };
    }
    unConfirmData(params).then((res) => {
      if (res.isSuccess) {
        getData();
        setSelectedRowKeys([]);
        message.success(res.msg);
      } else {
        message.error(res.msg);
      }
    });
  };

  const onExport = () => {
    exportOriginalData(selectedRows).then((res) => {
      if (res.response.status == 200) {
        let elink = document.createElement('a');
        elink.download = 'Original List.xlsx';
        elink.href = window.URL.createObjectURL(
          new Blob([res.response.data as unknown as BlobPart]),
        );
        elink.click();
        window.URL.revokeObjectURL(elink.href);
      } else {
        message.error(res.response.statusText);
      }
    });

    // exportExcel({
    //   pageIndex: current,
    //   pageSize: pageSize,
    // }).then((res: any) => {
    //   let elink = document.createElement('a');
    //   // 设置下载文件名
    //   elink.download = 'XXXX.xlsx';
    //   elink.href = window.URL.createObjectURL(new Blob([res.response?.data]));
    //   elink.click();
    //   window.URL.revokeObjectURL(elink.href);
    // });
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
        isOnlyQueryErrorData: errorCheckedRef.current,
        isOnlyQueryUnconfirmData: UnconfirmDataRef.current,
        userBusinessLineList: [business],
      },
      orderCondition: {
        [orderField]: orderType == 'ascend' ? 0 : 1,
      },
      current,
      pageSize: pageSize,
    };
    exportExcel(params).then((res: any) => {
      let elink = document.createElement('a');
      // 设置下载文件名
      elink.download = 'Data Management List.xlsx';
      elink.href = window.URL.createObjectURL(new Blob([res.response?.data]));
      elink.click();
      window.URL.revokeObjectURL(elink.href);
    });
  };
  // 删除接口
  const deleteInfos = (recordIdList: Array<any>, event) => {
    event.stopPropagation();
    let params = {};
    if(isSelectAll){
      params = {
        searchCondition: {
          filterGroup: {
            recordId: latestGroupIdRef.current,
          },
          listHeader: form.getFieldsValue(),
          isOnlyQueryErrorData: errorCheckedRef.current,
          isOnlyQueryUnconfirmData: UnconfirmDataRef.current,
          userBusinessLineList: [business],
        },
        operationRecords: null,
      };
    }else{
      params = {
        searchCondition: null,
        operationRecords: {
          recordIdList: recordIdList
        }
      };
    }
    deleteBVIData(params).then((res) => {
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

  // insert
  const insertFormData = () => {
    formData
      .validateFields()
      .then((values) => {
        const params = {
          id: formData.getFieldValue('id') || '',
          are: formData.getFieldValue('are'),
          companyCode: formData.getFieldValue('companyCode'),
          product: formData.getFieldValue('productName'),
          productId: formData.getFieldValue('productId'),
          costCenter: formData.getFieldValue('costCenter'),
          customerDivision: formData.getFieldValue('customerDivision'),
          bvi: formData.getFieldValue('bvi'),
          totalAmount: formData.getFieldValue('totalAmount'),
          poPercentage: formData.getFieldValue('poPercentage'),
          po: formData.getFieldValue('po'),
          comment: formData.getFieldValue('comment') || '',
          bviMonth: formData.getFieldValue('bviMonth').format('YYYYMM'),
          isTag: formData.getFieldValue('adjustTag'),
          billingARE: formData.getFieldValue('billingARE'),
          billingCostCenter: formData.getFieldValue('billingCostCenter'),
          templateType: formData.getFieldValue('templateType') || '',
          batchNo: formData.getFieldValue('batchNo') || '',
          businessLine: formData.getFieldValue('businessLine'),
        };

        InsertBVIData(params).then((res) => {
          if (res.isSuccess) {
            message.success(res.msg);
            setShowBviData(false);
            formData.resetFields();
            setCustomerDivision('');
            getData();
          } else {
            message.error(res.msg);
          }
        });
      })
      .catch((e) => {});
  };
  // edit
  const editFormData = () => {
    formData
      .validateFields()
      .then((values) => {
        const params = {
          bviList: [
            {
              id: formData.getFieldValue('id') || '',
              are: formData.getFieldValue('are'),
              companyCode: formData.getFieldValue('companyCode'),
              product: formData.getFieldValue('productName'),
              productId: formData.getFieldValue('productId'),
              costCenter: formData.getFieldValue('costCenter'),
              customerDivision: formData.getFieldValue('customerDivision'),
              bvi: formData.getFieldValue('bvi'),
              totalAmount: formData.getFieldValue('totalAmount'),
              poPercentage: formData.getFieldValue('poPercentage'),
              po: formData.getFieldValue('po'),
              comment: formData.getFieldValue('comment') || '',
              bviMonth: formData.getFieldValue('bviMonth').format('YYYYMM'),
              isTag: formData.getFieldValue('adjustTag'),
              billingARE: formData.getFieldValue('billingARE'),
              billingCostCenter: formData.getFieldValue('billingCostCenter'),
              templateType: formData.getFieldValue('templateType'),
              batchNo: formData.getFieldValue('batchNo'),
              businessLine: formData.getFieldValue('businessLine'),
            },
          ],
        };
        EditBVIData(params).then((res) => {
          if (res.isSuccess) {
            message.success(res.msg);
            setShowBviData(false);
            formData.resetFields();
            setCustomerDivision('');
            getData();
          } else {
            message.error(res.msg);
          }
        });
      })
      .catch((e) => {});
  };
  // 批量edit
  const editDataListSaveFn = () => {
    formDataEdit
      .validateFields()
      .then((values) => {
        const idList = [];
        selectedRows.forEach((item, index) => {
          idList.push(item.id);
        });
        const params = {
          billingARE: formDataEdit.getFieldValue('billingARE'),
          billingCostCenter: formDataEdit.getFieldValue('billingCostCenter'),
          recordIdList:
            idList.length != 0 ? idList : [formDataEdit.getFieldValue('id')],
        };
        console.log(params);
        EditDataListSave(params).then((res) => {
          if (res.isSuccess) {
            message.success(res.msg);
            setEditListMark(false);
            formDataEdit.resetFields();
            getData();
          } else {
            message.error(res.msg);
          }
        });
      })
      .catch((e) => {});
  };
  const _getProduct = () => {
    proForm
      .validateFields()
      .then((values) => {
        getProductData({
          ...values,
          pageIndex: proCurrent,
          pageSize: proSize,
        }).then((res) => {
          if (res.isSuccess) {
            setProductData(res.data);
            setProTotal(res.totalCount);
          } else {
            message.error(res.msg);
          }
        });
      })
      .catch((e) => {});
  };

  return {
    pageName,
    AuthWrapper, checkAuth ,
    form,
    formData,
    formImport,
    selectedRowKeys,
    total,
    current,
    selectedRows,
    pageSize,
    componentDisabled,
    showBviData,
    showImport,
    tableData,
    isSearch,
    setIsSearch,
    isCheckOriginal,
    checkData,
    changePageSize,
    getCheckOriginalData,
    setShowBviData,
    setComponentDisabled,
    deleteInfos,
    onPageChange,
    importExcel,
    copyDataMethod,
    setSelectedRowKeys,
    recheckDataAction,
    confirmDataAction,
    unconfirmDataAction,
    onExport,
    setShowImport,
    setSelectedRows,
    setIsCheckOriginal,
    groupName,
    setGroupName,
    getData,
    exportExcelAction,
    unconfirmChecked,
    setUnconfirmData,
    setErrorChecked,
    errorChecked,

    //
    insertFormData,
    editFormData,
    latestGroupIdRef,
    errorCheckedRef,
    UnconfirmDataRef,
    setCurrent,
    showPro,
    setShowPro,
    proForm,
    proCurrent,
    setProCurrent,
    proSize,
    setProSize,
    productData,
    setProductData,
    proTotal,
    setProTotal,
    _getProduct,
    selectProKeys,
    setSelectProKeys,
    selectProductRow,
    setSelectProductRow,
    editDataListSaveFn,
    editListMark,
    setEditListMark,
    customerDivision,
    setCustomerDivision,
    formDataEdit,
    columns,
    onExportOriginal,
    isP2PMark,
    setIsP2PMark,
    isViewMark,
    setIsViewMark,
    SyncDataSave,
    //
    costcenterCols,
    showCostcenter,
    setShowCostcenter,
    costcenterData,
    setcostcenterData,
    costCenterVal,
    setCostCenterVal,
    customerDivisionVal,
    setCustomerDivisionVal,
    selectCostCenterkeys,
    setSelectCostCenterkeys,
    selectCostCenterRows,
    setSelectCostCenterRows,
    costcenterCurrent,
    setCostCenterCurrent,
    costcenterPageSize,
    setCostcenterPageSize,
    costcenterTotal,
    setCostcenterTotal,
    businesslineOptions,
    business,
    setBusiness,
    bviComponentDisabled, setBviComponentDisabled,
    isSelectAll, setIsSelectAll
  };
};
