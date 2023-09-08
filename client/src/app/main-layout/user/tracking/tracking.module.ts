import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TrackingPageRoutingModule } from './tracking-routing.module';

import { TrackingPage } from './tracking.page';
import { PipesModule } from '../../../pipes/pipes.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TrackingPageRoutingModule,
    PipesModule
  ],
  declarations: [TrackingPage]
})
export class TrackingPageModule {}
