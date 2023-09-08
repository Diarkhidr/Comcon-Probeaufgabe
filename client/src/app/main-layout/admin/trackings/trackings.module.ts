import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TrackingsPageRoutingModule } from './trackings-routing.module';

import { TrackingsPage } from './trackings.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TrackingsPageRoutingModule
  ],
  declarations: [TrackingsPage]
})
export class TrackingsPageModule {}
