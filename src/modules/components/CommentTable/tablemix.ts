import styled from 'styled-components';
const colorTheme = '#00807d';
export const TableMixDiv = styled.div<{ status: boolean }>`
  .listSearch {
    width: 100%;
    .ant-form-item {
      display: block;
    }
    padding-bottom: 50px;
  }
  .ant-table-column-sorter.ant-table-column-sorter-full {
    margin-top: ${(props) => (props.status ? '-3.5em' : '0px')};
    width: 20px;
  }
  td.ant-table-column-sort {
    background-color: unset;
  }

  .hiddenlistSearch {
    .ant-form-item {
      display: none;
    }
    padding-bottom: 0;
  }
  th.ant-table-cell.ant-table-selection-column::after {
    height: ${(props) => (props.status ? '50px' : '0px')};
  }
`;
