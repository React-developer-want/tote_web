import { fetchUrl } from '../../utils/fetchUrl';
import { getLocalStorageKey } from '../../utils/localStorage';

export const createProject = async (details) => {
  const token = getLocalStorageKey('token');
  const url = process.env.REACT_APP_CREATE_PROJECT_API;

  const headers = new Headers();
  headers.append('Content-Type','application/json');
  headers.append('token',token);

  const requestOptions = {method: 'POST', headers, body: JSON.stringify(details), redirect: 'follow'};
  return await fetchUrl(url, requestOptions);
};

export const getProjectDetails = async (id) => {
  const token = getLocalStorageKey('token');
  const url = process.env.REACT_APP_GET_PROJECT_API;

  const headers = new Headers();
  headers.append('Content-Type','application/json');
  headers.append('token',token);

  const query = `?id=${id}`;

  const requestOptions = {method: 'GET', headers, redirect: 'follow'};
  return await fetchUrl(url+query, requestOptions);
};

export const getListProjects = async () => {
  const token = getLocalStorageKey('token');
  const url = process.env.REACT_APP_LIST_PROJECTS_API;

  const headers = new Headers();
  headers.append('Content-Type','application/json');
  headers.append('token',token);

  const requestOptions = {method: 'GET', headers, redirect: 'follow'};
  return await fetchUrl(url, requestOptions);
};

export const updateProject = async (id, details) => {
  const token = getLocalStorageKey('token');
  const url = process.env.REACT_APP_UPDATE_PROJECT_API;

  const headers = new Headers();
  headers.append('Content-Type','application/json');
  headers.append('token',token);

  const query = `?id=${id}`;

  const requestOptions = {method: 'POST', headers, body: JSON.stringify(details), redirect: 'follow'};
  return await fetchUrl(url+query, requestOptions);
};