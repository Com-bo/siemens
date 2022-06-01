
import { TableTitleDiv, TableTopDiv, TableWrapDiv, TaleTitleIconDiv } from '@/assets/style';
import { Button, Table } from 'antd';
import React, { useEffect, useState } from 'react';

export default (props: any) => {
    const columns: any = [{
        title: 'Business Line',
        dataIndex: 'BusinessLine',
        key: 'BusinessLine',
        align: 'center',
    }, {
        title: 'ARE',
        dataIndex: 'ARE',
        key: 'ARE',
        align: 'center',
    }, {
        title: 'Company Code',
        dataIndex: 'CompanyCode',
        key: 'CompanyCode',
        align: 'center',
    }, {
        title: 'Customer Devision',
        dataIndex: 'CustomerDevision',
        key: 'CustomerDevision',
        align: 'center',
    }, {
        title: 'Cost Center',
        dataIndex: 'CostCenter',
        key: 'CostCenter',
        align: 'center',
    }, {
        title: 'Cost Location',
        dataIndex: 'CostLocation',
        key: 'CostLocation',
        align: 'center',
    }, {
        title: 'Product Name',
        dataIndex: 'ProductName',
        key: 'ProductName',
        align: 'center',
    }, {
        title: 'Error Message',
        dataIndex: 'ErrorMessage',
        key: 'ErrorMessage',
        align: 'center',
        render: (text) => <span style={{ color: "red" }}>{text}</span>
    }]
    const [data, setData] = useState([])

    useEffect(() => {
        setData([{
            id: 1,
            BusinessLine: 'R2R',
            ARE: '563s',
            CompanyCode: '563s',
            CustomerDevision: 'DI',
            CostCenter: 'A22885020',
            CostLocation: 'SAS03570',
            ProductName: '3rd party VendorMaster Data Maintenance - ERP',
            ErrorMessage: '不能匹配到Unit Price'
        },
        {
            id: 2,
            BusinessLine: 'R2R',
            ARE: '563s',
            CompanyCode: '563s',
            CustomerDevision: 'DI',
            CostCenter: 'A22885020',
            CostLocation: 'SAS03570',
            ProductName: '3rd party VendorMaster Data Maintenance - ERP',
            ErrorMessage: '不能匹配到Unit Price'
        },
        {
            id: 3,
            BusinessLine: 'R2R',
            ARE: '563s',
            CompanyCode: '563s',
            CustomerDevision: 'DI',
            CostCenter: 'A22885020',
            CostLocation: 'SAS03570',
            ProductName: '3rd party VendorMaster Data Maintenance - ERP',
            ErrorMessage: '不能匹配到Unit Price'
        },
        {
            id: 4,
            BusinessLine: 'R2R',
            ARE: '563s',
            CompanyCode: '563s',
            CustomerDevision: 'DI',
            CostCenter: 'A22885020',
            CostLocation: 'SAS03570',
            ProductName: '3rd party VendorMaster Data Maintenance - ERP',
            ErrorMessage: '不能匹配到Unit Price'
        },
        {
            id: 5,
            BusinessLine: 'R2R',
            ARE: '563s',
            CompanyCode: '563s',
            CustomerDevision: 'DI',
            CostCenter: 'A22885020',
            CostLocation: 'SAS03570',
            ProductName: '3rd party VendorMaster Data Maintenance - ERP',
            ErrorMessage: '不能匹配到Unit Price'
        },
        {
            id: 6,
            BusinessLine: 'R2R',
            ARE: '563s',
            CompanyCode: '563s',
            CustomerDevision: 'DI',
            CostCenter: 'A22885020',
            CostLocation: 'SAS03570',
            ProductName: '3rd party VendorMaster Data Maintenance - ERP',
            ErrorMessage: '不能匹配到Unit Price'
        },
        {
            id: 7,
            BusinessLine: 'R2R',
            ARE: '563s',
            CompanyCode: '563s',
            CustomerDevision: 'DI',
            CostCenter: 'A22885020',
            CostLocation: 'SAS03570',
            ProductName: '3rd party VendorMaster Data Maintenance - ERP',
            ErrorMessage: '不能匹配到Unit Price'
        },
        {
            id: 8,
            BusinessLine: 'R2R',
            ARE: '563s',
            CompanyCode: '563s',
            CustomerDevision: 'DI',
            CostCenter: 'A22885020',
            CostLocation: 'SAS03570',
            ProductName: '3rd party VendorMaster Data Maintenance - ERP',
            ErrorMessage: '不能匹配到Unit Price'
        },
        {
            id: 9,
            BusinessLine: 'R2R',
            ARE: '563s',
            CompanyCode: '563s',
            CustomerDevision: 'DI',
            CostCenter: 'A22885020',
            CostLocation: 'SAS03570',
            ProductName: '3rd party VendorMaster Data Maintenance - ERP',
            ErrorMessage: '不能匹配到Unit Price'
        },
        {
            id: 10,
            BusinessLine: 'R2R',
            ARE: '563s',
            CompanyCode: '563s',
            CustomerDevision: 'DI',
            CostCenter: 'A22885020',
            CostLocation: 'SAS03570',
            ProductName: '3rd party VendorMaster Data Maintenance - ERP',
            ErrorMessage: '不能匹配到Unit Price'
        },
        {
            id: 11,
            BusinessLine: 'R2R',
            ARE: '563s',
            CompanyCode: '563s',
            CustomerDevision: 'DI',
            CostCenter: 'A22885020',
            CostLocation: 'SAS03570',
            ProductName: '3rd party VendorMaster Data Maintenance - ERP',
            ErrorMessage: '不能匹配到Unit Price'
        },
        {
            id: 12,
            BusinessLine: 'R2R',
            ARE: '563s',
            CompanyCode: '563s',
            CustomerDevision: 'DI',
            CostCenter: 'A22885020',
            CostLocation: 'SAS03570',
            ProductName: '3rd party VendorMaster Data Maintenance - ERP',
            ErrorMessage: '不能匹配到Unit Price'
        }])
    }, [])
    return <>
        <TableTopDiv>
            <TableTitleDiv style={{ float: 'left' }}>
                <TaleTitleIconDiv>
                    <span></span>
                </TaleTitleIconDiv>
                <span style={{ verticalAlign: 'middle', fontSize: '20px' }}>Check Original List</span>
            </TableTitleDiv>
        </TableTopDiv>
        <TableWrapDiv>
            <Table columns={columns} rowClassName={(record, index) => (index % 2 == 0 ? '' : 'stripe')} dataSource={data} rowKey="id" pagination={false} />
        </TableWrapDiv>

        <div style={{margin:"20px auto 40px",textAlign:'center'}}>
            <Button type="primary">Export</Button>
        </div>
    </>
}