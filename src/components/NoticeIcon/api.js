export const Api = {
  NoticeCount: '/Api/User/UserMessage/Count', // 获取个人信箱未读消息数量
  NoticeNewMessage: '/Api/User/UserMessage/NewMessage', // 获取新消息
  NoticeChangeStatus: '/Api/User/UserMessage/ChangeStatus', // 修改个人信箱消息已读/未读状态
  NoticeDetail: '/Api/User/UserMessage/Detail', // 获取个人信箱消息内容
  NoticePageList: '/Api/User/UserMessage/PageList', // 获取个人信箱消息分页列表
};

export default Api;
