import axios from 'axios';

export const API_ENDPOINT = 'https://fe-screening.onrender.com';

export const client = axios.create({
    baseURL: API_ENDPOINT,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  client.interceptors.request.use(request => {
    const accessToken = window.localStorage.getItem("access_token")
    if (accessToken) {
      request.headers.Authorization = `${accessToken}`
    }
    return request
  })