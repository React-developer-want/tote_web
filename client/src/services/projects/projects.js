import { fetchUrl } from '../../utils/fetchUrl';
import { getLocalStorageKey } from '../../utils/localStorage';

export const createProject = async (details) => {
  const token = getLocalStorageKey('token');
  const url = process.env.REACT_APP_BASE_URI + '/api/v1/projects/create-project';

  const headers = new Headers();
  headers.append('Content-Type','application/json');
  headers.append('token',token);

  const requestOptions = {method: 'POST', headers, body: JSON.stringify(details), redirect: 'follow'};
  return await fetchUrl(url, requestOptions);
};

export const getProjectDetails = async (id) => {
  const token = getLocalStorageKey('token');
  const url = process.env.REACT_APP_BASE_URI + '/api/v1/projects/project';

  const headers = new Headers();
  headers.append('Content-Type','application/json');
  headers.append('token',token);

  const query = `?id=${id}`;

  const requestOptions = {method: 'GET', headers, redirect: 'follow'};
  return await fetchUrl(url+query, requestOptions);
};

export const getListProjects = async () => {
  const token = getLocalStorageKey('token');
  const url = process.env.REACT_APP_BASE_URI + '/api/v1/projects/list-projects';

  const headers = new Headers();
  headers.append('Content-Type','application/json');
  headers.append('token',token);

  const requestOptions = {method: 'GET', headers, redirect: 'follow'};
  return await fetchUrl(url, requestOptions);
};

export const updateProject = async (id, details) => {
  const token = getLocalStorageKey('token');
  const url = process.env.REACT_APP_BASE_URI + '/api/v1/projects/update-project';

  const headers = new Headers();
  headers.append('Content-Type','application/json');
  headers.append('token',token);

  const query = `?id=${id}`;

  const requestOptions = {method: 'POST', headers, body: JSON.stringify(details), redirect: 'follow'};
  return await fetchUrl(url+query, requestOptions);
};