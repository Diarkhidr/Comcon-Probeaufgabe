import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { TrackingService } from '../services/tracking.service';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.page.html',
  styleUrls: ['./main-layout.page.scss'],
})
export class MainLayoutPage implements OnInit {

  constructor(private authService: AuthService, private router: Router, private trackingService: TrackingService) { }

  ngOnInit() {
  }

  logout() {
    this.authService.Logout();
    this.router.navigate(['/login']);
  }

}
