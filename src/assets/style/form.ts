import styled from 'styled-components';
export const FormDiv = styled.div`
  padding: 40px 20px 20px 20px;
  margin-right: 20px;
  margin-left: 20px;
  // height: 100%;
  background-color: #fff;
  border-radius: 10px;
  .ant-input,
  .ant-form-item .ant-select,
  .ant-form-item .ant-cascader-picker {
    // max-width: 370px;
  }
  textarea.ant-input {
    max-width: 100%;
  }
  .ant-input-number {
    width: 100%;
    // max-width: 370px;
  }
  .ant-picker {
    // max-width: 370px;
  }
  .hideHeadPanel {
    .ant-collapse-header {
      display: none;
    }
  }
  .fileBox {
    overflow: hidden;
    margin-bottom: 10px;
    width: 100%;
  }
  .fileLabel {
    width: 150px;
    float: left;
    line-height: 32px;
  }
  // 付款凭证
  .filewrapper {
    background-color: #fbfbfb;
    border-radius: 5px;
    border: 1px solid #efefef;
    padding: 4px 11px;
    float: left;
    width: calc(100% - 150px);
    a {
      text-decoration: underline;
      text-underline-position: under;
      line-height: 1.5em;
    }
  }
  .uploadBtn {
    padding: 0;
    color: #009999;
  }
`;
export const InputRightWrapDiv = styled.div`
  text-align: right;
  input,
  .ant-select-selection-item,
  .ant-select-selection-placeholder {
    text-align: left;
  }
`;
export const PanelTitleDiv = styled.div`
  margin-left: 20px;
  font-style: italic;
  display: inline-block;
  font-size: 20px;
  line-height: 40px;
  letter-spacing: 0px;
  font-weight: normal;
  color: #009999;
  opacity: 0.15;
  font-family: Arail;
`;
export const FormTableDiv = styled.div`

 
  .ant-table-container table > thead > tr:first-child th:first-child {
    border-bottom-left-radius: 0;
  }
  .ant-table-container table > thead > tr:first-child th:last-child {
    border-bottom-right-radius: 0;
  }
  .ant-table {
    border-radius: 0px 0px 5px 5px;
    border: solid 1px #ceeffb;
    color: #666;
    background: #fff;
    overflow: hidden;
  }
  .ant-table table > thead th {
    border-color: #ceeffb;
  }
  .ant-table table > thead .ant-table-cell-fix-right,
  .ant-table table > thead .ant-table-cell-fix-left {
    background-color: #ceeffb;
  }
  .stripe,
  .stripe .ant-table-cell-fix-right,
  .stripe .ant-table-cell-fix-left {
    background-color: #f9f9f9;
  }
  .ant-table-tbody > tr > td {
    border: none;
  }
  .ant-table-tbody table {
    border-top: 1px solid #ceeffb;
  }
  .ant-table {
    color: #666;
  }
`;
// 付款凭证or上传附件
export const UploadNoticeDiv = styled.div`
  overflow: hidden;
  position: relative;
  .ant-upload-list {
    width: 100%;
    min-height: 36px;
    padding: 10px 10px 40px;
    border: 1px solid #ececec;
    border-radius: 5px;
  }
  .ant-upload {
    position: absolute;
    left: 10px;
    bottom: 0px;
  }
  .ant-upload-list-text-container {
    display: inline-block;
    min-width: 200px;
    width: 33%;
  }
  .upload-tip {
    width: 400px;
    display: inline-block;
    position: absolute;
    left: 60px;
    bottom: 5px;
    color: #999;
  }
`;
