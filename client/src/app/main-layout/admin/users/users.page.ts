import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../../services/admin.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.page.html',
  styleUrls: ['./users.page.scss'],
})
export class UsersPage implements OnInit {

  users: Array<{userName: string; firstName: string; lastName: string, roles: Array<string>}>;

  constructor(private adminService: AdminService) { }

  async ngOnInit() {
    this.users = await this.adminService.GetUsers() as Array<{userName: string; firstName: string; lastName: string, roles: Array<string>}>;
  }

}
