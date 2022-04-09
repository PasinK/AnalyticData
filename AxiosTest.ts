import Axios from 'axios';

export const client = Axios.create({
  baseURL: 'https://aegis-alpine-dev-raj4cyxmfq-de.a.run.app'
});
client.interceptors.request.use(
  async (req) => {
    if (!req.headers?.Authorization) {
      const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsInJvbGUiOiJFbGRlcmx5IiwiaWF0IjoxNjQ5MzU0NDg0LCJleHAiOjE2NTE5NDY0ODR9.sFARW0zSZAy3whgD_VJwQWs7EcB5HLoXKphlu5vCM5U' ; // replace the value with JWT from ping
      if (req.headers) req.headers.Authorization = `Bearer ${token}`;
      return req;
    } else return req;
  },
  (error) => Promise.reject(error)
);
