import { ContentWrap } from '@/assets/style';
import { TabWrapDiv } from './style';
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
  DatePicker
} from 'antd';
const { RangePicker } = DatePicker;
import moment from 'moment';
import type { DatePickerProps, RangePickerProps } from 'antd/es/date-picker'
import { QueryImportLog } from '@/app/request/apiBVI';
import {
  DownOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons';
import {
  BtnTextRedWrap,
  BtnBlueWrap,
  BtnGreenWrap,
  BtnOrangeWrap,
  BtnThemeWrap,
} from '@/assets/style';
import search from '@/assets/images/search.png';
import FilterGroup from '@/modules/components/FilterGroup';
export default (props: any) => {
  const [tableData, setTableData] = useState([]);
  const [form] = Form.useForm();
  const [total, setTotal] = useState(0);
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [formDataSearch] = Form.useForm()
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
    },
    {
      name: 'uploadUser',
      title: 'Upload User',
      width: '100px',
    },
    // {
    //   name: 'Upload Result',
    //   title: 'Upload Result',
    //   width: '100px',
    // },
    {
      name: 'status',
      title: 'Status',
      width: '100px',
    },
  ];
  useEffect(()=>{
    formDataSearch.setFieldsValue({
      businessLine:businessLineData[0].value,
      templateType:templateTypeData[0].value,
      startUploadDate: "",
      endUploadDate: "",
      uploadUser: "",
    })
  },[])
  useEffect(() => {
    getData()
  }, [current, pageSize]);
  const savefilterGroup = () => {
    console.log('please save  filter group interface');
  };
  const getData = (recordId?: any) => {
    let params = {
      businessLine: formDataSearch.getFieldValue("businessLine"),
      templateType: formDataSearch.getFieldValue("templateType"),
      startUploadDate: formDataSearch.getFieldValue("startUploadDate"),
      endUploadDate: formDataSearch.getFieldValue("endUploadDate"),
      uploadUser: formDataSearch.getFieldValue("uploadUser"),
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

  const handleChangebus = (val: string) => {
    console.log(val);
  };
  const handleChangetemp = (val: string) => {
    console.log(val);
  };

  const onChange = (
    value: DatePickerProps['value'] | RangePickerProps['value'],
    dateString: [string, string] | string,
  ) => {
    formDataSearch.setFieldsValue({
      startUploadDate:dateString[0],
      endUploadDate:dateString[1]
    })
  };
  
  const onOk = (value: DatePickerProps['value'] | RangePickerProps['value']) => {
  };

  const businessLineData = [
    {
      label: 'R2R',
      value: 'R2R',
    },
    {
      label: 'O2C',
      value: 'O2C',
    },
  ];
  const templateTypeData = [
    { value: 'BVI Manual Template', label: 'BVI Manual Template' },
    { value: 'R2R MD Import Template', label: 'R2R MD Import Template' },
    { value: 'H2R BVI Template', label: 'H2R BVI Template' },
    { value: 'H2R T&E BVI Template', label: 'H2R T&E BVI Template' },
    { value: 'H2R GMM Template', label: 'H2R GMM Template' },
    { value: 'O2C BVI Template', label: 'O2C BVI Template' },
    { value: 'O2C T1 BVI Template', label: 'O2C T1 BVI Template' },
    { value: 'P2P BCS Template', label: 'P2P BCS Template' },
  ]
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
        <TabWrapDiv>
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
        listName="Logs"
        renderBtns={
          <Space>
            <Form
              form={formDataSearch}
              labelCol={{ flex: '120px' }}
            >
              <Row gutter={24}>
                <Col span={5}>
                  <Form.Item label="Business Line" name="businessLine">
                    <Select
                      defaultValue={businessLineData[0].value}
                      onChange={handleChangebus}
                    >
                      {renderOption(businessLineData)}
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={7}>
                  <Form.Item label="Template Type" name="templateType">
                    <Select
                      defaultValue={templateTypeData[0].value}
                      onChange={handleChangetemp}
                    >
                      {renderOption(templateTypeData)}
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={7}>
                  <Form.Item label="Upload Date" name="uploadDate">
                    <RangePicker
                      showTime={{ format: 'HH:mm:ss' }}
                      format="YYYY-MM-DD HH:mm:ss"
                      onChange={onChange}
                      onOk={onOk}
                    />
                  </Form.Item>
                </Col>
                <Col span={5}>
                  <Form.Item label="Upload User" name="uploadUser">
                    <Input />
                  </Form.Item>
                </Col>
              </Row>
            </Form>
            <Button
            type="primary"
              onClick={() => {
                getData();
              }}
            >
              Search
            </Button>
          </Space>
        }
      />
      </TabWrapDiv>
      </ContentWrap>
  );
};
