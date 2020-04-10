import { createAction } from 'redux-actions';

let count = 0;

const createRequestTypes = (baseType) => ({
  REQUEST: `${baseType}_REQUEST`,
  SUCCESS: `${baseType}_SUCCESS`,
  FAILURE: `${baseType}_FAILURE`,
});

const addUniqueCount = (data) => {
  return Object.entries(data).reduce((accumulator, [key, value]) => {
    if (typeof value === 'object') {
      accumulator[key] = addUniqueCount(value, accumulator);
      return accumulator;
    }
    accumulator[key] = `${value}#${count++}`;
    return accumulator;
  }, {});
};

// 依據 types 相同結構將 string 換成 createAction(string)
const createRequestActions = (data) => {
  return Object.entries(data).reduce((accumulator, [key, value]) => {
    if (typeof value === 'object') {
      accumulator[key] = createRequestActions(value, accumulator);
      return accumulator;
    }
    accumulator[key] = createAction(value);
    return accumulator;
  }, {});
};

export { createRequestTypes, addUniqueCount, createRequestActions };
