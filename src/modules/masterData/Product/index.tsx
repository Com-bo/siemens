import React, { useState, useEffect, useRef, Key } from 'react';
import {
  BtnThemeWrap,
  ContentWrap,
  FilterGroupDiv,
  FormTableDiv,
  TableTitleDiv,
  TableTopDiv,
  TaleTitleIconDiv,
} from '@/assets/style';
import TableList from '@/modules/components/TableMixInline';
import TableMix from '@/components/Table';
import {
  Button,
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
  Row,
  Select,
  Space,
  Table,
  Tooltip,
  Upload,
} from 'antd';
import moment from 'moment';
import './style.less';
import DebounceSelect from '@/components/Select/debounceSelect';
import search from '@/assets/images/search.png';
import {
  DownOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import FilterGroup from '@/modules/components/FilterGroup';
const pageName = 'Product';
import {
  getServiceLineList,
  ProductPoDrop,
  queryBusinesslineOptionsList,
  queryDictionaryInfo,
} from '@/app/request/common';

import {
  deletePOData,
  deleteProductData,
  editProductDataSave,
  exportProductData,
  importProductData,
  queryProductListData,
  queryProductLogData,
} from '@/app/request/apiProduct';
import { AuthWrapper, checkAuth } from '@/tools/authCheck';
import FormTable from '@/components/FormTable/formTable';
import { _GraphQueryableInstance } from '@pnp/graph/graphqueryable';
export const Index = (props: any) => {
  const [form] = Form.useForm();
  const [formData] = Form.useForm();
  const [poForm] = Form.useForm();
  const [tableData, setTableData] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [total, setTotal] = useState(0);
  const [current, setCurrent] = useState(1);
  const [isSearch, setIsSearch] = useState(true);
  const [pageSize, setPageSize] = useState(20);
  const [showProData, setShowProData] = useState(false);
  const [componentDisabled, setComponentDisabled] = useState(false);
  const [filterBusinessLine, setFilterBusinessLine] = useState('');
  const [poData, setPoData] = useState([{}]);
  const [showLog, setShowLog] = useState(false);
  const [logId, setLogId] = useState('');
  const [logData, setLogData] = useState([]);
  const [logSize, setLogSize] = useState(20);
  const [logCurrent, setLogCurrent] = useState(1);
  const [logTotal, setLogTotal] = useState(0);
  const [currency, setCurrency] = useState([]);
  const [systemTag, setSystemTag] = useState([]);
  const [isPOByPercentage, setIsPOByPercentage] = useState(false);
  const orignalCols: any = [
    {
      name: 'businessLine',
      title: 'Business Line',
      width: '150px',
      titleRender: 'input',
      // titleRender: 'input',
      // sorter: true,
    },
    {
      name: 'serviceLine',
      title: 'Service Line',
      width: '150px',
      titleRender: 'input',
    },
    {
      name: 'customerDivision',
      title: 'CustomerDivision',
      width: '150px',
      titleRender: 'input',
    },
    {
      name: 'are',
      title: 'ARE',
      width: '100px',
      titleRender: 'input',
    },
    {
      name: 'productName',
      title: 'ProductName',
      width: '200px',
      titleRender: 'input',
    },
    {
      name: 'startDate',
      title: 'StartDate',
      width: '150px',
      render: (text) =>
        text && moment(text).isValid()
          ? moment(text).format('YYYY-MM-DD')
          : text,
    },
    {
      name: 'endDate',
      title: 'EndDate',
      width: '150px',
      render: (text) =>
        text && moment(text).isValid()
          ? moment(text).format('YYYY-MM-DD')
          : text,
    },
    {
      name: 'productNameForReport',
      title: 'Product Name for Report',
      width: '180px',
      titleRender: 'input',
    },
    {
      name: 'signed',
      title: 'Signed',
      width: '120px',
      render: (text) => (text === true ? 'Yes' : text === false ? 'No' : text),
    },
    {
      title: 'SignedDate',
      width: '120px',
      name: 'signedDate',
      render: (text) =>
        text && moment(text).isValid()
          ? moment(text).format('YYYY-MM-DD')
          : text,
    },
    {
      title: 'GSC_ID',
      width: '180px',
      name: 'gscId',
      titleRender: 'input',
    },
    {
      title: 'BVIDescription',
      width: '180px',
      name: 'bviDescription',
      titleRender: 'input',
    },
    {
      title: 'GSCDescription',
      width: '180px',
      name: 'gscDescription',
      titleRender: 'input',
    },
    {
      title: 'UnitPrice',
      width: '180px',
      name: 'unitPrice',
    },
    {
      title: 'UnitPriceCurrency',
      width: '180px',
      name: 'unitPriceCurrency',
      titleRender: 'input',
    },
    {
      title: 'BillingCurrency',
      width: '180px',
      name: 'billingCurrency',
      titleRender: 'input',
    },
    {
      title: 'Comments',
      width: '180px',
      name: 'comments',
      titleRender: 'input',
    },
    {
      title: 'MaterialNumber',
      width: '180px',
      name: 'materialNumber',
      titleRender: 'input',
    },
    {
      title: 'MandotoryBVI',
      width: '150px',
      name: 'mandotoryBVI',
      render: (text) => (text ? 'Yes' : 'No'),
    },
    {
      title: 'SystemTag',
      width: '150px',
      name: 'systemTag',
      titleRender: 'input',
    },
    {
      title: 'BillingLocation',
      width: '150px',
      name: 'billingLocation',
      titleRender: 'input',
    },
    {
      title: 'Alt.tax classific.',
      width: '180px',
      name: 'altTaxClassific',
      titleRender: 'input',
    },
    {
      title: 'Sender PC',
      width: '150px',
      name: 'senderPC',
      titleRender: 'input',
    },
    {
      title: 'Individual Invoice',
      width: '150px',
      name: 'individualInvoice',
      titleRender: 'input',
      render: (text) => (text === true ? 'Yes' : text === false ? 'No' : text),
    },

    {
      title: 'SOItemNumber',
      width: '150px',
      name: 'soItemNumber',
      titleRender: 'input',
    },

    {
      title: 'Quarterly Charge',
      width: '150px',
      name: 'quarterlyCharge',
      titleRender: 'input',
      render: (text) => (text === true ? 'Yes' : text === false ? 'No' : text),
    },
    {
      title: 'BillingMonthTag',
      width: '150px',
      name: 'billingMonthTag',
      titleRender: 'input',
    },
    {
      title: 'IsPOByPercentage',
      width: '120px',
      name: 'isPOByPercentage',
      render: (text) => (text === true ? 'Yes' : text === false ? 'No' : text),
    },
    {
      name: 'Operate',
      title: 'Operate',
      width: '200px',
      fixed: 'right',
      render: (text, record, index) => (
        <Space>
          {/* <AuthWrapper functionName={pageName} authCode={[`${pageName}-Edit`]} ></AuthWrapper> */}
          <Tooltip title="Edit">
            <Button
              type="text"
              key="1"
              icon={<EditOutlined />}
              onClick={() => {
                setShowProData(true);
                formData.setFieldsValue({
                  ...record,
                  startDate:
                    record.startDate && moment(record.startDate).isValid()
                      ? moment(record.startDate)
                      : null,
                  endDate:
                    record.endDate && moment(record.endDate).isValid()
                      ? moment(record.endDate)
                      : null,
                  signedDate:
                    record.signedDate && moment(record.signedDate).isValid()
                      ? moment(record.signedDate)
                      : null,
                });
                // 获取po
                ProductPoDrop({
                  productId: record.id,
                  poNumber: '',
                }).then((res) => {
                  if (res.isSuccess) {
                    setPoData(res.data || []);
                  } else {
                    message.error(res.msg);
                  }
                });
              }}
            ></Button>
          </Tooltip>
          <Popconfirm
            title="Confirm to delete?"
            onConfirm={(event) => deleteInfos([record.id], event)}
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
          <Tooltip title="Log">
            <Button
              type="text"
              key="4"
              icon={<i className="gbs gbs-logs"></i>}
              onClick={(event) => {
                event.stopPropagation();
                toLog(record.id);
              }}
            ></Button>
          </Tooltip>
        </Space>
      ),
    },
  ];
  const deleteInfos = (recordIdList: Array<any>, event) => {
    event.stopPropagation();
    Modal.confirm({
      title: 'Tips',
      icon: <ExclamationCircleOutlined />,
      content: 'Confirm to delete the selected data?',
      okText: 'Confirm',
      cancelText: 'Cancel',
      onOk: () => {
        deleteProductData({
          recordIdList,
        }).then((res) => {
          if (res.isSuccess) {
            message.success('Deletion succeeded!');
            if (current == 1) {
              getData();
            } else {
              setCurrent(1);
            }
          } else {
            message.error(res.msg);
          }
        });
      },
      centered: true,
    });
  };
  const latestGroupIdRef = useRef<any>();
  const getData = () => {
    let params = {
      searchCondition: {
        filterGroup: {
          recordId: latestGroupIdRef.current,
        },
        listHeader: form.getFieldsValue(),
      },
      orderCondition: {
        //   [orderField]: orderType == 'ascend' ? 0 : 1,
      },
      pageIndex: current,
      pageSize: pageSize,
    };
    queryProductListData(params).then((res) => {
      if (res.isSuccess) {
        setTableData(res.data);
        setTotal(res.totalCount);
        setSelectedRowKeys([]);
      } else {
        message.error(res.msg);
      }
    });
  };

  useEffect(() => {
    getData();
  }, [current, pageSize]);
  const onPageChange = (pagination, filters, sorter, extra) => {
    setCurrent(pagination.current);
  };

  const changePageSize = (val: number) => {
    setCurrent(1);
    setPageSize(val);
  };
  const toLog = (id: string) => {
    // 日志列表接口
    setLogId(id);
    if (logCurrent !== 1) {
      setLogCurrent(1);
    } else {
      _getLogData(id);
    }
    setShowLog(true);
  };
  const _getLogData = (_id?: string) => {
    if (!_id && !logId) {
      return;
    }
    queryProductLogData({
      recordId: _id || logId,
      pageIndex: logCurrent,
      pageSize: logSize,
    }).then((res) => {
      if (res.isSuccess) {
        setLogData(res.data || []);
        setLogTotal(res.totalCount);
      } else {
        message.error(res.msg);
      }
    });
  };

  const exportExcelAction = () => {
    let params = {
      searchCondition: {
        filterGroup: {
          recordId: latestGroupIdRef.current,
        },
        listHeader: form.getFieldsValue(),
      },
      orderCondition: {
        //   [orderField]: orderType == 'ascend' ? 0 : 1,
      },
      pageIndex: current,
      pageSize: pageSize,
    };

    exportProductData(params).then((res: any) => {
      if (res.response.status == 200) {
        let elink = document.createElement('a');
        // 设置下载文件名
        elink.download = 'Product List.xlsx';
        elink.href = window.URL.createObjectURL(new Blob([res.response?.data]));
        elink.click();
        window.URL.revokeObjectURL(elink.href);
      } else {
        message.error(res.response.statusText);
      }
    });
  };
  const importExcel = (file) => {
    const fd = new FormData();
    fd.append('file', file);
    importProductData(fd).then((res) => {
      if (res.isSuccess) {
        message.success(
          <>
            {res.msg}
            <Divider type="vertical" />
            Success:{res.data?.successCount || 0}
            <Divider type="vertical" />
            No import required:{res.data?.notRequiredCount || 0}
            <Divider type="vertical" />
            Error:{res.data?.errorCount || 0}
            <Divider type="vertical" />
            Total:{res.data?.totalCount || 0}
          </>,
        );
        getData();
      } else {
        message.error(
          <>
            {res.msg}
            <Divider type="vertical" />
            Success:{res.data?.successCount || 0}
            <Divider type="vertical" />
            No import required:{res.data?.notRequiredCount || 0}
            <Divider type="vertical" />
            Error:{res.data?.errorCount || 0}
            <Divider type="vertical" />
            Total:{res.data?.totalCount || 0}
          </>,
        );
      }
    });
  };
  const getinitForm = () => {
    queryDictionaryInfo({
      groupName: 'Constants',
      key: 'Currency',
      subkey: '',
      isOnlyEnable: true,
    })
      .then((res) => {
        if (res.isSuccess) {
          setCurrency(res.data);
        } else {
          console.error(res.msg);
        }
        return queryDictionaryInfo({
          groupName: 'Constants',
          key: 'SystemTag',
          subkey: '',
          isOnlyEnable: true,
        });
      })
      .then((result) => {
        if (result.isSuccess) {
          setSystemTag(result.data);
        } else {
          console.error(result.msg);
        }
      });
  };

  const poCols: any = [
    {
      title: 'Index',
      align: 'center',
      width: '70px',
      render: (text, record, index) => {
        return index + 1;
      },
    },
    {
      title: 'Sold-to Party',
      dataIndex: 'soldToParty',
      key: 'soldToParty',
      align: 'center',
      editable: true,
      renderT: (inputRef, save, record, dataIndex) => {
        return (
          <Form.Item
            rules={[{ required: true, message: '' }]}
            style={{ margin: 0 }}
            name="soldToParty"
          >
            <Input ref={inputRef} onPressEnter={save} onBlur={save} />
          </Form.Item>
        );
      },
    },
    {
      title: 'Org.ID',
      dataIndex: 'orgID',
      key: 'orgID',
      align: 'center',
      editable: true,
      renderT: (inputRef, save, record, dataIndex) => {
        return (
          <Form.Item
            rules={[{ required: true, message: '' }]}
            style={{ margin: 0 }}
            name="orgID"
          >
            <Input ref={inputRef} onPressEnter={save} onBlur={save} />
          </Form.Item>
        );
      },
    },
    {
      title: 'PO Number',
      dataIndex: 'poNumber',
      key: 'poNumber',
      align: 'center',
      editable: true,
      renderT: (inputRef, save, record, dataIndex) => {
        return (
          <Form.Item
            rules={[{ required: true, message: '' }]}
            style={{ margin: 0 }}
            name="poNumber"
          >
            <Input ref={inputRef} onPressEnter={save} onBlur={save} />
          </Form.Item>
        );
      },
    },
    {
      title: 'Percentage',
      dataIndex: 'poPercentage',
      key: 'poPercentage',
      align: 'center',
      editable: true,
      renderT: (inputRef, save, record, dataIndex) => {
        return (
          <Form.Item
            rules={[{ required: true, message: '' }]}
            style={{ margin: 0 }}
            name="poPercentage"
          >
            <InputNumber
              ref={inputRef}
              onPressEnter={save}
              onBlur={save}
              min={0}
              max={1}
              precision={2}
              disabled={!isPOByPercentage}
            />
          </Form.Item>
        );
      },
    },
    {
      title: 'Overhead Key',
      dataIndex: 'overheadKey',
      key: 'overheadKey',
      align: 'center',
      editable: true,
      renderT: (inputRef, save, record, dataIndex) => {
        return (
          <Form.Item style={{ margin: 0 }} name="overheadKey">
            <Input ref={inputRef} onPressEnter={save} onBlur={save} />
          </Form.Item>
        );
      },
    },
    {
      title: 'Print. Con., Del., Inv.',
      dataIndex: 'printConDelInv',
      key: 'printConDelInv',
      align: 'center',
      editable: true,
      renderT: (inputRef, save, record, dataIndex) => {
        return (
          <Form.Item
            // rules={[{ required: true, message: '' }]}
            style={{ margin: 0 }}
            name="printConDelInv"
          >
            <Input ref={inputRef} onPressEnter={save} onBlur={save} />
          </Form.Item>
        );
      },
    },
    {
      title: 'Operation',
      dataIndex: 'operation',
      key: 'operation',
      align: 'center',
      render: (text, record, index) => (
        <Space>
          {index == 0 ? (
            <Tooltip title="Add">
              <Button
                type="text"
                icon={<PlusOutlined />}
                onClick={() => {
                  if (formData.getFieldValue('isPOByPercentage') === false) {
                    setPoData([...poData, { poPercentage: 1 }]);
                  } else {
                    setPoData([...poData, {}]);
                  }
                }}
              ></Button>{' '}
            </Tooltip>
          ) : (
            ''
          )}
          <Popconfirm
            title="Confirm to delete?"
            onConfirm={(event) => {
              var list = JSON.parse(JSON.stringify(poData));
              if (record.id) {
                //  调用删除接口
                deletePOData({ recordIdList: [record.id] }).then((res) => {
                  if (res.isSuccess) {
                    if (poData.length == 1) {
                      setPoData([{}]);
                    } else {
                      setPoData(list.filter((x, rIndex) => rIndex != index));
                    }
                  } else {
                    message.error(res.msg);
                  }
                });
              } else {
                if (poData.length == 1) {
                  if (formData.getFieldValue('isPOByPercentage') === false) {
                    setPoData([{ poPercentage: 1 }]);
                  } else {
                    setPoData([{}]);
                  }
                } else {
                  setPoData(list.filter((x, rIndex) => rIndex != index));
                }
              }
            }}
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
      width: '180px',
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
  ];
  useEffect(() => {
    _getLogData();
  }, [logCurrent, logSize]);
  const handleLogSize = (val: number) => {
    setLogCurrent(1);
    setLogSize(val);
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
  const validEndDate = () => {
    if (
      formData.getFieldValue('endDate') &&
      formData.getFieldValue('startDate') &&
      formData.getFieldValue('startDate') >= formData.getFieldValue('endDate')
    ) {
      return Promise.reject(
        new Error('The end time cannot be earlier than the start time'),
      );
    } else {
      return Promise.resolve();
    }
  };
  const onSave = () => {
    // 判断IsPOByPercentage
    let sum = 0;
    let ponums = [];
    // 验证po
    for (let i = 0; i < poData.length; i++) {
      let _product: any = poData[i];
      if (!_product?.soldToParty) {
        message.warning(`Index ${i + 1} ,please input Sold-to Party `);
        return;
      }
      if (!_product.orgID) {
        message.warning(`Index ${i + 1} ,please input Org.ID`);
        return;
      }
      if (!_product.poNumber) {
        message.warning(`Index ${i + 1} ,please input PO Number`);
        return;
      }
      if (ponums.indexOf(_product.poNumber) != -1) {
        message.warning(`Index ${i + 1} ,PO Number should not be repeated `);
        return;
      }
      if (_product.poPercentage === 0) {
        message.warning(
          `Index ${
            i + 1
          } ,Percentage need to be greater than zero and less than 1 `,
        );
        return;
      }
      if (
        formData.getFieldValue('isPOByPercentage') == false &&
        _product.poPercentage != 1
      ) {
        message.warning(`Index ${i + 1} ,Percentage should be 1 `);
        return;
      }
      ponums.push(_product.poNumber);
      sum += _product.poPercentage;
    }
    if (formData.getFieldValue('isPOByPercentage')) {
      // 和为1
      if (sum !== 1) {
        message.warning(`The sum of percentage should be 1  `);
        return;
      }
    }
    editProductDataSave({
      productInfo: {
        id: formData.getFieldValue('id') || null,
        ...formData.getFieldsValue(),
        startDate: moment(formData.getFieldValue('startDate')).format(
          'YYYY-MM-DD',
        ),
        endDate: moment(formData.getFieldValue('endDate')).format('YYYY-MM-DD'),
        signedDate: moment(formData.getFieldValue('signedDate')).format(
          'YYYY-MM-DD',
        ),
      },
      productPoList: poData,
    }).then((res) => {
      if (res.isSuccess) {
        message.success(res.msg);
        setShowProData(false);
        formData.resetFields();
        getData();
      } else {
        message.error(res.msg);
      }
    });
  };

  return (
    <ContentWrap>
      {/* 日志查询 */}
      <Modal
        width="1200px"
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
            data={logData.map((item) => {
              return {
                key: Math.random(),
                ...item,
              };
            })}
            current={logCurrent}
            pageSize={logSize}
            total={logTotal}
            handlePageSize={handleLogSize}
            onPageChange={onLogPageChange}
            scrollY="calc(100vh - 420px)"
            pagination={true}
          />
        </div>
      </Modal>
      {/* 新增Product */}
      <Modal
        maskClosable={false}
        width="1200px"
        title={
          <TableTopDiv style={{ margin: 0 }}>
            <TableTitleDiv style={{ float: 'left' }}>
              <TaleTitleIconDiv>
                <span></span>
              </TaleTitleIconDiv>
              <span style={{ verticalAlign: 'middle', fontSize: '20px' }}>
                Product Data
              </span>
            </TableTitleDiv>
          </TableTopDiv>
        }
        visible={showProData}
        footer={null}
        onCancel={() => {
          setShowProData(false);
          formData.resetFields();
        }}
      >
        <Form form={formData} labelCol={{ flex: '140px' }}>
          <Row gutter={20}>
            <Col span={24}>
              <Form.Item
                label="Product Name"
                name="productName"
                rules={[{ required: true }]}
              >
                <Input disabled={componentDisabled} />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                labelCol={{ flex: '180px' }}
                label="Product Name for Report"
                name="productNameForReport"
                rules={[{ required: true }]}
              >
                <Input disabled={componentDisabled} />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="Bussiness Line"
                name="businessLine"
                rules={[{ required: true }]}
              >
                <DebounceSelect
                  initFlag
                  onChange={(value, data) => {
                    setFilterBusinessLine(value);
                    formData.setFieldsValue({
                      serviceLine: '',
                    });
                  }}
                  getoptions={(options) => {
                    return options?.map((x, index) => {
                      return (
                        <Select.Option key={index} data={x} value={x.value}>
                          {x.label}
                        </Select.Option>
                      );
                    });
                  }}
                  delegate={(e) => {
                    return queryBusinesslineOptionsList({
                      keywords: e,
                    });
                  }}
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="Service Line"
                name="serviceLine"
                rules={[{ required: true }]}
              >
                <DebounceSelect
                  initFlag
                  onChange={(value, data) => {}}
                  getoptions={(options) => {
                    return options?.map((x, index) => {
                      return (
                        <Select.Option key={index} data={x} value={x.value}>
                          {x.label}
                        </Select.Option>
                      );
                    });
                  }}
                  delegate={(e) => {
                    return getServiceLineList({
                      businessLine: filterBusinessLine,
                      keywords: e,
                    });
                  }}
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="ARE" name="are" rules={[{ required: true }]}>
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="Customer Division"
                name="customerDivision"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="FiscalYear"
                name="fiscalYear"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="Start Date"
                name="startDate"
                rules={[{ required: true }]}
              >
                <DatePicker
                  disabled={componentDisabled}
                  format="YYYY-MM-DD"
                  style={{ width: '100%' }}
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="End Date"
                name="endDate"
                rules={[{ required: true }, { validator: validEndDate }]}
              >
                <DatePicker
                  disabled={componentDisabled}
                  format="YYYY-MM-DD"
                  style={{ width: '100%' }}
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="Signed"
                name="signed"
                rules={[{ required: true }]}
              >
                <Select allowClear>
                  <Select.Option value={true as unknown as Key}>
                    Yes
                  </Select.Option>
                  <Select.Option value={false as unknown as Key}>
                    No
                  </Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Signed Date" name="signedDate">
                <DatePicker
                  disabled={componentDisabled}
                  format="YYYY-MM-DD"
                  style={{ width: '100%' }}
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="Material Number"
                name="materialNumber"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
            </Col>

            <Col span={8}>
              <Form.Item
                label="GSC_ID"
                name="gscId"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="BVI_description" name="bviDescription">
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="GSC_description"
                name="gscDescription"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="Individual Invoice"
                name="individualInvoice"
                rules={[{ required: true }]}
              >
                <Select allowClear>
                  <Select.Option value={true as unknown as Key}>
                    Yes
                  </Select.Option>
                  <Select.Option value={false as unknown as Key}>
                    No
                  </Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="Unit Price"
                name="unitPrice"
                rules={[{ required: true }]}
              >
                <InputNumber style={{ width: '100%' }} />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="Unit Price Currency"
                name="unitPriceCurrency"
                rules={[{ required: true }]}
              >
                <Select allowClear>
                  {currency.map((item, index) => (
                    <Select.Option value={item?.value} key={index}>
                      {item?.value}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="Billing Currency"
                name="billingCurrency"
                rules={[{ required: true }]}
              >
                <Select allowClear>
                  {currency.map((item, index) => (
                    <Select.Option value={item?.value} key={index}>
                      {item?.value}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="BillingLocation"
                name="billingLocation"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="Alt.tax Classific."
                name="altTaxClassific"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="Sender PC"
                name="senderPC"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="MandotoryBVI"
                name="mandotoryBVI"
                rules={[{ required: true }]}
              >
                <Select allowClear>
                  <Select.Option value={true as unknown as Key}>
                    Yes
                  </Select.Option>
                  <Select.Option value={false as unknown as Key}>
                    No
                  </Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="SystemTag"
                name="systemTag"
                rules={[{ required: true }]}
              >
                <Select allowClear>
                  {systemTag.map((item, index) => (
                    <Select.Option value={item?.value} key={index}>
                      {item?.value}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="Quarterly Charge"
                name="quarterlyCharge"
                rules={[{ required: true }]}
              >
                <Select allowClear>
                  <Select.Option value={true as unknown as Key}>
                    Yes
                  </Select.Option>
                  <Select.Option value={false as unknown as Key}>
                    No
                  </Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="BillingMonth Tag"
                name="billingMonthTag"
                rules={[{ required: true }]}
              >
                <Select allowClear>
                  <Select.Option value="Last Month">Last Month</Select.Option>
                  <Select.Option value="Current Month">
                    Current Month
                  </Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="SOItemNumber"
                name="soItemNumber"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="IsPOByPercentage"
                name="isPOByPercentage"
                rules={[{ required: true }]}
              >
                <Select
                  allowClear
                  onChange={(val: any) => {
                    setIsPOByPercentage(val);
                    if (val === false) {
                      let data = Object.assign([], poData);
                      data.map((item: any) => (item.poPercentage = 1));
                      setPoData([...data]);
                    }
                  }}
                >
                  <Select.Option value={true as unknown as Key}>
                    Yes
                  </Select.Option>
                  <Select.Option value={false as unknown as Key}>
                    No
                  </Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={24} style={{ marginBottom: '20px' }}>
              <FormTableDiv>
                <FormTable
                  dataSource={poData.map((x, index) => {
                    return {
                      ...x,
                      key: Math.random(),
                    };
                  })}
                  setDataSource={setPoData}
                  pagination={false}
                  columns={poCols}
                />
              </FormTableDiv>
            </Col>
            <Col span={24}>
              <Form.Item label="Comments" name="comments">
                <Input.TextArea />
              </Form.Item>
            </Col>
            <Col span={24} style={{ textAlign: 'center' }}>
              <Space size={40}>
                <Button
                  type="primary"
                  onClick={() => {
                    formData
                      .validateFields()
                      .then((valid) => {
                        onSave();
                      })
                      .catch((e) => {});
                  }}
                >
                  Save
                </Button>
                <Button
                  onClick={() => {
                    setShowProData(false);
                    formData.resetFields();
                  }}
                >
                  Cancel
                </Button>
              </Space>
            </Col>
          </Row>
        </Form>
      </Modal>
      <TableList
        headerSearch={getData}
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
        renderFilterGroup={
          <FilterGroup
            moudleName="Product"
            authPagename={pageName}
            onSearch={(val) => {
              latestGroupIdRef.current = val;
              getData();
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
          <Space>
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
                    <Menu.Item key="2" icon={<i className="gbs gbs-add"></i>}>
                      <Button
                        style={{ margin: '0 10px' }}
                        type="text"
                        onClick={() => {
                          setShowProData(true);
                          setPoData([{}]);
                          // 获取po列表接口
                          getinitForm();
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
                        <a href="./template/Product.xlsx">Download Template</a>
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
            <Button
              onClick={(event) => deleteInfos(selectedRowKeys, event)}
              disabled={selectedRowKeys.length == 0}
            >
              Delete
            </Button>
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
        }
        changePageSize={changePageSize}
        current={current}
        search={isSearch}
        rowKey="id"
        listName="Product"
      />
    </ContentWrap>
  );
};
export default Index;
