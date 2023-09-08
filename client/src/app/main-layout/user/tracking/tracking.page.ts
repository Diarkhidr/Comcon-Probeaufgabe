import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tracking',
  templateUrl: './tracking.page.html',
  styleUrls: ['./tracking.page.scss'],
})
export class TrackingPage implements OnInit {

  id: string;
  currentDay: any;

  constructor(private userService: UserService, private route: ActivatedRoute) { }

  async ngOnInit() {
    this.route.params.subscribe(async params => {
      this.id = params['id'];
      this.currentDay = await this.userService.GetTracking(this.id);
   });
  }

}
