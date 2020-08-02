import { Page } from 'react-onsenui';
import React, {useEffect} from 'react';
import {ProgressBar} from 'react-onsenui'; // Only import the necessary components
import useInterval  from '../utils/useInterval'
import TorrClient from '../utils/TorrClient';


const TorrentBox = (props) => {
  return (
    <div className="torrentBox">
      <h3>Harry Potter</h3>
      <ProgressBar
        value={58}
      />
    </div>
  )
}

const Torrents = (props) =>{
  const {title} = props;

  useEffect(()=>{

    // TorrClient.get('auth/login',{
    //   params:{
    //     username:"ntoporcov",
    //     password:"137984265"
    //   }
    // }).then(response =>{
    //   console.log(response);
    //
    //   TorrClient.get('torrents/info')
    //     .then(info => {
    //       console.log(info);
    //     }).catch(error => {
    //     console.log(error)
    //   })
    // },[])

    TorrClient.get('torrents/info')
      .then(info => {
        console.log(info);
      }).catch(error => {
      console.log(error)
    })

  })

  return (
    <Page style={{backgroundColor:"#fff"}} {...props}>
      {TorrentBox()}
      {TorrentBox()}
      {TorrentBox()}
      {TorrentBox()}
      {TorrentBox()}
      {TorrentBox()}
      {TorrentBox()}
      {TorrentBox()}
      {TorrentBox()}
    </Page>
  )
}

export default Torrents
