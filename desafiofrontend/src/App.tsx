import React from 'react';
import './App.css';
import axios from "axios";

interface IToolListProps {
  toolData: ToolType;
}
interface ITagListProps {
  tagData: TagType;
}

type ToolType = {
    id: number;
    title: string;
    link: string;
    description: string;
    tags: TagType[];
};

type TagType  = {
  id: number;
  name: string;
};

const onToolDeleteHandler = (id:number, e:any) => {
  if(window.confirm("Are you sure you want to remove?")) {
    console.log('tentando deletar' + id);
    axios
    .delete("http://localhost:3000/api/tools/" + id)
    .then(response => {
      console.log(response);
    });
  }
}


const App = () => {
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const [tools, setTools] = React.useState<ToolType[]>([]);
  const [searchTerm, setSearchTerm] = React.useState<string>('');
  const [onlySearchTags, setOnlySearchTags] = React.useState<boolean>(false);

  React.useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    const ENDPOINT = "http://localhost:3000/api/tools/";
    axios(ENDPOINT)
      .then((response: any) => {
        setIsLoading(false);
        console.log("RES", response.data);
        setTools(response.data);
      })
      .catch(error => {
        setIsLoading(false);
        console.log("An error happened", error);
      });
  }

  const filterSearchTag = (tag: TagType) => {
    if(tag.name.toLowerCase().includes(searchTerm.toLowerCase())) {
      return tag;
    }
  };

  const toolRenderer = tools.filter((val) => {
                        if(searchTerm == "") {
                          return val;
                        }
                        if(val.tags.filter(filterSearchTag).length > 0) {
                          return val;
                        }
                        if(!onlySearchTags && val.title.toLowerCase().includes(searchTerm.toLowerCase())) {
                          return val;
                        }
                        if(!onlySearchTags && val.description.toLowerCase().includes(searchTerm.toLowerCase())) {
                          return val;
                        }
                      }).map((tool) => (
                        <div key= {tool.id}>
                          <ToolList toolData={ tool } />
                        </div>
                      ));

  const content = isLoading ? (<div>Loading...</div>) : (<div><pre>{JSON.stringify(tools, null, 2)}</pre></div>);
  
//<ToolList toolData={ } />

  return (
    <div className="App">
      <div className="main-input">
        <div className="input-icons">
          <i className="fa fa-search icon"></i>
          <input type="text" className="input-field" id="searchinput" name="searchinput" placeholder="Search" onChange={(event) => {setSearchTerm(event.target.value)}}/>  
        </div>
      
        <label htmlFor="tagsonlyinput">
          <input type="checkbox" id="tagsonlyinput" name="tagsonlyinput" onChange={(event) => {
                                                                                                  if(onlySearchTags == false) {
                                                                                                    setOnlySearchTags(true);
                                                                                                  } else{
                                                                                                    setOnlySearchTags(false);
                                                                                                  }}}/>
          search in tags only
        </label>

        <div className="input-icons">
          <i className="fa fa-plus icon"></i>
          <button className="input-field" id="addbutton" name="addbutton">Add</button>
        </div>
      </div>
      <h1> {toolRenderer} 
      </h1>
    </div>
  );
}
const ToolList = (props: IToolListProps) => {
  const {id, title, link, description, tags} = props.toolData; 
  return (
    <div>
      <h1>{title}</h1>
      <div className="main-input">
        <div className="input-icons">
          <i className = "fa fa-remove icon"> </i>
          <button onClick={ onToolDeleteHandler.bind(id, App.getData())} className="input-field" id="removebutton" name="removebutton">remove</button>
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



export default App;
