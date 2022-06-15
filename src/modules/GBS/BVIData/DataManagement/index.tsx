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
} from '@/assets/style';
import search from '@/assets/images/search.png';
import FilterGroup from '@/modules/components/FilterGroup';
import useService from './useServise';
import moment from 'moment';
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
    setErrorData,
    errorChecked,
  } = useService(props);

  const columns: any = [
    {
      title: 'Business Line',
      dataIndex: 'BusinessLine',
      key: 'BusinessLine',
      align: 'center',
    },
    {
      title: 'ARE',
      dataIndex: 'ARE',
      key: 'ARE',
      align: 'center',
    },
    {
      title: 'Company Code',
      dataIndex: 'CompanyCode',
      key: 'CompanyCode',
      align: 'center',
    },
    {
      title: 'Customer Devision',
      dataIndex: 'CustomerDevision',
      key: 'CustomerDevision',
      width: '160px',
      align: 'center',
    },
    {
      title: 'Cost Center',
      dataIndex: 'CostCenter',
      key: 'CostCenter',
      align: 'center',
    },
    {
      title: 'Cost Location',
      dataIndex: 'CostLocation',
      key: 'CostLocation',
      align: 'center',
    },
    {
      title: 'Product Name',
      dataIndex: 'ProductName',
      key: 'ProductName',
      align: 'center',
    },
    {
      title: 'Error Message',
      dataIndex: 'ErrorMessage',
      key: 'ErrorMessage',
      align: 'center',
      render: (text) => <span style={{ color: 'red' }}>{text}</span>,
    },
  ];
  const orignalCols = [
    {
      name: 'bviBusinessLine',
      title: 'BVI Business Line',
      width: '120px',
    },
    {
      name: 'businessLine',
      title: 'Business Line',
      width: '100px',
    },
    {
      name: 'serviceLine',
      title: 'ServiceLine',
      width: '150px',
      titleRender: 'input',
    },
    {
      name: 'product',
      title: 'Product',
      width: '200px',
      titleRender: 'input',
    },
    {
      name: 'are',
      title: 'ARE',
      width: '100px',
      titleRender: 'input',
    },
    {
      name: 'billingARE',
      title: 'Billing ARE',
      width: '100px',
      titleRender: 'input',
    },
    {
      name: 'companyCode',
      title: 'Company Code',
      width: '120px',
      titleRender: 'input',
    },
    {
      name: 'customerDivision',
      title: 'Customer Division',
      width: '100px',
      titleRender: 'input',
    },
    {
      name: 'productUnitPrice',
      title: 'Product Unit Price',
      width: '100px',
    },
    {
      name: 'productUnitPriceCurrency',
      title: 'Product Unit Price Currency',
      width: '120px',
      titleRender: 'input',
    },
    {
      name: 'costCenter',
      title: 'Cost Center',
      width: '100px',
      titleRender: 'input',
    },
    {
      name: 'billingCostCenter',
      title: 'Billing Cost Center',
      width: '100px',
      titleRender: 'input',
    },
    {
      name: 'bvi',
      title: 'BVI',
      width: '100px',
      render: (text, record, index) => {
        if (record.validationMsg) {
          return (
            <BtnTextRedWrap color="red">
              <Button
                type="text"
                onClick={getCheckOriginalData}
                icon={<ExclamationCircleOutlined />}
              >
                {text}
              </Button>
            </BtnTextRedWrap>
          );
        } else {
          return (
            <BtnTextRedWrap>
              <Button type="text" onClick={getCheckOriginalData}>
                {text}
              </Button>
            </BtnTextRedWrap>
          );
        }
      },
    },
    {
      name: 'totalAmount',
      title: 'Total Amount(Unit Price Currency)',
      width: '180px',
    },
    {
      name: 'billingCurrency',
      title: 'Billing Currency',
      width: '100px',
    },
    {
      name: 'po',
      title: 'PO',
      width: '100px',
      titleRender: 'input',
    },
    {
      name: 'poPercentage',
      title: 'PO Percentage',
      width: '100px',
    },
    {
      name: 'comment',
      title: 'Comment',
      width: '100px',
      titleRender: 'input',
    },
    {
      name: 'bviMonth',
      title: 'BVI Month',
      width: '100px',
      titleRender: 'input',
    },
    {
      name: 'system',
      title: 'System',
      width: '100px',
    },
    {
      name: 'idH',
      title: 'ID_H',
      width: '100px',
    },
    {
      name: 'chargeType',
      title: 'ChargeType',
      width: '100px',
      titleRender: 'input',
    },
    {
      name: 'adjustTag',
      title: 'AdjustTag',
      width: '100px',
      titleRender: 'input',
      render: (text) => (text === false ? 'Yes' : 'No'),
    },
    {
      name: 'templateType',
      title: 'Template Type',
      width: '100px',
      titleRender: 'input',
    },
    {
      name: 'IsPOByPercentage',
      title: 'IsPOByPercentage',
      width: '160px',
    },
    {
      name: 'bviStatus',
      title: 'BVI Status',
      width: '100px',
    },
    {
      name: 'modifiedUser',
      title: 'Modified User',
      width: '100px',
      titleRender: 'input',
    },
    {
      name: 'modifiedDate',
      title: 'Modified Date',
      width: '100px',
      render: (text) =>
        text && moment(text).isValid()
          ? moment(text).format('YYYY-MM-DD HH:mm:ss')
          : text,
    },
    {
      name: 'z003',
      title: 'Z003',
      width: '100px',
    },
    {
      name: 'salesOrder',
      title: 'Sales Order',
      width: '100px',
      titleRender: 'input',
    },
    {
      name: 'billingDoc',
      title: 'Billing Doc.',
      width: '100px',
      titleRender: 'input',
    },
    {
      name: 'billingStatus',
      title: 'Billing Status',
      width: '100px',
      titleRender: 'input',
    },
    {
      name: 'itemNo',
      title: 'Item No.',
      width: '200px',
    },
    {
      title: 'Amount in Currecy',
      width: '150px',
      name: 'amountInCurrecy',
    },
    {
      title: 'Currency in SAP',
      width: '150px',
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
    },
    {
      title: 'SAP Exchange Rate',
      width: '150px',
      name: 'exchangeRate',
    },
    {
      name: 'Operate',
      title: 'Operate',
      width: '140px',
      fixed: 'right',
      render: (text, record, index) => (
        <Space>
          <Button
            type="text"
            key="1"
            icon={<EditOutlined />}
            onClick={(event) => {
              event.stopPropagation();
              setShowBviData(true);
              setComponentDisabled(false);
              formData.setFieldsValue(record);
            }}
          ></Button>
          {record.bviStatus == 'Unconfirm' ? (
            <Popconfirm
              title="Are you sure?"
              onConfirm={(event) => {
                event.stopPropagation();
                deleteInfos([record.id], event);
              }}
              okText="Yes"
              cancelText="Cancel"
            >
              <Button
                type="text"
                key="2"
                onClick={(event) => event.stopPropagation()}
                icon={<i className="gbs gbs-delete"></i>}
              ></Button>
            </Popconfirm>
          ) : (
            ''
          )}

          {!record.bviFlag ? (
            <Popconfirm
              title="Are you sure?"
              onConfirm={(event) => {
                event.stopPropagation();
                if (record.bviStatus == 'Unconfirm') {
                  toConfirm([record.id]);
                } else {
                  toUnconfirm([record.id]);
                }
              }}
              okText="Yes"
              cancelText="Cancel"
            >
              <Button
                onClick={(event) => event.stopPropagation()}
                type="text"
                key="3"
                icon={<i className="gbs gbs-confirm"></i>}
              ></Button>
            </Popconfirm>
          ) : (
            ''
          )}
        </Space>
      ),
    },
  ];

  const savefilterGroup = () => {
    console.log('please save  filter group interface');
  };

  // BVI-View
  const rowClick = (record) => {
    formData.setFieldsValue(record);
    setShowBviData(true);
    setComponentDisabled(true);
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

  return (
    <div>
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
              <Radio value={1}>BVI Manual</Radio>
              <Radio value={2}>R2R MD</Radio>
              <Radio value={3}>H2R BVI</Radio>
              <Radio value={4}>H2R T&E BVI</Radio>
              <Radio value={5}>H2R GMM</Radio>
              <Radio value={6}>O2C BVI</Radio>
              <Radio value={7}>O2C TI BVI</Radio>
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
              <Button>Cancel</Button>
            </Space>
          </Form.Item>
        </Form>
      </Modal>
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
            <Col span={24}>
              <Form.Item
                label="Product Name"
                name="ProductName"
                rules={[{ required: true }]}
              >
                <Input disabled={componentDisabled} />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Bussiness Line" name="BussinessLine">
                <Input disabled={componentDisabled} />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Service Line" name="ServiceLine">
                <Input disabled={componentDisabled} />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Customer Devision" name="CustomerDevision">
                <Input disabled />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="ARE" name="ARE">
                <Input disabled />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Billing ARE" name="BillingARE">
                <Input disabled={componentDisabled} />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Company Code" name="CompanyCode">
                <Input disabled={componentDisabled} />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Cost Center" name="CostCenter">
                <Input disabled={componentDisabled} />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Billing Cost Center" name="BillingCostCenter">
                <Input disabled={componentDisabled} />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="BVI" name="BVI">
                <Input disabled={componentDisabled} />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Unit Price" name="UnitPrice">
                <Input disabled={componentDisabled} />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Total Amount" name="TotalAmount">
                <Input disabled={componentDisabled} />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="PO" name="PO">
                <Input disabled={componentDisabled} />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="System" name="System">
                <Input disabled={componentDisabled} />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="BVI Month" name="BVIMonth">
                <Input disabled={componentDisabled} />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="BVI Status" name="BVIStatus">
                <Input disabled={componentDisabled} />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item label="Comment" name="Comment">
                <Input.TextArea disabled={componentDisabled} />
              </Form.Item>
            </Col>
            {!componentDisabled ? (
              <Col span={24}>
                <Form.Item style={{ textAlign: 'center' }}>
                  <Space size={60}>
                    <Button type="primary">Save</Button>
                    <Button>Cancel</Button>
                  </Space>
                </Form.Item>
              </Col>
            ) : (
              ''
            )}
          </Row>
        </Form>
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
            columns={columns}
            rowClassName={(record, index) => (index % 2 == 0 ? '' : 'stripe')}
            dataSource={checkData}
            rowKey="id"
            pagination={false}
            scroll={{ y: 'calc(100vh - 390px)' }}
          />
        </TableWrapDiv>

        <div style={{ margin: '20px auto 40px', textAlign: 'center' }}>
          <Button type="primary">Export</Button>
        </div>
      </Modal>
      <TableList
        data={tableData}
        headerSearch={getData}
        form={form}
        columns={orignalCols}
        total={total}
        rowClick={(record) => rowClick(record)}
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
            customComponet={
              <>
                <Checkbox onChange={(e) => setUnconfirmData(e.target.checked)}>
                  View all unconfirm Data
                </Checkbox>
                <Checkbox onChange={(e) => setErrorData(e.target.checked)}>
                  View all Error Data
                </Checkbox>
              </>
            }
            defaultVal={groupName}
            onSearch={(val) => {
              setGroupName(val);
              getData({ groupId: val });
            }}
            onSaveFilterGroup={savefilterGroup}
            fields={orignalCols}
            exportAction={exportExcelAction}
          />
        }
        renderBtns={
          <Space>
            <BtnOrangeWrap>
              <Button disabled={!selectedRowKeys.length} onClick={toRecheck}>
                Recheck
              </Button>
            </BtnOrangeWrap>
            <BtnGreenWrap>
              <Button
                disabled={!selectedRowKeys.length}
                onClick={() => toConfirm(selectedRowKeys)}
              >
                Confirm
              </Button>
            </BtnGreenWrap>
            <BtnBlueWrap>
              <Button
                disabled={!selectedRowKeys.length}
                onClick={() => toUnconfirm(selectedRowKeys)}
              >
                Unconfirm
              </Button>
            </BtnBlueWrap>
            <Divider
              type="vertical"
              style={{ height: '20px', borderColor: '#999' }}
            />
            <BtnThemeWrap>
              <Button onClick={onExport}>Export Original</Button>
            </BtnThemeWrap>
            <BtnThemeWrap>
              <Dropdown
                overlay={() => (
                  <Menu>
                    <Menu.Item
                      key="1"
                      icon={<i className="gbs gbs-import"></i>}
                      onClick={() => setShowImport(true)}
                    >
                      <span style={{ margin: '0 10px' }}>Import</span>
                    </Menu.Item>
                    <Menu.Item
                      key="2"
                      icon={<i className="gbs gbs-add"></i>}
                      onClick={() => {
                        setShowBviData(true);
                        setComponentDisabled(false);
                      }}
                    >
                      <span style={{ margin: '0 10px' }}>Add</span>
                    </Menu.Item>
                    <Menu.SubMenu
                      key="3"
                      title={<span style={{ margin: '0 10px' }}>Import</span>}
                      icon={<i className="gbs gbs-download"></i>}
                    >
                      <Menu.Item key="manual">
                        <a
                          href={
                            process.env.WEB_URL +
                            '/template/BVI_Manual Input_Template.xlsx'
                          }
                        >
                          BVI Manual Template
                        </a>
                      </Menu.Item>
                      <Menu.Item key="md">
                        <a
                          href={
                            process.env.WEB_URL +
                            '/template/R2R MD Import Data 202109.xlsx'
                          }
                        >
                          R2R MD Template
                        </a>
                      </Menu.Item>
                      <Menu.Item key="BVI">
                        <a
                          href={
                            process.env.WEB_URL +
                            '/template/H2R BVI Uploading template-22 P3.xlsx'
                          }
                        >
                          H2R BVI Template
                        </a>
                      </Menu.Item>
                      <Menu.Item key="T&E">
                        <a
                          href={
                            process.env.WEB_URL +
                            '/template/H2R T&E report example.xlsx'
                          }
                        >
                          H2R T&E BVI Template
                        </a>
                      </Menu.Item>
                      <Menu.Item key="GMM">
                        <a
                          href={
                            process.env.WEB_URL +
                            '/template/H2R GMM Charging_Other DC_China_202201-1.xlsx'
                          }
                        >
                          H2R GMM Template
                        </a>
                      </Menu.Item>
                      <Menu.Item key="O2C">
                        <a
                          href={
                            process.env.WEB_URL +
                            '/template/BVI template O2C.xlsx'
                          }
                        >
                          O2C BVI Template
                        </a>
                      </Menu.Item>
                      <Menu.Item key="TI">
                        <a
                          href={
                            process.env.WEB_URL +
                            '/template/BVI_O2C_TI_CompanyCo.Template.xlsx'
                          }
                        >
                          O2C TI BVI Template
                        </a>
                      </Menu.Item>
                    </Menu.SubMenu>
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
                disabled={selectedRowKeys.length !== 1}
                onClick={copyData}
              >
                Copy
              </Button>
            </BtnThemeWrap>
            <BtnThemeWrap>
              <Button disabled={!selectedRowKeys.length}>Edit</Button>
            </BtnThemeWrap>
            <Button disabled={!selectedRowKeys.length}>Delete</Button>
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
    </div>
  );
};
