import { decryptByBase64url } from '@/tools/crypto';
export default class JWT<Header, Playload> {
  token: string;
  header: Header;
  playload: Playload;

  constructor(token: string) {
    this.token = token;
    const [headerStr, playloadStr, signatureStr] = token?.split('.');
    this.header = this.parseHeader(headerStr);
    this.playload = this.parsePlayload(playloadStr);
  }

  toString() {
    return this.token;
  }

  parseHeader(header): Header {
    return JSON.parse(decryptByBase64url(header));
  }

  parsePlayload(playload): Playload {
    return JSON.parse(decryptByBase64url(playload));
  }
}
