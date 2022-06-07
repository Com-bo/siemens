import { useEffect, useRef, useCallback } from 'react';
import moment from 'moment';

export function useDebounce(fn, delay, dep = []) {
  const { current } = useRef({ fn, timer: null });
  useEffect(
    function () {
      current.fn = fn;
    },
    [fn],
  );

  return useCallback(function f(...args) {
    if (current.timer) {
      clearTimeout(current.timer);
    }
    current.timer = setTimeout(() => {
      current.fn.call(this, ...args);
    }, delay);
  }, dep);
}
export function getClientHeight() {
  var clientHeight = 0;
  if (document.body.clientHeight && document.documentElement.clientHeight) {
    var clientHeight =
      document.body.clientHeight < document.documentElement.clientHeight
        ? document.body.clientHeight
        : document.documentElement.clientHeight;
  } else {
    var clientHeight =
      document.body.clientHeight > document.documentElement.clientHeight
        ? document.body.clientHeight
        : document.documentElement.clientHeight;
  }
  return clientHeight;
}
export function formatDate(dateText: any) {
  return dateText
    ? moment(new Date(dateText)).isValid()
      ? moment(dateText).format('YYYY-MM-DD')
      : dateText
    : '';
}
// 防止XSS攻击
export function decodeHtml(text) {
  if (!text) {
    return '';
  }
  var temp = document.createElement('div');
  //2.然后将要转换的字符串设置为这个元素的innerHTML(ie，火狐，google都支持)
  temp.innerHTML = text;
  //3.最后返回这个元素的innerText(ie支持)或者textContent(火狐，google支持)，即得到经过HTML解码的字符串了。
  var output = temp.innerText || temp.textContent;
  temp = null;
  return output;
}
/* *  
*obj:文件对象
*form：formData
filename：需要上传的文件名称
**/
export function objectToFormData(obj, form, filename: string) {
  const fd = form || new FormData();
  for (let property in obj) {
    if (obj.hasOwnProperty(property)) {
      // if the property is an object, but not a File, use recursivity.
      if (
        typeof obj[property] === 'object' &&
        !(obj[property] instanceof File)
      ) {
        objectToFormData(obj[property], fd, filename);
      } else if (obj[property] instanceof File) {
        // if it's a string or a File object
        fd.append(filename, obj[property]);
      }
    }
  }
  return fd;
};

