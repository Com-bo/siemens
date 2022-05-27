export const isStringNotEmpty = (str: string) => str?.length > 0;

export const isStringNotEmptyOrWhiteSpace = (str: string) =>
  str?.trim?.()?.length > 0;

export const isSpecialCharacters = (str: string) => {
  let reg = /[~#^$@%&!?%*]/gi;
  return reg.test(str.trim());
};
export const isEmojiCharacter = (str: string) => {
  for (var i = 0; i < str.length; i++) {
    var hs = str.charCodeAt(i);
    if (0xd800 <= hs && hs <= 0xdbff) {
      if (str.length > 1) {
        var ls = str.charCodeAt(i + 1);
        var uc = (hs - 0xd800) * 0x400 + (ls - 0xdc00) + 0x10000;
        if (0x1d000 <= uc && uc <= 0x1f77f) {
          return true;
        }
      }
    } else if (str.length > 1) {
      var ls = str.charCodeAt(i + 1);
      if (ls == 0x20e3) {
        return true;
      }
    } else {
      if (0x2100 <= hs && hs <= 0x27ff) {
        return true;
      } else if (0x2b05 <= hs && hs <= 0x2b07) {
        return true;
      } else if (0x2934 <= hs && hs <= 0x2935) {
        return true;
      } else if (0x3297 <= hs && hs <= 0x3299) {
        return true;
      } else if (
        hs == 0xa9 ||
        hs == 0xae ||
        hs == 0x303d ||
        hs == 0x3030 ||
        hs == 0x2b55 ||
        hs == 0x2b1c ||
        hs == 0x2b1b ||
        hs == 0x2b50
      ) {
        return true;
      }
    }
  }
};

export const isNumber = (value: string) => {
  if (value == '') {
    return true;
  } else {
    if (value.match(/^-?[1-9]\d*$/) !== null) {
      return true;
    } else {
      return false;
    }
  }
};
