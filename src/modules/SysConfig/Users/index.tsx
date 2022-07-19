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
  const [tableData, setTableData] = useState([{ id: 111, gID: 'SS' }]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [total, setTotal] = useState(0);
  const [current, setCurrent] = useState(1);
  const [isSearch, setIsSearch] = useState(false);
  const [pageSize, setPageSize] = useState(20);
  const [showUserData, setShowUserData] = useState(false);
  const [isRoles, setIsRoles] = useState(false);
  const [roles, setRoleData] = useState([]);
  const [roleCurrent, setRoleCurent] = useState(1);
  const [roleTotal, setRoleTotal] = useState(0);
  const [rolePageSize, setRolePageSize] = useState(20);
  const [selectRole, setSelectedRoles] = useState([]);
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
                formData.setFieldsValue({
                  ...record,
                  role: record.role ? record.role.join(',') : '',
                  are: record.are ? record.are.join(',') : '',
                  customerDivision: record.customerDivision
                    ? record.customerDivision.join(',')
                    : '',
                  businessLine: record.businessLine
                    ? record.businessLine.join(',')
                    : '',
                  enable: record.enable === 1 ? true : false,
                });
                showUserDataFuc(record.role);
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
    formData
      .validateFields()
      .then(async (values) => {
        const params = {
          id: formData.getFieldValue('id') || '',
          ...formData.getFieldsValue(),
          role: formData.getFieldValue('role').split(','),
          enable: formData.getFieldValue('enable') ? 1 : 0,
          customerDivision: formData
            .getFieldValue('customerDivision')
            .split(''),
        };
        console.log(params);
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
          setShowUserData(false);
          formData.resetFields();
          getData();
        } else {
          message.error(res.msg);
        }
      })
      .catch((e) => {});
  };
  const showUserDataFuc = (roleName?: string) => {
    setShowUserData(true);
    // 获取角色列表
    // queryRolePageInfo({
    //   roleName: roleName,
    //   pageIndex: 1,
    //   pageSize: 100,
    // }).then((res) => {
    //   if (res.isSuccess) {
    //     setRoles(res.data);
    //   }
    // });
  };

  // 人员维护搜索
  const roleSearch = () => {
    let params = {
      roleName: formFilter.getFieldValue('roleName'),
      // adminFlag: 1,
      pageIndex: current,
      pageSize: pageSize,
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
  const roleFunc = async (_role: string) => {
    setIsRoles(true);
    if (roleCurrent == 1) {
      await roleSearch();
      _role && setSelectedRoles(_role?.split(','));
    } else {
      setRoleCurent(1);
    }
  };
  useEffect(() => {
    roleSearch();
  }, [roleCurrent, rolePageSize]);
  const onRolePageChange = (pagination) => {
    setRoleCurent(pagination.current);
  };
  const handlerRolePageSize = (val: number) => {
    setRolePageSize(val);
  };
  // 人员维护绑定
  const handleRoleOk = () => {
    // selectRole
    formData.setFieldsValue({
      // role: formData.getFieldValue('role').concat(selectRole),
      role: selectRole.join(','),
    });
    setIsRoles(false);
    setSelectedRoles([]);
    setIsRoles(false);
  };
  const handleRoleCancel = () => {
    setIsRoles(false);
    roleForm.resetFields();
    setSelectedRoles([]);
  };
  return (
    <ContentWrap className="userClass">
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
            current={roleCurrent}
            pageSize={rolePageSize}
            total={roleTotal}
            onChange={(_selectedRowKeys, _selectedRows) => {
              // (_selectedRowKeys);
              setSelectedRoles(_selectedRowKeys);
            }}
            pagination={true}
            rowKey="roleName"
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
        onCancel={() => {
          setShowUserData(false);
          formData.resetFields();
        }}
      >
        <Form form={formData} labelCol={{ flex: '160px' }}>
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
                name="name"
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
              <Form.Item label="ARE(OC)" name="are">
                <DebounceSelect
                  initFlag
                  mode="multiple"
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
                    return OtherMasterDataQueryAREOCOptionsList({
                      keywords: e,
                    });
                  }}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="CustomerDivision(SLC)" name="customerDivision">
                <DebounceSelect
                  initFlag
                  mode="multiple"
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
            <Col span={12}>
              <Form.Item label="BusinessLine" name="businessLine">
                <DebounceSelect
                  initFlag
                  mode="multiple"
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
                    return queryBusinesslineOptionsList({
                      keywords: e,
                    });
                  }}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Role" name="role" rules={[{ required: true }]}>
                <Input.Search
                  readOnly
                  onSearch={() => roleFunc(form.getFieldValue('role') || '')}
                />
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
            <Button type="primary" onClick={() => showUserDataFuc()}>
              Add
            </Button>
            <Button
              disabled={!selectedRowKeys.length}
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
function InsertUserInfo(params: any): any {
  throw new Error('Function not implemented.');
}
