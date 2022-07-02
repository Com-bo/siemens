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
  Switch,
  Tooltip,
  Tree,
  Upload,
} from 'antd';
import './style.less';
import { EditOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import {
  queryRoleMapAuthTrees,
  queryRolePageInfo,
  updateRole,
} from '@/app/request/apiSys';
export const Index = (props: any) => {
  const [form] = Form.useForm();
  const [formFilter] = Form.useForm();
  const [formData] = Form.useForm();
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
  const orignalCols: any = [
    {
      name: 'role',
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
    },
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
                setShowRoleData(true);
                formData.setFieldsValue({
                  ...record,
                });
              }}
            ></Button>
          </Tooltip>
          <Tooltip title="Maintenance user">
            <Button
              type="text"
              key="3"
              icon={<span className="gbs gbs-users"></span>}
              onClick={() => {}}
            ></Button>
          </Tooltip>
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
              <Form.Item label="Role" name="role" rules={[{ required: true }]}>
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
            <Button type="primary" onClick={() => setShowRoleData(true)}>
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
