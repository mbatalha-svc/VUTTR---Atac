
import React from 'react';
import axios from "axios";
import { collapseTextChangeRangesAcrossMultipleVersions, isAssertClause } from 'typescript';
import RemoveToolPopup from '../Popup/ConfirmationPopup';
import ConfirmationPopup from '../Popup/ConfirmationPopup';

interface IToolProps {
  toolData: ToolType;
  e: any;   // Used for reloading after exclusion
}

const checkDelete = (async (id:any, e:any, confirmDelete:boolean)=>{
  if(confirmDelete) {
    axios
    .delete(`http://localhost:3000/api/tools/${id}`)
    .then(response => {
      console.log(response);
    });
    await e();
  }})

const Tool = (props: IToolProps) => {
  const [confirmDelete, setConfirmDelete] = React.useState<boolean>(false);
  const [popupConfirmation, setPopupConfirmation] = React.useState<boolean>(false);

  const {id, title, link, description, tags} = props.toolData; 

  return (
    <div className="Tool">
      <div className="tool-top">
        <div className="tool-title">
        <a href = {link} target="_blank"> <h2>{title}{id}</h2> </a>
          
        </div>

        <div className="main-input remove-btn">
          <div className="input-icons"id="remove-btn">
            <i className = "fa fa-remove icon"> </i>
              <button onClick={() => {
                setPopupConfirmation(true);
              }} className="input-field" id="removebutton" name="removebutton">remove</button>
              <ConfirmationPopup 
                title="Remove tool" 
                text='Are you sure you want to remove?' 
                confirmText="Yes, remove"
                trigger = {popupConfirmation}
                setTrigger = { setPopupConfirmation}
                setConfirmation = { setConfirmDelete }    
              />
              { (() => {
                  if(confirmDelete){
                    checkDelete(id, props.e, confirmDelete);
                  }
                })()
              }
                
          </div>
        </div>
      </div>
      <div className="tool-desc">   
        <p> {description} </p>
      </div>
      {
        tags?.length > 0 
        &&
        <div className='tags'>
          {tags.map((tag) => (
            <div className="tag" key={tag.id}> #{tag.name}</div>
            ))}
        </div>
      }
    </div>
  );
}

export default Tool;


