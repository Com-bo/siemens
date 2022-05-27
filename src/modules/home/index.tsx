import {
  HomeTop,
  HomeBottom,
  TableTitleDiv,
  TaleTitleIconDiv,
  NoticeWrapDiv,
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
import * as echarts from 'echarts';
import chinaJson from '@/assets/data/china.json';
import {
  handlerGetInstrumentOnGoingOrderCount,
  handlerGetOnGoingOrderCount,
  getCount,
  getYQCount,
  handlerGetOrderRegionCount,
  getHomeInstrumentTypeDdl,
  handlerGetInsOrderRegionCount,
  getDashboardProductCategoryDdl,
} from '@/app/request/apiHome';
import moment from 'moment';
import { handlerGetNoticeList } from '@/app/request/apiNotice';
import DebounceSelect from '@/components/Select/debounceSelect';
import { getProductTypeDdl } from '@/app/request/apiProduct';
import { fuzzyGetAgencyRegionDdl } from '@/app/request/apiStock';
import { AnyStyledComponent } from 'styled-components';
export default (props: any) => {
  const { Option } = Select;
  // 试剂代办
  const [todoCount, setToDoCount] = useState(0);
  const [goingCount, setGoingCount] = useState(0);
  const [yqTodoCount, setYQToDoCount] = useState(0);
  const [yqGoingCount, setYQGoingCount] = useState(0);
  const [tips, setTips] = useState([]);
  const [months, setMonths] = useState([]);
  const [mapForm] = Form.useForm();
  const [regions, setRegions] = useState(Array<any>());
  const [types, setTypes] = useState(Array<any>());
  const [searchParams, setSearchParams] = useState({
    year: '',
    month: 1,
    type: '',
    typeId: '',
    region: '',
  });
  const [yqTypes, setYQTypes] = useState([]);
  const [sjTypes, setSJTypes] = useState([]);
  const [chartData, setChartData] = useState([]);
  echarts.registerMap('china', chinaJson);
  const timerRef = useRef<any>(); //定时器
  useEffect(() => {
    // 请求接口
    _getCounts();
    _getTips();
    _getInit();
    // timerRef.current = setInterval(() => {
    //   _getCounts()
    // }, 30000)
    // return () => {
    //   if (timerRef.current) {
    //     clearInterval(timerRef.current);
    //   }
    // }
  }, []);
  const _getInit = async () => {
    // 区域
    let regionRes = await fuzzyGetAgencyRegionDdl({ name: '' });
    if (regionRes.code == 200 && regionRes.isSuccess) {
      setRegions(regionRes.data);
    } else {
      console.error(regionRes.msg);
      return;
    }
    // 仪器产品类别

    let insRes = await getHomeInstrumentTypeDdl();
    if (insRes.code == 200 && insRes.isSuccess) {
      setYQTypes(insRes.data);
    } else {
      console.error(insRes.msg);
      return;
    }
    let regRes = await getDashboardProductCategoryDdl();
    if (regRes.code == 200 && regRes.isSuccess) {
      setSJTypes(regRes.data);
      setTypes(regRes.data);
    } else {
      console.error(regRes.msg);
      return;
    }

    getMonthOpts();
    mapForm.setFieldsValue({
      year: moment(),
      month: parseInt(moment().format('MM')),
      type: 'reagents',
      region: regionRes.data[0].code,
      typeId: regRes.data[0].code,
    });
    setSearchParams(mapForm.getFieldsValue());
  };
  useEffect(() => {
    // 初始化搜索data
    if (
      searchParams.year &&
      searchParams.month &&
      searchParams.typeId &&
      searchParams.region
    ) {
      _getMap();
    }
  }, [searchParams]);
  const _getMap = async () => {
    let res: any;
    const params = {
      ...searchParams,
      year: moment(searchParams.year).format('YYYY'),
    };
    delete params.type;
    if (searchParams.type == 'reagents') {
      res = await handlerGetOrderRegionCount(params);
    } else {
      res = await handlerGetInsOrderRegionCount(params);
    }
    if (res.isSuccess) {
      setChartData([
        ...res.data.map((item) => {
          return {
            ...item,
            itemStyle: {
              areaColor: '#ec6602',
            },
            // selected: item.value ? true : false
          };
        }),
      ]);
    }
  };
  const _getTips = () => {
    handlerGetNoticeList({
      searchFromDate: '',
      searchToDate: '',
      pageIndex: 1,
      pageSize: 15,
    }).then((res) => {
      if (res.isSuccess) {
        setTips([...res.data]);
      } else {
        console.error(res.msg);
      }
    });
  };
  const _getCounts = () => {
    getCount()
      .then((res) => {
        if (res.isSuccess) {
          setToDoCount(res.data);
        }
        return handlerGetOnGoingOrderCount();
      })
      .then((res) => {
        if (res.isSuccess) {
          setGoingCount(res.data);
        }
        return getYQCount();
      })
      .then((res) => {
        if (res.isSuccess) {
          setYQToDoCount(res.data);
        }
        return handlerGetInstrumentOnGoingOrderCount();
      })
      .then((res) => {
        if (res.isSuccess) {
          setYQGoingCount(res.data);
        }
      })
      .catch((e) => {
        console.error(e);
      });
  };

  const getMonthOpts = () => {
    let i = 0;
    const opts = [];
    while (true) {
      i++;
      if (i > 12) {
        break;
      }
      opts.push(i);
    }
    setMonths(opts);
  };

  return (
    <div style={{ minWidth: '1360px', height: '100%' }}>
      {/* 上部分 */}
      <HomeTop>
        <div className="top_block top_block_one">
          <Row>
            <Col span={12}>
              <img src={order} />
            </Col>
            <Col span={12} style={{ textAlign: 'right' }}>
              <Button
                type="link"
                className="top_num"
                onClick={() =>
                  history.push('/handler/reagents/order/toDo/list')
                }
              >
                {todoCount}
              </Button>
            </Col>
          </Row>
          <Divider />
          <div className="top_block_title">待处理试剂&配件订单</div>
        </div>
        <div className="top_block top_block_two">
          <Row>
            <Col span={12}>
              <img src={todo} />
            </Col>
            <Col span={12} style={{ textAlign: 'right' }}>
              <Button
                type="link"
                className="top_num"
                onClick={() =>
                  history.push('/handler/reagents/order/going/list')
                }
              >
                {goingCount}
              </Button>
            </Col>
          </Row>
          <Divider />
          <div className="top_block_title">进行中试剂&配件订单</div>
        </div>
        <div className="top_block top_block_three">
          <Row>
            <Col span={12}>
              <img src={unclose} />
            </Col>
            <Col span={12} style={{ textAlign: 'right' }}>
              <Button
                type="link"
                className="top_num"
                onClick={() =>
                  history.push('/handler/instruments/order/toDo/list')
                }
              >
                {yqTodoCount}
              </Button>
            </Col>
          </Row>
          <Divider />
          <div className="top_block_title">待处理仪器订单</div>
        </div>
        <div className="top_block top_block_four">
          <Row>
            <Col span={12}>
              <img src={draft} />
            </Col>
            <Col span={12} style={{ textAlign: 'right' }}>
              <Button
                type="link"
                className="top_num"
                onClick={() =>
                  history.push('/handler/instruments/order/going/list')
                }
              >
                {yqGoingCount}
              </Button>
            </Col>
          </Row>
          <Divider />
          <div className="top_block_title">进行中仪器订单</div>
        </div>
      </HomeTop>
      {/* 下部分 */}
      <HomeBottom>
        <Row gutter={20}>
          <Col span={10}>
            <Card
              className="card_block"
              headStyle={{ border: 'none' }}
              title={
                <TableTitleDiv>
                  <TaleTitleIconDiv>
                    <span></span>
                    <span></span>
                    <span></span>
                  </TaleTitleIconDiv>
                  <span style={{ verticalAlign: 'middle' }}>最新公告</span>
                </TableTitleDiv>
              }
              bordered={false}
              extra={
                <Button
                  type="link"
                  onClick={() => history.push('/handler/notice/list')}
                >
                  更多
                </Button>
              }
            >
              <List
                itemLayout="horizontal"
                dataSource={tips}
                renderItem={(item, index) => (
                  <List.Item
                    key={index}
                    extra={
                      <span>
                        {item.publishDate && moment(item.publishDate).isValid()
                          ? moment(item.publishDate).format('YYYY-MM-DD')
                          : ''}
                      </span>
                    }
                    className="tips_home_wrap"
                  >
                    <NoticeWrapDiv style={{ padding: '10px 0' }}>
                      <div>
                        <div
                          style={{
                            color: item?.popup == 'r' ? 'red' : 'black',
                            fontWeight: item.popup == 'b' ? 'bold' : 'normal',
                          }}
                        >
                          {item.subject}
                        </div>
                      </div>
                      <div className="notice_right">
                        {item.top ? <img src={topTip} /> : ''}
                        {item.logo == 'new' ? <img src={news} /> : ''}
                        {item.logo == 'important' ? (
                          <span
                            style={{
                              display: 'inline-block',
                              fontSize: '16px',
                              marginLeft: '10px',
                              verticalAlign: 'middle',
                              color: '#e7001d',
                              backgroundColor: '#fde5e8',
                              height: '26px',
                              width: '40px',
                              borderRadius: '13px',
                              lineHeight: '26px',
                              textAlign: 'center',
                              fontWeight: 'bold',
                            }}
                          >
                            重
                          </span>
                        ) : (
                          ''
                        )}
                      </div>
                    </NoticeWrapDiv>
                  </List.Item>
                )}
              />
            </Card>
          </Col>
          <Col span={14}>
            <Card
              className="card_block"
              headStyle={{ border: 'none' }}
              title={
                <TableTitleDiv>
                  <TaleTitleIconDiv>
                    <span></span>
                    <span></span>
                    <span></span>
                  </TaleTitleIconDiv>
                  <span style={{ verticalAlign: 'middle' }}>下单分布</span>
                </TableTitleDiv>
              }
              bordered={false}
            >
              <div>
                <Form form={mapForm}>
                  <Row gutter={40}>
                    <Col span={6}>
                      <Form.Item
                        name="type"
                        rules={[{ required: true, message: '请选择搜索类型' }]}
                      >
                        <Select
                          onChange={(val: string) => {
                            // 做重置处理
                            if (val == 'instruments') {
                              setTypes([...yqTypes]);
                              setSearchParams({
                                ...searchParams,
                                type: val,
                                typeId: yqTypes[0]?.code,
                              });
                              mapForm.setFieldsValue({
                                typeId: yqTypes[0]?.code,
                              });
                            } else {
                              setTypes([...sjTypes]);
                              setSearchParams({
                                ...searchParams,
                                type: val,
                                typeId: sjTypes[0]?.code,
                              });
                              mapForm.setFieldsValue({
                                typeId: sjTypes[0]?.code,
                              });
                            }
                          }}
                        >
                          <Option value="reagents">试剂&配件</Option>
                          <Option value="instruments">仪器</Option>
                        </Select>
                      </Form.Item>
                    </Col>
                    <Col span={18}></Col>
                    <Col span={6}>
                      <Form.Item
                        name="year"
                        rules={[{ required: true, message: '请选择年' }]}
                      >
                        <DatePicker
                          picker="year"
                          placeholder="年"
                          onChange={(val) => {
                            setSearchParams({
                              ...searchParams,
                              year: val ? val.format('YYYY') : '',
                            });
                          }}
                        />
                      </Form.Item>
                    </Col>
                    <Col span={6}>
                      <Form.Item
                        name="month"
                        rules={[{ required: true, message: '请选择月' }]}
                      >
                        <Select
                          placeholder="月"
                          onChange={(val: any) => {
                            setSearchParams({
                              ...searchParams,
                              month: val,
                            });
                          }}
                        >
                          {months.map((x, index) => {
                            return (
                              <Option key={index} value={x}>
                                {x + '月'}
                              </Option>
                            );
                          })}
                        </Select>
                      </Form.Item>
                    </Col>
                    <Col span={6}>
                      <Form.Item
                        name="typeId"
                        rules={[{ required: true, message: '请选择产品类别' }]}
                      >
                        <Select
                          allowClear
                          placeholder="产品类别"
                          onChange={(val: string) => {
                            setSearchParams({
                              ...searchParams,
                              typeId: val,
                            });
                          }}
                        >
                          {types.map((x, index) => {
                            return (
                              <Option key={index} value={x.code}>
                                {x.name}
                              </Option>
                            );
                          })}
                        </Select>
                      </Form.Item>
                    </Col>
                    <Col span={6}>
                      <Form.Item
                        name="region"
                        rules={[{ required: true, message: '请选择区域' }]}
                      >
                        <Select
                          allowClear
                          placeholder="区域"
                          onChange={(val: string) => {
                            setSearchParams({
                              ...searchParams,
                              region: val,
                            });
                          }}
                        >
                          {regions.map((x, index) => {
                            return (
                              <Option key={index} value={x.code}>
                                {x.name}
                              </Option>
                            );
                          })}
                        </Select>
                      </Form.Item>
                    </Col>
                  </Row>
                </Form>
              </div>
              <ReactECharts
                style={{ height: '696px' }}
                echarts={echarts}
                // showLoading={true}
                onEvents={{
                  click: (data) => {
                    return false;
                  },
                  selectchanged: (data) => {
                    console.log(data);
                    return false;
                  },
                }}
                option={{
                  enableMapClick: false,
                  tooltip: {
                    trigger: 'item',
                    showDelay: 0,
                    transitionDuration: 0.2,
                    formatter: function (params) {
                      // const value = (params.value + '').split('.');
                      // const valueStr = value[0].replace(
                      //   /(\d{1,3})(?=(?:\d{3})+(?!\d))/g,
                      //   '$1,'
                      // );
                      let valueStr: number;

                      if (!isNaN(params.value)) {
                        valueStr = params.value;
                      } else {
                        valueStr = 0;
                      }

                      return `<div style="color:#ec6602;font-weight:bold;font-size:16px;text-align:center;margin-bottom:10px;">${params.name}</div><div>本月下单数量</div><div style="font-size:18px;font-weight:bold;text-align:center;"> ${valueStr}</div>`;
                    },
                  },
                  backgroundColor: '#EBF7F7',
                  series: [
                    {
                      name: '地图',
                      type: 'map',
                      map: 'china',
                      itemStyle: {
                        areaColor: '#ececec',
                      },
                      select: null,
                      // selectedMode: 'multiple',
                      emphasis: {
                        label: {
                          show: false,
                        },
                      },
                      data: chartData,
                    },
                  ],
                }}
                notMerge={true}
                lazyUpdate={true}
                opts={null}
                // onChartReady={onChartReadyCallback}
                // onEvents={EventsDict}
                // opts={ }
              />
            </Card>
          </Col>
        </Row>
      </HomeBottom>
    </div>
  );
};
