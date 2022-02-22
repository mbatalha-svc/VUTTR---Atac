import { Column, Entity, PrimaryGeneratedColumn, ManyToMany } from "typeorm";
import { Tool } from './../tool/tool.entity';

@Entity('Tag')
export class Tag {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	name: string;
}

export default Tag;