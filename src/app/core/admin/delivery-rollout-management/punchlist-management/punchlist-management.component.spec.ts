import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PunchlistManagementComponent } from './punchlist-management.component';

describe('PunchlistManagementComponent', () => {
  let component: PunchlistManagementComponent;
  let fixture: ComponentFixture<PunchlistManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PunchlistManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PunchlistManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
