import { ajax } from 'rxjs/ajax';
import { catchError, pluck } from 'rxjs/operators';
import { throwError } from 'rxjs';
import * as R from 'ramda';

import { API_ROOT } from 'src/constants/endpoint';

/***
將 url 自動替換成參數，例如
url = '/fake/{a}/b/{c}', body = { a: 'testA', c: 'testC' }
會回傳 '/fake/testA/b/testC'
***/
const replaceUrl = (url, body) => {
  const regex = /(\{.+?\})/gi;
  return url.replace(regex, v => (v[0] === '{' ? body[v.slice(1, -1)] : v));
};

const getQueryString = (body, queryPicker) => {
  if (!body) {
    return '';
  }
  let url = new URLSearchParams();
  Object.entries(body).forEach(([key, value]) => {
    if (!R.isNil(value) && R.includes(key, queryPicker)) {
      url.set(key, value);
    }
  });
  return `?${url.toString()}`;
};

let _headers = {
  'Content-Type': 'application/json;charset=UTF-8',
};

export const setHeader = headers => {
  _headers = Object.assign(
    {
      'Content-Type': 'application/json;charset=UTF-8',
    },
    headers,
  );
};

export const request = (path, method = 'GET', queryPicker = []) => body => {
  const _path =
    method === 'GET' && !R.isEmpty(queryPicker)
      ? path + getQueryString(body, queryPicker)
      : path;

  return ajax({
    url: API_ROOT + replaceUrl(_path, body),
    method,
    headers: _headers,
    crossDomain: true,
    body,
  }).pipe(
    catchError(error => {
      return throwError(error);
    }),
    pluck('response'),
  );
};
