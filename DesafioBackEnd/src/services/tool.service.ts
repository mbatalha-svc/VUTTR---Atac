import { getConnection } from 'typeorm';
import { Tool } from '../database/entities/tool/tool.entity';
import { ToolRepository } from './../repository/tool.repository';

export class ToolService{
	private toolRepository: ToolRepository;

	constructor(){
		this.toolRepository = getConnection("vuttr").getCustomRepository(ToolRepository);
	}

	public index = async () => {
		const tools = await this.toolRepository.find( {relations: ['tags']} );
		return tools;
	}
	public queryById = async (id: number) => {
		const tools = await this.toolRepository.find({where: {id: id}, relations: ['tags']});
		return tools;
	}

	public create = async (tool: Tool) => {
		const newTool = await this.toolRepository.save(tool);
		return newTool;
	}

	public update = async(tool: Tool, id: number) => {
		const updatedTool = await this.toolRepository.update(id, tool);
		return updatedTool;
	}

	public delete = async(id: number) => {
		const deletedTool = await this.toolRepository.delete(id);
		return deletedTool;
	}
}