import JSEncrypt from 'jsencrypt';

// 加密RSA
export const encryptByRSA = (publicKey: string, password: string) => {
  const pk = window.atob(publicKey);
  const encrypt = new JSEncrypt();
  encrypt.setPublicKey(pk);
  let enPwd = encrypt.encrypt(password).toString();
  let base64 = window.btoa(window.atob(enPwd).padStart(128, '\0'));
  base64 = base64.replaceAll('+', '%2B');
  console.log(base64);
  return base64;
};
