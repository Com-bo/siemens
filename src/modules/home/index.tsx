import {
  HomeTop,
  TableTitleDiv,
  TaleTitleIconDiv,
  ContentWrap,
  TableTopDiv,
  FilterGroupDivReport,
  HomeWrap,
} from '@/assets/style';
import {
  Col,
  Row,
  Divider,
  Card,
  List,
  Select,
  Form,
  Input,
  Button,
  DatePicker,
  message,
  Space,
  Tooltip
} from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import todo from '@/assets/images/todo.png';
import order from '@/assets/images/order.png';
import unclose from '@/assets/images/unclose.png';
import draft from '@/assets/images/draft.png';
import news from '@/assets/images/new.png';
import topTip from '@/assets/images/top.png';
import ReactECharts from 'echarts-for-react';
import { history } from 'umi';
import logo from '@/assets/images/homebg.png';
import * as echarts from 'echarts';
import chinaJson from '@/assets/data/china.json';

import {
  DownOutlined,
  EditOutlined,
  ExclamationCircleOutlined,
  UploadOutlined,
  ClearOutlined
} from '@ant-design/icons';
import {
  handlerGetInstrumentOnGoingOrderCount,
  handlerGetOnGoingOrderCount,
  getCount,
  getYQCount,
  handlerGetOrderRegionCount,
  getHomeInstrumentTypeDdl,
  handlerGetInsOrderRegionCount,
  getDashboardProductCategoryDdl,
  // 
  HomeQueryData
} from '@/app/request/apiHome';
import {
  getServiceLineList,
  getProductData
} from "@/app/request/common"
import DebounceSelect from '@/components/Select/debounceSelect';
import moment from 'moment';
const businesslineOptions = JSON.parse(sessionStorage.getItem('businessLines'));
export default (props: any) => {
  echarts.registerMap('china', chinaJson);

  // 
  const [homeData, setHomeData] = useState({});
  const [formSearch] = Form.useForm();
  const [serverLineDataOption, setServerLineDataOption] = useState([]);
  const [productNameDataOption, setProductNameDataOption] = useState([]);
  const [business, setBusiness] = useState([businesslineOptions[0]]);
  const [productMark,setProductMark] = useState(false)
  // 
  useEffect(() => {
    formSearch.setFieldsValue({
      businessLine:
        businesslineOptions && businesslineOptions.length
          ? businesslineOptions[0]
          : null,
    });
    getHomeData()
    getServiceLineFun(business)
    getProductDataFun(business,"")
  }, []);
  // new
  const getHomeData=()=>{
      let params = {
        searchCondition: {
          userBusinessLineList: business,
          serviceLine: formSearch.getFieldValue("serverLine"),
          productName: formSearch.getFieldValue("productName")
        },
      };
      HomeQueryData(params).then((res) => {
        if (res.isSuccess) {
          setHomeData(res.data)
        } else {
          message.error(res.msg);
        }
      });
  }
  const getServiceLine=(item)=>{
    return new Promise((resolve,reject)=>{
      getServiceLineList({
      businessLine: item,
      keywords: "",
    }).then((res) => {
      if (res.isSuccess) {
        resolve(res.data)
      } else {
        message.error(res.msg);
      }
    });
    })
  }

  async function getServiceLineFun(businessParmes){
    let serverLineNew=[]
    businessParmes.map(async (item,index)=>{
      try{
        let dataitem = await getServiceLine(item)
        serverLineNew=serverLineNew.concat(dataitem)
        setServerLineDataOption(serverLineNew)
      }catch{
        return
      }
    })
  }

  // //
  const getProduct=(item,serviceLineParmes)=>{
    return new Promise((resolve,reject)=>{
      getProductData({
        businessLine: item,
        serviceLine: serviceLineParmes,
      }).then((res) => {
        if (res.isSuccess) {
          let newDataitem=[]
          res.data.map((item,index)=>{
            newDataitem.push(item.productName)
          })
          resolve(newDataitem)
        } else {
          message.error(res.msg);
        }
      });
    })
  }

  async function getProductDataFun(businessParmes,serviceLineParmes) {
    let productDataNew=[]
    businessParmes.map(async (item,index)=>{
      try{
        let dataitem = await getProduct(item,serviceLineParmes)
        productDataNew=productDataNew.concat(dataitem)
        let dedproduct = [...new Set(productDataNew)]
        setProductNameDataOption(dedproduct)
      }catch{
        return
      }
    })
  }
  return (
    <ContentWrap>
      <div style={{ minWidth: '1360px', height: '100%' }}>
        {/* 上部分 */}
        <Card
          className="card_block"
          headStyle={{ border: 'none' }}
          title={
            <TableTopDiv style={{ margin: 0 }}>
            <TableTitleDiv style={{ float: 'left' }}>
              <TaleTitleIconDiv>
                <span></span>
              </TaleTitleIconDiv>
              <span style={{ verticalAlign: 'middle', fontSize: '20px' }}>
                  Dashboard
              </span>
            </TableTitleDiv>
          </TableTopDiv>
          }
          bordered={false}
        >
            {/* <AuthWrapper functionName={pageName} authCode={`${pageName}-Edit`}> */}
            <FilterGroupDivReport>
                <Form form={formSearch}>
                  <Row className="importData">
                    <Col span={5}>
                      <Form.Item
                        label="Business Line"
                        name="businessLine"
                      >
                        <Select
                            placeholder="Please select"
                            mode="multiple"
                            value={business}
                            onChange={(val) => {
                              setBusiness(val);
                              if(businesslineOptions.length==val.length){
                                setProductMark(true)
                              }else{
                                setProductMark(false)
                              }
                              getServiceLineFun(val)
                              formSearch.setFieldsValue({
                                productName:"",
                                serverLine:""
                              })
                            }}
                          >
                            {businesslineOptions.map((item, index) => (
                              <Select.Option key={index} value={item}>
                                {item}
                              </Select.Option>
                            ))}
                          </Select>
                      </Form.Item>
                    </Col>
                    <Col span={5} offset={1}>
                    <Form.Item
                      label="Service Line"
                      name="serverLine"
                    >
                      <Select
                        onChange={(val) => {
                          getProductDataFun(business,val)
                          formSearch.setFieldsValue({
                            productName:"",
                          })
                        }}
                      >
                          {serverLineDataOption.map((item, index) => (
                            <Select.Option key={index} value={item.value}>
                              {item.label}
                            </Select.Option>
                          ))}
                        </Select>
                      </Form.Item>
                    </Col>
                    <Col span={5} offset={1}>
                      <Form.Item
                        label="Product Name"
                        name="productName"
                      >
                        <Select disabled={productMark}>
                          {productNameDataOption.map((item, index) => (
                            <Select.Option key={index} value={item}>
                              {item}
                            </Select.Option>
                          ))}
                        </Select>
                      </Form.Item>
                    </Col>
                    <Col span={4} offset={1}>
                      <Form.Item>
                        <Space>
                        <Tooltip title="Clear">
                          <Button
                            icon={<ClearOutlined />}
                            onClick={() => {
                              formSearch.setFieldsValue({
                                productName:"",
                                serverLine:""
                              })
                            }}
                          ></Button>
                        </Tooltip>
                          <Button
                            type="primary"
                            icon={<i className="gbs gbs-search"></i>}
                            onClick={getHomeData}
                          ></Button>
                        </Space>
                      </Form.Item>
                    </Col>
                  </Row>
                </Form>
            </FilterGroupDivReport>
            {/* </AuthWrapper> */}
          <HomeTop>
            <div className="top_block top_block_one">
              <Row>
                <Col span={24} style={{ textAlign: 'right' }}>
                  <div className="top_block_tit">BVI Volume</div>
                </Col>
                <Col span={24}>
                  <div className="top_block_title_wrap">
                      <div className="top_block_title">
                        <div className="title_item">
                          <p className='title_item_p1'>Previous Month</p>
                          <p className='title_item_p2'>{homeData["bviVolume"]?.["previousMonth"]}</p>
                        </div>
                        <div className="title_item">
                          <p className='title_item_p1'>YTD ACT</p>
                          <p className='title_item_p2'>{homeData["bviVolume"]?.["ytD_ACT"]}</p>
                        </div>
                      </div>
                      <div className="top_block_title">
                        <div className="title_item">
                          <p className='title_item_p1'>Current Month Collected Data</p>
                          <p className='title_item_p2'>{homeData["bviVolume"]?.["currentMonthCollected"]}</p>
                        </div>
                        <div className="title_item">
                          <p className='title_item_p1'>Current Month Completed Data</p>
                          <p className='title_item_p2'>{homeData["bviVolume"]?.["currentMonthCompleted"]}</p>
                        </div>
                        <div className="title_item">
                          <p className='title_item_p1'>Completion Rate</p>
                          <p className='title_item_p2 title_percentage'>{homeData["bviVolume"]?.["completionRate"]}%</p>
                        </div>
                      </div>
                  </div>        
                </Col>
              </Row>
            </div>
            <div className="top_block top_block_two">
              <Row>
                <Col span={24} style={{ textAlign: 'right' }}>
                  <div className="top_block_tit">Usage</div>
                </Col>
                <Col span={24}>
                  <div className="top_block_title_wrap">
                      <p className='title_p'>IN CNY</p>
                      <div className="top_block_title">
                        <div className="title_item">
                          <p className='title_item_p1'>Previous Month</p>
                          <p className='title_item_p2'>{homeData["usage"]?.["previousMonth"]}</p>
                        </div>
                        <div className="title_item">
                          <p className='title_item_p1'>Current Month</p>
                          <p className='title_item_p2'>{homeData["usage"]?.["currentMonth"]}</p>
                        </div>
                        <div className="title_item">
                          <p className='title_item_p1'>YTD ACT</p>
                          <p className='title_item_p2'>{homeData["usage"]?.["ytD_ACT"]}</p>
                        </div>
                      </div>
                      <p className='title_p'>IN Currency</p>
                      <div className="top_block_title">
                        <div className="title_item">
                          <p className='title_item_p1'>Current Month Collected Data</p>
                          <p className='title_item_p2'>{homeData["usage"]?.["currentMonthCollected"]}</p>
                        </div>
                        <div className="title_item">
                          <p className='title_item_p1'>Current Month Completed Data</p>
                          <p className='title_item_p2'>{homeData["usage"]?.["currentMonthCompleted"]}</p>
                        </div>
                        <div className="title_item">
                          <p className='title_item_p1'>Completion Rate</p>
                          <p className='title_item_p2 title_percentage'>{homeData["usage"]?.["completionRate"]}%</p>
                        </div>
                      </div>
                  </div>    
                </Col>
              </Row>
            </div>
            <div className="top_block top_block_three">
              <Row>
                <Col span={24} style={{ textAlign: 'right' }}>
                  <div className="top_block_tit">Charge</div>
                </Col>
                <Col span={24}>
                  <div className="top_block_title_wrap">
                      <p className='title_p'>IN CNY</p>
                      <div className="top_block_title">
                        <div className="title_item">
                          <p className='title_item_p1'>Previous Month</p>
                          <p className='title_item_p2'>{homeData["charge"]?.["previousMonth"]}</p>
                        </div>
                        <div className="title_item">
                          <p className='title_item_p1'>Current Month</p>
                          <p className='title_item_p2'>{homeData["charge"]?.["currentMonth"]}</p>
                        </div>
                        <div className="title_item">
                          <p className='title_item_p1'>YTD ACT</p>
                          <p className='title_item_p2'>{homeData["charge"]?.["ytD_ACT"]}</p>
                        </div>
                      </div>
                      <p className='title_p'>IN Currency</p>
                      <div className="top_block_title">
                        <div className="title_item">
                          <p className='title_item_p1'>Current Month Collected Data</p>
                          <p className='title_item_p2'>{homeData["charge"]?.["currentMonthCollected"]}</p>
                        </div>
                        <div className="title_item">
                          <p className='title_item_p1'>Current Month Completed Data</p>
                          <p className='title_item_p2'>{homeData["charge"]?.["currentMonthCompleted"]}</p>
                        </div>
                        <div className="title_item">
                          <p className='title_item_p1'>Completion Rate</p>
                          <p className='title_item_p2 title_percentage'>{homeData["charge"]?.["completionRate"]}%</p>
                        </div>
                      </div>
                  </div>   
                </Col>
              </Row>
            </div>
          </HomeTop>
        </Card>
        {/* 下部分 */}
        <Row gutter={20}>
          <Col span={24}>
            <Card
              // className="card_block"
              headStyle={{ border: 'none' }}
              title={
                <TableTopDiv style={{ margin: 0 }}>
                  <TableTitleDiv style={{ float: 'left' }}>
                    <TaleTitleIconDiv>
                      <span></span>
                    </TaleTitleIconDiv>
                    <span style={{ verticalAlign: 'middle', fontSize: '20px' }}>
                      Data Flow
                    </span>
                  </TableTitleDiv>
                </TableTopDiv>
              }
              bordered={false}
            >
              <HomeWrap>
                <img src={logo} alt="" />
              </HomeWrap>
            </Card>
          </Col>
        </Row>
      </div>
    </ContentWrap>
  );
};
