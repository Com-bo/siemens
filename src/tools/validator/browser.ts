export const isAndroid = (userAgent: string = navigator.userAgent) =>
  userAgent.indexOf('Android') > -1 || userAgent.indexOf('Adr') > -1; // android终端
export const isiOS = (userAgent = navigator.userAgent) =>
  !!userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); // ios终端
export const isWeChat = (userAgent = navigator.userAgent) =>
  userAgent.indexOf('MicroMessenger') !== -1; // wechat终端
export const isIE = () => !!window.ActiveXObject || 'ActiveXObject' in window;
export const isValidURL = (url: string) =>
  url.startsWith('http://') || url.startsWith('https://');
