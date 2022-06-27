import React, { useState, useEffect } from 'react';
import { BtnThemeWrap, ContentWrap, FilterGroupDiv } from '@/assets/style';
import TableList from '@/modules/components/TableMixInline';
import {
  Button,
  Col,
  Dropdown,
  Form,
  Input,
  Menu,
  Row,
  Select,
  Space,
  Upload,
} from 'antd';
import moment from 'moment';
import './style.less';
import DebounceSelect from '@/components/Select/debounceSelect';
import {
  getCustemerDivisionList,
  getServiceLineList,
  queryBusinesslineOptionsList,
} from '@/app/request/common';
import { DownOutlined } from '@ant-design/icons';
export const Index = (props: any) => {
  const [form] = Form.useForm();
  const [tableData, setTableData] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [total, setTotal] = useState(0);
  const [current, setCurrent] = useState(1);
  const [isSearch, setIsSearch] = useState(false);
  const [pageSize, setPageSize] = useState(20);
  const [filterBusinessLine, setFilterBusinessLine] = useState('');
  const orignalCols: any = [
    {
      name: 'businessLine',
      title: 'Business Line',
      width: '150px',
      // titleRender: 'input',
      // sorter: true,
    },
    {
      name: 'serviceLine',
      title: 'Service Line',
      width: '150px',
    },
    {
      name: 'customerDevision',
      title: 'Customer Division',
      width: '150px',
    },
    {
      name: 'are',
      title: 'ARE',
      width: '100px',
    },
    {
      name: 'product',
      title: 'Product Name',
      width: '200px',
    },
    {
      name: 'startDate',
      title: 'Start Date',
      width: '150px',
    },
    {
      name: 'endDate',
      title: 'End Date',
      width: '150px',
    },
    {
      name: 'productNameForReport',
      title: 'Product Name for Report',
      width: '180px',
    },
    {
      name: 'signed',
      title: 'Signed',
      width: '180px',
      render: (text) => (text === true ? 'Yes' : 'No'),
    },
    {
      title: 'Signed Date',
      width: '180px',
      name: 'signedDate',
      render: (text) =>
        text && moment(text).isValid()
          ? moment(text).format('YYYY-MM-DD HH:mm:ss')
          : text,
    },
    {
      title: 'Material Number',
      width: '180px',
      name: 'materialNumber',
    },
    {
      title: 'Unit_Price',
      width: '180px',
      name: 'unitPrice',
    },
    {
      title: 'Unit Price Currency',
      width: '180px',
      name: 'unitPriceCurrency',
    },
    {
      title: 'Alt.tax classific.',
      width: '180px',
      name: 'altTaxClassific',
    },
    {
      title: 'Sender PC',
      width: '150px',
      name: 'senderPC',
    },
    {
      title: 'Individual Invoice',
      width: '150px',
      name: 'individualInvoice',
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
    },
    {
      title: 'Quarterly Charge',
      width: '150px',
      name: 'quarterlyCharge',
    },
  ];

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
  return (
    <ContentWrap>
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
          <FilterGroupDiv>
            <Form form={form}>
              <Row className="masterData">
                <Col span={7}>
                  <Form.Item
                    label="Business Line"
                    name="businessLine"
                    labelCol={{ span: 10 }}
                    wrapperCol={{ span: 14 }}
                  >
                    <DebounceSelect
                      initFlag
                      onChange={(value, data) => {
                        setFilterBusinessLine(value);
                        form.setFieldsValue({
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
                <Col span={7}>
                  <Form.Item
                    label="Service Line"
                    name="serviceLine"
                    labelCol={{ span: 10 }}
                    wrapperCol={{ span: 14 }}
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
                <Col span={7}>
                  <Form.Item
                    label="Customer Division"
                    name="customerDivision"
                    labelCol={{ span: 10 }}
                    wrapperCol={{ span: 14 }}
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
                        return getCustemerDivisionList({
                          keywords: e,
                        });
                      }}
                    />
                  </Form.Item>
                </Col>
                <Col span={3}>
                  <Form.Item style={{ textAlign: 'right' }}>
                    <Space>
                      <Button
                        type="primary"
                        icon={<i className="gbs gbs-search"></i>}
                        onClick={getData}
                      ></Button>
                      <Button
                        icon={<i className="gbs gbs-export"></i>}
                        onClick={exportExcelAction}
                      ></Button>
                    </Space>
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          </FilterGroupDiv>
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
                        onClick={() => {}}
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
            <Button disabled={selectedRowKeys.length != 1}>Delete</Button>
          </Space>
        }
        changePageSize={changePageSize}
        current={current}
        search={isSearch}
        rowKey="orgId"
        listName="Product"
      />
    </ContentWrap>
  );
};
export default Index;
