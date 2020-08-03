import axios from 'axios';
import qbittorrent from './Clients/qbittorrent';

export const clients = {
  qbittorrent: (data) => qbittorrent(data),
}

export const loginAttempt = async (clientStringsObject, data) => {
  return axios.get(`${data.server + clientStringsObject.loginAttempt}`,{
    params:{
      username:data.username,
      password:data.password
    },
    withCredentials:true
  })
}

export const login = async (clientStringsObject) => {
  const endpoint = clientStringsObject.login
  return axios.get(endpoint,{withCredentials:true})
}

export const logout = (clientStringsObject) => {
  const endpoint = clientStringsObject.logout
  return axios.get(endpoint)
}

export const getTorrents = async (clientStringsObject) => {
  const endpoint = clientStringsObject.torrents

  return axios.get(endpoint,{withCredentials:true})
}

export const resume = async (clientStringsObject,hash="") => {
  const endpoint = clientStringsObject({hash}).resume

  return axios.get(endpoint,{withCredentials: true})
}

export const pause = async (clientStringsObject,hash="") => {
  const endpoint = clientStringsObject({hash}).pause

  return axios.get(endpoint,{withCredentials: true})
}
