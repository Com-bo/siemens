import {
  deleteFilterGroupData,
  getCustemerDivisionList,
  getFilterGroupFieldList,
  getServiceLineList,
  queryBusinesslineOptionsList,
  queryFilterGroupList,
  queryFilterGroupListWithFields,
  saveFilterGroupData,
  queryDictionaryInfo,
} from '@/app/request/common';
import { FilterGroupDiv, TaleTitleIconDiv } from '@/assets/style';
import {
  ClearOutlined,
  ExclamationCircleOutlined,
  PlusCircleOutlined,
} from '@ant-design/icons';
import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  InputNumber,
  message,
  Modal,
  Radio,
  Row,
  Select,
  Space,
  Switch,
  Tooltip,
} from 'antd';
import React, { ReactNode, useEffect, useState } from 'react';
import DebounceSelect from '@/components/Select/debounceSelect';
import moment from 'moment';
import { AuthWrapper, checkAuth } from '@/tools/authCheck';
import { ops } from './const';
interface FilterGroupType {
  moudleName: string; //模块标识
  authPagename?: string; //模块权限用名称
  customComponet?: React.ReactNode; //自定义渲染组件【ex:checkbox等
  onSearch: (val: string | number) => void; //搜索方法
  onClear: () => void;
  exportAction?: () => void; //导出
  businessLineRender?: React.ReactNode;
}
export default (props: FilterGroupType) => {
  const [filterGroup, setFilterGroup] = useState('');
  const [isSetting, setSetting] = useState(false);
  const [operfields, setFields] = useState({});
  const [operList, setOperList] = useState([]);
  const [filterGropList, setFilterGroupList] = useState([]);
  const [requireMark, setRequireMark] = useState(false);
  const [filterGroupInfoById, setFilterGroupInfoById] = useState({});
  const { Option } = Select;

  const changeFilterGroup = (val) => {
    setFilterGroup(val);
  };

  const [form] = Form.useForm();

  useEffect(() => {
    initData(props.moudleName ?? 'Flat Charge');
  }, []);

  const initData = async (moduleName: string) => {
    const res = await getFilterGroupFieldList({
      moduleName,
    });
    if (res.isSuccess) {
      let _fields = {};
      let data = res.data || [];
      data.map((item) => {
        if (!_fields[item.fieldName]) {
          _fields[item.fieldName] = {
            fieldName: item.fieldName,
            fieldDispName: item.fieldDispName,
            operator: [item.operator],
          };
        } else {
          _fields[item.fieldName]['operator'].push(item.operator);
        }
      });
      setFields(_fields);
    }
    //   获取filter Group 全数据
    _getFilterList();
  };
  const _getFilterList = () => {
    queryFilterGroupListWithFields({
      moduleName: props.moudleName ?? 'Flat Charge',
    })
      .then((result) => {
        // 处理数据
        if (result.isSuccess) {
          let obj = {};
          result.data?.map((item) => {
            let _group = item.filterGroup;
            obj[_group.id] = {
              conditionRelationship: _group.conditionRelationship,
              groupFieldList: item?.groupFieldList || [],
            };
          });
          setFilterGroupInfoById(obj);
        } else {
          console.error(result.msg);
        }
        return queryFilterGroupList({
          moduleName: props.moudleName ?? 'Flat Charge',
        });
      })
      .then((result) => {
        if (result.isSuccess) {
          setFilterGroupList(result.data || []);
        }
      });
    form.setFieldsValue({
      id: '',
      conditionRelationship: '',
      groupFieldList: [{ fieldName: '', operator: '', fieldValue: null }],
    });
  };
  const getFilterOperator = (operator) => {
    switch (operator) {
      // case "Not equal":
      //     return "!="
      // case "Equal to":
      //     return "=";
      // case "Greater than or equal to":
      //     return ">="
      default:
        return operator;
    }
  };
  const getFilterElement = (fieldName: string, index: number) => {
    let arra = form.getFieldValue('groupFieldList');
    switch (fieldName) {
      case 'ServiceLine':
        if (!form.getFieldValue('groupFieldList')[index].fieldValue) {
          arra[index].fieldValue = [];
        } else {
          if (typeof arra[index].fieldValue == 'string') {
            arra[index].fieldValue = JSON.parse(arra[index].fieldValue);
          }
        }
        return (
          <DebounceSelect
            initFlag
            mode="multiple"
            onChange={(value, data) => {}}
            getoptions={(options) => {
              return options?.map((x, index) => {
                return (
                  <Select.Option key={index} data={x} value={x.value}>
                    {x.label}
                  </Select.Option>
                );
              });
            }}
            delegate={(e) => {
              return getServiceLineList({
                businessLine: '',
                keywords: e,
              });
            }}
          />
        );
      case 'BusinessLine':
        if (!form.getFieldValue('groupFieldList')[index].fieldValue) {
          arra[index].fieldValue = [];
        } else {
          if (typeof arra[index].fieldValue == 'string') {
            arra[index].fieldValue = JSON.parse(arra[index].fieldValue);
          }
        }
        return (
          <DebounceSelect
            initFlag
            mode="multiple"
            onChange={(value, data) => {}}
            getoptions={(options) => {
              return options?.map((x, index) => {
                return (
                  <Select.Option key={index} data={x} value={x.value}>
                    {x.label}
                  </Select.Option>
                );
              });
            }}
            delegate={(e) => {
              return queryBusinesslineOptionsList({
                keywords: e,
              });
            }}
          />
        );
      case 'CustomerDivision':
        if (!form.getFieldValue('groupFieldList')[index].fieldValue) {
          arra[index].fieldValue = [];
        } else {
          if (typeof arra[index].fieldValue == 'string') {
            arra[index].fieldValue = JSON.parse(arra[index].fieldValue);
          }
        }

        return (
          <DebounceSelect
            initFlag
            mode="multiple"
            onChange={(value, data) => {}}
            getoptions={(options) => {
              return options?.map((x, index) => {
                return (
                  <Select.Option key={index} data={x} value={x.value}>
                    {x.label}
                  </Select.Option>
                );
              });
            }}
            delegate={(e) => {
              return getCustemerDivisionList({
                keywords: e,
              });
            }}
          />
        );
      case 'StartMonth':
      case 'EndMonth':
      case 'BVIMonth':
      case 'CalendarMonth':
      case 'BillingMonth':
        if (typeof arra[index].fieldValue == 'string') {
          arra[index].fieldValue =
            arra[index].fieldValue && moment(arra[index].fieldValue).isValid()
              ? moment(arra[index].fieldValue)
              : null;
        }
        return (
          <DatePicker
            picker="month"
            format="YYYYMM"
            style={{ width: '100%' }}
          />
        );
      case 'BillingDate':
      case 'ModifiedDate':
      case 'StartDate':
      case 'EndDate':
        if (typeof arra[index].fieldValue == 'string') {
          arra[index].fieldValue =
            arra[index].fieldValue && moment(arra[index].fieldValue).isValid()
              ? moment(arra[index].fieldValue)
              : null;
        }
        return <DatePicker style={{ width: '100%' }} />;
      case 'TotalAmount':
      case 'ProductUnitPrice':
      case 'BVI':
      case 'ID_H':
      case 'AmountInCurrecy':
      case 'AmountInLocalCurrencyCNY':
      case 'ExchangeRate':
      case 'BillingUnitPrice':
        return <InputNumber style={{ width: '100%' }} />;
      case 'DataStatus':
      case 'BVIStatus':
      case 'ChargeType':
      case 'TemplateType':
      case 'AdjustTag':
      case 'MandatoryBVI':
      case 'IsThereBilling':
      case 'IsThereBVI':
      case 'IsFlatCharge':
      case 'ImportTag':
      case 'BillingMonthTag':
      case 'QuarterlyCharge':
      case 'IsPOByPercentage':
      case 'Signed':
      case 'IndividualInvoice':
      case 'SETag':
      case 'ModifiedTag':
        return (
          <Select allowClear>
            {ops[props.moudleName][fieldName]?.map((item, index) => (
              <Option key={index} value={item.value}>
                {item.label}
              </Option>
            ))}
          </Select>
        );
      case 'BillingStatus':
        if (!form.getFieldValue('groupFieldList')[index].fieldValue) {
          arra[index].fieldValue = [];
        } else {
          if (typeof arra[index].fieldValue == 'string') {
            arra[index].fieldValue = JSON.parse(arra[index].fieldValue);
          }
        }
        return (
          <Select allowClear mode="multiple">
            {ops[props.moudleName][fieldName]?.map((item, index) => (
              <Option key={index} value={item.value}>
                {item.label}
              </Option>
            ))}
          </Select>
        );
      case 'DataType':
      case 'System':
        if (!form.getFieldValue('groupFieldList')[index].fieldValue) {
          arra[index].fieldValue = [];
        } else {
          if (typeof arra[index].fieldValue == 'string') {
            arra[index].fieldValue = JSON.parse(arra[index].fieldValue);
          }
        }
        return (
          <DebounceSelect
            initFlag
            mode="multiple"
            onChange={(value, data) => {}}
            getoptions={(options) => {
              return options?.map((x, index) => {
                return (
                  <Select.Option key={index} data={x} value={x.value}>
                    {x.value}
                  </Select.Option>
                );
              });
            }}
            delegate={(e) => {
              return queryDictionaryInfo({
                groupName: 'Constants',
                key: 'SystemTag',
                subkey: '',
                isOnlyEnable: true,
              });
            }}
          />
        );
      default:
        return <Input style={{ width: '100%' }} />;
    }
  };
  // type=true,新建type=false编辑
  const saveFilterGroup = () => {
    console.log(form.getFieldValue('conditionRelationship'));
    const type = form.getFieldValue('isNew');
    form
      .validateFields()
      .then((valid) => {
        if (!form.getFieldValue('groupName') && type) {
          message.error('New Group is required;');
          return;
        }
        if (!form.getFieldValue('id') && !type) {
          message.error('Filter Group is required;');
          return;
        }
        let groupFieldList = [];
        form.getFieldValue('groupFieldList').map((item) => {
          switch (item.fieldName) {
            case 'StartMonth':
            case 'EndMonth':
            case 'CalendarMonth':
            case 'BVIMonth':
            case 'BillingMonth':
              item.fieldValue = moment(item.fieldValue).format('YYYYMM');
              break;
            case 'ModifiedDate':
            case 'BillingDate':
            case 'EndDate':
            case 'StartDate':
              item.fieldValue = moment(item.fieldValue).format('YYYY-MM-DD');
              break;
            default:
              if (typeof item.fieldValue == 'number') {
                item.fieldValue = item.fieldValue.toString();
              } else if (typeof item.fieldValue == 'object') {
                item.fieldValue = JSON.stringify(item.fieldValue);
              }
              break;
          }
          groupFieldList.push({
            fieldName: item.fieldName,
            fieldValue: item.fieldValue,
            operator: item.operator,
            fieldDispName: operfields[item.fieldName]?.fieldDispName,
          });
        });
        const params = {
          filterGroup: {
            id: type ? null : form.getFieldValue('id'),
            groupName: type
              ? form.getFieldValue('groupName')
              : filterGropList.find(
                  (item) => item.value == form.getFieldValue('id'),
                ).label,
            moduleName: props.moudleName,
            conditionRelationship: form.getFieldValue('conditionRelationship'),
          },
          groupFieldList: groupFieldList,
        };
        saveFilterGroupData(params).then((res) => {
          if (res.isSuccess) {
            message.success(res.msg);
            _getFilterList();
          } else {
            message.error(res.msg);
          }
        });
      })
      .catch((e) => {
        setRequireMark(false);
      });
  };
  const deleteFilterGroup = () => {
    form
      .validateFields()
      .then((valid) => {
        if (valid) {
          Modal.confirm({
            title: 'Tips',
            icon: <ExclamationCircleOutlined />,
            content: 'Confirm to delete the selected Filter Group?',
            okText: 'Confirm',
            cancelText: 'Cancel',
            onOk: () => {
              if (!form.getFieldValue('id')) {
                message.warning('Please select the Filter Group');
                return;
              }
              deleteFilterGroupData({
                recordId: form.getFieldValue('id'),
              }).then((res) => {
                if (res.isSuccess) {
                  message.success(res.msg);
                  _getFilterList();
                } else {
                  message.error(res.msg);
                }
              });
            },
            centered: true,
          });
        }
      })
      .catch((e) => {});
  };
  const validGroupName = (rule, value, callback) => {
    if (form.getFieldValue('isNew') && !value) {
      return Promise.reject(new Error('New Group is required;'));
    }
    return Promise.resolve();
  };
  const validFilterGroup = (rule, value, callback) => {
    if (!form.getFieldValue('isNew') && !value) {
      return Promise.reject(new Error('Filter Group is required;'));
    }
    return Promise.resolve();
  };

  return (
    <>
      <Modal
        title={
          <div>
            <TaleTitleIconDiv>
              <span></span>
            </TaleTitleIconDiv>
            <span style={{ verticalAlign: 'middle', fontSize: '20px' }}>
              Filter Group
            </span>
          </div>
        }
        footer={null}
        visible={isSetting}
        onCancel={() => {
          setSetting(false);
          form.resetFields();
          setRequireMark(false);
        }}
        width={1000}
      >
        <Form labelCol={{ span: 4 }} form={form}>
          <Form.Item label="New Group?" name="isNew" valuePropName="checked">
            <Switch
              checkedChildren="Yes"
              unCheckedChildren="No"
              onChange={(val) => {
                setRequireMark(val);
              }}
            />
          </Form.Item>
          {!requireMark ? (
            <Form.Item
              label="Filter Group"
              name="id"
              required
              rules={[{ validator: validFilterGroup }]}
            >
              <Select
                style={{ width: '100%' }}
                allowClear
                onChange={(val: string) => {
                  if (val) {
                    form.setFieldsValue({
                      conditionRelationship:
                        filterGroupInfoById[
                          val
                        ].conditionRelationship.toLowerCase(),
                      groupFieldList: filterGroupInfoById[val].groupFieldList,
                    });
                  }
                }}
              >
                {filterGropList?.map((item, i) => (
                  <Option key={i} value={item?.value}>
                    {item?.label}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          ) : (
            <Form.Item
              label="New Group"
              name="groupName"
              required
              rules={[{ validator: validGroupName }]}
            >
              <Input />
            </Form.Item>
          )}

          <Form.Item
            label="Filter Type"
            name="conditionRelationship"
            rules={[{ required: true, message: 'Filter Type required' }]}
          >
            <Radio.Group>
              <Radio value="and" key={0}>
                And
              </Radio>
              <Radio value="or" key={1}>
                Or
              </Radio>
            </Radio.Group>
          </Form.Item>
          <Row>
            <Form.List name="groupFieldList">
              {(fields, { add, remove }) => (
                <>
                  <Col span={19} offset={4}>
                    {fields.map(({ name }, index) => (
                      <Row gutter={20} key={index}>
                        <Col span={6}>
                          <Form.Item
                            name={[name, 'fieldName']}
                            rules={[
                              {
                                required: true,
                                message: 'Field Name required',
                              },
                            ]}
                          >
                            <Select
                              style={{ width: '100%' }}
                              allowClear
                              onChange={(val: string) => {
                                form.getFieldValue('groupFieldList')[
                                  index
                                ].fieldValue = null;
                                form.getFieldValue('groupFieldList')[
                                  index
                                ].operator = null;
                                if (val) {
                                  setOperList(operfields[val]?.operator || []);
                                } else {
                                  setOperList([]);
                                }
                              }}
                            >
                              {Object.keys(operfields).map(
                                (item: string, _index) => (
                                  <Option key={_index} value={item}>
                                    {operfields[item]?.fieldDispName}
                                  </Option>
                                ),
                              )}
                            </Select>
                          </Form.Item>
                        </Col>
                        <Col span={6}>
                          <Form.Item
                            name={[name, 'operator']}
                            rules={[
                              { required: true, message: 'Operator required' },
                            ]}
                          >
                            <Select style={{ width: '100%' }} allowClear>
                              {operList?.map((item, _i) => (
                                <Option key={_i} value={item}>
                                  {getFilterOperator(item)}
                                </Option>
                              ))}
                            </Select>
                          </Form.Item>
                        </Col>
                        <Col span={10}>
                          <Form.Item
                            name={[name, 'fieldValue']}
                            initialValue={null}
                            rules={[
                              {
                                required: true,
                                message: 'Field Value required',
                              },
                            ]}
                          >
                            {getFilterElement(
                              form.getFieldValue('groupFieldList')[index]
                                .fieldName,
                              index,
                            )}
                          </Form.Item>
                        </Col>
                        <Col span={1}>
                          <Form.Item>
                            <Button
                              icon={<i className="gbs gbs-delete"></i>}
                              type="text"
                              onClick={() => {
                                console.log(111);
                                // if (index != 0) {
                                //   remove(name);
                                // } else {
                                //   if (fields.length == 1) {
                                //     message.warning('Keep at least one record');
                                //   }
                                // }
                                if (fields.length == 1) {
                                  message.warning('Keep at least one record');
                                } else {
                                  remove(name);
                                }
                              }}
                            ></Button>
                          </Form.Item>
                        </Col>
                      </Row>
                    ))}
                  </Col>
                  <Col span={1}>
                    <Button
                      icon={<PlusCircleOutlined />}
                      type="text"
                      onClick={add}
                    ></Button>
                  </Col>
                </>
              )}
            </Form.List>
          </Row>
          <Form.Item style={{ textAlign: 'center', margin: '20px' }}>
            <Space size={[20, 20]}>
              <Button type="primary" onClick={() => saveFilterGroup()}>
                Save
              </Button>
              {!requireMark ? (
                <Button onClick={deleteFilterGroup}>Delete</Button>
              ) : (
                ''
              )}
            </Space>
          </Form.Item>
        </Form>
      </Modal>
      <FilterGroupDiv id="filterGroup">
        <Space size={0}>
          {props?.businessLineRender}
          <label>Filter Group:</label>
          <Select
            value={filterGroup}
            // style={{ minWidth: '300px' }}
            onChange={changeFilterGroup}
            // allowClear
          >
            {filterGropList.map((item, i) => (
              <Option key={i} value={item?.value}>
                {item?.label}
              </Option>
            ))}
          </Select>
          <AuthWrapper
            functionName={props?.authPagename}
            authCode={[
              props?.authPagename + '-View',
              props?.authPagename + '-Edit',
            ]}
          >
            <Space size={10}>
            <Tooltip title="Search">
              <Button
                type="primary"
                icon={<i className="gbs gbs-search"></i>}
                onClick={() => props.onSearch(filterGroup)}
              ></Button>
              </Tooltip>
              {checkAuth(props?.authPagename, [
                `${props?.authPagename}-Edit`,
                `${props?.authPagename}-View`,
              ]) ? (
                <Tooltip title="Setting">
                <Button
                  icon={<i className="gbs gbs-setting"></i>}
                  onClick={() => {
                    form.resetFields();
                    form.setFieldsValue({
                      conditionRelationship: 'and',
                      groupFieldList: [
                        { fieldName: '', operator: '', fieldValue: '' },
                      ],
                    });
                    setSetting(true);
                  }}
                ></Button>
                </Tooltip>
              ) : (
                ''
              )}
              {/* 导出 */}
              <Tooltip title="Export"> 
              <Button
                icon={<i className="gbs gbs-export"></i>}
                onClick={props.exportAction}
              ></Button>
              </Tooltip>
              <Tooltip title="Clear">
              <Button
                icon={<ClearOutlined />}
                onClick={() => {
                  setFilterGroup('');
                  props.onClear();
                }}
              ></Button>
              </Tooltip>
              {props?.customComponet}
            </Space>
          </AuthWrapper>
        </Space>
      </FilterGroupDiv>
    </>
  );
};
