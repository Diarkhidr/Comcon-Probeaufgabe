import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../../services/admin.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.page.html',
  styleUrls: ['./projects.page.scss'],
})
export class ProjectsPage implements OnInit {

  projects: Array<any>;

  constructor(private adminService: AdminService) { }

  async ngOnInit() {
    this.projects = await this.adminService.GetProjects() as any;
  }

}
