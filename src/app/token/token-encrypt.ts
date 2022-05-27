import { encryptByAES, encryptByBase64url } from '@/tools/crypto';

/**
 * 与后端框架配对好的token加密处理
 */
export class TokenEncrypt {
  /** 默认token */
  private static defaultKey = 'qwertyuiopasdfghjklzxcvbnm1234567890';

  /** 密钥数组 */
  private static secrets = [
    '86CEBB8524F843F4BC4A4F12E15473BB',
    '65FA9A06D6E94E6C9D02F61CECBCE7B7',
    'E65FA94E6C9CBCE761CECBC4A4F12EB7',
  ];

  /** 加密iv */
  private static iv = 'AreyoumySnowman?';

  /** 根据keys对对象的属性进行加密 */
  static encryptObject<T>(data: T, keys: string[] = [], token = ''): T {
    let result = { ...data };
    token = token || TokenEncrypt.getDefaultToken<T>(result, keys);
    keys.forEach((key) => {
      if (result.hasOwnProperty(key)) {
        result[key] = TokenEncrypt.encryptString(result[key], token);
      }
    });
    return result;
  }

  /** 对字符串数据进行加密 应用相关的 */
  static encryptString(data: string, token: string) {
    let key = TokenEncrypt.getSecret(token);
    return encryptByAES(data, key, TokenEncrypt.iv);
  }

  /** 根据token计算出当前加密密钥 */
  private static getSecret(token: string) {
    let sum = 0;
    `${token.slice(0, 2)}${token.slice(token.length - 2, token.length)}`
      .split('')
      .map((t) => t.charCodeAt(0))
      .forEach((n) => (sum += n));
    return TokenEncrypt.secrets[sum % TokenEncrypt.secrets.length];
  }

  /** 无token时，根据要传输得对象和要加密的值得key进行计算生成初始token */
  private static getDefaultToken<T>(data: T, keys: string[] = []) {
    let json = { ...data };
    keys.forEach((key) => {
      if (json.hasOwnProperty(key)) {
        json[key] = TokenEncrypt.defaultKey;
      }
    });
    return encryptByBase64url(JSON.stringify(json));
  }
}
