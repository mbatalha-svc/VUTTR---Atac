import { getConnection } from 'typeorm';
import { Tag } from '../database/entities/tag/tag.entity';
import { TagRepository } from './../repository/tag.repository';

export class TagService{
	private tagRepository: TagRepository;

	constructor(){
		this.tagRepository = getConnection("vuttr").getCustomRepository(TagRepository);
	}

	public getAllTags = async () => {
		const tags = await this.tagRepository.find();
		return tags;
	}
	public getTagById = async (id: number) => {
		const tags = await this.tagRepository.findOne(id);
		return tags;
	}
	public getTagByName = async (name: string) => {
		const tags = await this.tagRepository.findOne({name:name});
		return tags;
	}

	public create = async (tag: Tag) => {
		try {
			const newTag = await this.tagRepository.save(tag);
			return newTag;
		} catch(err) {
			return err;
		}
	}

	public update = async(tag: Tag, id: number) => {
		const updatedTag = await this.tagRepository.update(id, tag);
		return updatedTag;
	}

	public delete = async(id: number) => {
		const deletedTag = await this.tagRepository.delete(id);
		return deletedTag;
	}
}