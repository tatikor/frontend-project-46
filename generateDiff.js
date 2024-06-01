const getIndent = (depth, indent = ' ', qtyIndents = 4) => indent.repeat(qtyIndents * depth - 2);

const getString = (value, depth) => {
  if (!(value !== null && typeof value === 'object' && !Array.isArray(value))) {
    return value;
  }
  const keys = Object.keys(value);
  const result = keys.map((key) => {
    return `${key}`;
  });
  return `\n{${result.join('\n')}\n  ${getIndent(depth)}}`;
};

const generateDiffTree = (array) => {
  const iter = (node, depth = 1) => {
    const result = node.map((element) => {
      const strChildren = getString(element.children, depth);
      const indent = getIndent(depth);
      if (element.type === 'parent') {
        return `${indent}  ${element.key}: {\n${iter(element.children, depth + 1)}\n${indent}  }`;
      }
      if (element.type === 'kept') {
        return `${indent}  ${element.key}: ${strChildren}`;
      }
      if (element.type === 'deleted') {
        return `${indent}- ${element.key}: ${strChildren}`;
      }
      if (element.type === 'added') {
        return `${indent}+ ${element.key}: ${strChildren}`;
      }
      const strChildren2 = getString(element.children2, depth);
      return `${indent}- ${element.key}: ${strChildren}\n${indent}+ ${element.key}: ${strChildren2}`;
    });

    return result.join('\n');
  };
  return `{\n${iter(array)}\n}`;
};
export default generateDiffTree;