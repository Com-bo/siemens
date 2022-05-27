import { setLocale } from '@/.umi/plugin-locale/localeExports';
import { useMount } from 'ahooks';
import { IProps } from '.';
export default function useLanguageService(props: IProps) {
  const { systemLanguages } = props;
  const browserLanguage = (navigator.language || navigator.browserLanguage)
    ?.toLowerCase()
    .split('-')[0];

  /**
   * 优先使用浏览器语言
   */
  useMount(() => {
    const systemBrowserLanguage = systemLanguages.find(
      (item) => item.lang?.toLowerCase().indexOf(browserLanguage) >= 0,
    );
    if (systemLanguages && systemBrowserLanguage) {
      setLocale(systemBrowserLanguage.lang, false);
    }
  });

  return {};
}
