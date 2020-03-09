import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserSetupAccessRightsComponent } from './user-setup-access-rights.component';

describe('UserSetupAccessRightsComponent', () => {
  let component: UserSetupAccessRightsComponent;
  let fixture: ComponentFixture<UserSetupAccessRightsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserSetupAccessRightsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserSetupAccessRightsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
