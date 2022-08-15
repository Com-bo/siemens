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
import { CustomerReportBuildReport } from '@/app/request/apiCustomerReport';
import search from '@/assets/images/search.png';
import FilterGroup from '@/modules/components/FilterGroup';
import useService from './useServise';
import moment from 'moment';
export default (props: any) => {
  const {
    pageName,
    AuthWrapper,
    checkAuth,
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

    editDataListSaveFn,
    editListMark,
    setEditListMark,
    customerDivision,
    setCustomerDivision,
    formDataEdit,
    successMark,
    setSuccessMark,
    freezeDataMethod,
    isSingelEdit,
    setIsSingelEdits,
    setStatusFun,

    ImportFlieFn,
    billingStatusGroup,
    // -----
    setBusiness,
    business,
    businesslineOptions,
    initialState,
    setInitialState,
    ReportMonthMark,
    setReportMonthMark,
    ReportMonth,
    setReportMonth,
    isSelectAll,
    setIsSelectAll,
  } = useService(props);
  const orignalCols = [
    {
      name: 'billingStatus',
      title: 'Billing Status',
      width: '200px',
      titleRender: 'input',
      sorter: true,
    },
    {
      name: 'businessLine',
      title: 'Business Line',
      width: '200px',
      sorter: true,
    },
    {
      name: 'billingARE',
      title: 'Billing ARE',
      width: '200px',
      titleRender: 'input',
      sorter: true,
    },
    {
      name: 'companyCode',
      title: 'Company Code',
      width: '200px',
      titleRender: 'input',
      sorter: true,
    },
    {
      name: 'billingCostCenter',
      title: 'Billing Cost Center',
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
      name: 'totalAmout',
      title: 'Total Amount(Unit Price Currency)',
      width: '200px',
      sorter: true,
      render: (text, record, index) => {
        let temptype = true;
        if (
          record.templateType == 'Flat Charge' ||
          record.templateType == 'H2R BVI Template' ||
          record.templateType == 'BVI Manual Template' ||
          (record.templateType == 'P2P BCS Template' &&
            record.userno != 'ROBOT_MICHAEL')
        ) {
          temptype = true;
        } else {
          temptype = false;
        }
        if (record?.error) {
          return (
            <Tooltip title={record.error}>
              <BtnTextRedWrap color="red">
                <Button
                  type="text"
                  onClick={(evt) => {
                    evt.stopPropagation();
                    if (temptype) {
                    } else {
                      getCheckOriginalData(
                        evt,
                        record.materialSalesTextCustomerTextZ003,
                      );
                    }
                  }}
                  icon={<ExclamationCircleOutlined />}
                >
                  {text}
                </Button>
              </BtnTextRedWrap>
            </Tooltip>
          );
        } else {
          return (
            <BtnTextRedWrap>
              <Button
                type="text"
                onClick={(evt) => {
                  evt.stopPropagation();
                  if (temptype) {
                    message.error('Check source data is not supported');
                  } else {
                    getCheckOriginalData(
                      evt,
                      record.materialSalesTextCustomerTextZ003,
                    );
                  }
                }}
              >
                {text}
              </Button>
            </BtnTextRedWrap>
          );
        }
      },
    },
    {
      name: 'soldToParty',
      title: 'Sold-To Party',
      width: '200px',
      titleRender: 'input',
      sorter: true,
    },
    {
      name: 'billingPO',
      title: 'Billing PO',
      width: '200px',
      titleRender: 'input',
      sorter: true,
    },
    {
      name: 'materialNumber',
      title: 'Material Number',
      width: '200px',
      titleRender: 'input',
      sorter: true,
    },
    {
      name: 'bvi',
      title: 'BVI',
      width: '100px',
      sorter: true,
      render: (text, record, index) => {
        let temptype = true;
        if (
          record.templateType == 'Flat Charge' ||
          record.templateType == 'H2R BVI Template' ||
          record.templateType == 'BVI Manual Template' ||
          (record.templateType == 'P2P BCS Template' &&
            record.userno != 'ROBOT_MICHAEL')
        ) {
          temptype = true;
        } else {
          temptype = false;
        }
        if (record?.error) {
          return (
            <Tooltip title={record.error}>
              <BtnTextRedWrap color="red">
                <Button
                  type="text"
                  onClick={(evt) => {
                    evt.stopPropagation();
                    if (temptype) {
                    } else {
                      getCheckOriginalData(
                        evt,
                        record.materialSalesTextCustomerTextZ003,
                      );
                    }
                  }}
                  icon={<ExclamationCircleOutlined />}
                >
                  {text}
                </Button>
              </BtnTextRedWrap>
            </Tooltip>
          );
        } else {
          return (
            <BtnTextRedWrap>
              <Button
                type="text"
                onClick={(evt) => {
                  evt.stopPropagation();
                  if (temptype) {
                    message.error('Check source data is not supported');
                  } else {
                    getCheckOriginalData(
                      evt,
                      record.materialSalesTextCustomerTextZ003,
                    );
                  }
                }}
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
      width: '200px',
      sorter: true,
    },
    {
      name: 'billingUnitPrice',
      title: 'Billing Unit Price',
      width: '200px',
    },

    {
      name: 'bu',
      title: 'BU',
      width: '100px',
      titleRender: 'input',
      sorter: true,
    },
    //
    // {
    //   name: 'billingCurrency',
    //   title: 'Billing Currency',
    //   width: '200px',
    //   sorter: true,
    //   titleRender: 'input',
    // },
    {
      name: 'altTaxClassific',
      title: 'Alt.tax Classific',
      width: '200px',
      titleRender: 'input',
      sorter: true,
    },
    {
      name: 'materialSalesTextCustomerTextZ003',
      title: 'Material Sales Text & Customer Text (Z003)',
      width: '350px',
      titleRender: 'input',
      sorter: true,
    },
    {
      name: 'soNumber',
      title: 'So Number',
      width: '100px',
      titleRender: 'input',
    },
    {
      name: 'salesOrder',
      title: 'Sales Order',
      width: '200px',
      titleRender: 'input',
      sorter: true,
    },
    {
      name: 'billingDoc',
      title: 'Billing Doc.',
      width: '200px',
      titleRender: 'input',
      sorter: true,
    },
    {
      name: 'billingErrorMsg',
      title: 'Billing Error Message',
      width: '200px',
      titleRender: 'input',
    },
    {
      name: 'itemNo',
      title: 'Item No.',
      width: '200px',
      sorter: true,
      titleRender: 'input',
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
          ? moment(text).format('YYYY-MM-DD')
          : text,
    },
    {
      title: 'SAP Exchange Rate',
      width: '200px',
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
      name: 'adjustTag',
      title: 'AdjustTag',
      width: '100px',
      render: (text) => (text === null ? '' : text === false ? 'No' : 'Yes'),
    },
    {
      name: 'quarterlyCharge',
      title: 'Quarterly Charge',
      width: '150px',
      render: (text) => (text == 0 ? 'No' : 'Yes'),
    },
    {
      name: 'seTag',
      title: 'SETag',
      width: '100px',
      render: (text) => (text == 0 ? 'No' : 'Yes'),
    },
    {
      name: 'bviMonth',
      title: 'BVI Month',
      width: '200px',
      sorter: true,
      titleRender: 'input',
    },
    {
      name: 'billingMonth',
      title: 'Billing Month',
      width: '200px',
      sorter: true,
      titleRender: 'input',
      // render: (text) =>
      //   text && moment(text).isValid()
      //     ? moment(text).format('YYYY-MM-DD HH:mm:ss')
      //     : text,
    },
    {
      name: 'period',
      title: 'Period',
      width: '100px',
      sorter: true,
      titleRender: 'input',
    },
    {
      name: 'chargeType',
      title: 'ChargeType',
      width: '100px',
      titleRender: 'input',
      sorter: true,
    },
    //
    // {
    //   name: 'modifiedTag',
    //   title: 'modifiedTag',
    //   width: '100px',
    //   render: (text) => (text == 0 ? 'No' : 'Yes'),
    // },
    // //
    // {
    //   name: 'modifiedUser',
    //   title: 'Modified User',
    //   width: '200px',
    //   titleRender: 'input',
    //   sorter: true,
    // },
    // {
    //   name: 'modifiedDate',
    //   title: 'Modified Date',
    //   width: '200px',
    //   sorter: true,
    //   render: (text) =>
    //     text && moment(text).isValid()
    //       ? moment(text).format('YYYY-MM-DD HH:mm:ss')
    //       : text,
    // },

    {
      name: 'Operate',
      title: 'Operate',
      width: '100px',
      fixed: 'right',
      render: (text, record, index) => (
        <Space>
          <AuthWrapper functionName={pageName} authCode={`${pageName}-Edit`}>
            <Button
              type="text"
              key="1"
              icon={<EditOutlined />}
              onClick={(event) => {
                event.stopPropagation();
                console.log(record);
                setInitialState(record.billingStatus);
                setEditListMark(true);
                setIsSingelEdits(true);
                formDataEdit.setFieldsValue({
                  ...record,
                  billingDate: record.billingDate
                    ? moment(record.billingDate)
                    : null,
                });
                billingStatusGroup.map((item, index) => {
                  if (
                    formDataEdit.getFieldValue('billingStatus') == item.dbvalue
                  ) {
                    formDataEdit.setFieldsValue({
                      billingStatus: item.value,
                    });
                  }
                });
                console.log(formDataEdit.getFieldValue('billingStatus'));
                if (formDataEdit.getFieldValue('billingStatus') == 2) {
                  setSuccessMark(false);
                } else {
                  setSuccessMark(true);
                }
              }}
            ></Button>
          </AuthWrapper>
        </Space>
      ),
    },
  ];

  const bviOrignalCols = [
    {
      name: 'bviMonth',
      title: 'BVI Month',
      width: '200px',
    },
    {
      name: 'bviStatus',
      title: 'BVI Status',
      width: '100px',
    },
    {
      name: 'serviceLine',
      title: 'ServiceLine',
      width: '150px',
    },
    {
      name: 'product',
      title: 'Product',
      width: '200px',
    },
    {
      name: 'are',
      title: 'ARE',
      width: '150px',
    },
    {
      name: 'customerDivision',
      title: 'Customer Division',
      width: '200px',
    },
    {
      name: 'bvi',
      title: 'BVI',
      width: '100px',
    },
    {
      name: 'productUnitPrice',
      title: 'Product Unit Price',
      width: '200px',
    },
    {
      name: 'productUnitPriceCurrency',
      title: 'Product Unit Price Currency',
      width: '200px',
    },
    {
      name: 'totalAmount',
      title: 'Total Amount(Unit Price Currency)',
      width: '200px',
    },
    {
      name: 'billingCurrency',
      title: 'Billing Currency',
      width: '200px',
    },
    {
      name: 'costCenter',
      title: 'Cost Center',
      width: '150px',
    },
    {
      name: 'po',
      title: 'PO',
      width: '200px',
    },
    {
      name: 'poPercentage',
      title: 'PO Percentage',
      width: '200px',
    },
    {
      name: 'comment',
      title: 'Comment',
      width: '200px',
    },
    {
      name: 'billingARE',
      title: 'Billing ARE',
      width: '200px',
    },
    {
      name: 'billingCostCenter',
      title: 'Billing Cost Center',
      width: '200px',
    },
    {
      name: 'modifiedUser',
      title: 'Modified User',
      width: '200px',
    },
    {
      name: 'modifiedDate',
      title: 'Modified Date',
      width: '200px',
      render: (text) =>
        text && moment(text).isValid()
          ? moment(text).format('YYYY-MM-DD')
          : text,
    },
    {
      name: 'bviBusinessLine',
      title: 'BVI Business Line',
      width: '150px',
    },
    {
      name: 'businessLine',
      title: 'Business Line',
      width: '150px',
    },
    {
      name: 'companyCode',
      title: 'Company Code',
      width: '200px',
    },
    {
      name: 'system',
      title: 'System',
      width: '200px',
    },
    {
      name: 'idH',
      title: 'ID_H',
      width: '200px',
    },
    {
      name: 'chargeType',
      title: 'ChargeType',
      width: '200px',
    },
    {
      name: 'adjustTag',
      title: 'AdjustTag',
      width: '100px',
      render: (text) => (text === null ? '' : text === false ? 'No' : 'Yes'),
    },
    {
      name: 'templateType',
      title: 'Template Type',
      width: '200px',
    },
    {
      name: 'isPOByPercentage',
      title: 'IsPOByPercentage',
      width: '200px',
      render: (text) => (text == 0 ? 'No' : 'Yes'),
    },

    {
      name: 'customerNumberAllocation',
      title: 'Customer Number Allocation',
      width: '240px',
    },

    {
      name: 'z003',
      title: 'Z003',
      width: '100px',
    },
    {
      name: 'salesOrder',
      title: 'Sales Order',
      width: '200px',
    },
    {
      name: 'billingDoc',
      title: 'Billing Doc.',
      width: '200px',
    },
    {
      name: 'billingStatus',
      title: 'Billing Status',
      width: '200px',
    },
    {
      name: 'itemNo',
      title: 'Item No.',
      width: '200px',
    },
    {
      title: 'Amount in Currecy',
      width: '200px',
      name: 'amountInCurrecy',
    },
    {
      title: 'Currency in SAP',
      width: '200px',
      name: 'currencyInSAP',
    },
    {
      title: 'Amount in Local Currency(CNY)',
      width: '240px',
      name: 'amountInLocalCurrencyCNY',
    },
    {
      title: 'Billing Date',
      width: '180px',
      name: 'billingDate',
      render: (text) =>
        text && moment(text).isValid()
          ? moment(text).format('YYYY-MM-DD')
          : text,
    },
    {
      title: 'SAP Exchange Rate',
      width: '150px',
      name: 'exchangeRate',
    },
  ];

  const uploadProps = {
    beforeUpload: () => {
      return false;
    },
  };
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
  const renderOption = (fieldList) => {
    const options = [];
    console.log(initialState);
    fieldList.map((item, index) => {
      options.push(
        <Option
          key={index}
          value={item.value}
          disabled={
            initialState == 'Successfully' || initialState == 'Cancel'
              ? item.label == 'Unfreeze'
                ? true
                : false
              : false
          }
        >
          {item.label}
        </Option>,
      );
    });
    return options;
  };
  const renderMenuOption = (fieldList) => {
    const options = [];
    fieldList.map((item, index) => {
      options.push(
        <Menu.Item key={index}>
          <span
            style={{ margin: '0 10px' }}
            onClick={() => {
              setStatusFun(item.value);
            }}
          >
            {item.label}
          </span>
        </Menu.Item>,
      );
    });
    return options;
  };
  const handleChangebus = (val) => {
    if (val == 2) {
      message.info('Please fill in the SAP recharge data');
      setSuccessMark(false);
    } else {
      setSuccessMark(true);
    }
  };
  //
  const onReportMonthChange = (datestring) => {
    setReportMonth(datestring);
  };
  const ExportCustomer = () => {
    console.log(ReportMonth);
    if (!ReportMonth) {
      message.warning('Please select [Report Month]!');
      return;
    }
    if (!business) {
      message.warning('Please select [BVI Bussiness Line]!'); //暂无权限提示
      return;
    }
    let params = {
      busiLine: business[0],
      reportMonth: ReportMonth,
    };
    CustomerReportBuildReport(params).then((res: any) => {
      if (res.response.status == 200) {
        setReportMonthMark(false);
        message.success(res.response.statusText);
      } else {
        message.error(res.response.statusText);
      }
    });
  };
  //
  return (
    <ContentWrap>
      {/* 选择生成报告日期 */}
      <Modal
        maskClosable={false}
        width="500px"
        title={
          <TableTopDiv style={{ margin: 0 }}>
            <TableTitleDiv style={{ float: 'left' }}>
              <TaleTitleIconDiv>
                <span></span>
              </TaleTitleIconDiv>
              <span style={{ verticalAlign: 'middle', fontSize: '20px' }}>
                Select Report Month
              </span>
            </TableTitleDiv>
          </TableTopDiv>
        }
        visible={ReportMonthMark}
        footer={null}
        onCancel={() => {
          setReportMonthMark(false);
        }}
      >
        <Row gutter={20}>
          <Col span={16}>
            <DatePicker
              onChange={(dates, datestring) => {
                onReportMonthChange(datestring);
              }}
              defaultValue={moment(ReportMonth)}
              disabled={false}
              picker="month"
              format="YYYYMM"
              style={{ width: '200px' }}
            />
          </Col>
          <Col span={8}>
            <Space size={60}>
              <Button type="primary" onClick={ExportCustomer}>
                Confirm
              </Button>
            </Space>
          </Col>
        </Row>
      </Modal>
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

          <Form.Item style={{ textAlign: 'center' }}>
            <Space size={60}>
              <Button type="primary" onClick={importExcel}>
                Submit
              </Button>
              <Button
                onClick={() => {
                  setShowImport(false);
                  formImport.resetFields();
                }}
              >
                Cancel
              </Button>
            </Space>
          </Form.Item>
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
                Billing Data
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
          labelCol={{ flex: '200px' }}
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
              <Form.Item
                label="Sales Order"
                name="salesOrder"
                rules={[{ required: !successMark }]}
              >
                <Input disabled={successMark} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Billing Doc"
                name="billingDoc"
                rules={[{ required: !successMark }]}
              >
                <Input disabled={successMark} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Item No"
                name="itemNo"
                rules={[{ required: !successMark }]}
              >
                <Input disabled={successMark} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Amount In Currecy"
                name="amountInCurrecy"
                rules={[{ required: !successMark }]}
              >
                <Input disabled={successMark} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Currency In SAP"
                name="currencyInSAP"
                rules={[{ required: !successMark }]}
              >
                <Input disabled={successMark} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Amount in Local Currency(CNY)"
                name="amountInLocalCurrencyCNY"
                rules={[{ required: !successMark }]}
              >
                <Input disabled={successMark} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Billing Date"
                name="billingDate"
                rules={[{ required: !successMark }]}
              >
                <DatePicker
                  disabled={successMark}
                  picker="month"
                  format="YYYYMM"
                  style={{ width: '100%' }}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="SAP Exchange Rate"
                name="sapExchangeRate"
                rules={[{ required: !successMark }]}
              >
                <Input disabled={successMark} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Batch File Exchange Rate"
                name="batchFileExchangeRate"
                rules={[{ required: !successMark }]}
              >
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
            columns={bviOrignalCols?.map((_item) => {
              return {
                ..._item,
                dataIndex: _item.name,
                // key
                align: 'center',
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
                <label>Business Line:</label>
                <Select
                  placeholder="Please select"
                  value={business}
                  mode="multiple"
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
            moudleName="Billing Data"
            authPagename={pageName}
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
                  {/* View all unconfirm Data */}
                  View all Incomplete Data
                </Checkbox>

                <Checkbox
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
            <AuthWrapper functionName={pageName} authCode={`${pageName}-Edit`}>
              <Space>
                <BtnOrangeWrap>
                  <Button onClick={freezeData}>Freeze</Button>
                </BtnOrangeWrap>
                <BtnThemeWrap color="grass">
                  <Button
                    disabled={
                      selectedRowKeys.length == 0
                        ? isSelectAll
                          ? false
                          : true
                        : false
                    }
                    onClick={() => {
                      setEditListMark(true);
                      setSuccessMark(true);
                      setIsSingelEdits(false);
                    }}
                  >
                    Quick Edit
                  </Button>
                </BtnThemeWrap>
                <BtnThemeWrap color="blue">
                  <Dropdown
                    trigger={['click']}
                    overlay={() => (
                      <Menu>{renderMenuOption(billingStatusGroup)}</Menu>
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
                  <Button
                    onClick={() => {
                      setReportMonthMark(true);
                    }}
                  >
                    Generate Customer Report
                  </Button>
                </BtnThemeWrap>
              </Space>
            </AuthWrapper>
            <Space>
              <Divider
                type="vertical"
                style={{ height: '20px', borderColor: '#999' }}
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
        }
      />
    </ContentWrap>
  );
};
