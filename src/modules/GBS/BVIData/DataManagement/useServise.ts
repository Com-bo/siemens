import { useState, useEffect } from 'react';
import {
  bivCopyDta,
  bviGroupQuery,
  confirmData,
  deleteBVIData,
  exportExcel,
  importDataSave,
  unConfirmData,
  InsertBVIData,
} from '@/app/request/apiBVI';
import { formatDate, objectToFormData } from '@/tools/utils';
import { Form, message, Modal } from 'antd';

export default (props: any) => {
  const [tableData, setTableData] = useState([]);
  const [isSearch, setIsSearch] = useState(true);
  const [isCheckOriginal, setIsCheckOriginal] = useState(false);
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
  const [unconfirmChecked, setUnconfirmData] = useState(false);
  const [errorChecked, setErrorData] = useState(false);
  //
  const [isTag, setIsTag] = useState(true);
  const [delMark, setDelMark] = useState(false);
  const [groupId, setGroupId] = useState('');
  const [orderFeild, setOrderFeild] = useState('modifiedDate');
  const [orderType, setOrderType] = useState('descend');

  //
  const getCheckOriginalData = (event) => {
    event.stopPropagation();
    setIsCheckOriginal(true);
    setCheckData([]);
  };
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

    let params = {
      searchCondition: {
        filterGroup: {
          recordId: groupId || recordId,
        },
        listHeader: form.getFieldsValue(),
        isOnlyQueryErrorData: errorChecked,
      },
      orderCondition: {
        [orderFeild]: orderType == 'ascend' ? 0 : 1,
      },
      current,
      pageSize: pageSize,
    };
    bviGroupQuery(params).then((res) => {
      if (res.isSuccess) {
        console.log('显示数据', res);
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
  const onPageChange = (pagination, filters, sorter, extra) => {
    //   翻页|排序|筛选
    setCurrent(pagination.current);
    switch (extra.action) {
      case 'paginate':
        setCurrent(pagination.current);
        break;
      case 'sort':
        break;
      default:
        break;
    }
  };
  useEffect(() => {
    getData();
  }, [current, pageSize, orderFeild, orderType]);
  // }导入数据
  const importExcel = () => {
    formImport
      .validateFields()
      .then((values) => {
        console.log(values);
        const fd = new FormData();
        objectToFormData(values.file[0], fd, 'file');
        importDataSave(fd, values.type).then((res) => {
          setShowImport(false);
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
    exportExcel({
      pageIndex: current,
      pageSize: pageSize,
      searchCondition: form.getFieldsValue(),
    }).then((res: any) => {
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
  const saveFormData = () => {
    formData
      .validateFields()
      .then((values) => {
        console.log(values);
        const params = {
          id: formData.getFieldValue('orgId') || '',
          are: formData.getFieldValue('are'),
          companyCode: formData.getFieldValue('companyCode'),
          product: formData.getFieldValue('product'),
          productId: formData.getFieldValue('productId'),
          bvi: formData.getFieldValue('bvi'),
          poPercentage: formData.getFieldValue('poPercentage'),
          costCenter: formData.getFieldValue('costCenter'),
          totalAmount: formData.getFieldValue('totalAmount'),
          po: formData.getFieldValue('po'),
          isTag: formData.getFieldValue('isTag'),
          billingARE: formData.getFieldValue('billingARE'),
          billingCostCenter: formData.getFieldValue('billingCostCenter'),
          comment: formData.getFieldValue('comment') || '',
          bviMonth: formData.getFieldValue('bviMonth').format('YYYYMM'),
        };
        console.log(params);
        InsertBVIData(params).then((res) => {
          if (res.isSuccess) {
            message.success(res.msg);
            setShowBviData(false);
            formData.resetFields();
            // setCustomerDivision('');
            getData();
          } else {
            message.error(res.msg);
          }
        });
      })
      .catch((e) => {});
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
    setErrorData,
    errorChecked,

    //
    saveFormData,
    setIsTag,
    isTag,
    setDelMark,
    delMark,
  };
};
