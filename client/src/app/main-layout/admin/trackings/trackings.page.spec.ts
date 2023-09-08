import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TrackingsPage } from './trackings.page';

describe('TrackingsPage', () => {
  let component: TrackingsPage;
  let fixture: ComponentFixture<TrackingsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrackingsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TrackingsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
