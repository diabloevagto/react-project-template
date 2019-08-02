import { request } from 'src/utils/wrapRequest';

export const getUser = request('/users/{user}', 'GET', []);
