
import Tool from '../Tool';

interface IToolsProps {
  tools: ToolType[],
  searchArray:string[], 
  onlySearchTags:boolean,
  e:any // reload, update get data from db
}

const hasSearchTerm = (text: string, searchArray:string[]) => {
  const found = searchArray.filter((term) => {
    if(text.toLowerCase().includes(term.toLowerCase())) {
      return term;
    }
  });
  
  if(found.length == 0) {
    return false;
  } else {
    return true;
  }
}

const filterSearchTag = (tags: TagType[], searchArray:string[]) => {
    const found = (tags.filter((tag) => {
      if(hasSearchTerm(tag.name, searchArray)) {
        return tag;
      }
    }));

    if(found.length == 0) {
      return false;
    } else {
      return true;
    }
};

const ToolFilter = (props:IToolsProps) => {
  const {tools, searchArray, onlySearchTags} = props;

  return tools.filter((val) => {
    if(searchArray.length == 0) {
      return val;
    }
    if(filterSearchTag(val.tags, searchArray)) {
      return val;
    } 
    if(!onlySearchTags && hasSearchTerm(val.title, searchArray)) {
      return val;
    }
    if(!onlySearchTags && hasSearchTerm(val.description, searchArray)) {
      return val;
    }
  })
}

const ToolList = (props:IToolsProps) => {
  return(
    <div>
      {
        ToolFilter(props).map((tool) => (
          <div key={tool.id}>
            <Tool toolData={tool} e={props.e}></Tool>
          </div>
        ))
      }
    </div>
  )
}

const Tools = (props:IToolsProps) => { 
  const {tools, searchArray, onlySearchTags, e} = props;
  return (
    <ToolList tools={tools} searchArray={searchArray} onlySearchTags={onlySearchTags} e={e}></ToolList>
  )
}

export default Tools;