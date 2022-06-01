import styled from "styled-components";

export const TableMixDiv = styled.div<{ status: boolean }>`
.listSearch {
    .ant-form-item {
        display: block;
    }

    padding-bottom:50px;

}

.hiddenlistSearch {
    .ant-form-item {
        display: none;
    }
    padding-bottom:0;
}
th.ant-table-cell.ant-table-selection-column::after{
        height:${(props) =>props.status?'50px':'0px'}
}
`



