import axios from "axios";
import React from "react";
import Popup from "..";

interface IAddToolPopupProps {
    title?:string,
    text?:string,
    cancelText?:string,
    confirmText?:string,
    trigger:boolean,
    setTrigger:any,
}

const initialValue:ToolType = {
    title: "",
    link: "",
    description: "",
    tags: [],
}

const AddToolPopup = (props:IAddToolPopupProps) => {
    const [values, setValues] = React.useState(initialValue);

    function onChange(ev:any) {
        const { name, value } = ev.target;
        console.log({name, value})
        if(name=="tags") {
            //Separar texto em palavras
            const tagValues:string[] = value.split(" ").filter(Boolean);
            let tagObjects:TagType[] = [];
            //inserir palavras na tabela Tag
            tagValues.map((tagName:string)=>{
                        tagObjects = [...tagObjects, {name:tagName}]
                    });
            //setValues com a array
            setValues({...values, [name]: tagObjects});
            console.log(tagObjects);
        } else {
            setValues({...values, [name]: value});
        }
    }
    function onSubmit(ev:any) {
        ev.preventDefault();
        console.log(values);
        values.tags.map((tag)=>{
            axios.post("http://localhost:3000/api/tags/", tag)
                .then((response)=>{
                    console.log(`SUCESSO AO INSERIR TAG=${tag.name}`);
                })
                .catch((err)=>{
                    console.log(`SUCESSO AO INSERIR TAG=${tag.name}`);
                })
        });
        
        axios.post("http://localhost:3000/api/tools/", values)
            .then((response)=>{
                props.setTrigger(false);
            })
    }

    return (
        <Popup trigger={props.trigger} setTrigger={props.setTrigger}>
            <h2>Add new tool</h2>
            <form onSubmit={onSubmit}> 
                <label htmlFor="title">Tool Name</label>
                <input type="text" id="title" name="title" onChange={onChange} required />
            
                <label htmlFor="link">Tool Link</label>
                <input type="text" id="link" name="link" onChange={onChange} required />

                <label htmlFor="description">Tool description</label>
                <input type="text" id="description" name="description" onChange={onChange} />
                
                <label htmlFor="tags">Tags</label>
                <input type="text" id="tags" name="tags" onChange={onChange} />

                <button type="submit">Add tool</button>
            </form>
        </Popup>
    )
}

export default AddToolPopup;