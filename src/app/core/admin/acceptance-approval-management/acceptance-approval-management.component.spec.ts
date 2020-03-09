import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AcceptanceApprovalManagementComponent } from './acceptance-approval-management.component';

describe('AcceptanceApprovalManagementComponent', () => {
  let component: AcceptanceApprovalManagementComponent;
  let fixture: ComponentFixture<AcceptanceApprovalManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AcceptanceApprovalManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AcceptanceApprovalManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
