import axios  from 'axios';

const TorrClient = axios.create({
  baseURL: `${localStorage.getItem('server')}/api/v2/`,
  headers: {'X-Custom-Header': 'foobar'},
});

export default TorrClient;
