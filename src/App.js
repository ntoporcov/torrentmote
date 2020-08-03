import React,{useState, createContext} from 'react';
import { Page, Toolbar, ToolbarButton, Tabbar, Tab, Icon} from 'react-onsenui'; // Only import the necessary components
import Torrents from './Components/Torrents';
import Search from './Components/Search';

import 'onsenui/css/onsenui.css';
import 'onsenui/css/onsen-css-components.css';
import './App.scss';
import Settings from './Components/Settings';
import { getStorage, saveStorage } from './utils/Storage';

const StoredUser = getStorage("user")
let templateObject = StoredUser;

if(StoredUser === null){
  templateObject = {
    loggedin:false,
  }
  saveStorage("user",templateObject)
}

export const User = createContext(templateObject);

const App = () => {
  const [activeTab,setActiveTab] = useState(0)

  const installed = window.matchMedia('(display-mode: standalone)').matches;

  const pageTitles = [
    "Your Torrents",
    "Search",
    "Settings"
  ]

  return (
    <div>
      <Toolbar>
        <div className="left">
          <h1>
            {pageTitles[activeTab]}
          </h1>
        </div>
        <div className="right">
          {activeTab && StoredUser.loggedin === true?
            <ToolbarButton>
              <Icon size={30} icon="md-plus" />
            </ToolbarButton>
          :null
        }
        </div>
      </Toolbar>
      <Tabbar
        className={installed?"tabWrapper installed":"tabWrapper"}
        position='bottom'
        onPreChange={({index}) => setActiveTab(index) }
        index={activeTab}
        renderTabs={(activeIndex, tabbar) => [
          {
            content: <Torrents title={pageTitles[0]} active={activeIndex === 0} tabbar={tabbar} loggedin={templateObject.loggedin} />,
            tab: <Tab label="Torrents" icon="md-download" />
          },
          {
            content: <Search title={pageTitles[1]} active={activeIndex === 1} tabbar={tabbar} />,
            tab: <Tab label="Search" icon="md-search" />
          },
          {
            content: <Settings title={pageTitles[2]} active={activeIndex === 1} tabbar={tabbar} />,
            tab: <Tab label="Settings" icon="md-settings" />
          },
        ]
        }
      />
    </div>
  );
}

export default App;
