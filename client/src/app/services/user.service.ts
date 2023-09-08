import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private authService: AuthService) { }

  public GetProjects(query?: string) {
    return this.authService.Get('/user/project', {query: query || ''});
  }

  public async GetCurrentTracking() {
    return await this.authService.Get('/user/tracking/current');
  }

  public async GetTracking(id: string) {
    return await this.authService.Get('/user/tracking/'+id);
  }

  public async GetTrackings() {
    return await this.authService.Get('/user/tracking');
  }

  public async PostTracking(tracking: any) {
    return await this.authService.Post('/user/tracking', tracking);
  }

  public async UpdateTracking(tracking: any) {
    return await this.authService.Put('/user/tracking/'+tracking.id, tracking);
  }
}
