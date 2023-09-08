import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-trackings',
  templateUrl: './trackings.page.html',
  styleUrls: ['./trackings.page.scss'],
})
export class TrackingsPage implements OnInit {

  trackings: Array<any>;

  constructor(private userService: UserService) { }

  async ngOnInit() {
    this.trackings = await this.userService.GetTrackings() as any;
  }
  
}
