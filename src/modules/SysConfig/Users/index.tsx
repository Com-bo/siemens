import React, { useState, useEffect } from 'react';
import {
  BtnThemeWrap,
  ContentWrap,
  FilterGroupDiv,
  TableTitleDiv,
  TableTopDiv,
  TableWrapDiv,
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
  List,
  Menu,
  message,
  Modal,
  Popconfirm,
  Row,
  Select,
  Space,
  Switch,
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
  PlusOutlined,
} from '@ant-design/icons';
import {
  deleUser,
  insertUserInfo,
  modifyUserInfo,
  queryRolePageInfo,
  queryUserPageInfo,
  OtherMasterDataQueryAREOCOptionsList,
  OtherMasterDataQueryCustemerDivisionSLCOptionsList,
} from '@/app/request/apiSys';
import Table from '@/components/Table';
import {
  getCustemerDivisionList,
  queryBusinesslineOptionsList,
} from '@/app/request/common';
export const Index = (props: any) => {
  const [form] = Form.useForm();
  const [formFilter] = Form.useForm();
  const [formData] = Form.useForm();
  const [roleForm] = Form.useForm();
  const [areForm] = Form.useForm();
  const [customerForm] = Form.useForm();
  const [businessForm] = Form.useForm();
  const [tableData, setTableData] = useState([{ id: 111, gID: 'SS' }]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [total, setTotal] = useState(0);
  const [current, setCurrent] = useState(1);
  const [isSearch, setIsSearch] = useState(false);
  const [pageSize, setPageSize] = useState(20);
  const [showUserData, setShowUserData] = useState(false);
  // ----------角色---------
  const [role, setRole] = useState([]);
  const [isRoles, setIsRoles] = useState(false);
  const [roles, setRoleData] = useState([]);
  const [roleCurrent, setRoleCurent] = useState(1);
  const [roleTotal, setRoleTotal] = useState(0);
  const [rolePageSize, setRolePageSize] = useState(20);
  const [selectRole, setSelectedRoles] = useState([]);
  // -----------are--------------
  const [are, setAre] = useState([]);
  const [isAres, setIsAres] = useState(false);
  const [areList, setAREData] = useState([]);
  const [selectAre, setSelectedAres] = useState([]);
  // --------------CustomerDivision(SLC)----------
  const [customerDivision, setCustomerDivision] = useState([]);
  const [isCustomers, setIsCustomer] = useState(false);
  const [customerList, setCustomerData] = useState([]);
  const [selectCustomer, setSelectedCustomers] = useState([]);
  // -----------businessLine------
  const [businessLine, setBusinessLine] = useState([]);
  const [isBusiness, setIsBusinessLine] = useState(false);
  const [businessList, setBusinessData] = useState([]);
  const [selectBusiness, setSelectedBusiness] = useState([]);

  const orignalCols: any = [
    {
      name: 'gid',
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
      title: 'User Name',
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
      render: (text) => (text && Array.isArray(text) ? text.join(',') : text),
    },
    {
      title: 'CustomerDivision',
      name: 'customerDivision',
      width: '180px',
      render: (text) => (text && Array.isArray(text) ? text.join(',') : text),
    },
    {
      title: 'BusinessLine',
      name: 'businessLine',
      render: (text) => (text && Array.isArray(text) ? text.join(',') : text),
    },
    {
      title: 'Role',
      name: 'role',
      render: (text) => (text && Array.isArray(text) ? text.join(',') : text),
      // titleRender: 'input',
    },
    {
      title: 'Enable',
      name: 'enable',
      render: (text) => (text ? 'Yes' : 'No'),
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
                setAre(record.are || []);
                setCustomerDivision(record.custemerDivision || []);
                setBusinessLine(record.businessLine || []);
                setRole(record.role || []);
                formData.setFieldsValue({
                  ...record,
                  userName: record.name,
                  enable: record.enable === 1 ? true : false,
                });
                showUserDataFuc();
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

  const roleCols: any = [
    {
      dataIndex: 'roleName',
      title: 'Role',
      key: 'roleName',
      align: 'center',
    },
    {
      dataIndex: 'remark',
      title: 'Remark',
      key: 'remark',
      align: 'center',
    },
    {
      title: 'Enable',
      dataIndex: 'enable',
      key: 'enable',
      align: 'center',
      render: (text) => (text === 1 ? 'Enable' : text === 0 ? 'Disable' : text),
    },
  ];
  const areCols: any = [
    {
      dataIndex: 'label',
      title: 'ARE',
      key: 'label',
      align: 'center',
    },
  ];
  const customerCols: any = [
    {
      dataIndex: 'label',
      title: 'CustomerDivision',
      key: 'label',
      align: 'center',
    },
  ];
  const businessCols = [
    {
      dataIndex: 'label',
      title: 'CustomerDivision',
      key: 'label',
      align: 'center',
    },
  ];
  // 删除接口
  const deleteInfos = (ids: Array<any>, event) => {
    event.stopPropagation();
    Modal.confirm({
      title: 'Tips',
      icon: <ExclamationCircleOutlined />,
      content: 'Confirm to delete the selected data?',
      okText: 'Confirm',
      cancelText: 'Cancel',
      onOk: () => {
        deleUser({
          userList: ids,
        }).then((res) => {
          if (res.isSuccess) {
            message.success('Deletion succeeded!');
            setSelectedRowKeys([]);
            getData();
            setCurrent(1);
          } else {
            message.error(res.msg);
          }
        });
      },
      centered: true,
    });
  };
  const getData = () => {
    let params = {
      keyWord: formFilter.getFieldValue('keyWord'),
      pageIndex: current,
      pageSize: pageSize,
    };
    queryUserPageInfo(params).then((res) => {
      if (res.isSuccess) {
        setTableData(res.data);
        setTotal(res.totalCount);
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
    setPageSize(val);
  };

  const saveFormData = () => {
    console.log(1111);
    formData
      .validateFields()
      .then(async (values) => {
        const params = {
          id: formData.getFieldValue('id') || '',
          ...formData.getFieldsValue(),
          role,
          customerDivision,
          are,
          businessLine,
          enable: formData.getFieldValue('enable') ? 1 : 0,
        };
        let res: any;
        if (formData.getFieldValue('id')) {
          // 编辑
          res = await modifyUserInfo(params);
        } else {
          // 新增
          res = await insertUserInfo(params);
        }
        if (res.isSuccess) {
          message.success(res.msg);
          handleFormDataCancel();
          getData();
        } else {
          message.error(res.msg);
        }
      })
      .catch((e) => {
        console.log(e);
      });
  };
  const showUserDataFuc = () => {
    setShowUserData(true);
  };

  // 人员维护搜索
  const roleSearch = () => {
    let params = {
      roleName: roleForm.getFieldValue('role'),
      pageIndex: roleCurrent,
      pageSize: rolePageSize,
    };
    queryRolePageInfo(params).then((res) => {
      if (res.isSuccess) {
        setRoleData(res.data);
        setRoleTotal(res.totalCount);
      } else {
        message.error(res.msg);
      }
    });
  };
  const customerDivisionSearch = () => {
    let params = {
      keywords: customerForm.getFieldValue('keywords'),
    };
    OtherMasterDataQueryCustemerDivisionSLCOptionsList(params).then((res) => {
      if (res.isSuccess) {
        setCustomerData(res.data);
      } else {
        message.error(res.msg);
      }
    });
  };
  // are
  const areSearch = () => {
    let params = {
      keywords: areForm.getFieldValue('keywords'),
    };
    OtherMasterDataQueryAREOCOptionsList(params).then((res) => {
      if (res.isSuccess) {
        setAREData(res.data);
      } else {
        message.error(res.msg);
      }
    });
  };
  const businessSearch = () => {
    let params = {
      keywords: businessForm.getFieldValue('keywords'),
    };
    queryBusinesslineOptionsList(params).then((res) => {
      if (res.isSuccess) {
        setBusinessData(res.data);
      } else {
        message.error(res.msg);
      }
    });
  };
  const roleFunc = async () => {
    setIsRoles(true);
    if (roleCurrent == 1) {
      roleSearch();
    } else {
      setRoleCurent(1);
    }
  };
  const areFunc = async (_) => {
    setIsAres(true);
    setSelectedAres(are || []);
    areSearch();
  };
  const customerDivisionFunc = () => {
    setIsCustomer(true);
    setSelectedCustomers(customerDivision || []);
    customerDivisionSearch();
  };
  const businessFunc = () => {
    setIsBusinessLine(true);
    setSelectedBusiness(businessLine || []);
    businessSearch();
  };
  useEffect(() => {
    if (isRoles) {
      roleSearch();
    }
  }, [roleCurrent, rolePageSize]);

  const onRolePageChange = (pagination) => {
    setRoleCurent(pagination.current);
  };

  const handlerRolePageSize = (val: number) => {
    setRolePageSize(val);
  };

  // 人员维护绑定
  const handleRoleOk = () => {
    setRole(selectRole);
    handleRoleCancel();
  };
  const handleCustomerOk = () => {
    setCustomerDivision(selectCustomer);
    handleCustomerCancel();
  };

  const handleAreOk = () => {
    setAre(selectAre);
    handleAreCancel();
  };
  const handleBusinessOk = () => {
    setBusinessLine(selectBusiness);
    handleBusinessCancel();
  };
  const handleRoleCancel = () => {
    setIsRoles(false);
    roleForm.resetFields();
    setSelectedRoles([]);
  };
  const handleAreCancel = () => {
    setIsAres(false);
    areForm.resetFields();
    setSelectedAres([]);
  };
  const handleCustomerCancel = () => {
    setIsCustomer(false);
    customerForm.resetFields();
    setSelectedCustomers([]);
  };
  const handleBusinessCancel = () => {
    setIsBusinessLine(false);
    businessForm.resetFields();
    setSelectedBusiness([]);
  };
  const handleFormDataCancel = () => {
    setShowUserData(false);
    formData.resetFields();
    setAre([]);
    setCustomerDivision([]);
    setRole([]);
    setBusinessLine([]);
  };

  return (
    <ContentWrap className="userClass">
      {/* -----------business---------- */}
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
                BusinessLine List Data
              </span>
            </TableTitleDiv>
          </TableTopDiv>
        }
        visible={isBusiness}
        footer={null}
        onCancel={handleBusinessCancel}
      >
        <TableWrapDiv className="user_wrap">
          <Form form={businessForm}>
            <Row>
              <Col span={20}>
                <Form.Item label="CustomerDivision" name="keywords">
                  <Input />
                </Form.Item>
              </Col>
              <Col span={3} offset={1}>
                <Button type="primary" onClick={businessSearch}>
                  Search
                </Button>
              </Col>
            </Row>
          </Form>
          <Table
            columns={businessCols}
            data={businessList}
            type="checkbox"
            scrollY={'calc(100vh - 480px)'}
            pagination={false}
            onChange={(_selectedRowKeys, _selectedRows) => {
              // (_selectedRowKeys);
              setSelectedBusiness(_selectedRowKeys);
            }}
            rowKey="value"
            selection={true}
            selectedRowKeys={selectBusiness}
          />
          <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <Space size={60}>
              <Button type="primary" onClick={handleBusinessOk}>
                Save
              </Button>
              <Button onClick={handleBusinessCancel}>Cancel</Button>
            </Space>
          </div>
        </TableWrapDiv>
      </Modal>
      {/* --------CustomerDivision----- */}
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
                CustomerDivision(SLC) List Data
              </span>
            </TableTitleDiv>
          </TableTopDiv>
        }
        visible={isCustomers}
        footer={null}
        onCancel={handleCustomerCancel}
      >
        <TableWrapDiv className="user_wrap">
          <Form form={customerForm}>
            <Row>
              <Col span={20}>
                <Form.Item label="CustomerDivision" name="keywords">
                  <Input />
                </Form.Item>
              </Col>
              <Col span={3} offset={1}>
                <Button type="primary" onClick={customerDivisionSearch}>
                  Search
                </Button>
              </Col>
            </Row>
          </Form>
          <Table
            columns={customerCols}
            data={customerList}
            type="checkbox"
            scrollY={'calc(100vh - 480px)'}
            pagination={false}
            onChange={(_selectedRowKeys, _selectedRows) => {
              // (_selectedRowKeys);
              setSelectedCustomers(_selectedRowKeys);
            }}
            rowKey="value"
            selection={true}
            selectedRowKeys={selectCustomer}
          />
          <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <Space size={60}>
              <Button type="primary" onClick={handleCustomerOk}>
                Save
              </Button>
              <Button onClick={handleCustomerCancel}>Cancel</Button>
            </Space>
          </div>
        </TableWrapDiv>
      </Modal>

      {/* ------are---------- */}
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
                ARE List Data
              </span>
            </TableTitleDiv>
          </TableTopDiv>
        }
        visible={isAres}
        footer={null}
        onCancel={handleAreCancel}
      >
        <TableWrapDiv className="user_wrap">
          <Form form={areForm}>
            <Row>
              <Col span={20}>
                <Form.Item label="ARE" name="keywords">
                  <Input />
                </Form.Item>
              </Col>
              <Col span={3} offset={1}>
                <Button type="primary" onClick={areSearch}>
                  Search
                </Button>
              </Col>
            </Row>
          </Form>
          <Table
            columns={areCols}
            data={areList}
            type="checkbox"
            scrollY={'calc(100vh - 480px)'}
            onChange={(_selectedRowKeys, _selectedRows) => {
              setSelectedAres(_selectedRowKeys);
            }}
            pagination={false}
            rowKey="value"
            selection={true}
            selectedRowKeys={selectAre}
          />
          <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <Space size={60}>
              <Button type="primary" onClick={handleAreOk}>
                Save
              </Button>
              <Button onClick={handleAreCancel}>Cancel</Button>
            </Space>
          </div>
        </TableWrapDiv>
      </Modal>

      {/* ------role---------- */}
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
                Role List Data
              </span>
            </TableTitleDiv>
          </TableTopDiv>
        }
        visible={isRoles}
        footer={null}
        onCancel={handleRoleCancel}
      >
        <TableWrapDiv className="user_wrap">
          <Form form={roleForm}>
            <Row>
              <Col span={20}>
                <Form.Item label="Role" name="role">
                  <Input />
                </Form.Item>
              </Col>
              <Col span={3} offset={1}>
                <Button type="primary" onClick={roleSearch}>
                  Search
                </Button>
              </Col>
            </Row>
          </Form>
          <Table
            columns={roleCols}
            data={roles}
            type="checkbox"
            preserveSelectedRowKeys={true}
            current={roleCurrent}
            pageSize={rolePageSize}
            total={roleTotal}
            onChange={(_selectedRowKeys, _selectedRows) => {
              // (_selectedRowKeys);
              setSelectedRoles(_selectedRowKeys);
            }}
            pagination={true}
            rowKey="roleName"
            scrollY={'calc(100vh - 420px)'}
            selection={true}
            selectedRowKeys={selectRole}
            onPageChange={onRolePageChange}
            handlePageSize={handlerRolePageSize}
          />
          <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <Space size={60}>
              <Button type="primary" onClick={handleRoleOk}>
                Save
              </Button>
              <Button onClick={handleRoleCancel}>Cancel</Button>
            </Space>
          </div>
        </TableWrapDiv>
      </Modal>
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
        onCancel={handleFormDataCancel}
      >
        <Form
          form={formData}
          labelCol={{ flex: '160px' }}
          className="user_form"
        >
          <Row gutter={20}>
            <Col span={12}>
              <Form.Item label="GID" name="gid" rules={[{ required: true }]}>
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
              <Form.Item
                label="user Name"
                name="userName"
                rules={[{ required: true }]}
              >
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
              <Form.Item label="ARE(OC)" name="are" valuePropName="dataSource">
                <div style={{ margin: '5px 0', textAlign: 'right' }}>
                  <Button onClick={areFunc} icon={<PlusOutlined />}>
                    ARE(OC)
                  </Button>
                </div>
                <List
                  bordered
                  dataSource={are}
                  size="small"
                  renderItem={(item, index: number) => (
                    <List.Item
                      actions={[
                        <Tooltip title="delete" key={index}>
                          <Button
                            type="text"
                            icon={<i className="gbs gbs-delete"></i>}
                            onClick={() => {
                              let newData = [...are];
                              newData.splice(index, 1);
                              setAre(newData);
                            }}
                          ></Button>
                        </Tooltip>,
                      ]}
                    >
                      {item}
                    </List.Item>
                  )}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="CustomerDivision(SLC)"
                name="customerDivision"
                valuePropName="dataSource"
              >
                <div style={{ margin: '5px 0', textAlign: 'right' }}>
                  <Button
                    icon={<PlusOutlined />}
                    onClick={customerDivisionFunc}
                  >
                    CustomerDivision(SLC)
                  </Button>
                </div>
                <List
                  bordered
                  dataSource={customerDivision}
                  renderItem={(item, index: number) => (
                    <List.Item
                      actions={[
                        <Tooltip title="delete">
                          <Button
                            type="text"
                            icon={<i className="gbs gbs-delete"></i>}
                            onClick={() => {
                              let newData = [...customerDivision];
                              newData.splice(index, 1);
                              setCustomerDivision(newData);
                            }}
                          ></Button>
                        </Tooltip>,
                      ]}
                    >
                      {item}
                    </List.Item>
                  )}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="BusinessLine"
                name="businessLine"
                valuePropName="dataSource"
              >
                <div style={{ margin: '5px 0', textAlign: 'right' }}>
                  <Button icon={<PlusOutlined />} onClick={businessFunc}>
                    BusinessLine
                  </Button>
                </div>
                <List
                  bordered
                  dataSource={businessLine}
                  renderItem={(item, index) => (
                    <List.Item
                      key={index}
                      actions={[
                        <Tooltip title="delete">
                          <Button
                            type="text"
                            icon={<i className="gbs gbs-delete"></i>}
                            onClick={() => {
                              let newData = [...businessLine];
                              newData.splice(index, 1);
                              setBusinessLine(newData);
                            }}
                          ></Button>
                        </Tooltip>,
                      ]}
                    >
                      {item}
                    </List.Item>
                  )}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Role"
                name="role"
                required={true}
                rules={[
                  {
                    validator: (rule, value) => {
                      if (!role || !role.length) {
                        return Promise.reject(rule.message);
                      }
                      return Promise.resolve();
                    },
                    message: 'Please select Role',
                  },
                ]}
                valuePropName="dataSource"
              >
                <div style={{ margin: '5px 0', textAlign: 'right' }}>
                  <Button icon={<PlusOutlined />} onClick={roleFunc}>
                    Role
                  </Button>
                </div>
                <List
                  bordered
                  dataSource={role}
                  renderItem={(item, index) => (
                    <List.Item
                      key={index}
                      actions={[
                        <Tooltip title="delete">
                          <Button
                            type="text"
                            icon={<i className="gbs gbs-delete"></i>}
                            onClick={() => {
                              let newData = [...role];
                              newData.splice(index, 1);
                              setRole(newData);
                            }}
                          ></Button>
                        </Tooltip>,
                      ]}
                    >
                      {item}
                    </List.Item>
                  )}
                />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item style={{ textAlign: 'center', marginTop: '20px' }}>
                <Space size={60}>
                  <Button type="primary" onClick={saveFormData}>
                    Save
                  </Button>
                  <Button onClick={handleFormDataCancel}>Cancel</Button>
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
        scrollX="2800px"
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
                  <Form.Item label="Key Word" name="keyWord">
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
            <Button type="primary" onClick={() => showUserDataFuc()}>
              Add
            </Button>
            <Button
              disabled={!selectedRowKeys.length}
              onClick={(event) => deleteInfos(selectedRowKeys, event)}
            >
              Delete
            </Button>
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
function InsertUserInfo(params: any): any {
  throw new Error('Function not implemented.');
}
