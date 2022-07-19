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
  //
  FreezeData,
  ExportBillingData,
  QueryData,
  QuickEditDataSave,
  EditDataSaveBill,
  EditDataSpecialSave,
  SetStatusSave,
  BatchFileManual,
  BatchFileAuto,
  AllocationFile,
} from '@/app/request/apiBilling';
import { formatDate, objectToFormData } from '@/tools/utils';
import { Form, message, Modal, notification } from 'antd';
const businesslineOptions = JSON.parse(sessionStorage.getItem('businessLines'));
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
  const [customerDivision, setCustomerDivision] = useState(''); //用于比对
  const [formDataEdit] = Form.useForm();
  //
  const [successMark, setSuccessMark] = useState(false);
  const [isSingelEdit, setIsSingelEdits] = useState(false);
  const [billingStatusGroup, setBillingStatusGroup] = useState([
    {
      label: 'Freeze',
      value: '1',
    },
    {
      label: 'Successfully',
      value: '2',
    },
    {
      label: 'Manual To SAP',
      value: '3',
    },
    {
      label: 'Auto To SAP',
      value: '4',
    },
    {
      label: 'Waiting For SAP',
      value: '5',
    },
    {
      label: 'PostPone',
      value: '6',
    },
    {
      label: 'Unfreeze',
      value: '7',
    },
    {
      label: 'Obsolete',
      value: '8',
    },

    // {
    //   label: 'Cancel',
    //   value: 'Cancel',
    // },
    // {
    //   label: 'Error',
    //   value: 'Error',
    // },
  ]);
  const [business, setBusiness] = useState([businesslineOptions[0]]);
  //
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
  const getCheckOriginalData = (event, _data) => {
    event.stopPropagation();
    setCheckOriginalParam(_data);
    getAbnormalOriginDataByBVI([_data]).then((res) => {
      if (res.isSuccess) {
        setIsCheckOriginal(true);
        setCheckData(res.data.body || []);
        _generateHead(res.data.header || []);
        // setCols(res.data.head||[])
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
    if (!business || !business.length) {
      message.warning('Please select [Bussiness Line]!');
      return;
    }
    let params = {
      searchCondition: {
        filterGroup: {
          recordId: latestGroupIdRef.current,
        },
        listHeader: form.getFieldsValue(),
        isOnlyQueryErrorData: errorCheckedRef.current,
        isOnlyQueryUncompleteData: UnconfirmDataRef.current,
        userBusinessLineList: business,
      },
      orderCondition: {
        [orderField]: orderType == 'ascend' ? 0 : 1,
      },
      pageIndex: current,
      pageSize: pageSize,
    };
    // bviGroupQuery(params).then((res) => {
    QueryData(params).then((res) => {
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
  }, [current, pageSize, orderField, orderType]);
  // }导入数据
  const importExcel = () => {
    formImport
      .validateFields()
      .then((values) => {
        const fd = new FormData();
        objectToFormData(values.file[0], fd, 'file');
        importDataSave(fd, values.type).then((res) => {
          setShowImport(false);
          formImport.resetFields();
          if (res.isSuccess) {
            message.success('Submit success!');
            getData();
          } else {
            message.error(res.msg);
          }
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
    let recordList = selectedRows.filter((item) => !!item.error);
    if (!recordList || !recordList.length) {
      message.error('No data to recheck is selected');
      return;
    }
    if (!selectedRowKeys.length) {
      message.warning('No information selected!');
      return;
    }
    message.success('Operation succeeded!');
    setSelectedRowKeys([]);
  };
  const confirmDataAction = (recordIdList) => {
    confirmData({ recordIdList }).then((res) => {
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
    unConfirmData({ recordIdList }).then((res) => {
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
        isOnlyQueryErrorData: errorCheckedRef.current,
        isOnlyQueryUncompleteData: UnconfirmDataRef.current,
      },
      orderCondition: {
        [orderField]: orderType == 'ascend' ? 0 : 1,
      },
      current,
      pageSize: pageSize,
    };
    ExportBillingData(params).then((res: any) => {
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
    deleteBVIData({
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
          templateType: formData.getFieldValue('templateType'),
          batchNo: formData.getFieldValue('batchNo'),
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
  // 多种编辑
  const editDataListSaveFn = () => {
    formDataEdit
      .validateFields()
      .then((values) => {
        const idList = [];
        selectedRows.forEach((item, index) => {
          idList.push(item.id);
        });
        console.log(selectedRowKeys);
        let params = {};
        if (isSingelEdit) {
          if (!successMark) {
            params = {
              billingStatus: formDataEdit.getFieldValue('billingStatus'),
              billingARE: formDataEdit.getFieldValue('billingARE'),
              billingCostCenter:
                formDataEdit.getFieldValue('billingCostCenter'),
              billingPO: formDataEdit.getFieldValue('billingPO'),

              salesOrder: formDataEdit.getFieldValue('salesOrder'),
              billingDoc: formDataEdit.getFieldValue('billingDoc'),
              itemNo: formDataEdit.getFieldValue('itemNo'),
              amountInCurrecy: formDataEdit.getFieldValue('amountInCurrecy'),
              currencyInSAP: formDataEdit.getFieldValue('currencyInSAP'),
              amountInLocalCurrencyCNY: formDataEdit.getFieldValue(
                'amountInLocalCurrencyCNY',
              ),
              billingDate: formDataEdit.getFieldValue('billingDate'),
              sapExchangeRate: formDataEdit.getFieldValue('exchangeRate'),
              id: formDataEdit.getFieldValue('id'),
            };
            EditDataSpecialSave(params).then((res) => {
              if (res.isSuccess) {
                message.success(res.msg);
                setEditListMark(false);
                formDataEdit.resetFields();
                getData();
              } else {
                message.error(res.msg);
              }
            });
          } else {
            params = {
              billingStatus: formDataEdit.getFieldValue('billingStatus'),
              billingARE: formDataEdit.getFieldValue('billingARE'),
              billingCostCenter:
                formDataEdit.getFieldValue('billingCostCenter'),
              billingPO: formDataEdit.getFieldValue('billingPO'),
              id: formDataEdit.getFieldValue('id'),
            };
            EditDataSaveBill(params).then((res) => {
              if (res.isSuccess) {
                message.success(res.msg);
                setEditListMark(false);
                formDataEdit.resetFields();
                getData();
              } else {
                message.error(res.msg);
              }
            });
          }
        } else {
          params = {
            billingARE: formDataEdit.getFieldValue('billingARE'),
            billingCostCenter: formDataEdit.getFieldValue('billingCostCenter'),
            billingPO: formDataEdit.getFieldValue('billingPO'),
            recordIdList:
              idList.length != 0 ? idList : [formDataEdit.getFieldValue('id')],
          };
          QuickEditDataSave(params).then((res) => {
            if (res.isSuccess) {
              message.success(res.msg);
              setEditListMark(false);
              formDataEdit.resetFields();
              getData();
            } else {
              message.error(res.msg);
            }
          });
        }
      })
      .catch((e) => {});
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
            setProductData(res.data);
            setProTotal(res.totalCount);
          } else {
            message.error(res.msg);
          }
        });
      })
      .catch((e) => {});
  };

  // freeze
  const freezeDataMethod = () => {
    FreezeData({}).then((res) => {
      if (res.isSuccess) {
        getData();
        setSelectedRowKeys([]);
        message.success(res.msg);
      } else {
        message.error(res.msg);
      }
    });
  };
  const setStatusFun = (statusIndex) => {
    const statusMark = selectedRows.some((item) => {
      return item.totalAmout < 0 && item.chargeType == 'ICC';
    });
    const statusUNfreezzMark = selectedRows.some((item) => {
      return (
        item.billingStatus == 'Successfully' || item.billingStatus == 'Cancel'
      );
    });
    console.log(statusUNfreezzMark);
    let params = {
      billingStatus: statusIndex,
      recordIdList: selectedRowKeys,
    };
    switch (statusIndex) {
      case 1:
        break;
      case 2:
        break;
      case 3:
        if (statusMark) {
          message.error('Please repeat the selection');
          return;
        }
        break;
      case 4:
        if (statusMark) {
          message.error('Please repeat the selection');
          return;
        }
        break;
      case 5:
        break;
      case 6:
        break;
      case 7:
        if (statusUNfreezzMark) {
          message.error('Please repeat the selection');
          return;
        }
        break;
      case 8:
        break;
      case 9:
        params.billingStatus = 0;
        break;
      case 10:
        params.billingStatus = -1;
        break;
    }
    SetStatusSave(params).then((res) => {
      if (res.isSuccess) {
        getData();
        setSelectedRowKeys([]);
        message.success(res.msg);
        if (statusIndex == 7) {
          notification.open({
            message: 'Tip',
            description:
              'Please add the relevant information about SAP recharge',
          });
        }
      } else {
        message.error(res.msg);
      }
    });
  };
  const ImportFlieFn = (index) => {
    // let date = `yyyyMM=${new Date().getFullYear()}${new Date().getMonth()+1}`;
    switch (index) {
      case 1:
        BatchFileManual({}).then((res) => {
          exportFun(res, 'BatchFileManual');
        });
        break;
      case 2:
        BatchFileAuto({}).then((res) => {
          exportFun(res, 'BatchFileAuto');
        });
        break;
      case 3:
        AllocationFile({}).then((res) => {
          exportFun(res, 'AllocationFile');
        });
        break;
    }
  };

  const exportFun = (res: any, exportName: any) => {
    if (res.response.status == 200) {
      let elink = document.createElement('a');
      elink.download = `${exportName}.xlsx`;
      elink.href = window.URL.createObjectURL(
        new Blob([res.response.data as unknown as BlobPart]),
      );
      // elink.href = window.URL.createObjectURL(new Blob([res.response?.data]));
      elink.click();
      window.URL.revokeObjectURL(elink.href);
    } else {
      message.error(res.response.statusText);
    }
  };

  return {
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
    //
    freezeDataMethod,
    successMark,
    setSuccessMark,
    isSingelEdit,
    setIsSingelEdits,
    setStatusFun,
    ImportFlieFn,
    billingStatusGroup,
    business,
    setBusiness,
    businesslineOptions,
  };
};
