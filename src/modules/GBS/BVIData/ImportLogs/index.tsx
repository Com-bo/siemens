import { ContentWrap } from '@/assets/style';
import React, { useEffect, useState } from 'react';
import TableList from '@/modules/components/CommentTable';
import { Button, Divider, Dropdown, Menu, Radio, Space,Form, message, 
  Modal ,
  Row,
  Col,
  Input,
  Select
} from 'antd';

import {
  QueryImportLog
} from '@/app/request/apiBVI';
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

  const orignalCols = [
    {
      name: 'BusinessLine',
      title: 'Business Line',
      width: '100px',
    },
    {
      name: 'Upload File',
      title: 'Upload File',
      width: '100px',
    },
    {
      name: 'Tempate Type',
      title: 'Tempate Type',
      width: '100px',
    },
    {
      name: 'Upload Date',
      title: 'Upload Date',
      width: '100px',
    },
    {
      name: 'Upload User',
      title: 'Upload User',
      width: '100px',
    },
    {
      name: 'Upload Result',
      title: 'Upload Result',
      width: '100px',
    },
    {
      name: 'Status',
      title: 'Status',
      width: '100px',
    },
  ];
  useEffect(() => {
    setTableData([
      {
        BusinessLine: '1',
        ARE: 3,
        CompanyCode: 1111,
      },
      {
        BusinessLine: '2',
        ARE: 4,
        CompanyCode: 222,
      },
      {
        BusinessLine: '3',
        ARE: 38,
        CompanyCode: 444,
      },
    ]);
  }, []);
  const [form] = Form.useForm();
  const [total, setTotal] = useState(0);
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const savefilterGroup = () => {
    console.log('please save  filter group interface');
  };
  const getData = (recordId?: any) => {
    let params = {
      businessLine: "",
      templateType: "",
      startUploadDate: "",
      endUploadDate: "",
      uploadUser: "",
      pageIndex: current,
      pageSize: pageSize,
    };

    QueryImportLog(params).then((res) => {
      if (res.isSuccess) {
        console.log(res)
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

  const handleChangebus = (val:string) => {
    console.log(val);
  };
  const handleChangetemp = (val:string) => {
    console.log(val);
  };
  const businessData=[{
    text:"business1",
    value:"business1"
  },{
    text:"business2",
    value:"business2"
  }]
  const temTypeData=[{
    text:"type1",
    value:"type1"
  },{
    text:"type2",
    value:"type2"
  }]
  const { Option } = Select;
  const renderOption=(fieldList)=>{
    const options=[]
    fieldList.map((item,index)=>{
      options.push(<Option key={index} value={item.value}>{item.text}</Option>)
    })
    return options
  }
  return (
    <ContentWrap>
      <TableList
      data={tableData}
      headerSearch={getData}
      form={form}
      columns={orignalCols}
      total={total}
      // rowClick={(record) => rowClick(record)}
      onPageChange={onPageChange}
      changePageSize={changePageSize}
      current={current}
      rowKey="ARE"
      listName="Logs"
      renderBtns={<Space>
        <Form
          // form={formDataEdit}
          labelCol={{ flex: '120px' }}
        >
          <Row gutter={20}>
            <Col span={8}>
              <Form.Item label="Business Line" name="businessLine">
                <Select style={{ width: 120 }} defaultValue={businessData[0].value} onChange={handleChangebus}>
                  {
                    renderOption(businessData)
                  }
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Tempalte Type" name="tempalteType">
              <Select style={{ width: 120 }} defaultValue={temTypeData[0].value} onChange={handleChangetemp}>
                  {
                    renderOption(temTypeData)
                  }
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Upload Date" name="uploadDate">
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Upload User" name="uploadUser">
                <Input />
              </Form.Item>
            </Col>
            {
              <Col span={24}>
                <Form.Item style={{ textAlign: 'center' }}>
                  <Space size={60}>
                    <Button type="primary">
                      Submit
                    </Button>
                    <Button
                      onClick={() => {
                        // setEditListMark(false);
                        // formDataEdit.resetFields();
                        // setCustomerDivision('');
                      }}
                    >
                      Cancel
                    </Button>
                  </Space>
                </Form.Item>
              </Col>
            }
          </Row>
        </Form>
        <BtnOrangeWrap><Button onClick={()=>{
          getData()
        }}>Search</Button></BtnOrangeWrap>
      </Space>}
    />
    </ContentWrap>
  );
};
