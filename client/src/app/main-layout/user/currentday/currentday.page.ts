import { Component } from '@angular/core';
import { ModalController, AlertController } from '@ionic/angular';
import { TrackingService } from '../../../services/tracking.service';
import { calculateDuration, ITimeTrackingProjectEntry } from '../../../interfaces/timetracking.interface';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-currentday',
  templateUrl: './currentday.page.html',
  styleUrls: ['./currentday.page.scss'],
})
export class CurrentDayPage {

  currentWorkTime: number = 0;
  currentProjectTime: number = 0;
  currentPauseTime: number = 0;

  timeInterval: any;

  currentProjectTitle() {
    if(this.trackingService.currentEntry) return (this.trackingService.currentEntry as ITimeTrackingProjectEntry).project?.title || 'Pause';
    return 'Kein Projekt ausgewählt';
  }

  constructor(public modalController: ModalController, public alertController: AlertController, public trackingService: TrackingService, public router: ActivatedRoute) { 
    router.params.subscribe(async () => {
      await this.trackingService.Initialize();
      this.updateTimers();
      this.timeInterval = setInterval(() => {
        this.updateTimers();
      }, 1000);
    })
  }

  updateTimers() {
    if(this.trackingService.currentDay)
    this.currentWorkTime = calculateDuration(this.trackingService.currentDay);
  else
    this.currentWorkTime = 0;

  if(this.trackingService.currentEntry)
    this.currentProjectTime = calculateDuration(this.trackingService.currentEntry);
  else
    this.currentProjectTime = 0;
  }

  ngOnDestroy(): void {
    clearInterval(this.timeInterval);
  }

  StartPause() {
    this.trackingService.StartPause();
  }

  async EndPause() {
    await this.trackingService.EndTracking();
  }

  StartDay() {
    this.trackingService.StartDay();
  }

  EndDay() {
    this.trackingService.EndDay();
  }

  async StartTracking() {
    await this.trackingService.StartTracking();
  }

  async EndTracking() {
    await this.trackingService.EndTracking();
  }

}
