import { message } from 'antd';
import { MessageType } from 'antd/lib/message';

const INFO_DURATION = 3;
const WARN_DURATION = 30;
const ERROR_DURATION = 30;

/** message重写，根据不同提示类似设置关闭时间 */
let error = message.error;
let warn = message.warn;
let warning = message.warning;
let info = message.info;

function isArgsProps(content) {
  return (
    Object.prototype.toString.call(content) === '[object Object]' &&
    !!content.content
  );
}
const wrapper =
  (d: number, action: (...args: any[]) => MessageType) =>
  (content, duration, onClose): MessageType => {
    if (isArgsProps(content)) {
      if (!content.hasOwnProperty('duration')) {
        content.duration = d;
      }
    } else {
      if (duration === undefined) {
        duration = d;
      }
    }
    return action(content, duration, onClose);
  };

message.error = wrapper(ERROR_DURATION, error);
message.info = wrapper(INFO_DURATION, info);
message.warn = wrapper(WARN_DURATION, warn);
message.warning = wrapper(WARN_DURATION, warning);
