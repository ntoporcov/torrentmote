import React,{useState,useContext} from 'react';
import { Icon, ProgressBar } from 'react-onsenui';
import stateDictionary from './stateDictionary';
import { clients, getTorrents, pause, resume } from '../utils/TorrClient';
import { User } from '../App';

const TorrentBox = ( props ) => {

  const StoredUser = useContext(User)

  const { item } = props;
  const { name } = item
  const { hash } = item
  const { progress } = item
  const { eta } = item
  const { state } = item

  const date = new Date(0);
  date.setSeconds(eta); // specify value for SECONDS here
  const timeString = date.toISOString().substr(11, 8);


  const isDone = () => {
    return !!state.includes("UP");
  }

  const isPaused = () => {
    switch (state) {
      case "pausedDL" : return true;
      case "pausedUP" : return true;
      default: return false;
    }
  }

  const isDL = () => {
    switch (state) {
      case "downloading" : return true;
      case "metaDL" : return true;
      case "queuedDL" : return true;
      case "stalledDL" : return true;
      case "checkingDL" : return true;
      case "forceDL" : return true;
      case "checkingResumeData" : return true;
      case "allocating" : return true;
      default: return false;
    }
  }

  return (
    <div className="torrentBox">
      <h2>{name}</h2>
      <div className="stats">
        <span>{(progress*100).toFixed(0)}%</span>
        {eta !== 8640000 ? <span>{timeString}</span> : <span>{stateDictionary[state].short}</span>}
      </div>
      <ProgressBar
        style={{paddingBottom:10}}
        value={progress*100}
        secondaryValue={100}
      />
      <div className="buttonsRow">
        <button
          className={isDL()? "active" : null}
          type="button"
          disabled={isDone()}
          onClick={() => resume(clients[StoredUser.client],hash)}
        >
          <Icon size={30} icon="md-play" />
        </button>
        <button
          className={isPaused()? "active" : null}
          type="button"
          disabled={isDone()}
          onClick={() => pause(clients[StoredUser.client],hash)}
        >
          <Icon size={30} icon="md-pause" />
        </button>
        <button type="button">
          <Icon size={30} icon="md-delete" />
        </button>
      </div>
    </div>
  )
}

export default TorrentBox;
