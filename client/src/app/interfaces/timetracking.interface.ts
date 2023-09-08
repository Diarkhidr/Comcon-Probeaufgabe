import { IProject } from './project.interface';
import { IUser } from './user.interface';

export interface ITimeTrackingProjectEntry extends ITimeTrackingEntry {
    type: 'project';
    project: IProject;
    comment: string;
}

export interface ITimeTrackingEntry {
    type: 'pause' | 'project';
    startDate: Date;
    endDate?: Date;
}

export interface ITimeTracking {
    id: string;
    startDate: Date;
    endDate?: Date;
    user: IUser;
    trackings: Array<ITimeTrackingEntry | ITimeTrackingProjectEntry>
}

export function calculateDuration(tracking: ITimeTracking | ITimeTrackingEntry) {
    if(tracking.endDate) return new Date(tracking.endDate).getTime() - new Date(tracking.startDate).getTime();
    return new Date().getTime() - new Date(tracking.startDate).getTime();
}

