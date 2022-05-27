export interface BasePayload {
  /** 用户Id */
  userId: string;
  /** 用户账号 */
  account: string;
  /** 用户真名 */
  realName: string;
  /** 用户类型 */
  userType: string;
  /** 来源系统 */
  system: string;
  /** 邮箱 */
  email: string;
  /** 头像 */
  avatar: string;
  /** 用户所拥有的角色 */
  globeRoleName: Array<string>;
  /** 用户终端类型 1:Web 2:APP */
  clientType: number;
  /** 过期时间 - 从1970-1-1开始到现在的秒数 - 单元秒 */
  exp: number;
}

export interface Expired {}
