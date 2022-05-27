export function getUserInfo() {
  return JSON.parse(sessionStorage.getItem('userInfo'));
}
