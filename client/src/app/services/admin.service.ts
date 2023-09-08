import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private authService: AuthService) { }

  public GetUsers() {
    return this.authService.Get('/admin/user');
  }

  public GetProjects() {
    return this.authService.Get('/admin/project');
  }

  public GetTrackings() {
    return this.authService.Get('/admin/tracking');
  }
}
