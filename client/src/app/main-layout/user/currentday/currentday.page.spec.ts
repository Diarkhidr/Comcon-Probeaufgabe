import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CurrentDayPage } from './currentday.page';

describe('DashboardPage', () => {
  let component: CurrentDayPage;
  let fixture: ComponentFixture<CurrentDayPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CurrentDayPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CurrentDayPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
