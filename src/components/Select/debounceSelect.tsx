//发货模块 -表单
import React, { useEffect, useState } from 'react';
import { message, Select, Spin } from 'antd';
import { useCallback } from '@umijs/renderer-react/node_modules/@types/react';
const { Option } = Select;

interface ComponentClass {
  getoptions: Function;
  onSearch?: (value: any) => void;
  onBlur?: (value: any) => void;
  onChange?: (value: any, option: any) => void;
  delegate: (value: any) => Promise<any>;
  value?: any;
  allowClear?: any;
  disabled?: boolean;
  mode?: any;
  onClear?: () => void;
  onSelect?: (value: any, option: any) => void;
  onDeselect?: (value: any, option: any) => void;
  ref?: any;
  onPressEnter?: any;
  onClick?: any;
  initFlag?: boolean;
  callBack?: Function;
  placeholder?: string;
}

const index = (props: ComponentClass) => {
  const [properties, setProperties] = useState<any>({});

  useEffect(() => {
    var target: any = {};
    Object.assign(target, props);
    delete target.getoptions;
    delete target.delegate;
    delete target.initFlag;
    delete target.callBack;
    setProperties(target);
    if (props.initFlag) {
      fetch('', (data) => {
        setOptions(data);
        setFetching(false);
        if (props.callBack) {
          props.callBack(data);
        }
      });
    }
  }, [props.value]);

  let timeout;
  let currentValue;

  const fetch = (value, callback) => {
    if (timeout) {
      clearTimeout(timeout);
      timeout = null;
    }
    currentValue = value;

    function fake() {
      setFetching(true);
      props.delegate(value).then((res) => {
        setFetching(false);
        if (res.code != 200 || !res.isSuccess) {
          message.error(res.msg);
        } else callback(res.data);
      });
    }

    timeout = setTimeout(fake, 300);
  };

  const handleSearch = (value) => {
    if (props.onSearch && value) {
      props.onSearch(value);
    }
    if (value) {
      fetch(value, (data) => {
        setOptions(data);
        setFetching(false);
      });
    } else {
      setOptions([]);
    }
  };

  const [options, setOptions] = useState(Array<any>());
  const [fetching, setFetching] = useState(false);

  return (
    <Select
      {...properties}
      disabled={props.disabled ?? false}
      showSearch
      placeholder={props?.placeholder}
      defaultActiveFirstOption={false}
      style={{ width: '100%' }}
      showArrow={false}
      filterOption={false}
      allowClear
      onSearch={handleSearch}
      notFoundContent={fetching ? <Spin size="small" /> : null}
    >
      {props.getoptions(options)}
    </Select>
  );
};

export default index;
