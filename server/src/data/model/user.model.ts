import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany, JoinTable, BaseEntity, BeforeInsert } from "typeorm";
import { Project } from "./project.model";
import { TimeTracking } from "./timetracking.model";
import { createHmac, randomBytes } from "crypto";
import { Exclude } from 'class-transformer';
import { UnauthorizedException } from "@nestjs/common";

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ unique: true })
  userName: string;


  @Column({type: 'simple-array'})
  roles: Array<string>;

  @Exclude()
  @Column()
  passwordHash: string;

  @Exclude()
  @Column()
  salt: string;

  @ManyToMany(type => Project)
  @JoinTable()
  projects: Promise<Project[]>;

  @OneToMany(type => TimeTracking, tracking => tracking.user)
  trackings: Promise<TimeTracking[]>;

  setPassword(plainPassword: string) {
    this.salt = randomBytes(16).toString('hex');
    this.passwordHash = createHmac('sha256', this.salt).update(plainPassword).digest('hex');
  }

  static async findByCredentials(userName: string, password: string) {
      let user = await this.findOne({where: {userName: userName}});
      if(!user) throw new UnauthorizedException('USERNOTFOUND');
      let hashedPassword = createHmac('sha256', user.salt).update(password).digest('hex'); 
      if(user.passwordHash !== hashedPassword) throw new UnauthorizedException('PASSWORDMISSMATCH');
      return user;
  }
}