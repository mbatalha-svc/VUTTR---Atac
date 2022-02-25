type TagType  = {
    id?: number;
    name: string;
};
type ToolType = {
    id?: number;
    title: string;
    link: string;
    description: string;
    tags: TagType[];
};
