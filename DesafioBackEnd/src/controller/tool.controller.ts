import { Router, Response, Request } from "express";
import { Tool } from '../database/entities/tool/tool.entity';
import { ToolService } from "../services/tool.service"; // import service

export class ToolController {
	public router: Router;
	private toolService: ToolService;

	constructor(){
		this.toolService = new ToolService(); // Create a new instance of ToolService
		this.router = Router();
		this.routes();
	}

	public index = async (req: Request,  res: Response) => {
		const tools = await this.toolService.index();
    	res.json(tools);
	}
	public create = async (req: Request, res: Response) => {
		const tool = req['body'] as Tool;
		const newTool = await this.toolService.create(tool);
		
		res.send(newTool);
	}

	public queryById = async (req: Request, res: Response) => {
		const id = req['params']['id'];
		const tools = await this.toolService.queryById(Number(id));

		res.send(tools);
	}

	public update = async (req: Request, res: Response) => {
		const tool = req['body'] as Tool;
		const id = req['params']['id'];

		res.send(this.toolService.update(tool, Number(id)));
	}

	public delete = async (req: Request, res: Response) => {
		const id = req['params']['id'];

		res.send(this.toolService.delete(Number(id)));
	}

	/**
	 * Configure the routes of controller
	 **/
	public routes(){
		this.router.route('/')
			.get(this.index)
			.post(this.create);
		this.router.route('/:id')
			.get(this.queryById)
			.put(this.update)
			.delete(this.delete);
	}
}