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
  Tag,
  Tooltip,
  Tree,
  Upload,
} from 'antd';
import './style.less';
import { EditOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import {
  delRole,
  queryRoleMapAuthTrees,
  queryRoleMapUsers,
  queryRolePageInfo,
  queryUserPageInfo,
  roleBingUser,
  updateRole,
} from '@/app/request/apiSys';
import Table from '@/components/Table';
export const Index = (props: any) => {
  const [form] = Form.useForm();
  const [formFilter] = Form.useForm();
  const [formData] = Form.useForm();
  const [userForm] = Form.useForm();
  const [tableData, setTableData] = useState([{ id: 111, role: 'SS' }]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [total, setTotal] = useState(0);
  const [current, setCurrent] = useState(1);
  const [isSearch, setIsSearch] = useState(false);
  const [pageSize, setPageSize] = useState(20);
  const [showRoleData, setShowRoleData] = useState(false);
  const [funData, setFunData] = useState(Array<any>());
  const [checkedFunKeys, setCheckedFunKeys] = useState<React.Key[]>();
  const [checkedParentFunKeys, setCheckedParentFunKeys] =
    useState<React.Key[]>();
  const [isFunModalVisible, setIsFunModalVisible] = useState(false);
  const [roleId, setRoleId] = useState('');
  const [roleName, setRoleName] = useState('');
  const [isUsers, setIsUsers] = useState(false);
  const [userData, setUserData] = useState([]);
  const [userCurrent, setUserCurent] = useState(1);
  const [userTotal, setUserTotal] = useState(0);
  const [userPageSize, setUserPageSize] = useState(20);
  const [selectUser, setSelectedUsers] = useState([]);
  const userCols: any = [
    {
      title: 'User Name',
      dataIndex: 'userName',
      key: 'userName',
      align: 'center',
    },
    {
      title: 'GID',
      dataIndex: 'gid',
      key: 'gid',
      align: 'center',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      align: 'center',
    },
  ];
  const orignalCols: any = [
    {
      name: 'roleName',
      title: 'Role',
      titleRender: 'input',
      width: '20%',
    },
    {
      name: 'remark',
      title: 'Remark',
      width: '50%',
      titleRender: 'input',
    },
    {
      title: 'Enable',
      name: 'enable',
      titleRender: 'input',
      width: '15%',
      render: (text) => (text === 1 ? 'Enable' : text === 0 ? 'Disable' : text),
    },
    // {
    //     title: 'adminFlag',
    //     name: 'IsAdmin',
    //     titleRender: 'input',
    //     width: '15%',
    //     render: (text) => text === 1 ? "Yes" : text === 0 ? "No" : text
    // },
    {
      name: 'Operate',
      title: 'Operate',
      width: '15%',
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
                });
                showRoleDataFunc(record.enable == 1 ? true : false);
              }}
            ></Button>
          </Tooltip>
          {/* <Tooltip title="Maintenance user">
                        <Button
                            type="text"
                            key="3"
                            icon={<span className="gbs gbs-users"></span>}
                            onClick={()=>personAuth(record)}
                        ></Button>
                    </Tooltip> */}
          <Tooltip title="Function authorization">
            <Button
              type="text"
              key="3"
              icon={<span className="gbs gbs-fun"></span>}
              onClick={() => funAuth(record)}
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
        // delRole({
        //     recordIdList,
        // }).then((res) => {
        //     if (res.isSuccess) {
        //         message.success('Deletion succeeded!');
        //         setSelectedRowKeys([]);
        //         getData();
        //         setCurrent(1);
        //     } else {
        //         message.error(res.msg);
        //     }
        // });
      },
      centered: true,
    });
  };
  const getData = () => {
    let params = {
      roleName: formFilter.getFieldValue('keywords'),
      // adminFlag: 1,
      pageIndex: current,
      pageSize: pageSize,
    };
    queryRolePageInfo(params).then((res) => {
      if (res.isSuccess) {
        setTableData(res.data);
        setTotal(res.totalCount);
      } else {
        message.error(res.msg);
      }
    });
  };
  const handleFunCheckedData = (data, arr) => {
    data.forEach((item) => {
      if (item.authFlag == '1') {
        if (item.subTree.length != 0) {
          handleFunCheckedData(item.subTree, arr);
        } else {
          arr.push(item.id);
        }
      }
    });
  };
  useEffect(() => {
    getData();
  }, [current, pageSize]);
  useEffect(() => {
    // ();
  }, [current, pageSize]);
  const onPageChange = (pagination, filters, sorter, extra) => {
    setCurrent(pagination.current);
  };

  const changePageSize = (val: number) => {
    setPageSize(val);
  };
  const handleFunTreeData = (arr: any) => {
    return arr.map((item) => ({
      key: item.id,
      title: item.authName,
      children: handleFunTreeData(item.subTree),
    }));
  };
  // 功能授权弹窗开
  const funAuth = (row) => {
    setRoleId(row.id);
    setRoleName(row.roleName);
    setIsFunModalVisible(true);
    queryRoleMapAuthTrees(row.id).then((res) => {
      if (res.isSuccess) {
        let data = handleFunTreeData(res.data);
        setFunData(data);
        let arr = [];
        handleFunCheckedData(res.data, arr);
        setCheckedFunKeys(arr);
      } else {
        message.error(res.msg);
      }
    });
  };
  const saveFormData = () => {
    formData
      .validateFields()
      .then((values) => {
        const params = {
          id: formData.getFieldValue('id') || '',
          ...formData.getFieldsValue(),
          enable: formData.getFieldValue('enable') ? 1 : 0,
        };
        updateRole(params).then((res) => {
          if (res.isSuccess) {
            message.success(res.msg);
            setShowRoleData(false);
            formData.resetFields();
            getData();
          } else {
            message.error(res.msg);
          }
        });
      })
      .catch((e) => {});
  };

  const onFunCheck = (checkedKeysValue, e) => {
    const { halfCheckedKeys } = e;
    let checkedKeys = [...checkedKeysValue, ...halfCheckedKeys];
    setCheckedParentFunKeys(checkedKeys);
    setCheckedFunKeys(checkedKeysValue);
  };
  const showRoleDataFunc = (enable?: number | boolean) => {
    setShowRoleData(true);
    formData.setFieldsValue({
      enable,
    });
  };

  // 人员维护搜索
  const personSearch = () => {
    const params = {
      keyWord: userForm.getFieldValue('userName'),
      pageIndex: userCurrent,
      pageSize: userPageSize,
    };
    return queryUserPageInfo(params)
      .then((res) => {
        if (res.isSuccess) {
          setUserData(res.data || []);
        } else {
          message.error(res.msg);
        }
        return res;
      })
      .catch((e) => e);
  };
  // 人员维护弹窗开
  const personAuth = async (row) => {
    setRoleId(row.id);
    setIsUsers(true);
    if (userCurrent == 1) {
      await personSearch();
      getUserSelectRows(row.id);
    } else {
      setUserCurent(1);
      getUserSelectRows(row.id);
    }
  };
  const getUserSelectRows = async (id: string) => {
    if (!id) return;
    const res = await queryRoleMapUsers(id);
    if (res.isSuccess) {
      let data = res.data || [];
      setSelectedUsers(data);
    } else {
      message.error(res.msg);
    }
  };
  useEffect(() => {
    personSearch();
  }, [userCurrent, userPageSize]);
  const onPersonPageChange = (pagination) => {
    setUserCurent(pagination.current);
  };
  const handleruserPageSize = (val: number) => {
    setUserPageSize(val);
  };
  // 人员维护绑定
  const handlePersonOk = () => {
    let data = {
      roleId: roleId,
      userList: [...selectUser],
    };
    roleBingUser(data).then((res) => {
      if (res.isSuccess) {
        message.success(res.msg);
        handlePersonCancel();
      } else {
        message.error(res.msg);
      }
    });
  };
  const handlePersonCancel = () => {
    setIsUsers(false);
    userForm.resetFields();
  };
  return (
    <ContentWrap>
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
                Maintenance user Data
              </span>
            </TableTitleDiv>
          </TableTopDiv>
        }
        visible={isUsers}
        footer={null}
        onCancel={handlePersonCancel}
      >
        <TableWrapDiv className="user_wrap">
          <Form form={userForm}>
            <Row>
              <Col span={20}>
                <Form.Item label="User Name" name="userName">
                  <Input />
                </Form.Item>
              </Col>
              <Col span={3} offset={1}>
                <Button type="primary" onClick={personSearch}>
                  Search
                </Button>
              </Col>
            </Row>
          </Form>
          <Table
            columns={userCols}
            data={userData}
            current={userCurrent}
            pageSize={userPageSize}
            total={userTotal}
            onChange={(_selectedRowKeys, _selectedRows) => {
              // (_selectedRowKeys);
              setSelectedUsers(_selectedRowKeys);
            }}
            rowKey="id"
            selection={true}
            selectedRowKeys={selectUser}
            onPageChange={onPersonPageChange}
            handlePageSize={handleruserPageSize}
          />
          <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <Space size={60}>
              <Button type="primary" onClick={handlePersonOk}>
                Save
              </Button>
              <Button onClick={handlePersonCancel}>Cancel</Button>
            </Space>
          </div>
        </TableWrapDiv>
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
                Role Data
              </span>
            </TableTitleDiv>
          </TableTopDiv>
        }
        visible={isFunModalVisible}
        footer={null}
        onCancel={() => {
          setIsFunModalVisible(false);
        }}
      >
        <div style={{ margin: '20px 0' }}>
          Current Role:{' '}
          <Input value={roleName} disabled style={{ width: '300px' }} />
        </div>
        <Divider />
        <Tree
          checkable
          defaultExpandAll
          autoExpandParent={true}
          onCheck={onFunCheck}
          checkedKeys={checkedFunKeys}
          // onSelect={onFunSelect}
          treeData={funData}
        />
        <div style={{ textAlign: 'center' }}>
          <Space size={60}>
            <Button type="primary" onClick={saveFormData}>
              Save
            </Button>
            <Button
              onClick={() => {
                setShowRoleData(false);
                formData.resetFields();
              }}
            >
              Cancel
            </Button>
          </Space>
        </div>
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
                Role Data
              </span>
            </TableTitleDiv>
          </TableTopDiv>
        }
        visible={showRoleData}
        footer={null}
        onCancel={() => {
          setShowRoleData(false);
          formData.resetFields();
        }}
      >
        <Form form={formData} labelCol={{ flex: '140px' }}>
          <Row gutter={20}>
            <Col span={12}>
              <Form.Item
                label="Role"
                name="roleName"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Enable" name="enable" valuePropName="checked">
                <Switch />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item label="Remark" name="remark">
                <Input.TextArea />
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
                      setShowRoleData(false);
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
                    <Input placeholder="Role" />
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
            <Button type="primary" onClick={() => showRoleDataFunc()}>
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
        listName="Role"
      />
    </ContentWrap>
  );
};
export default Index;
