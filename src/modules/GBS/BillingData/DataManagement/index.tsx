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
    billingStatusGroup,
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
      width: '200px',
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
      width: '200px',
      titleRender: 'input',
      sorter: true,
    },
    {
      name: 'customerDevision',
      title: 'Customer Division',
      width: '200px',
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
      title: 'Material number',
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
      width: '200px',
      sorter: true,
    },
    {
      name: 'totalAmout',
      title: 'Total Amount(Unit Price Currency)',
      width: '200px',
      sorter: true,
    },

    //
    {
      name: 'BatchFile Exchange Rate',
      title: 'BatchFile Exchange Rate',
      width: '200px',
      sorter: true,
    },
    //
    {
      name: 'billingCurrency',
      title: 'Billing Currency',
      width: '200px',
      sorter: true,
      titleRender: 'input',
    },
    {
      name: 'altTaxClassific',
      title: 'Alt.tax classific',
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
      name: 'billingCostCenter',
      title: 'Billing Cost Center',
      width: '200px',
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
      name: 'billingStatus',
      title: 'Billing Status',
      width: '200px',
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
      name: 'bviMonth',
      title: 'BVI Month',
      width: '200px',
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
      width: '200px',
      sorter: true,
      render: (text) =>
        text && moment(text).isValid()
          ? moment(text).format('YYYY-MM-DD HH:mm:ss')
          : text,
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
  const savefilterGroup = () => {
    console.log('please save  filter group interface');
  };

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
    fieldList.map((item, index) => {
      options.push(
        <Option key={index} value={item.value}>
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
              setStatusFun(index);
            }}
          >
            {item.label}
          </span>
        </Menu.Item>,
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
