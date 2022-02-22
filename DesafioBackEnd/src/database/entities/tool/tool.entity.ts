import { Column, Entity, PrimaryGeneratedColumn, ManyToMany, JoinTable } from "typeorm";
import {Tag} from './../tag/tag.entity';

@Entity('Tool')
export class Tool {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	title: string;

	@Column()
	link: string;

	@Column()
	description: string;

	@ManyToMany(() => Tag)
	@JoinTable()
	tags: Tag[];
}

export default Tool;