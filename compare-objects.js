#!/usr/bin/env node

import _ from 'lodash';

const sortKeys = (obj1, obj2) => {
    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);
    const sortedKeys = _.sortBy(_.union(keys1, keys2));
    return sortedKeys;
  };

  const compareObjects = (obj1, obj2) => {
    const keys = sortKeys(obj1, obj2);
    return keys.map((key) => {
        const hasKeyObj1 = _.has(obj1, key);
        const hasKeyObj2 = _.has(obj2, key);
        const item1 = obj1[key];
        const item2 = obj2[key];
        const obj1KeyIsObj = (_.isPlainObject(item1));
        const obj2KeyIsObj = (_.isPlainObject(item2));
        if (hasKeyObj1 && hasKeyObj2 && obj1KeyIsObj && obj2KeyIsObj) {
  return {
    type: 'parent',
    key,
    children: compareObjects(item1, item2),
  };
}
if (!hasKeyObj1 && hasKeyObj2) {
  return {
    type: 'added',
    key,
    children: item2,
  };
}
if (hasKeyObj1 && !hasKeyObj2) {
  return {
    type: 'deleted',
    key,
    children: item1,
  };
}
if (hasKeyObj1 && hasKeyObj2 && item1 === item2) {
  return {
    type: 'kept',
    key,
    children: item1,
  };
   }
return {
  type: 'diffValue',
  key,
  children: item1,
  children2: item2,
};
    });
  };
  
export default compareObjects;
