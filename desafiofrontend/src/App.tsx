import React from 'react';
import './App.css';
import axios from "axios";
import { isAssertClause } from 'typescript';
import Tools from './components/Tools';
import Popup from './components/Popup'
import RemoveToolPopup from './components/Popup/ConfirmationPopup';
import AddToolPopup from './components/Popup/AddToolPopup';

const App = () => {
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const [tools, setTools] = React.useState<ToolType[]>([]);  
  const [onlySearchTags, setOnlySearchTags] = React.useState<boolean>(false);
  const [searchArray, setSearchArray] = React.useState<string[]>([]);
  const [popupAdd, setPopupAdd] = React.useState<boolean>(false);

  React.useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    const ENDPOINT = "http://localhost:3000/api/tools/";
    axios.get(ENDPOINT)
      .then((response: any) => {
        setIsLoading(false);
        setTools(response.data);
      })
      .catch(error => {
        setIsLoading(false);
        console.log("An error happened", error);
      });
  }

  return (
    <body>
      <div className="App">
        <div className="head">
          <div><h1>VUTTR</h1></div>
          <div><h2>Very Useful Tools to Remember</h2></div>
        </div>
        <div className="main-input">
          <div className="inputleft">
          <div className="input-icons input-field">
              <i className="fa fa-search icon"></i>
              <input type="text" className="input-field" id="searchinput" name="searchinput" placeholder="Search" onChange={(event) => {
                const newArray = [...event.target.value.split(" ").filter(Boolean)];
                setSearchArray(newArray);
                }}/>  
            </div>
            <div className="boxTagsOnlyInput">
                <input type="checkbox" id="tagsonlyinput" name="tagsonlyinput" onChange={(event) => {
                  if(onlySearchTags == false) {
                    setOnlySearchTags(true);
                  } else{
                    setOnlySearchTags(false);
                  }}}/>
                  <label htmlFor="tagsonlyinput">
                    search in tags only
                  </label>
            </div>
          </div>

          <div className="input-icons addbutton">
            <i className="fa fa-plus icon"></i>
            <button onClick={() => {
              setPopupAdd(true);
            }} className="input-field " id="addbutton" name="addbutton" >Add</button>
          </div>
          <AddToolPopup trigger={popupAdd} setTrigger={setPopupAdd} e={getData}/>
        </div>

        <Tools tools={tools} searchArray={searchArray} onlySearchTags={onlySearchTags} e={getData}></Tools>
      </div>
    </body>
    
  );
}

export default App;
