import Validator from '@/tools/validator';
export default class Format {
  static toBigCamelCase(obj, ignoreKeyList?) {
    if (Validator.isObjectNotEmpty(obj)) {
      const newObj = Object.create(null);
      for (let [key, value] of Object.entries(obj)) {
        if (ignoreKeyList && ignoreKeyList.includes(key)) {
          return;
        }
        let TitleCase = key
          .slice(0, 1)
          .toLocaleUpperCase()
          .concat(key.slice(1));
        newObj[TitleCase] = value;
      }
      return newObj;
    }
    return {};
  }

  /**
   * 将HTML文本格式化为纯文本
   * @param html
   * @returns text
   * @author Phoebe.Lv
   */
  static htmlToText(html) {
    var re1 = new RegExp('<.+?>', 'g');
    var msg = html?.replace(re1, '');
    return msg;
  }

  /**
   * 转化二进制流为base64图片数据
   * @param buffer 二进制流数据
   * @param type 文件类型
   * @returns
   * @author Phoebe.Lv
   */
  static arrayBufferToBase64(buffer, type) {
    // buffer是后台返回二进制流
    // btoa表示将字符串转化成编码字符串
    // Uint8Array 数组类型表示一个8位无符号整型数组
    // reduce方法为Uint8Array.prototype.reduce()，对累加器和数组的每个值应用函数（从左到右），使其归约为单一的值，默认值为''，实现累加
    // String.fromCharCode()，将 Unicode 编码转为一个字符:
    return (
      `data:image/${type};base64,` +
      btoa(
        new Uint8Array(buffer).reduce(
          (data, byte) => data + String.fromCharCode(byte),
          '',
        ),
      )
    );
  }

  /**
   * 转化Blob为base64数据
   * @param blob
   * @param callback
   */
  static blobToBase64(blob): Promise<string> {
    return new Promise((res, rej) => {
      let reader = new FileReader();
      reader.onload = function (evt) {
        let base64 = evt.target.result as string;
        res(base64);
      };
      reader.readAsDataURL(blob);
    });
  }
}
