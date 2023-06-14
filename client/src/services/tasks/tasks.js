import { getLocalStorageKey } from '../../utils/localStorage';
import { fetchUrl } from '../../utils/fetchUrl';

export const getAllTasks = async () => {
  const token = getLocalStorageKey('token');
  const url = process.env.REACT_APP_BASE_URI + '/api/v1/tasks/all-tasks';

  const headers = new Headers();
  headers.append('Content-Type','application/json');
  headers.append('token',token);

  const requestOptions = {method: 'GET', headers, redirect: 'follow'};
  return await fetchUrl(url, requestOptions);
};

export const createTask = async (details) => {
  const token = getLocalStorageKey('token');
  const url = process.env.REACT_APP_BASE_URI + '/api/v1/tasks/create-task';

  const headers = new Headers();
  headers.append('Content-Type','application/json');
  headers.append('token',token);

  const requestOptions = {method: 'POST', headers, body: JSON.stringify(details), redirect: 'follow'};
  return await fetchUrl(url, requestOptions);
};

export const updateTask = async (id, details) => {
  const token = getLocalStorageKey('token');
  const url = process.env.REACT_APP_BASE_URI + '/api/v1/tasks/update-task';

  const headers = new Headers();
  headers.append('Content-Type','application/json');
  headers.append('token',token);
  const param = `/${id}`;

  const requestOptions = {method: 'POST', headers, body: JSON.stringify(details), redirect: 'follow'};
  return await fetchUrl(url+param, requestOptions);
};