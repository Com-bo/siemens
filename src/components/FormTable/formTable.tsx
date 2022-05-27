import React, {
  useContext,
  useState,
  useEffect,
  useRef,
  useImperativeHandle,
} from 'react';
import { Table, Input, Button, Popconfirm, Form } from 'antd';
import { FormInstance } from 'antd/lib/form';
import styles from './style.less';
const EditableContext = React.createContext<FormInstance<any> | null>(null);

interface Item {
  key: string;
  name: string;
  age: string;
  address: string;
}

interface EditableRowProps {
  index: number;
}

const formList = [];

const EditableRow: React.FC<EditableRowProps> = ({ index, ...props }) => {
  const [form] = Form.useForm();
  if (props.children[0] != null)
    formList[props.children[0]?.props?.index] = form;
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};

interface EditableCellProps {
  title: React.ReactNode;
  editable: boolean;
  children: React.ReactNode;
  dataIndex: keyof Item;
  record: Item;
  render?: any;
  handleSave: (record: Item, cellBack) => void;
  rowIndex: number;
  cellBack?: any;
}

const EditableCell: React.FC<EditableCellProps> = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  render,
  handleSave,
  rowIndex,
  cellBack,
  ...restProps
}) => {
  const [editing, setEditing] = useState(true);
  const inputRef = useRef<Input>(null);
  const form = useContext(EditableContext)!;
  useEffect(() => {
    // if (editing) {
    //   inputRef.current!.focus();
    // }
  }, [editing]);
  form.setFieldsValue(record);
  const toggleEdit = () => {
    form.setFieldsValue({ [dataIndex]: record[dataIndex] });
  };

  const save = async () => {
    try {
      const values = await form.validateFields();
      toggleEdit();
      handleSave({ ...record, ...values }, cellBack);
    } catch (errInfo) {
      console.log('Save failed:', errInfo);
    }
  };

  let childNode = children;
  if (editable) {
    childNode = editing ? (
      render(inputRef, save, record, rowIndex)
    ) : (
      <div
        className="editable-cell-value-wrap"
        style={{ paddingRight: 24 }}
        onClick={toggleEdit}
      >
        {children}
      </div>
    );
  }

  return <td {...restProps}>{childNode}</td>;
};

interface DataType {
  key: React.Key;
  name: string;
  age: string;
  address: string;
}

const index = (props: any) => {
  useImperativeHandle(props.cRef, () => ({
    validateForms: () => {
      var promiseArr = new Array<any>();
      formList.forEach((x) => {
        promiseArr.push(x.validateFields());
      });
      return Promise.all(promiseArr);
    },
  }));

  const handleSave = (row: DataType, cellBack) => {
    const newData = [...props.dataSource];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    props.setDataSource(newData);
    if (cellBack) cellBack(row, index);
  };

  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };
  const columns = props.columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: DataType, rowIndex) => ({
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        record,
        render: col.renderT,
        handleSave: handleSave,
        rowIndex,
        cellBack: col.cellBack,
      }),
    };
  });

  useEffect(() => {}, [props.dataSource]);

  return (
    <Table
      rowClassName={(record, index) => (index % 2 == 0 ? '' : 'stripe')}
      className={styles.form_Table}
      components={components}
      {...props}
      columns={columns}
      scroll={{ x: 1000 }}
    />
  );
};

export default index;
