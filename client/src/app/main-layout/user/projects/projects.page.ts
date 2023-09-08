import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.page.html',
  styleUrls: ['./projects.page.scss'],
})
export class ProjectsPage implements OnInit {

  isModal = false;

  searchQuery: string;

  projects: Array<any>;

  constructor(private userService: UserService, public modalController: ModalController) { }

  async ngOnInit() {
    this.projects = await this.userService.GetProjects() as any;
  }

  async onQuery(event: CustomEvent) {
    this.projects = await this.userService.GetProjects(event.detail.value) as any;
  }

  selectProject(project: any) {
    if(this.isModal)
      this.modalController.dismiss(project);
  }
}
