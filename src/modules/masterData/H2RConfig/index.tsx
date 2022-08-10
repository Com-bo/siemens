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
  Checkbox
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
  // exportCostCenterExcel,
  // logCostCenterDataQuery,
  // 
  // SpecialDivisionExportData,
  // SpecialDivisionImportData,
  // SpecialDivisionQueryListData, 
  // SpecialDivisionEditDataSave, 
  // SpecialDivisionDeleteData, 
  QueryLogicH2R,
  DeleteLogicH2R,
  EditLogicH2R,
  AddLogicH2R
} from '@/app/request/apiH2RConfig';
const pageName = 'H2RConfig';
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
      name: 'onARE',
      title: 'On_ARE',
      width: '150px',
    },
    {
      title: 'ARE',
      width: '180px',
      name: 'are',
    },
    {
      title: 'ProductName',
      width: '180px',
      name: 'productName',
    },
    {
      title: 'Type',
      width: '180px',
      name: 'type',
    },
    {
      title: 'Contain',
      width: '180px',
      name: 'contain',
    },
    {
      title: 'Logic',
      width: '180px',
      name: 'logic',
    },
    {
      name: 'Operate',
      title: 'Operate',
      width: '200px',
      fixed: 'right',
      render: (text, record, index) => (
        <AuthWrapper functionName={pageName} authCode={[`${pageName}-Edit`]} >
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
            <Popconfirm
              title="Confirm to delete?"
              onConfirm={(event) => deleteInfos(record, event)}
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
  // 删除接口
  const deleteInfos = (record, event) => {
    event.stopPropagation();
    Modal.confirm({
      title: 'Tips',
      icon: <ExclamationCircleOutlined />,
      content: 'Confirm to delete the selected data?',
      okText: 'Confirm',
      cancelText: 'Cancel',
      onOk: () => {
        DeleteLogicH2R(record).then((res) => {
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
    const param=formFilter.getFieldValue("productName")
    QueryLogicH2R(param).then((res) => {
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
      .then((values) => {
        if (formData.getFieldValue('id')) {
          const params = {
            id: formData.getFieldValue('id') || '',
            ...formData.getFieldsValue(),
          };
          EditLogicH2R(params).then((res) => {
            if (res.isSuccess) {
              message.success(res.msg);
              setShowCostCenterData(false);
              formData.resetFields();
              getData();
            } else {
              message.error(res.msg);
            }
          });
        } else {
          const params = {
            id: formData.getFieldValue('id') || '',
            ...formData.getFieldsValue(),
          };
          AddLogicH2R(params).then((res) => {
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
      {/*新增 编辑 */}
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
              H2RConfig Data
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
              <Form.Item
                label="On_ARE"
                name="onARE"
              >
                <Select allowClear>
                  <Select.Option value="IN">
                    IN
                  </Select.Option>
                  <Select.Option value="NOT IN">
                    NOT IN
                  </Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="ARE" name="are">
                <Input disabled={componentDisabled} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Product Name" name="productName" rules={[{ required: true }]}>
                <Input disabled={componentDisabled} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Type" name="type" rules={[{ required: true }]}>
                <Select allowClear>
                  <Select.Option value="ET">
                  ET
                  </Select.Option>
                  <Select.Option value="AT">
                  AT
                  </Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Contain" name="contain" rules={[{ required: true }]}>
                <Input disabled={componentDisabled} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Logic" name="logic" rules={[{ required: true }]}>
                <Select allowClear>
                  <Select.Option value="+">
                    +
                  </Select.Option>
                  <Select.Option value="-">
                    -
                  </Select.Option>
                </Select>
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
                  <Form.Item label="ProductName" name="productName">
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
                          onClick={()=>{
                            setCurrent(1);
                            getData()
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
          <>
            <AuthWrapper functionName={pageName} authCode={[`${pageName}-Edit`]} >
              <Space>
                <BtnThemeWrap>
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
                </BtnThemeWrap>
                {/* <Button
                  disabled={selectedRowKeys.length == 0?(isSelectAll?false:true):false}
                  onClick={(event) => deleteInfos(selectedRowKeys, event)}
                >
                  Delete
                </Button> */}
              </Space>
            </AuthWrapper>
          </>
        }
        changePageSize={changePageSize}
        current={current}
        search={isSearch}
        rowKey="id"
        listName="H2R Config"
      />
    </ContentWrap>
  );
};
export default Index;
