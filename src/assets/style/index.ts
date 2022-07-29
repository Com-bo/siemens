import styled from 'styled-components';
export const HomeTop = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: #f8f8f8;
  padding: 20px;
  border-radius: 10px;
  .top_block_one {
    background-size: 100% 100%;
    color: #008278;
    .top_block_tit{
      background-color: #d0e8e8;
    }
    .top_block_title{
      padding:35px 20px !important;
    }
  }
  .top_block_two {
    background-size: 100% 100%;
    color: #e47724;
    .top_block_tit{
      background-color: #f9e6d7;
    }
  }
  
  .top_block_three {
    background-size: 100% 100%;
    color: #899b21;
    background-color: #e9ecd9;
    .top_block_tit{
      background-color: #e9ecd9;
    }
  }
  .top_block {
    margin-right: 20px;
    flex: 1;
    border-radius: 10px;
    background-color: #ffffff;
    overflow: hidden;
    font-size: 22px;
    font-weight: bold;
    &:last-child{
      margin-right: 0;
    }
    .top_block_tit{
      height: 80px;
      line-height: 80px;
      padding: 0 20px;
    }
    .top_block_title_wrap{
      background-color: #ffffff;
      padding: 20px;
      p{
        margin: 0;
      }
      .title_p{
        color: #333333;
        font-size: 18px;
        text-align: center;
      }
      .top_block_title {
        background-color: #f8f8f8;
        font-size: 16px;
        border-radius: 10px;
        color: #333;
        display: flex;
        padding: 20px;
        .title_item{
          flex: 1;
          padding:0 15px;
          .title_item_p1{
            font-size: 16px;
            color: #666666;
            font-weight: normal;
          }
          .title_item_p2{
            font-size: 18px;
            color: #333333;
            text-decoration: underline;
            &.title_percentage{
              color: #c92941;
            }
          }
        }
      }
    }
  }
`;
export const FilterGroupDivReport = styled.div`
  margin-bottom: 20px;
  .ant-select {
    width: 200px;
    margin: 0 20px 0 10px;
  }
  .ant-space .ant-btn {
    width: 40px;
  }
`;
export const HomeWrap = styled.div`
  img{
    width: 100%;
  }
`;