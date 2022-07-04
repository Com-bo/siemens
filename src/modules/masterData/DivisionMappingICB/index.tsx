import React, { useState, useEffect, useRef } from 'react';
import {
  BtnThemeWrap,
  ContentWrap,
  FilterGroupDiv,
  TableTitleDiv,
  TableTopDiv,
  TaleTitleIconDiv,
} from '@/assets/style';
import TableList from '@/modules/components/TableMixInline';
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
} from '@ant-design/icons';
import FilterGroup from '@/modules/components/FilterGroup';
import {
  getServiceLineList,
  queryBusinesslineOptionsList,
} from '@/app/request/common';
import { triggerFocus } from 'antd/lib/input/Input';
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
  const [poData, setPoData] = useState([]);
  const [showPO, setShowPO] = useState(false);
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
      name: 'customerDevision',
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
      name: 'product',
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
      render: (text) => (text === true ? 'Yes' : 'No'),
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
      name: 'GSC_ID',
      titleRender: 'input',
    },
    {
      title: 'BVIDescription',
      width: '180px',
      name: 'BVIDescription',
      titleRender: 'input',
    },
    {
      title: 'GSCDescription',
      width: '180px',
      name: 'GSCDescription',
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
    },

    {
      title: 'SOItemNumber',
      width: '150px',
      name: 'sOItemNumber',
      titleRender: 'input',
    },

    {
      title: 'Quarterly Charge',
      width: '150px',
      name: 'quarterlyCharge',
      titleRender: 'input',
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
    },
    {
      title: 'SoldToParty',
      width: '120px',
      name: 'soldToParty',
      titleRender: 'input',
    },
    {
      title: 'PONumber',
      width: '120px',
      name: 'pONumber',
      titleRender: 'input',
    },
    {
      title: 'Overhead key',
      width: '120px',
      name: 'Overheadkey',
      titleRender: 'input',
    },
    {
      title: 'Print. Con., Del., Inv.',
      width: '120px',
      name: 'pcdi',
      titleRender: 'input',
    },
    {
      name: 'Operate',
      title: 'Operate',
      width: '200px',
      fixed: 'right',
      render: (text, record, index) => (
        <Space>
          <Tooltip title="Edit">
            <Button
              type="text"
              key="1"
              icon={<EditOutlined />}
              onClick={() => {
                setShowProData(true);
                formData.setFieldsValue({
                  ...record,
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
          </Popconfirm>{' '}
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
        // deleteData({
        //   recordIdList,
        // }).then((res) => {
        //   if (res.isSuccess) {
        //     message.success('Deletion succeeded!');
        //     setSelectedRowKeys([]);
        //     getData();
        //     setCurrent(1);
        //   } else {
        //     message.error(res.msg);
        //   }
        // });
      },
      centered: true,
    });
  };

  const getData = () => {
    let params = {
      // 待定字段
      // ...form.getFieldsValue(),
      pageIndex: current,
      pageSize: pageSize,
    };
    setTableData([{ orgId: 1, are: 'XXXX' }]);
    setTotal(1);
  };
  const latestGroupIdRef = useRef<any>();
  useEffect(() => {
    getData();
  }, [current, pageSize]);
  const onPageChange = (pagination, filters, sorter, extra) => {
    setCurrent(pagination.current);
  };

  const changePageSize = (val: number) => {
    setPageSize(val);
  };

  const exportExcelAction = () => {
    console.log(form.getFieldsValue());
    let params = {
      // 待定字段
      // ...form.getFieldsValue(),
      pageIndex: current,
      pageSize: pageSize,
    };
  };
  const importExcel = (file) => {
    const fd = new FormData();
    fd.append('file', file);
    // importProductData(fd).then((res) => {
    //   if (res.isSuccess) {
    //     message.success(res.msg);
    //     getData();
    //     setSelectedRowKeys([]);
    //   } else {
    //     message.error(res.msg);
    //   }
    // });
  };
  const poCols: any = [
    {
      title: 'Sold-to Party',
      dataIndex: 'soldtoparty',
      key: 'soldtoparty',
    },
    {
      title: 'Org.ID',
      dataIndex: 'orgId',
      key: 'orgId',
    },
    {
      title: 'PO Number',
      dataIndex: 'poNumber',
      key: 'poNumber',
    },
    {
      title: 'Percentage',
      dataIndex: 'percentage',
      key: 'percentage',
    },
    {
      title: 'Overhead Key',
      dataIndex: 'overheadKey',
      key: 'overheadKey',
    },
    {
      title: 'Print. Con., Del., Inv.',
      dataIndex: 'pcdi',
      key: 'pcdi',
    },
    {
      title: 'Operation',
      dataIndex: 'operation',
      key: 'operation',
      render: (text, record, index) => (
        <Space>
          <Tooltip title="Edit">
            <Button
              type="text"
              key="1"
              icon={<EditOutlined />}
              onClick={() => {}}
            ></Button>
          </Tooltip>
          <Popconfirm
            title="Confirm to delete?"
            onConfirm={(event) => {}}
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
  return (
    <ContentWrap>
      {/* po */}
      <Modal
        width="800px"
        footer={null}
        title={
          <TableTopDiv style={{ margin: 0 }}>
            <TableTitleDiv style={{ float: 'left' }}>
              <TaleTitleIconDiv>
                <span></span>
              </TaleTitleIconDiv>
              <span style={{ verticalAlign: 'middle', fontSize: '20px' }}>
                PO Data
              </span>
            </TableTitleDiv>
          </TableTopDiv>
        }
        maskClosable={false}
        visible={showPO}
        onCancel={() => {
          setShowPO(false);
          poForm.resetFields();
        }}
      >
        <Form form={poForm} labelCol={{ flex: '140px' }}>
          <Row gutter={20}>
            <Col span={12}>
              <Form.Item
                label="Sold-To Party"
                name="soldToParty"
                rules={[{ required: true }]}
              >
                <Input disabled={componentDisabled} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="PONumber"
                name="pONumber"
                rules={[{ required: true }]}
              >
                <Input disabled={componentDisabled} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="OrgID"
                name="orgID"
                rules={[{ required: true }]}
              >
                <Input disabled={componentDisabled} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Overhead key" name="overheadkey">
                <Input disabled={componentDisabled} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Print. Con., Del., Inv." name="Pcdi">
                <Input disabled={componentDisabled} />
              </Form.Item>
            </Col>
            <Col span={24} style={{ textAlign: 'center' }}>
              <Space size={40}>
                <Button
                  type="primary"
                  onClick={() => {
                    poForm
                      .validateFields()
                      .then((valid) => {
                        console.log('接口');
                      })
                      .catch((e) => {});
                  }}
                >
                  Confirm
                </Button>
                <Button
                  onClick={() => {
                    setShowPO(false);
                    poForm.resetFields();
                  }}
                >
                  Cancel
                </Button>
              </Space>
            </Col>
          </Row>
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
        <Form form={formData} labelCol={{ flex: '120px' }}>
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
                label="Product Name for Report"
                name="ProductNameforReport"
                rules={[{ required: true }]}
              >
                <Input disabled={componentDisabled} />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Bussiness Line" name="businessLine">
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
              <Form.Item label="Service Line" name="serviceLine">
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
              <Form.Item label="ARE" name="are">
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Customer Division" name="customerDivision">
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
                label="Signed"
                name="signed"
                rules={[{ required: true }]}
              >
                <Select allowClear>
                  <Select.Option value={1}>Yes</Select.Option>
                  <Select.Option value={0}>No</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="Signed Date"
                name="signedDate"
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
                name="gSC_ID"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="GSC_description"
                name="GSC_description"
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
                  <Select.Option value={1}>Yes</Select.Option>
                  <Select.Option value={0}>No</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="Unit Price"
                name="unitPrice"
                rules={[{ required: true }]}
              >
                <InputNumber />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="Unit Price Currency"
                name="unitPriceCurrency"
                rules={[{ required: true }]}
              >
                <Select allowClear>
                  <Select.Option value={1}>CNY</Select.Option>
                  <Select.Option value={0}>EUR</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Billing Currency" name="billingCurrency">
                <Select allowClear>
                  <Select.Option value={1}>CNY</Select.Option>
                  <Select.Option value={0}>EUR</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="BillingLocation" name="billingLocation">
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Alt.tax Classific." name="templateType">
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Sender PC" name="SenderPC">
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="MandotoryBVI" name="mandotoryBVI">
                <Select allowClear>
                  <Select.Option value={1}>Yes</Select.Option>
                  <Select.Option value={0}>No</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="SystemTag" name="systemTag">
                <Select allowClear>
                  {/* <Select.Option value={1}>Yes</Select.Option>
                                    <Select.Option value={0}>No</Select.Option> */}
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Quarterly Charge" name="quarterlyCharge">
                <Select allowClear>
                  <Select.Option value={1}>Yes</Select.Option>
                  <Select.Option value={0}>No</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="BillingMonth Tag" name="billingMonthTag">
                <Select allowClear>
                  <Select.Option value={1}>Last Month</Select.Option>
                  {/* <Select.Option value={0}>No</Select.Option> */}
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="SOItemNumber" name="sOItemNumber">
                <Input />
              </Form.Item>
            </Col>
            <Col span={24} style={{ marginBottom: '20px' }}>
              <div style={{ textAlign: 'right', margin: '20px 0' }}>
                <Button type="primary" onClick={() => setShowPO(true)}>
                  Add PO
                </Button>
              </div>
              <Table columns={poCols} dataSource={poData} />
            </Col>
            <Col span={24}>
              <Form.Item label="Comment" name="comment">
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
                        console.log('接口');
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
        // form={form}
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
            moudleName="Flat Charge"
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
                          // 获取po列表接口
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
            <Button
              onClick={(event) => deleteInfos(selectedRowKeys, event)}
              disabled={selectedRowKeys.length != 1}
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
