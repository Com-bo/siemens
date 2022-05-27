import { Theme } from '@/app/config/theme/common';
import { CSSProp } from 'styled-components';
declare module 'react' {
  interface Attributes {
    css?: CSSProp;
  }
}

declare module 'styled-components' {
  export interface DefaultTheme extends Theme {}
}
