import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany, JoinTable, BaseEntity } from "typeorm";
import { TimeTracking } from "./timetracking.model";

@Entity()
export class Project extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @OneToMany(type => TimeTracking, tracking => tracking.project)
  trackings: TimeTracking;
}