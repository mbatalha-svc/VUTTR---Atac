import { EntityRepository, Repository } from "typeorm";
import { Tool } from "../database/entities/tool/tool.entity"

@EntityRepository(Tool)
export class ToolRepository extends Repository<Tool> {
	findById(id: number) {
		return this.findOne({ where: {id: id}});
	}
}