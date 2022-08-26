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
  Checkbox,
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
  PageQueryDictionary,
  EditDictionary,
} from '@/app/request/apiDictionaryConfig';
const pageName = 'DictionaryConfig';
import { AuthWrapper, checkAuth } from '@/tools/authCheck';
export const Index = (props: any) => {
  const [form] = Form.useForm();
  const [formFilter] = Form.useForm();
  const [formData] = Form.useForm();
  const [tableData, setTableData] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [total, setTotal] = useState(0);
  const [current, setCurrent] = useState(1);
  const [isSearch, setIsSearch] = useState(false);
  const [pageSize, setPageSize] = useState(20);
  const [showLog, setShowLog] = useState(false);
  const [logData, setLogData] = useState([]);
  const [logSize, setLogSize] = useState(20);
  const [logCurrent, setLogCurrent] = useState(1);
  const [logTotal, setLogTotal] = useState(0);
  const [logId, setLogId] = useState('');
  const [showCostCenterData, setShowCostCenterData] = useState(false);
  const [componentDisabled, setComponentDisabled] = useState(false);

  const [isSelectAll, setIsSelectAll] = useState(false);
  const orignalCols: any = [
    {
      name: 'groupName',
      title: 'Group Name',
      width: '250px',
    },
    {
      title: 'key',
      width: '180px',
      name: 'key',
    },
    {
      title: 'Subkey',
      width: '180px',
      name: 'subkey',
    },
    {
      title: 'Value',
      width: '180px',
      name: 'value',
    },
    {
      title: 'Subvalue',
      width: '180px',
      name: 'subvalue',
    },
    {
      title: 'Sort',
      width: '180px',
      name: 'sortIndex',
    },
    {
      title: 'Remarks',
      width: '180px',
      name: 'remarks',
    },
    {
      name: 'Operate',
      title: 'Operate',
      width: '100px',
      fixed: 'right',
      render: (text, record, index) => (
        <AuthWrapper functionName={pageName} authCode={[`${pageName}-Edit`]}>
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
                  });
                }}
              ></Button>
            </Tooltip>
          </Space>
        </AuthWrapper>
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
  ];
  const getData = () => {
    const param = {
      groupName: formFilter.getFieldValue('groupName')
        ? formFilter.getFieldValue('groupName')
        : '',
      isOnlyEnable: true,
    };
    PageQueryDictionary(param).then((res) => {
      if (res.isSuccess) {
        setSelectedRowKeys([]);
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
      .then((values) => {
        if (formData.getFieldValue('id')) {
          const params = {
            id: formData.getFieldValue('id') || '',
            isOnlyEnable: true,
            ...formData.getFieldsValue(),
          };
          EditDictionary(params).then((res) => {
            if (res.isSuccess) {
              message.success(res.msg);
              setShowCostCenterData(false);
              formData.resetFields();
              getData();
            } else {
              message.error(res.msg);
            }
          });
        }
      })
      .catch((e) => {});
  };
  return (
    <ContentWrap>
      {/*编辑 */}
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
                Dictionary Config Data
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
        <Form form={formData} labelCol={{ flex: '120px' }}>
          <Row gutter={20}>
            <Col span={12}>
              <Form.Item label="key" name="key">
                <Input disabled={componentDisabled} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Subkey" name="subkey">
                <Input disabled={componentDisabled} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Value" name="value">
                <Input disabled={componentDisabled} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Subvalue" name="subvalue">
                <Input disabled={componentDisabled} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Remark" name="remarks">
                <Input disabled={componentDisabled} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Sort" name="sortIndex">
                <Input disabled={componentDisabled} />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item style={{ textAlign: 'center' }}>
                <Space size={60}>
                  {!componentDisabled ? (
                    <Button type="primary" onClick={saveFormData}>
                      Save
                    </Button>
                  ) : (
                    ''
                  )}
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
                <Col span={7}>
                  <Form.Item label="GroupName" name="groupName">
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={4}>
                  <Form.Item>
                    <Space size={20}>
                      <Tooltip title="Search">
                        <Button
                          type="primary"
                          icon={<i className="gbs gbs-search"></i>}
                          onClick={() => {
                            setCurrent(1);
                            getData();
                          }}
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
        changePageSize={changePageSize}
        current={current}
        search={isSearch}
        rowKey={(record, index) => index}
        listName="Dictionary Config"
      />
    </ContentWrap>
  );
};
export default Index;
