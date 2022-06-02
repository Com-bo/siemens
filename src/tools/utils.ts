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
/**
 * 获取第一个表格的可视化高度
 * @param {*} extraHeight 额外的高度(表格底部的内容高度 Number类型,默认为74)
 * @param {*} id 当前页面中有多个table时需要制定table的id
 */
export function getTableInlineScroll(id) {
  let tHeader = null;
  // debugger
  // if (id) {
  //   tHeader = document.getElementById(id)
  //     ? document.getElementById(id).getElementsByClassName('ant-table-thead')[0]
  //     : null;
  // } else {
  //   tHeader = document.getElementsByClassName('ant-table-thead')[0];
  // }
  //表格内容距离顶部的距离
  // let tHeaderBottom = 0;
  // let tHeaderTop = 0;
  // if (tHeader) {
  //   tHeaderBottom = tHeader.getBoundingClientRect().bottom;
  //   tHeaderTop = tHeader.getBoundingClientRect().top;
  // }
  //窗体高度-表格内容顶部的高度-表格内容底部的高度
  let height = document.querySelector(".ant-pro-grid-content").clientHeight -document.getElementById("filterGroup").clientHeight;
  // let height = `calc(100vh - ${tHeaderBottom + extraHeight}px)`;
  // let _table: any = document.getElementsByClassName('ant-table')[0];
  // if (_table) {
  //   _table.style.minHeight =
  //     getClientHeight() - tHeaderTop + 'px';
  // }
  let _tables: any = document.querySelector('.ant-table .ant-table-body');
  if (_tables) {
    if (height < 100) {
      height = 200;
    }
    _tables.style.height = height + 'px';
    //     getClientHeight() - tHeaderBottom - extraHeight + 'px';
  }
  // checkScrollBar(height);
  return height;
}
export const checkScrollBar = (height: any) => {
  let antTableBody = document.querySelector('.ant-table-body');

  let antTableBodyScrollHeight = antTableBody && antTableBody.scrollHeight;

  let antTableFixHeader = document.querySelector('.ant-table-container');

  if (antTableBodyScrollHeight < height) {
    antTableFixHeader && antTableFixHeader.classList.add('change-scrollBal');
  } else {
    antTableFixHeader && antTableFixHeader.classList.remove('change-scrollBal');
  }
};
