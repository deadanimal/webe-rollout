import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserActivityLogReportsComponent } from './user-activity-log-reports.component';

describe('UserActivityLogReportsComponent', () => {
  let component: UserActivityLogReportsComponent;
  let fixture: ComponentFixture<UserActivityLogReportsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserActivityLogReportsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserActivityLogReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
