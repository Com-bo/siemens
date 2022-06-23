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
    onExportOriginal,
    isP2PMark,
    setIsP2PMark,
  } = useService(props);
  const orignalCols = [
    {
      name: 'SONumber',
      title: 'SO Number',
      width: '100px',
      titleRender: 'input',
      sorter: true,
    },
    {
      name: 'BusinessLine',
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
      name: 'product',
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
      name: 'customerDivision',
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
      name: 'sold-to party',
      title: 'sold-to party',
      width: '100px',
      titleRender: 'input',
      sorter: true,
    },
    {
      name: 'Billing PO',
      title: 'Billing PO',
      width: '100px',
      titleRender: 'input',
      sorter: true,
    },
    {
      name: 'Material number',
      title: 'Material number',
      width: '100px',
      titleRender: 'input',
      sorter: true,
    },
    {
      name: 'BVI',
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
      name: 'totalAmount',
      title: 'Total Amount(Unit Price Currency)',
      width: '180px',
      sorter: true,
    },
    {
      name: 'BatchFile Exchange Rate',
      title: 'BatchFile Exchange Rate',
      width: '180px',
      sorter: true,
    },
    {
      name: 'Currency',
      title: 'Currency',
      width: '180px',
      sorter: true,
      titleRender: 'input',
    },
    {
      name: 'Alt.tax classific',
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
      name: 'Material Sales Text & Customer Text (z003)',
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
      name: 'billing Error Message',
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
    },
    {
      title: 'SAP Exchange Rate',
      width: '150px',
      name: 'exchangeRate',
      sorter: true,
    },
    {
      title: 'Data Type',
      width: '180px',
      name: 'Data Type',
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
      name: 'Quarterly Charge',
      title: 'Quarterly Charge',
      width: '150px',
      titleRender: 'input',
      sorter: true,
    },
    {
      name: 'SETag',
      title: 'SETag',
      width: '100px',
      titleRender: 'input',
      sorter: true,
    },
    {
      name: 'Billing Month',
      title: 'Billing Month',
      width: '100px',
      sorter: true,
    },
    {
      name: 'Period',
      title: 'Period',
      width: '100px',
      sorter: true,
    },
    {
      name: 'ChargeType',
      title: 'ChargeType',
      width: '100px',
      titleRender: 'input',
      sorter: true,
    },
    {
      name: 'modifiedTag',
      title: 'modifiedTag',
      width: '100px',
      titleRender: 'input',
      sorter: true,
    },
    {
      name: 'modifiedUser',
      title: 'Modified User',
      width: '100px',
      titleRender: 'input',
      sorter: true,
    },
    {
      name: 'modifiedDate',
      title: 'Modified Date',
      width: '100px',
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
              // formDataEdit.setFieldsValue({
              //   ...record,
              // });
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
          {isP2PMark ? (
            ''
          ) : (
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
          )}
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
          labelCol={{ flex: '120px' }}
        >
          <Row gutter={20}>
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
              <Form.Item label="Amount in Currecy" name="amountInCurrecy">
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Currency in SAP" name="currencyInSAP">
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Amount in Local Currency(CNY)"
                name="amountInLocalCurrencyCNY"
              >
                <Input />
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
              <Button>Freeze</Button>
            </BtnOrangeWrap>
            <BtnThemeWrap color="grass">
              <Button
                disabled={!selectedRowKeys.length}
                onClick={() => {
                  setEditListMark(true);
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
                      <span style={{ margin: '0 10px' }}>
                        Batch File-Manual
                      </span>
                    </Menu.Item>
                    <Menu.Item key="2">
                      <span style={{ margin: '0 10px' }}>Batch File-Auto</span>
                    </Menu.Item>
                    <Menu.Item key="3">
                      <span style={{ margin: '0 10px' }}>Allocation File</span>
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
