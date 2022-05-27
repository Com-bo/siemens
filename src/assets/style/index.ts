import styled from 'styled-components';
export const HomeTop = styled.div`
  display: flex;
  margin-right: 20px;
  justify-content: space-between;
  .top_block_one {
    background: url(${() => require(`@/assets/images/orderbg.png`)}) 0 0
      no-repeat;
    background-size: 100% 100%;
  }
  .top_block_two {
    background: url(${() => require(`@/assets/images/todobg.png`)}) 0 0
      no-repeat;
    background-size: 100% 100%;
  }
  .top_block_three {
    background: url(${() => require(`@/assets/images/unclosebg.png`)}) 0 0
      no-repeat;
    background-size: 100% 100%;
  }
  .top_block_four {
    background: url(${() => require(`@/assets/images/draftbg.png`)}) 0 0
      no-repeat;
    background-size: 100% 100%;
  }
  .top_block {
    height: 200px;
    width: 325px;
    padding: 30px 38px;
    border-radius: 10px;
    .ant-col-12 {
      line-height: 68px;
    }
    .top_num {
      font-family: Arial;
      font-size: 48px;
      color: #000000;
      font-style: italic;
    }
    .top_block_title {
      font-size: 18px;
      color: #333;
    }
    .ant-divider-horizontal {
      margin: 15px 0;
    }
  }
`;
export const HomeBottom = styled.div`
  margin: 20px 0;

  .card_block {
    border-radius: 10px;
    .ant-card-body {
      padding: 0 20px 20px;
    }
    .tips_wrap,
    .tips_home_wrap {
      border: 1px solid #ececec;
      border-radius: 10px;
      margin-bottom: 10px;
      padding: 0 20px;
      color: #000;
      span {
        color: #666;
        font-family: Arail;
      }
    }
    .tips_home_wrap {
      padding: 0 20px;
    }
    .tips_list_wrap {
      height: 50px;
      line-height: 50px;
      img {
        margin-left: 10px;
      }
    }
    .notice_wrap {
      padding: 16px 20px;
      background-color: #f9f9f9;
      border-radius: 10px;
      margin-bottom: 10px;
      border: none;
      .notice_title {
        font-weight: bold;
        span {
          display: inline-block;
          width: 10px;
          height: 10px;
          background: #e7001d;
          border-radius: 50%;
          margin-right: 10px;
        }
      }
      p {
        color: #000;
        margin: 0;
        cursor: pointer;
      }
    }
  }
`;

export const NoticeWrapDiv = styled.div`
  display: flex;
  padding: 20px 0px;
  .notice_left {
    margin-right: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    > div {
      width: 45px;
      height: 45px;
      border-radius: 50%;
      background: #f3f3f3;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
  .notice_content {
    flex: 1;
  }
  .notice_right {
    img {
      margin-left: 10px;
    }
  }
`;
