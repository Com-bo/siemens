import styled from 'styled-components';

export const NoticeListWrapper = styled.div`
  height: 350px;
  display: flex;
  flex-direction: column;
  .ant-spin-nested-loading {
    flex: 1 0 0%;
    overflow: hidden;
    .ant-spin-container {
      height: 100%;
      width: 100%;
    }
  }
`;

export const ScrollContainer = styled.div`
  overflow-y: auto;
  overflow-x: hidden;
  height: 100%;
  width: 100%;

  .ant-pro-list {
    height: 100%;
    width: 100%;
    .ant-list-item-action li {
      width: 100%;
    }
    .ant-list .ant-list-item {
      border-bottom: 1px solid #f0f0f0;
      .ant-pro-list-row-title {
        margin: 0 0 ${(props) => props.theme['com-notice-padding']} 0 !important;
        > div {
          font-size: 14px;
          color: ${(props) => props.theme['com-notice-color']};
        }
      }

      .ant-pro-list-row-description {
        margin-top: ${(props) => {
          return (
            !props?.children?.props?.children?.props?.metas?.title?.render?.() &&
            'unset'
          );
        }};
      }
      .ant-list-item-extra {
        margin-left: ${(props) =>
          !props?.children?.props?.children?.props?.metas?.extra?.render?.() &&
          'unset'};
      }
      .ant-list-item-action {
        margin-top: unset;
      }
      .ant-pro-list-row-title:hover {
        color: #1890ff;
      }
    }
  }
`;

export const NotFount = styled.div`
  padding: 73px 0 88px;
  color: #cdcdcd;
  text-align: center;
  img {
    display: inline-block;
    height: 76px;
    margin-bottom: 16px;
  }
`;

export const BottomBar = styled.div`
  height: 46px;
  color: #333;
  line-height: 46px;
  text-align: center;
  border-top: 1px solid ${(props) => props.theme['com-notice-border-color']};
  border-radius: ${(props) =>
    `0 0 ${props.theme['com-notice-border-radius']} ${props.theme['com-notice-border-radius']}`};
  transition: all 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
  * {
    display: flex;
    align-items: center;
    justify-content: center;
    flex: 1 0 0%;
    cursor: pointer;
    transition: all 0.3s;
    user-select: none;

    &:only-child {
      width: 100%;
    }

    &:not(:only-child):not(:first-child) {
      border-left: 1px solid
        ${(props) => props.theme['com-notice-border-color']};
    }
  }
`;

export const FlexCenter = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  color: ${(props) => props.theme['com-notice-placeholder-color']};
`;
export const MSOIcon = styled.span`
  color: ${(props) => props.theme['com-notice-icon-color']};
`;

export const NoMore = styled(FlexCenter)`
  height: 15px;
`;
