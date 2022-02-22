import { EntityRepository, Repository } from "typeorm";
import { Tag } from "../database/entities/tag/tag.entity"

@EntityRepository(Tag)
export class TagRepository extends Repository<Tag> {
	findById(id: number) {
		return this.findOne({ where: {id: id}});
	}
}