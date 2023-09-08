import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany, JoinTable, ManyToOne, OneToOne, JoinColumn, BaseEntity } from "typeorm";
import { Project } from "./project.model";
import { User } from "./user.model";

@Entity()
export class TimeTracking extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  startDate: Date;

  @Column({nullable: true})
  endDate: Date;

  @Column({type: 'simple-json'})
  trackings: any;

  @ManyToOne(type => User, user => user.trackings)
  user: User;

  @ManyToOne(type => Project, project => project.trackings)
  project: Project;

}