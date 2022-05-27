export function getUrlSearch(url: string) {
  let urlParams = String(url).slice(String(url).indexOf('?') + 1);
  // .pop();
  const queryArr = urlParams.split('&');
  const params = Object.create(null);
  queryArr.forEach((item) => {
    const [key, value] = [
      item.slice(0, item.indexOf('=')),
      item.slice(item.indexOf('=') + 1),
    ];
    params[key] = value;
  });
  return params;
}
