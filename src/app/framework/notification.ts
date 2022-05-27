import { notification } from 'antd';
import { ArgsProps } from 'antd/lib/notification';

const INFO_DURATION = 3;
const WARN_DURATION = 6;
const ERROR_DURATION = null;

/** 通知重写，error时不允许自动关闭 */
let error = notification.error;
let warn = notification.warn;
let warning = notification.warning;
let info = notification.info;

const wrapper = <T extends (args: ArgsProps) => any>(
  duration: number,
  action: T,
): ((args: ArgsProps) => void) => {
  return (args) => {
    if (!args.hasOwnProperty('duration')) {
      args.duration = duration;
    }
    action(args);
  };
};

notification.error = wrapper(ERROR_DURATION, error);
notification.info = wrapper(INFO_DURATION, info);
notification.warn = wrapper(WARN_DURATION, warn);
notification.warning = wrapper(WARN_DURATION, warning);
