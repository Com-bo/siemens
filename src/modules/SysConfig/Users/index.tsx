import React, { useState, useEffect } from 'react';
import {
  BtnThemeWrap,
  ContentWrap,
  FilterGroupDiv,
  TableTitleDiv,
  TableTopDiv,
  TaleTitleIconDiv,
} from '@/assets/style';
import search from '@/assets/images/search.png';
import TableList from '@/modules/components/TableMixInline';
import {
  Button,
  Col,
  Divider,
  Dropdown,
  Form,
  Input,
  Menu,
  message,
  Modal,
  Popconfirm,
  Row,
  Select,
  Space,
  Tooltip,
  Upload,
} from 'antd';
import moment from 'moment';
import './style.less';
import DebounceSelect from '@/components/Select/debounceSelect';
import TableMix from '@/components/Table';
import {
  ClearOutlined,
  DownOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons';
export const Index = (props: any) => {
  const [form] = Form.useForm();
  const [formFilter] = Form.useForm();
  const [formData] = Form.useForm();
  const [tableData, setTableData] = useState([{ id: 111, gID: 'SS' }]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [total, setTotal] = useState(0);
  const [current, setCurrent] = useState(1);
  const [isSearch, setIsSearch] = useState(false);
  const [pageSize, setPageSize] = useState(20);
  const [showUserData, setShowUserData] = useState(false);
  const orignalCols: any = [
    {
      name: 'gID',
      title: 'GID',
      titleRender: 'input',
    },
    {
      name: 'employeeNo',
      title: 'EmployeeNo',
      titleRender: 'input',
    },
    {
      name: 'name',
      title: 'Name',
      titleRender: 'input',
    },
    {
      name: 'email',
      title: 'Email',
      titleRender: 'input',
    },
    {
      name: 'are',
      title: 'ARE',
      titleRender: 'input',
    },
    {
      title: 'CustomerDivision',
      name: 'customerDivision',
      titleRender: 'input',
    },
    {
      title: 'BusinessLine',
      name: 'businessLine',
      titleRender: 'input',
    },
    {
      name: 'Operate',
      title: 'Operate',
      // width: '200px',
      fixed: 'right',
      render: (text, record, index) => (
        <Space>
          <Tooltip title="Edit">
            <Button
              type="text"
              key="1"
              icon={<EditOutlined />}
              onClick={() => {
                setShowUserData(true);
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
          </Popconfirm>
        </Space>
      ),
    },
  ];
  // 删除接口
  const deleteInfos = (recordIdList: Array<any>, event) => {
    event.stopPropagation();
    Modal.confirm({
      title: 'Tips',
      icon: <ExclamationCircleOutlined />,
      content: 'Confirm to delete the selected data?',
      okText: 'Confirm',
      cancelText: 'Cancel',
      onOk: () => {
        // deleteCostCenterData({
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
      searchCondition: {
        pageTop: formFilter.getFieldsValue(),
        listHeader: form.getFieldsValue(),
      },
      orderCondition: {
        //   [orderField]: orderType == 'ascend' ? 0 : 1,
      },
      pageIndex: current,
      pageSize: pageSize,
    };
    // getCostCenterData(params).then((res) => {
    //   if (res.isSuccess) {
    //     setTableData(res.data);
    //     setTotal(res.totalCount);
    //   } else {
    //     message.error(res.msg);
    //   }
    // });
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

  const saveFormData = () => {
    formData
      .validateFields()
      .then((values) => {
        const params = {
          id: formData.getFieldValue('id') || '',
          ...formData.getFieldsValue(),
        };
        // editCostCenterDataSave(params).then((res) => {
        //   if (res.isSuccess) {
        //     message.success(res.msg);
        //     setShowUserData(false);
        //     formData.resetFields();
        //     getData();
        //   } else {
        //     message.error(res.msg);
        //   }
        // });
      })
      .catch((e) => {});
  };
  return (
    <ContentWrap className="userClass">
      {/* 编辑 */}
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
                User Data
              </span>
            </TableTitleDiv>
          </TableTopDiv>
        }
        visible={showUserData}
        footer={null}
        onCancel={() => {
          setShowUserData(false);
          formData.resetFields();
        }}
      >
        <Form form={formData} labelCol={{ flex: '140px' }}>
          <Row gutter={20}>
            <Col span={12}>
              <Form.Item label="GID" name="gID" rules={[{ required: true }]}>
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="EmployeeNo"
                name="employeeNo"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Name" name="name" rules={[{ required: true }]}>
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Email"
                name="email"
                rules={[
                  { required: true },
                  {
                    pattern:
                      /^[a-zA-Z0-9]+([-_.][a-zA-Z0-9]+)*@[a-zA-Z0-9]+([-_.][a-zA-Z0-9]+)*\.[a-z]{2,}$/,
                    message: 'The email entered is incorrect',
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="ARE" name="are" rules={[{ required: true }]}>
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="CustomerDivision"
                name="customerDivision"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="BusinessLine" name="businessLine">
                <Input />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item style={{ textAlign: 'center', marginTop: '20px' }}>
                <Space size={60}>
                  <Button type="primary" onClick={saveFormData}>
                    Save
                  </Button>

                  <Button
                    onClick={() => {
                      setShowUserData(false);
                      formData.resetFields();
                    }}
                  >
                    Cancel
                  </Button>
                </Space>
              </Form.Item>
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
          <FilterGroupDiv>
            <Form form={formFilter} labelCol={{ flex: '120px' }}>
              <Row className="masterData">
                <Col span={12}>
                  <Form.Item label="Key words" name="keywords">
                    <Input placeholder="GID/User Name" />
                  </Form.Item>
                </Col>
                <Col span={1} offset={1}>
                  <Form.Item>
                    <Space size={20}>
                      <Tooltip title="Search">
                        <Button
                          type="primary"
                          icon={<i className="gbs gbs-search"></i>}
                          onClick={getData}
                        ></Button>
                      </Tooltip>
                    </Space>
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          </FilterGroupDiv>
        }
        renderBtns={
          <Space>
            {/* <BtnThemeWrap>
              <Dropdown
                overlay={() => (
                  <Menu>
                    <Menu.Item key="2" icon={<i className="gbs gbs-add"></i>}>
                      <Button
                        style={{ margin: '0 10px' }}
                        type="text"
                        onClick={() => {
                          setShowUserData(true);
                          setComponentDisabled(false);
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
                        <a href="./template/Cost Center Input.xlsx">
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
            </BtnThemeWrap> */}
            <Button type="primary" onClick={() => setShowUserData(true)}>
              Add
            </Button>
            <Button
              disabled={selectedRowKeys.length != 1}
              onClick={(event) => deleteInfos(selectedRowKeys, event)}
            >
              Delete
            </Button>
            {/* <Divider
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
            ></Button> */}
          </Space>
        }
        changePageSize={changePageSize}
        current={current}
        search={isSearch}
        rowKey="id"
        listName="Users"
      />
    </ContentWrap>
  );
};
export default Index;