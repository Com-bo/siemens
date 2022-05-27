export const parseExcel = (b64Data, filename) => {
  var sliceSize = 512;
  var byteCharacters = window.atob(b64Data); // 解码base64
  var byteArrays = [];
  for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    var slice = byteCharacters.slice(offset, offset + sliceSize);
    var byteNumbers = new Array(slice.length);
    for (var i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }
    var byteArray = new Uint8Array(byteNumbers);
    byteArrays.push(byteArray);
  }
  let file = new File(byteArrays, filename, {
    type: 'application/vnd.ms-excel;charset=utf-8',
  });
  let blob = new Blob([file]);
  let a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = `${filename}.xlsx`;
  a.dispatchEvent(
    new MouseEvent('click', { bubbles: true, cancelable: true, view: window }),
  );
};
