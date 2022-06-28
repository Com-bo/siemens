import React, { useEffect, useState } from 'react';
import TableList from '@/modules/components/TableMixInline';
import {
  Button,
  Divider,
  Dropdown,
  Menu,
  Modal,
  Popconfirm,
  Space,
  Table,
  Form,
  message,
  Input,
  Row,
  Col,
  Radio,
  Upload,
  Tooltip,
  Checkbox,
  DatePicker,
  Switch,
  InputNumber,
  Select,
} from 'antd';
const { Option } = Select;
import {
  DownOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
  UploadOutlined,
} from '@ant-design/icons';
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
  ContentWrap,
} from '@/assets/style';
import {
  getCompanyCodeDrop,
  getCostCenterDrop,
  ProductPoDrop,
} from '@/app/request/common';
import search from '@/assets/images/search.png';
import FilterGroup from '@/modules/components/FilterGroup';
import useService from './useServise';
import TableMix from '@/components/Table';
import DebounceSelect from '@/components/Select/debounceSelect';
import moment from 'moment';
import { forEach } from 'lodash';
import Item from 'antd/lib/list/Item';
export default (props: any) => {
  const {
    form,
    formData,
    formImport,
    selectedRowKeys,
    total,
    current,
    selectedRows,
    pageSize,
    getData,
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
    exportExcelAction,
    unconfirmChecked,
    setUnconfirmData,
    setErrorChecked,
    errorChecked,
    columns,
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
    onExportOriginal,

    //
    successMark,
    setSuccessMark,
    freezeDataMethod,
    isSingelEdit,
    setIsSingelEdits,
    setStatusFun,

    ImportFlieFn,
  } = useService(props);
  const orignalCols = [
    {
      name: 'soNumber',
      title: 'SO Number',
      width: '200px',
      titleRender: 'input',
      sorter: true,
    },
    {
      name: 'businessLine',
      title: 'Business Line',
      width: '100px',
      sorter: true,
    },
    {
      name: 'serviceLine',
      title: 'ServiceLine',
      width: '150px',
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
      name: 'companyCode',
      title: 'Company Code',
      width: '120px',
      titleRender: 'input',
      sorter: true,
    },
    {
      name: 'customerDevision',
      title: 'Customer Division',
      width: '100px',
      titleRender: 'input',
      sorter: true,
    },
    {
      name: 'bu',
      title: 'BU',
      width: '100px',
      sorter: true,
    },
    {
      name: 'soldToParty',
      title: 'sold-to party',
      width: '100px',
      titleRender: 'input',
      sorter: true,
    },
    {
      name: 'billingPO',
      title: 'Billing PO',
      width: '100px',
      titleRender: 'input',
      sorter: true,
    },
    {
      name: 'materialNumber',
      title: 'Material number',
      width: '100px',
      titleRender: 'input',
      sorter: true,
    },
    {
      name: 'bvi',
      title: 'BVI',
      width: '100px',
      sorter: true,
      render: (text, record, index) => {
        if (record.validationMsg) {
          return (
            <BtnTextRedWrap color="red">
              <Button
                type="text"
                // onClick={(evt) => getCheckOriginalData(evt, record)}
                icon={<ExclamationCircleOutlined />}
              >
                {text}
              </Button>
            </BtnTextRedWrap>
          );
        } else {
          return (
            <BtnTextRedWrap>
              <Button
                type="text"
                // onClick={(evt) => getCheckOriginalData(evt, record)}
              >
                {text}
              </Button>
            </BtnTextRedWrap>
          );
        }
      },
    },
    {
      name: 'productUnitPrice',
      title: 'Product Unit Price',
      width: '100px',
      sorter: true,
    },
    {
      name: 'totalAmout',
      title: 'Total Amount(Unit Price Currency)',
      width: '180px',
      sorter: true,
    },

    //
    {
      name: 'BatchFile Exchange Rate',
      title: 'BatchFile Exchange Rate',
      width: '180px',
      sorter: true,
    },
    //
    {
      name: 'billingCurrency',
      title: 'Billing Currency',
      width: '180px',
      sorter: true,
      titleRender: 'input',
    },
    {
      name: 'altTaxClassific',
      title: 'Alt.tax classific',
      width: '180px',
      sorter: true,
    },
    {
      name: 'billingARE',
      title: 'Billing ARE',
      width: '100px',
      titleRender: 'input',
      sorter: true,
    },
    {
      name: 'billingCostCenter',
      title: 'Billing Cost Center',
      width: '150px',
      titleRender: 'input',
      sorter: true,
    },
    {
      name: 'materialSalesTextCustomerTextZ003',
      title: 'Material Sales Text & Customer Text (z003)',
      width: '250px',
      titleRender: 'input',
      sorter: true,
    },
    {
      name: 'salesOrder',
      title: 'Sales Order',
      width: '100px',
      titleRender: 'input',
      sorter: true,
    },
    {
      name: 'billingDoc',
      title: 'Billing Doc.',
      width: '100px',
      titleRender: 'input',
      sorter: true,
    },
    {
      name: 'billingStatus',
      title: 'Billing Status',
      width: '100px',
      titleRender: 'input',
      sorter: true,
    },
    {
      name: 'billingErrorMsg',
      title: 'billing Error Message',
      width: '200px',
      sorter: true,
    },
    {
      name: 'itemNo',
      title: 'Item No.',
      width: '200px',
      sorter: true,
    },
    {
      title: 'Amount in Currecy',
      width: '150px',
      name: 'amountInCurrecy',
      sorter: true,
    },
    {
      title: 'Currency in SAP',
      width: '150px',
      name: 'currencyInSAP',
      sorter: true,
    },
    {
      title: 'Amount in Local Currency(CNY)',
      width: '240px',
      name: 'amountInLocalCurrencyCNY',
      sorter: true,
    },
    {
      title: 'Billing Date',
      width: '180px',
      name: 'billingDate',
      sorter: true,
      render: (text) =>
        text && moment(text).isValid()
          ? moment(text).format('YYYY-MM-DD HH:mm:ss')
          : text,
    },
    {
      title: 'SAP Exchange Rate',
      width: '150px',
      name: 'sapExchangeRate',
      sorter: true,
    },
    {
      title: 'Data Type',
      width: '180px',
      name: 'dataType',
      sorter: true,
      titleRender: 'input',
    },
    {
      name: 'bviMonth',
      title: 'BVI Month',
      width: '100px',
      sorter: true,
    },
    {
      name: 'adjustTag',
      title: 'AdjustTag',
      width: '100px',
      titleRender: 'input',
      sorter: true,
      render: (text) => (text === false ? 'Yes' : 'No'),
    },
    {
      name: 'quarterlyCharge',
      title: 'Quarterly Charge',
      width: '150px',
      titleRender: 'input',
      sorter: true,
    },
    {
      name: 'seTag',
      title: 'SETag',
      width: '100px',
      titleRender: 'input',
      sorter: true,
    },
    {
      name: 'billingMonth',
      title: 'Billing Month',
      width: '100px',
      sorter: true,
    },
    {
      name: 'period',
      title: 'Period',
      width: '100px',
      sorter: true,
    },
    {
      name: 'chargeType',
      title: 'ChargeType',
      width: '100px',
      titleRender: 'input',
      sorter: true,
    },
    //
    {
      name: 'modifiedTag',
      title: 'modifiedTag',
      width: '100px',
      titleRender: 'input',
      sorter: true,
    },
    //
    {
      name: 'modifiedUser',
      title: 'Modified User',
      width: '200px',
      titleRender: 'input',
      sorter: true,
    },
    {
      name: 'modifiedDate',
      title: 'Modified Date',
      width: '200px',
      sorter: true,
      render: (text) =>
        text && moment(text).isValid()
          ? moment(text).format('YYYY-MM-DD HH:mm:ss')
          : text,
    },

    {
      name: 'Operate',
      title: 'Operate',
      width: '100px',
      fixed: 'right',
      render: (text, record, index) => (
        <Space>
          <Button
            type="text"
            key="1"
            icon={<EditOutlined />}
            onClick={(event) => {
              event.stopPropagation();
              console.log(record);
              setEditListMark(true);
              setIsSingelEdits(true);
              formDataEdit.setFieldsValue({
                ...record,
                billingDate: record.billingDate
                  ? moment(record.billingDate)
                  : null,
              });
              if (formDataEdit.getFieldValue('billingStatus') == 'Successful') {
                setSuccessMark(false);
              } else {
                setSuccessMark(true);
              }
            }}
          ></Button>
        </Space>
      ),
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

  const savefilterGroup = () => {
    console.log('please save  filter group interface');
  };

  const uploadProps = {
    beforeUpload: () => {
      return false;
    },
  };

  const copyData = () => {
    Modal.confirm({
      title: 'Tips',
      icon: <ExclamationCircleOutlined />,
      content: 'Confirm copying selected data?',
      okText: 'Confirm',
      cancelText: 'Cancel',
      onOk: () => {
        copyDataMethod();
      },
      centered: true,
    });
  };
  const toConfirm = (selectIds) => {
    Modal.confirm({
      title: 'Tips',
      icon: <ExclamationCircleOutlined />,
      content: 'Confirm to confirm the selected data?',
      okText: 'Confirm',
      cancelText: 'Cancel',
      onOk: () => {
        confirmDataAction(selectIds);
      },
      centered: true,
    });
  };
  const toUnconfirm = (selectIds) => {
    Modal.confirm({
      title: 'Tips',
      icon: <ExclamationCircleOutlined />,
      content: 'UnConfirm to confirm the selected data?',
      okText: 'Confirm',
      cancelText: 'Cancel',
      onOk: () => {
        unconfirmDataAction(selectIds);
      },
      centered: true,
    });
  };
  const toRecheck = () => {
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
  };

  //
  const checkOriginalOptions = {
    validationMsg: '300px',
    productName: '200px',
  };
  const handleProSize = (val: number) => {
    setProSize(val);
  };
  const onProPageChange = (pagination, filters, sorter, extra) => {
    setProCurrent(pagination.current);
  };
  const selectProSure = () => {
    setShowPro(false);
    let data = selectProductRow[0];
    formData.setFieldsValue({
      businessLine: data.businessLine,
      are: data.are,
      serviceLine: data.serviceLine,
      customerDivision: data.customerDivision,
      productName: data.productName,
      productId: data.id,
      po: null,
    });
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

  // const submitData = () => {
  //   if (formData.getFieldValue('id')) {
  //     editFormData();
  //   } else {
  //     insertFormData();
  //   }
  // };
  // const onRodioChange = (e) => {
  //   if (e.target.value == 8) {
  //     setIsP2PMark(true);
  //   } else {
  //     setIsP2PMark(false);
  //   }
  // };

  //
  // freeze
  const freezeData = () => {
    Modal.confirm({
      title: 'Tips',
      icon: <ExclamationCircleOutlined />,
      content: 'Confirm freeze?',
      okText: 'Confirm',
      cancelText: 'Cancel',
      onOk: () => {
        freezeDataMethod();
      },
      centered: true,
    });
  };
  const billingStatusGroup = [
    {
      label: 'Successful',
      value: 'Successful',
    },
    {
      label: 'Freeze',
      value: 'Freeze',
    },
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
  const handleChangebus = (val: string) => {
    if (val == 'Successful') {
      setSuccessMark(false);
    } else {
      setSuccessMark(true);
    }
  };
  //
  return (
    <ContentWrap>
      {/* 导入 */}
      <Modal
        width="800px"
        title={
          <TableTopDiv style={{ margin: 0 }}>
            <TableTitleDiv style={{ float: 'left' }}>
              <TaleTitleIconDiv>
                <span></span>
              </TaleTitleIconDiv>
              <span style={{ verticalAlign: 'middle', fontSize: '20px' }}>
                Import Data
              </span>
            </TableTitleDiv>
          </TableTopDiv>
        }
        footer={null}
        visible={showImport}
        maskClosable={false}
        destroyOnClose={true}
        onCancel={() => {
          formImport.resetFields();
          setShowImport(false);
        }}
      >
        <Form form={formImport} labelCol={{ flex: '100px' }}>
          <Form.Item label="Type" name="type" rules={[{ required: true }]}>
            <Radio.Group>
              <Radio value={1}>UIPath Result</Radio>
              <Radio value={2}>CHN_SD_TEXTDISP REPORT</Radio>
              <Radio value={3}>ASP_SD_VF05 Report</Radio>
            </Radio.Group>
          </Form.Item>
          (
          <Form.Item
            label="File"
            name="file"
            valuePropName="fileList"
            getValueFromEvent={(e) => {
              if (Array.isArray(e)) {
                return e;
              }
              return e && e.fileList;
            }}
            rules={[{ required: true }]}
          >
            <Upload
              maxCount={1}
              accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel"
              {...uploadProps}
            >
              <Button key="import" type="text" icon={<UploadOutlined />}>
                <span>Upload</span>
              </Button>
            </Upload>
          </Form.Item>
          )
          <Form.Item style={{ textAlign: 'center' }}>
            <Space size={60}>
              <Button type="primary" onClick={importExcel}>
                Submit
              </Button>
              <Button>Cancel</Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
      {/* 编辑*/}
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
                BVI Data
              </span>
            </TableTitleDiv>
          </TableTopDiv>
        }
        visible={showBviData}
        footer={null}
        onCancel={() => {
          setShowBviData(false);
          formData.resetFields();
        }}
      >
        <Form
          requiredMark={!componentDisabled}
          form={formData}
          labelCol={{ flex: '120px' }}
        >
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

            {formData.getFieldValue('id') ? (
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
                rules={[{ validator: validCostCenterRequired }]}
              >
                {formData.getFieldValue('are') == '5547' &&
                formData.getFieldValue('productName') ? (
                  <DebounceSelect
                    initFlag
                    onChange={(value, data) => {
                      if (
                        value &&
                        data.customerDivision !=
                          formData.getFieldValue('customerDivision')
                      ) {
                        setCustomerDivision(data.customerDivision);
                      }
                    }}
                    getoptions={(options) => {
                      return options?.map((x, index) => {
                        return (
                          <Select.Option
                            key={index}
                            data={x}
                            value={x.costCenter}
                          >
                            {x.costCenter}
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
                      return getCostCenterDrop({
                        are: formData.getFieldValue('are'),
                        costCenter: e,
                      });
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
                  // {
                  //   pattern:
                  //     /^([1-9]\d*(\.\d{1,2})?|([0](\.([0][1-9]|[1-9]\d{0,1}))))$/,
                  //   message: 'Greater than zero and two decimal places at most',
                  // },
                ]}
              >
                <InputNumber
                  disabled={componentDisabled}
                  // min={0}
                  style={{ width: '100%' }}
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="PO" name="po" rules={[{ required: true }]}>
                <DebounceSelect
                  initFlag
                  disabled={componentDisabled}
                  getoptions={(options) => {
                    console.log(options);
                    return options?.map((x, index) => {
                      return (
                        <Select.Option key={index} data={x} value={x.poNumber}>
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
                  disabled={componentDisabled}
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
            <Col span={8}>
              <Form.Item
                label="Billing ARE"
                name="billingARE"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="Billing Cost Center"
                name="billingCostCenter"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="BVI" name="bvi" rules={[{ required: true }]}>
                <InputNumber
                  disabled={componentDisabled}
                  // min={0}
                  style={{ width: '100%' }}
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="poPercentage"
                name="poPercentage"
                rules={[{ required: true }]}
              >
                <Input disabled={componentDisabled} />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="adjustTag"
                name="adjustTag"
                valuePropName="checked"
              >
                <Switch
                  disabled={componentDisabled}
                  onChange={(val) => {
                    formData.setFieldsValue({
                      adjustTag: val,
                    });
                  }}
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="BVI Month"
                name="bviMonth"
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
            <Col span={24}>
              <Form.Item label="Comment" name="comment">
                <Input.TextArea disabled={componentDisabled} />
              </Form.Item>
            </Col>
            {
              <Col span={24}>
                <Form.Item style={{ textAlign: 'center' }}>
                  <Space size={60}>
                    {/* <Button type="primary" onClick={submitData}>
                      Submit
                    </Button> */}
                    <Button
                      onClick={() => {
                        setShowBviData(false);
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
      {/* 批量编辑*/}
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
                BILLING Data
              </span>
            </TableTitleDiv>
          </TableTopDiv>
        }
        visible={editListMark}
        footer={null}
        onCancel={() => {
          setEditListMark(false);
          formDataEdit.resetFields();
        }}
      >
        <Form
          requiredMark={!componentDisabled}
          form={formDataEdit}
          labelCol={{ flex: '120px' }}
        >
          <Row gutter={20}>
            {isSingelEdit ? (
              <Col span={12}>
                <Form.Item label="Billing Status" name="billingStatus">
                  <Select
                    // defaultValue={billingStatus[0].value}
                    onChange={handleChangebus}
                  >
                    {renderOption(billingStatusGroup)}
                  </Select>
                </Form.Item>
              </Col>
            ) : (
              ''
            )}
            <Col span={12}>
              <Form.Item label="Billing ARE" name="billingARE">
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Billing PO" name="billingPO">
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Billing Cost Center" name="billingCostCenter">
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="salesOrder" name="salesOrder">
                <Input disabled={successMark} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="billingDoc" name="billingDoc">
                <Input disabled={successMark} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="itemNo" name="itemNo">
                <Input disabled={successMark} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="amountInCurrecy" name="amountInCurrecy">
                <Input disabled={successMark} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="currencyInSAP" name="currencyInSAP">
                <Input disabled={successMark} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Amount in Local Currency(CNY)"
                name="amountInLocalCurrencyCNY"
              >
                <Input disabled={successMark} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="billingDate" name="billingDate">
                <DatePicker
                  disabled={successMark}
                  picker="month"
                  format="YYYYMM"
                  style={{ width: '100%' }}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="SAP Exchange Rate" name="exchangeRate">
                <Input disabled={successMark} />
              </Form.Item>
            </Col>
            {
              <Col span={24}>
                <Form.Item style={{ textAlign: 'center' }}>
                  <Space size={60}>
                    <Button type="primary" onClick={editDataListSaveFn}>
                      Submit
                    </Button>
                    <Button
                      onClick={() => {
                        setEditListMark(false);
                        formDataEdit.resetFields();
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
      {/* 产品列表 */}
      <Modal
        width="1200px"
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
        onCancel={() => {
          // formImport.resetFields();
          setShowPro(false);
        }}
      >
        <Form form={proForm} labelCol={{ flex: '120px' }}>
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
                name="customerDevision"
                rules={[{ required: true }]}
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
      {/* 查看 */}
      <Modal
        maskClosable={false}
        title={
          <TableTopDiv style={{ margin: 0 }}>
            <TableTitleDiv style={{ float: 'left' }}>
              <TaleTitleIconDiv>
                <span></span>
              </TaleTitleIconDiv>
              <span style={{ verticalAlign: 'middle', fontSize: '20px' }}>
                Check Original List
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

        <div style={{ margin: '20px auto 40px', textAlign: 'center' }}>
          <Button type="primary" onClick={onExportOriginal}>
            Export
          </Button>
        </div>
      </Modal>
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
            moudleName="Billing Data"
            onSearch={(val) => {
              latestGroupIdRef.current = val;
              getData(val);
            }}
            onClear={() => {
              setErrorChecked(false);
              setUnconfirmData(false);
              errorCheckedRef.current = false;
              UnconfirmDataRef.current = false;
              latestGroupIdRef.current = '';
              form.resetFields();
              if (current != 1) {
                setCurrent(1);
              } else {
                getData();
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
                  checked={unconfirmChecked}
                  onChange={(e) => {
                    UnconfirmDataRef.current = e.target.checked;
                    setUnconfirmData(e.target.checked);
                  }}
                >
                  View all unconfirm Data
                </Checkbox>
              </>
            }
          />
        }
        renderBtns={
          <Space>
            <BtnOrangeWrap>
              <Button onClick={freezeData}>Freeze</Button>
            </BtnOrangeWrap>
            <BtnThemeWrap color="grass">
              <Button
                disabled={!selectedRowKeys.length}
                onClick={() => {
                  setEditListMark(true);
                  setSuccessMark(true);
                  if (selectedRowKeys.length == 1) {
                    setIsSingelEdits(true);
                    formDataEdit.setFieldsValue({
                      ...selectedRows[0],
                      billingDate: selectedRows[0].billingDate
                        ? moment(selectedRows[0].billingDate)
                        : null,
                    });
                    if (
                      formDataEdit.getFieldValue('billingStatus') ==
                      'Successful'
                    ) {
                      setSuccessMark(false);
                    } else {
                      setSuccessMark(true);
                    }
                  } else {
                    setIsSingelEdits(false);
                  }
                }}
              >
                Quick Edit
              </Button>
            </BtnThemeWrap>
            <BtnThemeWrap color="blue">
              <Dropdown
                trigger={['click']}
                overlay={() => (
                  <Menu>
                    <Menu.Item key="1">
                      <span style={{ margin: '0 10px' }}>Freeze</span>
                    </Menu.Item>
                    <Menu.Item key="2">
                      <span style={{ margin: '0 10px' }}>Unfreeze</span>
                    </Menu.Item>
                    <Menu.Item key="3">
                      <span style={{ margin: '0 10px' }}>Auto To SAP</span>
                    </Menu.Item>
                    <Menu.Item key="4">
                      <span style={{ margin: '0 10px' }}>Manual To SAP</span>
                    </Menu.Item>
                    <Menu.Item key="5">
                      <span style={{ margin: '0 10px' }}>PostPone</span>
                    </Menu.Item>
                    <Menu.Item key="6">
                      <span style={{ margin: '0 10px' }}>Obsolete</span>
                    </Menu.Item>
                    <Menu.Item key="7">
                      <span
                        style={{ margin: '0 10px' }}
                        onClick={() => {
                          setStatusFun();
                        }}
                      >
                        Successfully
                      </span>
                    </Menu.Item>
                  </Menu>
                )}
              >
                <Button>
                  <Space>
                    Set Status
                    <DownOutlined />
                  </Space>
                </Button>
              </Dropdown>
            </BtnThemeWrap>
            <Divider
              type="vertical"
              style={{ height: '20px', borderColor: '#999' }}
            />
            <BtnThemeWrap>
              <Button>Export</Button>
            </BtnThemeWrap>
            <BtnThemeWrap color="blue">
              <Dropdown
                trigger={['click']}
                overlay={() => (
                  <Menu>
                    <Menu.Item key="1">
                      <span
                        style={{ margin: '0 10px' }}
                        onClick={() => {
                          ImportFlieFn(1);
                        }}
                      >
                        Batch File-Manual
                      </span>
                    </Menu.Item>
                    <Menu.Item key="2">
                      <span
                        style={{ margin: '0 10px' }}
                        onClick={() => {
                          ImportFlieFn(2);
                        }}
                      >
                        Batch File-Auto
                      </span>
                    </Menu.Item>
                    <Menu.Item key="3">
                      <span
                        style={{ margin: '0 10px' }}
                        onClick={() => {
                          ImportFlieFn(3);
                        }}
                      >
                        Allocation File
                      </span>
                    </Menu.Item>
                  </Menu>
                )}
              >
                <Button>
                  <Space>
                    Generate Report
                    <DownOutlined />
                  </Space>
                </Button>
              </Dropdown>
            </BtnThemeWrap>
            <BtnThemeWrap>
              <Button onClick={() => setShowImport(true)}>Import</Button>
            </BtnThemeWrap>
            <BtnThemeWrap>
              <Button>Generate Customer Report</Button>
            </BtnThemeWrap>
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
      />
    </ContentWrap>
  );
};
