import { IProject } from './project.interface';
import { ITimeTracking } from './timetracking.interface';

export interface IUser {
    id: string;
  
    firstName: string;
    lastName: string;

    userName: string;
    roles: Array<string>;

    projects: IProject[];
    trackings: ITimeTracking[];
}