import styled from 'styled-components';

export const HelpDiv = styled.div`
  span {
    font-variant: tabular-nums;
    line-height: 1.5715;
    list-style: none;
    font-feature-settings: 'tnum', 'tnum';
    color: rgba(0, 0, 0, 0.45);
    font-size: 14px;
    margin-right: 5px;
  }
`;

export const HelpContent = styled.div`
  button {
    letter-spacing: 2px;
    font-size: 18px;
    &:hover {
      color: #fff;
      background-color: #ec6602;
    }
  }
  padding-bottom: 100px;
  .ant-card {
    box-shadow: 0 1px 4px 0 rgb(0 21 41 / 12%);
  }
  .card_title {
    text-align: left;
    .title {
      font-weight: bold;
    }
    .title_tip {
      font-size: 14px;
      color: #666;
    }
  }
  .ant-list-item {
    font-size: 16px;
  }
  .label_title + span {
    font-weight: bold;
  }
`;
