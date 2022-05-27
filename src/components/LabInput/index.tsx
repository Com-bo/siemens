import React, { useEffect } from 'react';
import {
  Collapse,
  Form,
  Select,
  Input,
  Row,
  Col,
  Button,
  Table,
  DatePicker,
} from 'antd';
const { Panel } = Collapse;

const index = (props: any) => {
  return <Input {...props} style={{ border: 'none' }} readOnly />;
};

export default index;
