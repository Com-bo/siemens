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
import TableMix from '@/components/Table';
import {
  ClearOutlined,
  DownOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons';
import {
  deleteO2CUserIDData,
  editO2CUserIDDataSave,
  exportO2CUserIDData,
  getO2CUserIDListData,
  queryO2CUserIDLogData,
} from '@/app/request/apiO2CUserID';

export const Index = (props: any) => {
  const [orderField, setOrderField] = useState('modifiedDate');
  const [orderType, setOrderType] = useState('descend');
  const [form] = Form.useForm();
  const [formFilter] = Form.useForm();
  const [formData] = Form.useForm();
  const [tableData, setTableData] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [total, setTotal] = useState(0);
  const [current, setCurrent] = useState(1);
  const [isSearch, setIsSearch] = useState(true);
  const [pageSize, setPageSize] = useState(20);
  const [showLog, setShowLog] = useState(false);
  const [logData, setLogData] = useState([]);
  const [logSize, setLogSize] = useState(20);
  const [logCurrent, setLogCurrent] = useState(1);
  const [logTotal, setLogTotal] = useState(0);
  const [logId, setLogId] = useState('');
  const [showCostCenterData, setShowCostCenterData] = useState(false);
  const [componentDisabled, setComponentDisabled] = useState(false);
  const orignalCols: any = [
    {
      name: 'gid',
      title: 'GID',
      // sorter: true,
      width: '200px',
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
                setShowCostCenterData(true);
                setComponentDisabled(false);
                formData.setFieldsValue({
                  ...record,
                  customerDivision: record.custemerDivision,
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
          <Tooltip title="Log">
            <Button
              type="text"
              key="4"
              icon={<i className="gbs gbs-logs"></i>}
              onClick={(event) => {
                event.stopPropagation();
                toLog(record.id);
              }}
            ></Button>
          </Tooltip>
        </Space>
      ),
    },
  ];
  const columns: any = [
    {
      title: 'Created Date',
      dataIndex: 'createdDate',
      key: 'createdDate',
      align: 'center',
      width: '160px',
      render: (text) =>
        text && moment(text).isValid()
          ? moment(text).format('YYYY-MM-DD HH:mm:ss')
          : text,
    },
    {
      title: 'Created User',
      dataIndex: 'createdUser',
      key: 'createdUser',
      align: 'center',
    },
    {
      title: 'Fields Name',
      dataIndex: 'fieldsName',
      key: 'fieldsName',
      align: 'center',
    },
    {
      title: 'Old Value',
      dataIndex: 'oldValue',
      key: 'oldValue',
      align: 'center',
    },
    {
      title: 'New Value',
      dataIndex: 'newValue',
      key: 'newValue',
      align: 'center',
    },
    {
      title: 'Modified Date',
      dataIndex: 'modifiedDate',
      // sorter: {
      //   compare: (a, b) => moment(a.modifiedDate) > moment(b.modifiedDate),
      // },
      key: 'modifiedDate',
      align: 'center',
      render: (text) =>
        text && moment(text).isValid()
          ? moment(text).format('YYYY-MM-DD HH:mm:ss')
          : text,
    },
    {
      title: 'Modified User',
      dataIndex: 'modifiedUser',
      key: 'modifiedUser',
      align: 'center',
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
        deleteO2CUserIDData({
          recordIdList,
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
      searchCondition: {
        pageTop: formFilter.getFieldsValue(),
        listHeader: form.getFieldsValue(),
      },
      orderCondition: {
        [orderField]: orderType == 'ascend' ? 0 : 1,
      },
      pageIndex: current,
      pageSize: pageSize,
    };
    getO2CUserIDListData(params).then((res) => {
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
  const onPageChange = (
    pagination,
    filters,
    { column, columnKey, field, order },
    { currentDataSource, action },
  ) => {
    setCurrent(pagination.current);
  };

  const changePageSize = (val: number) => {
    setPageSize(val);
  };

  const exportExcelAction = () => {
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

    exportO2CUserIDData(params).then((res: any) => {
      if (res.response.status == 200) {
        let elink = document.createElement('a');
        // 设置下载文件名
        elink.download = 'O2CUserID  List.xlsx';
        elink.href = window.URL.createObjectURL(new Blob([res.response?.data]));
        elink.click();
        window.URL.revokeObjectURL(elink.href);
      } else {
        message.error(res.response.statusText);
      }
    });
  };
  useEffect(() => {
    logId && _getLogData();
  }, [logCurrent, logId, logSize]);
  const _getLogData = async () => {
    const res = await queryO2CUserIDLogData({
      recordId: logId,
      pageIndex: logCurrent,
      pageSize: logSize,
    });
    if (res.isSuccess) {
      setLogData(res.data || []);
      setLogTotal(res.totalCount);
    } else {
      message.error(res.msg);
    }
    return res;
  };
  const onLogPageChange = (pagination, filters, sorter, extra) => {
    //   翻页|排序|筛选
    switch (extra.action) {
      case 'paginate':
        setLogCurrent(pagination.current);
        break;
      case 'sort':
        break;
      default:
        break;
    }
  };
  const handleLogSize = (val: number) => {
    setLogSize(val);
  };
  const toLog = (recordId: string) => {
    // 获取loglist数据
    setLogId(recordId);
    setLogCurrent(1);
    if (logCurrent == 1) {
      _getLogData();
    }
    setShowLog(true);
  };
  const saveFormData = () => {
    formData
      .validateFields()
      .then((values) => {
        const params = {
          id: formData.getFieldValue('id') || '',
          ...formData.getFieldsValue(),
        };
        editO2CUserIDDataSave(params).then((res) => {
          if (res.isSuccess) {
            message.success(res.msg);
            setShowCostCenterData(false);
            formData.resetFields();
            getData();
          } else {
            message.error(res.msg);
          }
        });
      })
      .catch((e) => {});
  };
  return (
    <ContentWrap>
      {/* 编辑 */}
      <Modal
        maskClosable={false}
        width="500px"
        title={
          <TableTopDiv style={{ margin: 0 }}>
            <TableTitleDiv style={{ float: 'left' }}>
              <TaleTitleIconDiv>
                <span></span>
              </TaleTitleIconDiv>
              <span style={{ verticalAlign: 'middle', fontSize: '20px' }}>
                O2CUserID Data
              </span>
            </TableTitleDiv>
          </TableTopDiv>
        }
        visible={showCostCenterData}
        footer={null}
        onCancel={() => {
          setShowCostCenterData(false);
          formData.resetFields();
        }}
      >
        <Form form={formData} labelCol={{ flex: '80px' }}>
          <Row gutter={20}>
            <Col span={24}>
              <Form.Item label="GID" name="gid" rules={[{ required: true }]}>
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
                      setShowCostCenterData(false);
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

      {/* 日志查询 */}
      <Modal
        width="1000px"
        title={
          <TableTopDiv style={{ margin: 0 }}>
            <TableTitleDiv style={{ float: 'left' }}>
              <TaleTitleIconDiv>
                <span></span>
              </TaleTitleIconDiv>
              <span style={{ verticalAlign: 'middle', fontSize: '20px' }}>
                Log List Data
              </span>
            </TableTitleDiv>
          </TableTopDiv>
        }
        footer={null}
        visible={showLog}
        maskClosable={false}
        destroyOnClose={true}
        onCancel={() => {
          // formImport.resetFields();
          setShowLog(false);
        }}
      >
        <div className="selfTable" style={{ margin: '0 0px 0 -24px' }}>
          <TableMix
            columns={columns}
            data={logData}
            current={logCurrent}
            pageSize={logSize}
            total={logTotal}
            handlePageSize={handleLogSize}
            rowKey="id"
            onPageChange={onLogPageChange}
            pagination={true}
          />
        </div>
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
            <Form
              form={formFilter}
              labelCol={{ flex: '120px' }}
              wrapperCol={{ span: 14 }}
            >
              <Row className="masterData">
                <Col span={4}>
                  <Form.Item style={{ textAlign: 'right' }}>
                    <Space size={20}>
                      <Tooltip title="Search">
                        <Button
                          type="primary"
                          icon={<i className="gbs gbs-search"></i>}
                          onClick={getData}
                        ></Button>
                      </Tooltip>
                      <Tooltip title="Export">
                        <Button
                          icon={<i className="gbs gbs-export"></i>}
                          onClick={exportExcelAction}
                        ></Button>
                      </Tooltip>
                      <Tooltip title="Clear">
                        <Button
                          icon={<ClearOutlined />}
                          onClick={() => {
                            form.resetFields();
                            formFilter.resetFields();
                            if (current == 1) {
                              getData();
                            } else {
                              setCurrent(1);
                            }
                          }}
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
            <BtnThemeWrap>
              <Dropdown
                overlay={() => (
                  <Menu>
                    <Menu.Item key="2" icon={<i className="gbs gbs-add"></i>}>
                      <Button
                        style={{ margin: '0 10px' }}
                        type="text"
                        onClick={() => {
                          setShowCostCenterData(true);
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
            </BtnThemeWrap>
            <Button
              disabled={selectedRowKeys.length != 1}
              onClick={(event) => deleteInfos(selectedRowKeys, event)}
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
        listName="O2CUserID"
      />
    </ContentWrap>
  );
};
export default Index;
