import { getStorage } from '../Storage';

const qbittorrent = (data) => {
  const userObject =  getStorage("user");
  const { server } = userObject ;
  const { username } = userObject ;
  const { password } = userObject;

  const hash = data ? data.hash : null;

  const baseURL = `${server}api/v2/`;

  return {
    loginAttempt: "api/v2/auth/login",
    login : `${baseURL}auth/login?username=${username}&password=${password}`,
    logout : `${baseURL}auth/logout`,
    torrents : `${baseURL}torrents/info`,
    resume: `${baseURL}torrents/resume?hashes=${hash}`,
    pause: `${baseURL}torrents/pause?hashes=${hash}`,
  }
}

export default qbittorrent;
