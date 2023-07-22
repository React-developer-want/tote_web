import { getLocalStorageKey } from '../../utils/localStorage';
import { fetchUrl } from '../../utils/fetchUrl';

export const createTask = async (boardId, columnId, task) => {
  const token = getLocalStorageKey('token');
  const url = process.env.REACT_APP_BASE_URI + '/api/v1/tasks/create-task';

  const headers = new Headers();
  headers.append('Content-Type','application/json');
  headers.append('token',token);
  const params = `/${boardId}/columns/${columnId}/tasks`;

  const requestOptions = {method: 'POST', headers, body: JSON.stringify(task), redirect: 'follow'};
  return await fetchUrl(url + params, requestOptions);
};

export const updateTask = async (boardId, taskId, columnId, task) => {
  const token = getLocalStorageKey('token');
  const url = process.env.REACT_APP_BASE_URI + '/api/v1/tasks/update-task';

  const headers = new Headers();
  headers.append('Content-Type','application/json');
  headers.append('token',token);
  const params = `/${boardId}/columns/${columnId}/tasks/${taskId}`;

  const requestOptions = {method: 'POST', headers, body: JSON.stringify(task), redirect: 'follow'};
  return await fetchUrl(url + params, requestOptions);
};

export const dragTaskToNewCol = async (boardId, taskId, { prevColId, colId }) => {
  const token = getLocalStorageKey('token');
  const url = process.env.REACT_APP_BASE_URI + '/api/v1/tasks/update-task';

  const headers = new Headers();
  headers.append('Content-Type','application/json');
  headers.append('token',token);
  const params = `/${boardId}/tasks/${taskId}`;
  const details = { prevColId, colId };

  const requestOptions = {method: 'POST', headers, body: JSON.stringify(details), redirect: 'follow'};
  return await fetchUrl(url + params, requestOptions);
};

export const deleteTask = async (boardId, taskId) => {
  const token = getLocalStorageKey('token');
  const url = process.env.REACT_APP_BASE_URI + '/api/v1/tasks/delete-task';

  const headers = new Headers();
  headers.append('Content-Type','application/json');
  headers.append('token',token);
  const params = `/${boardId}/tasks/${taskId}`;

  const requestOptions = {method: 'delete', headers, redirect: 'follow'};
  return await fetchUrl(url + params, requestOptions);
};