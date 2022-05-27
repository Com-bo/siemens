import * as React from 'react';
import styled from 'styled-components';

const Item = styled.div<{
  read: boolean;
}>`
  opacity: ${(props) => (props.read ? 0.5 : 1)};
  cursor: pointer;
`;

/**
 * 重写metas属性，挂载已读样式<br/>
 *
 * @author: Phoebe.Lv
 */
export const ListItem = ({
  dom,
  row,
  index,
  action,
  schema,
  render,
  props,
  onItemClick,
  read,
  setRead,
}) => {
  const content = render ? render(dom, row, index, action, schema) : dom;
  const isRead = read.includes(row.id);
  return (
    <Item
      read={isRead}
      onClick={() => {
        !isRead && setRead([...read, row.id]);
        onItemClick(row, props.onItemClick);
      }}
    >
      {content}
    </Item>
  );
};
export default ListItem;
