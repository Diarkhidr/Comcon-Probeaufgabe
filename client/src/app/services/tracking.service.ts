import { Injectable, OnInit } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { DatePipe } from '@angular/common';
import { AuthService } from './auth.service';
import { IProject } from '../interfaces/project.interface';
import { rejects } from 'assert';
import { UserService } from './user.service';
import { stringify } from 'querystring';
import { ITimeTrackingEntry, ITimeTracking, ITimeTrackingProjectEntry, calculateDuration } from '../interfaces/timetracking.interface';
import { ProjectsPage } from '../main-layout/user/projects/projects.page';

@Injectable({
  providedIn: 'root'
})
export class TrackingService {
  projectTitleCache: {[id: string]: string} = {};
  currentDay: ITimeTracking;
  currentEntry?: ITimeTrackingEntry | ITimeTrackingProjectEntry;

  constructor(private modalController: ModalController, private alertController: AlertController, private authService: AuthService, private userService: UserService) {}

  async Initialize() {
    this.currentEntry = undefined;
    this.currentDay = await this.userService.GetCurrentTracking() as ITimeTracking;
    if(this.currentDay) {
      if(this.currentDay.trackings && this.currentDay.trackings.length > 0 && !this.currentDay.trackings[this.currentDay.trackings.length - 1].endDate) {
        this.currentEntry = this.currentDay.trackings[this.currentDay.trackings.length - 1];
        if(this.currentEntry.type === 'pause')
          this.showPauseModal();
      }
    }
  }

  async StartDay() {
    this.currentDay = await this.userService.PostTracking({
      startDate: new Date(),
      trackings: []
    }) as any;
  }

  async StartTracking() {    
    if(this.currentEntry) await this.EndTracking();
    const modal = await this.modalController.create({
      component: ProjectsPage,
      componentProps: {
        'isModal': true
      }
    });
    await modal.present();
    const { data } = await modal.onWillDismiss();
    if(data) {
      this.currentEntry = {
        type: 'project',
        startDate: new Date(),
        project: data
      }
      this.currentDay.trackings.push(this.currentEntry);
      await this.userService.UpdateTracking(this.currentDay);
    }
  }

  async showPauseModal() {
    const alert = await this.alertController.create({
      header: 'Pause aktiv',
      message: '00:00:00',
      buttons: [{
        text: 'Pause beenden',
        role: 'cancel', 
        handler: async (data) => {
          this.EndTracking();
          await this.userService.UpdateTracking(this.currentDay);
          clearInterval(pauseInterval);
        }
      }]
    });
    let pauseInterval = setInterval(() => {
      alert.message = new DatePipe('en').transform(calculateDuration(this.currentEntry), 'HH:mm:ss', 'GMT');
    }, 1000)
    await alert.present();
  }

  async StartPause() {
    if(this.currentEntry) await this.EndTracking();
    this.currentEntry = {
      type: 'pause',
      startDate: new Date()
    }
    this.currentDay.trackings.push(this.currentEntry)
    await this.userService.UpdateTracking(this.currentDay);
    await this.showPauseModal();
  }

  async EndTracking() {
    if(this.currentEntry.type === 'project') {
      return new Promise<void>(async (resolve, reject) => {
        const alert = await this.alertController.create({
          header: 'Kommentar hinzufügen',
          inputs: [{
            name: 'comment',
            type: 'textarea',
            placeholder: 'Kommentar'
          }],
          buttons: [
            {
              text: 'Abbrechen',
              role: 'cancel',
              cssClass: 'secondary',
              handler: () => {
                reject();
              }
            }, {
              text: 'Speichern',
              handler: async (data) => {
                this.currentEntry.endDate = new Date();
                (this.currentEntry as ITimeTrackingProjectEntry).comment = data.comment;
                this.currentEntry = undefined;
                await this.userService.UpdateTracking(this.currentDay);
                resolve();
              }
            }
          ]
        })
        await alert.present();
      });

    }
    else {
      this.currentEntry.endDate = new Date();
      this.currentEntry = undefined;
      await this.userService.UpdateTracking(this.currentDay);
    }
  }

  async EndDay() {
    const alert = await this.alertController.create({
      header: 'Willst du deinen Arbeitstag wirklich beenden?',
      buttons: [
        {
          text: 'Abbrechen',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
          }
        }, {
          text: 'Speichern',
          handler: async (data) => {
            this.currentDay.endDate = new Date();
            await this.userService.UpdateTracking(this.currentDay);
          }
        }
      ]
    })
    await alert.present();

  }
}
