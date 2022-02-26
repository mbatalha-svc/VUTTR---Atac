import axios from "axios";
import React, { useEffect } from "react";
import Popup from "..";

interface IAddToolPopupProps {
    title?:string,
    text?:string,
    cancelText?:string,
    confirmText?:string,
    trigger:boolean,
    setTrigger:any,
    e: any
}

const initialValue:ToolType = {
    title: "",
    link: "",
    description: "",
    tags: [],
}

const AddToolPopup = (props:IAddToolPopupProps) => {
    const [values, setValues] = React.useState<ToolType>(initialValue);
    const [tags, setTags] = React.useState<TagType[]>([]);

    useEffect(()=>{
        console.log(tags);
    }, [tags]);

    function onChange(ev:any) {
        const { name, value } = ev.target;
        if(name==="tags") {
            //Separar texto em palavras
            const tagValues:string[] = value.split(" ").filter(Boolean);
            var tagObjects:TagType[] = [];
            //inserir palavras na tabela Tag
            tagValues.forEach((tagName:string)=>{
                        tagObjects = [...tagObjects, {name:tagName}];
                    });       
            //setValues com a array
            setValues({...values, [name]: tagObjects});
        } else {
            setValues({...values, [name]: value});
        }
    }

    function uploadTags(tags:TagType[]) {
        values.tags.forEach(async(tag)=>{
            axios.get(`http://localhost:3000/api/tags/name/${tag.name}`)
                .then((getresponse)=>{
                    console.log(getresponse);
                    var tagId:TagType = {};
                    if(getresponse.data===''){
                        console.log(`NÃO ACHOU A TAG=${tag.name}`);
                        axios.post("http://localhost:3000/api/tags/", tag)
                            .then((postresponse)=>{
                                console.log(`SUCESSO AO INSERIR TAG=${tag.name}`);
                                (tagId = {id:postresponse.data.id});
                                
                                setTags(oldtags => [...oldtags, tagId]);
                                console.log(tagId);
                            })
                            .catch((err)=>{
                                console.log(`FALHA AO INSERIR TAG=${tag.name}`);
                            })
                    } else {
                        console.log(`ACHOU A TAG=${tag.name}`);
                        (tagId = {id:getresponse.data.id});
                        
                        setTags(oldtags => [...oldtags, tagId]);
                        console.log(tagId);
                    }
                    console.log(tagId);
                });
        });
    }
    function uploadTools() {
        console.log(tags);
    }
    function onSubmit(ev:any) {
        ev.preventDefault();

        console.log(values);
        
        // Garante que inseriu todas as tags no db
        uploadTags(values.tags);

        //console.log(tags);
        //setValues({...values, tags: tagsId});

        values.tags.forEach((tag)=>{
            axios.get(`http://localhost:3000/api/tags/name/${tag.name}`)
                .then((response)=>{
                    console.log(response);
                })
                .catch((err)=>{
                    
                })
        });
        
        axios.post("http://localhost:3000/api/tools/", values)
            .then(async (response)=>{
                console.log(response);
                props.setTrigger(false);
                await props.e();
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