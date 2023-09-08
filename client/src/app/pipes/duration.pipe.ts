import { Pipe, PipeTransform } from '@angular/core';
import { ITimeTracking, ITimeTrackingEntry, calculateDuration } from '../interfaces/timetracking.interface';
/*
 * Raise the value exponentially
 * Takes an exponent argument that defaults to 1.
 * Usage:
 *   value | exponentialStrength:exponent
 * Example:
 *   {{ 2 | exponentialStrength:10 }}
 *   formats to: 1024
*/
@Pipe({name: 'duration'})
export class DurationPipe implements PipeTransform {
  transform(value: ITimeTracking | ITimeTrackingEntry): number {
    return calculateDuration(value);
  }
}