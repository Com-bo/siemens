import React, { useEffect } from 'react';
import { FormDiv, PanelTitleDiv } from '@/assets/style';
import {
  Collapse,
  Form,
  Row,
  Col,
  Table,
  Input,
  Button,
  Card,
  List,
} from 'antd';

import { RightOutlined } from '@ant-design/icons';
import { HelpDiv, HelpContent } from './style';

export default (props: any) => {
  const { Panel } = Collapse;
  // const [form] = Form.useForm();

  const layout: any = {
    requiredMark: true,
    labelCol: { flex: '120px' },
    wrapperCol: { flex: '400px' },
  };

  return (
    <FormDiv style={{ marginLeft: 0, marginTop: 0, paddingTop: '10px' }}>
      {/* 路由 */}
      <HelpDiv>
        <span>帮助信息</span>
        <RightOutlined />
        <span style={{ color: 'rgba(0, 0, 0, 0.85)' }}>操作手册</span>
      </HelpDiv>
      <Collapse activeKey="1" ghost={true}>
        <Panel
          header={
            <>
              <span>帮助信息</span>
              <PanelTitleDiv>Support Info</PanelTitleDiv>
            </>
          }
          key="1"
          showArrow={false}
        >
          <HelpContent>
            <Row
              gutter={[10, 60]}
              style={{ textAlign: 'center', marginTop: '100px' }}
            >
              <Col span={12}>
                <a
                  target="_blank"
                  style={{ display: 'inline-block', margin: '60px 0' }}
                  href={
                    process.env.WEB_URL +
                    '/template/Siemens DX Ordering System 经销商培训手册 - 试剂.pdf'
                  }
                >
                  <Button
                    size="large"
                    style={{ width: '360px', height: '50px' }}
                    type="default"
                  >
                    试剂操作手册
                  </Button>
                </a>
                <br />
                <a
                  target="_blank"
                  style={{ display: 'inline-block', margin: '60px 0' }}
                  href={
                    process.env.WEB_URL +
                    '/template/Siemens DX Ordering System 经销商培训手册 - 仪器.pdf'
                  }
                >
                  <Button
                    size="large"
                    type="default"
                    style={{ width: '360px', height: '50px' }}
                  >
                    仪器操作手册
                  </Button>
                </a>
              </Col>
              <Col span={12}>
                {/* "技术支持（无法链接网址，无法下载等）" */}
                <Card
                  style={{ maxWidth: '600px' }}
                  title={
                    <div className="card_title">
                      <span className="title">技术支持</span>
                      <span className="title_tip">
                        （无法链接网址，无法下载等）
                      </span>
                    </div>
                  }
                >
                  <List>
                    <List.Item>
                      <label className="label_title">联系人：</label>
                      <span>庞西奎</span>
                    </List.Item>
                    <List.Item>
                      <label className="label_title">联系电话：</label>
                      <span>138 1641 7486</span>
                    </List.Item>
                    <List.Item>
                      <label className="label_title">联系邮箱：</label>
                      <span
                        style={{ color: '#099999', borderBottom: '1px solid' }}
                      >
                        xikui.pang@medalsoft.com
                      </span>
                    </List.Item>
                  </List>
                </Card>
                {/* 业务支持（产品订购错误，取消等等 */}

                <Card
                  style={{ marginTop: '20px', maxWidth: '600px' }}
                  title={
                    <div className="card_title">
                      <span className="title">业务支持</span>
                      <span className="title_tip">
                        （产品订购错误，取消等等）
                      </span>
                    </div>
                  }
                >
                  <List>
                    <List.Item>
                      <label className="label_title">联系人：</label>
                      <span>西门子各区订单负责人</span>
                    </List.Item>
                  </List>
                </Card>
              </Col>
            </Row>
          </HelpContent>
        </Panel>
      </Collapse>
    </FormDiv>
  );
};
