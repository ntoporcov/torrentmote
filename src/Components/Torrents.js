import React, {useEffect,useState,useContext} from 'react';
import { Page, Select, Button } from 'react-onsenui'; // Only import the necessary components
import useInterval  from '../utils/useInterval'
import { clients, getTorrents, login, loginAttempt } from '../utils/TorrClient';
import TorrentBox from './TorrentBox';
import { User } from "../App"
import qbittorrent from '../utils/Clients/qbittorrent';
import { getStorage, saveStorage } from '../utils/Storage';

const Torrents = (props) =>{
  const { loggedProp } = props

  const [APIresponse,setAPIResponse] = useState([])

  const StoredUser = useContext(User)
  const [userSettings,setUserSettings] = useState(StoredUser)
  const [loggedin,setLoggedIn] = useState(StoredUser.loggedin)

  useEffect(()=>{
    if(loggedin){

      login(qbittorrent()).then(auth => {
        console.log('logging in')

        if(auth.status===200) {
          getTorrents(qbittorrent()).then(resp => {
            setAPIResponse(resp.data)
          });
        }
      })
    }

  },[loggedin])

  useInterval(() => {
    if(loggedin){
      getTorrents(qbittorrent()).then(resp => {
        setAPIResponse(resp.data)
      });
    }
  },1000)

  const [feedback, setFeedback] = useState(null)
  const [server,setServer] = useState(undefined)
  const [username,setUsername] = useState(undefined)
  const [password,setPassword] = useState(undefined)

  const handleSignin = () => {
    let serverAddress = server;
    if(server.substring(server.length-1) !== "/"){
      serverAddress = `${server}/`
    }


    loginAttempt(qbittorrent({ ipAttempt:serverAddress }),{
      server:serverAddress,username,password
    }).then(response => {

      if(response.data==="Ok."){

        const userObject = {
          server:serverAddress,
          username,
          password,
          client:"qbittorrent",
          loggedin:true,
        };

        saveStorage("user", userObject).then(() => {
          setUserSettings(userObject);
          setLoggedIn(true);
        })

      }else{
       setFeedback("Login Unauthorized.")
      }

    }).catch(() => {
      setFeedback("Too many login attempts. This IP is temporarily blocked. You can restart qBitTorrent to reset this.")
    })
  }

  return (
    <Page style={{backgroundColor:"#fff"}} {...props}>
        {loggedin?
          APIresponse.map((item) => <TorrentBox item={item} key={item.hash}/>)
          :
          <div>
            <div className="torrentBox login">
              <h3 style={{textAlign:"center"}}>Adding CORS Header (Required)</h3>
              <p>
                For this app to work, you&apos;ll need to add the
                following entries in Settings &gt; WebUI &gt; Add custom HTTP headers. Available in qBitTorrent 4.2.5 and up.
                <br/><br/>
                <span className="headerToAdd">
                  Access-Control-Allow-Origin: {window.location.toString()} <br/>
                  Access-Control-Allow-Credentials: true
                </span>
              </p>
              <h2 className="centered">Login to qBitTorrent WebUI</h2>
              <div className="inputGroup">
                <label htmlFor="username-input">
                  <span>Server IP</span>
                  <input
                    id="server-input"
                    type="text"
                    defaultValue="http://"
                    onChange={(event) => setServer(event.target.value)}
                    placeholder="http://192.168.XXX.XXX:8080"/>
                </label>
                <label htmlFor="username-input">
                  <span>Username</span>
                  <input
                    id="username-input"
                    type="text"
                    onChange={(event) => setUsername(event.target.value)}
                    placeholder="Username"/>
                </label>
                <label htmlFor="password-input">
                  <span>Password</span>
                  <input
                    id="password-input"
                    type="text"
                    onChange={(event) => setPassword(event.target.value)}
                    placeholder="Password"/>
                </label>
              </div>
              <p className="feedback">{feedback}</p>
              <Button modifier="large--quiet" onClick={()=>handleSignin()}>
                Sign In
              </Button>
            </div>
          </div>
        }
    </Page>
  )
}

export default Torrents
