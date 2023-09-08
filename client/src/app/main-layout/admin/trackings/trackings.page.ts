import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../../services/admin.service';

@Component({
  selector: 'app-trackings',
  templateUrl: './trackings.page.html',
  styleUrls: ['./trackings.page.scss'],
})
export class TrackingsPage implements OnInit {

  trackings: any;

  constructor(private adminService: AdminService) { }

  async ngOnInit() {
    this.trackings = await this.adminService.GetTrackings() as any;
    console.log(this.trackings);
  }

}
