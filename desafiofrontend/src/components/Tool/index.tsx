
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
  console.log(`DENTRO DO CHECK DELETE: ${confirmDelete}`)
  if(confirmDelete) {
    console.log('tentando deletar' + id);
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
    <div>
      <h1>{title}{id}</h1>
      <div className="main-input">
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
                  console.log(confirmDelete);
                  
                  //(() => setConfirmDelete(false))();
                  console.log(confirmDelete); 
                  checkDelete(id, props.e, confirmDelete);
                }
              })()
            }

            { /**checkDelete(id, props.e, confirmDelete)*/ }
              
        </div>
      </div>
      <a href = {link} target="_blank"> {link} </a>
      <p> {description} </p>
      <hr/>
      {
        tags?.length > 0 
        &&
        <div>
        Tags<hr/>
          {tags.map((tag) => (
            <div key={tag.id}> {tag.name}</div>
            ))}
        </div>
      }
    </div>
  );
}

export default Tool;


