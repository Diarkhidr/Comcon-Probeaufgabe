import { ITimeTracking } from './timetracking.interface';

export interface IProject {
    id: string;
    title: string;
    description: string;
    trackings: ITimeTracking;
}
