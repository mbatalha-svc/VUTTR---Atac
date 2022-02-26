import { Router, Response, Request, NextFunction } from "express";
import { Tag } from '../database/entities/tag/tag.entity';
import { TagService } from "../services/tag.service"; // import service

export class TagController {
	public router: Router;
	private tagService: TagService;

	constructor(){
		this.tagService = new TagService(); // Create a new instance of TagService
		this.router = Router();
		this.routes();
	}

	public getAllTags = async (req: Request,  res: Response) => {
		const tag = await this.tagService.getAllTags();
    	res.send(tag);
	}

	public getTagById = async (req: Request, res: Response, next: NextFunction) => {
		const id = req['params']['id'];
		const tag = await this.tagService.getTagById(Number(id));
		
		res.send(tag );
	}
	public getTagByName = async (req: Request, res: Response, next: NextFunction) => {
		const name = req['params']['name'];
		const tag = await this.tagService.getTagByName(name);
		
		res.send(tag);
	}
	public create = async (req: Request, res: Response) => {
		const tag = req['body'] as Tag;
		const newTag = await this.tagService.create(tag);
		
		res.send(newTag);
	}

	public update = async (req: Request, res: Response) => {
		const tag = req['body'] as Tag;
		const id = req['params']['id'];

		res.send(this.tagService.update(tag, Number(id)));
	}

	public delete = async (req: Request, res: Response) => {
		const id = req['params']['id'];

		res.send(this.tagService.delete(Number(id)));
	}

	/**
	 * Configure the routes of controller
	 **/
	public routes(){
		this.router.route('/')
			.get(this.getAllTags)
			.post(this.create);
		this.router.route('/:id')
			.get(this.getTagById)
			.put(this.update)
			.delete(this.delete);
		this.router.route('/name/:name')
			.get(this.getTagByName);
	}
}