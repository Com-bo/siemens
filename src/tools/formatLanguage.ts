import { useIntl } from 'umi';
import getServiceContext from './getServiceContext';
export const FormatLanguageService = getServiceContext(useFormatLanguageService);

export type IFormatLanguageService = ReturnType<
  typeof useFormatLanguageService
>;

export default function useFormatLanguageService() {
  const intl = useIntl();

  const formatMessage = (key, attr = undefined) => {
    return intl.formatMessage({ id: key }, attr);
  };

  return { formatMessage };
}
