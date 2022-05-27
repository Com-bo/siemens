import base64url from 'base64url';
import * as CryptoJS from 'crypto-js';

// base64加密
export const encryptByBase64url = (message: string) => base64url(message);

// base64解密
export const decryptByBase64url = (message: string) =>
  base64url.decode(message);

// base64加密
export const encryptByBase64 = (message: string) => {
  let wordArray = CryptoJS.enc.Utf8.parse(message);
  let base64 = CryptoJS.enc.Base64.stringify(wordArray);
  return base64;
};

// base64解密
export const decryptByBase64 = (message: string) => {
  let parsedWordArray = CryptoJS.enc.Base64.parse(message);
  let parsedStr = parsedWordArray.toString(CryptoJS.enc.Utf8);
  return parsedStr;
};

// AES 加密
export const encryptByAES = (message: string, key: string, iv: string) => {
  const keyHex = CryptoJS.enc.Utf8.parse(key);
  const ivHex = CryptoJS.enc.Utf8.parse(iv);
  const utf8Message = CryptoJS.enc.Utf8.parse(message);
  let encrypted = CryptoJS.AES.encrypt(utf8Message, keyHex, {
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
    iv: ivHex,
  });
  return encrypted.toString();
};

// AES 解密
export const decryptByAES = (ciphertext: string, key: string, iv: string) => {
  const keyHex = CryptoJS.enc.Utf8.parse(key);
  const ivHex = CryptoJS.enc.Utf8.parse(iv);

  let decrypted = CryptoJS.AES.decrypt(ciphertext, keyHex, {
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
    iv: ivHex,
  });
  return decrypted.toString(CryptoJS.enc.Utf8);
};

// DES 加密
export const encryptByDES = (message: string, key: string) => {
  const keyHex = CryptoJS.enc.Utf8.parse(key);
  const ivHex = CryptoJS.enc.Utf8.parse(key);
  let encrypted = CryptoJS.DES.encrypt(message, keyHex, {
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
    iv: ivHex,
  });
  return encrypted.ciphertext.toString().toUpperCase();
};

// DES 解密
export const decryptByDES = (ciphertext: string, key: string) => {
  const keyHex = CryptoJS.enc.Utf8.parse(key);
  const ivHex = CryptoJS.enc.Utf8.parse(key);
  let decrypted = CryptoJS.DES.decrypt(
    {
      ciphertext: CryptoJS.enc.Hex.parse(ciphertext),
    } as CryptoJS.lib.CipherParams,
    keyHex,
    {
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
      iv: ivHex,
    },
  );
  return decrypted.toString(CryptoJS.enc.Utf8);
};
