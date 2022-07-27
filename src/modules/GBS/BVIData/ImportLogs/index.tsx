import React, { useEffect, useState } from 'react';
import TableList from '@/modules/components/CommentTable';
import {
  Button,
  Divider,
  Dropdown,
  Menu,
  Radio,
  Space,
  Form,
  message,
  Modal,
  Row,
  Col,
  Input,
  Select,
  DatePicker,
} from 'antd';
const { RangePicker } = DatePicker;
import moment from 'moment';
import type { DatePickerProps, RangePickerProps } from 'antd/es/date-picker';
import { QueryImportLog } from '@/app/request/apiBVI';
import { ContentWrap, FilterGroupDiv } from '@/assets/style';
import './style.less';

const pageName = 'ImportLogs';
import { AuthWrapper, checkAuth } from '@/tools/authCheck';
const businesslineOptions = JSON.parse(sessionStorage.getItem('businessLines'));
export default (props: any) => {
  const [tableData, setTableData] = useState([]);
  const [form] = Form.useForm();
  const [formSearch] = Form.useForm();
  const [total, setTotal] = useState(0);
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [formDataSearch] = Form.useForm();
  const orignalCols = [
    {
      name: 'businessLine',
      title: 'Business Line',
      width: '100px',
    },
    {
      name: 'uploadFile',
      title: 'Upload File',
      width: '100px',
    },
    {
      name: 'templateType',
      title: 'Tempate Type',
      width: '100px',
    },
    {
      name: 'uploadDate',
      title: 'Upload Date',
      width: '100px',
      render: (text) =>
        text && moment(text).isValid()
          ? moment(text).format('YYYY-MM-DD HH:mm:ss')
          : text,
    },
    {
      name: 'uploadUser',
      title: 'Upload User',
      width: '100px',
    },
    {
      name: 'uploadResult',
      title: 'Upload Result',
      width: '100px',
    },
    {
      name: 'status',
      title: 'Status',
      width: '100px',
    },
  ];
  useEffect(() => {
    formSearch.setFieldsValue({
      businessLine:
        businesslineOptions && businesslineOptions.length
          ? businesslineOptions[0]
          : null,
    });
  }, []);
  useEffect(() => {
    getData();
  }, [current, pageSize]);
  const getData = (recordId?: any) => {
    formSearch
      .validateFields()
      .then((valid) => {
        let startDate = '';
        let endDate = '';
        let uploadDate = formSearch.getFieldValue('uploadDate');
        if (uploadDate && uploadDate.length) {
          startDate = uploadDate[0];
          endDate = uploadDate[1];
        }
        let params = {
          businessLine: formSearch.getFieldValue('businessLine'),
          templateType: formSearch.getFieldValue('templateType'),
          startUploadDate: startDate,
          endUploadDate: endDate,
          uploadUser: formSearch.getFieldValue('uploadUser'),
          pageIndex: current,
          pageSize: pageSize,
        };
        QueryImportLog(params).then((res) => {
          if (res.isSuccess) {
            setTableData(res.data);
            setTotal(res.totalCount);
          } else {
            message.error(res.msg);
          }
        });
      })
      .catch((e) => {});
  };
  const onPageChange = (pagination, filters, sorter, extra) => {
    //   翻页|排序|筛选
    setCurrent(pagination.current);
    switch (extra.action) {
      case 'paginate':
        setCurrent(pagination.current);
        break;
      case 'sort':
        break;
      default:
        break;
    }
  };
  const changePageSize = (val: number) => {
    setPageSize(val);
  };
  const templateTypeData = [
    { value: 'BVI Manual Template', label: 'BVI Manual Template' },
    { value: 'R2R MD Import Template', label: 'R2R MD Import Template' },
    { value: 'H2R BVI Template', label: 'H2R BVI Template' },
    { value: 'H2R T&E BVI Template', label: 'H2R T&E BVI Template' },
    { value: 'H2R GMM Template', label: 'H2R GMM Template' },
    { value: 'O2C BVI Template', label: 'O2C BVI Template' },
    { value: 'O2C TI BVI Template', label: 'O2C TI BVI Template' },
    { value: 'P2P BCS Template', label: 'P2P BCS Template' },
  ];
  const { Option } = Select;
  const renderOption = (fieldList) => {
    const options = [];
    fieldList.map((item, index) => {
      options.push(
        <Option key={index} value={item.value}>
          {item.label}
        </Option>,
      );
    });
    return options;
  };
  return (
    <ContentWrap>
      <TableList
        data={tableData}
        form={form}
        columns={orignalCols}
        total={total}
        // rowClick={(record) => rowClick(record)}
        onPageChange={onPageChange}
        changePageSize={changePageSize}
        current={current}
        rowKey="uploadDate"
        listName="Import Logs"
        renderFilterGroup={
          <>
            <AuthWrapper functionName={pageName} authCode={`${pageName}-Edit`}>
              <FilterGroupDiv>
                <Form form={formSearch} labelCol={{ flex: '120px' }}>
                  <Row className="importData">
                    <Col span={10}>
                      <Form.Item
                        label="Business Line"
                        name="businessLine"
                        rules={[{ required: true, message: 'Please select' }]}
                      >
                        <Select>
                          {businesslineOptions.map((item, index) => (
                            <Select.Option key={index} value={item}>
                              {item}
                            </Select.Option>
                          ))}
                        </Select>
                      </Form.Item>
                    </Col>
                    <Col span={10}>
                      <Form.Item label="Template Type" name="templateType">
                        <Select style={{ width: '100%' }}>
                          {renderOption(templateTypeData)}
                        </Select>
                      </Form.Item>
                    </Col>
                    <Col span={4}>
                      <Form.Item style={{ textAlign: 'right' }}>
                        <Space>
                          <Button
                            type="primary"
                            icon={<i className="gbs gbs-search"></i>}
                            onClick={getData}
                          ></Button>
                        </Space>
                      </Form.Item>
                    </Col>
                    <Col span={10} className="form_unMargin">
                      <Form.Item label="Upload Date" name="uploadDate">
                        <RangePicker format="YYYY-MM-DD" />
                      </Form.Item>
                    </Col>
                    <Col span={10} className="form_unMargin">
                      <Form.Item label="Upload User" name="uploadUser">
                        <Input />
                      </Form.Item>
                    </Col>
                  </Row>
                </Form>
              </FilterGroupDiv>
            </AuthWrapper>
          </>
        }
      />
    </ContentWrap>
  );
};
