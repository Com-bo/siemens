export const isObjectNotEmpty = (obj) => {
  return obj && JSON.stringify(obj) !== '{}';
};

/**
 * 浅比较
 * @param left
 * @param right
 * @param message
 * @returns
 */
export const isShallowEqual = <L extends {}, R extends {}>(
  left: L,
  right: R,
) => {
  const leftProps = Object.getOwnPropertyNames(left);
  const rightProps = Object.getOwnPropertyNames(right);

  if (leftProps.length != rightProps.length) {
    return false;
  }

  for (let i = 0; i < leftProps.length; i++) {
    const key = leftProps[i];
    const leftValue = left[key];
    const rightValue = right[key];
    if (leftValue !== rightValue) {
      return false;
    }
  }
  return true;
};
