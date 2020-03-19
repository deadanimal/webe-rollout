import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TroubleTicketManagementComponent } from './trouble-ticket-management.component';

describe('TroubleTicketManagementComponent', () => {
  let component: TroubleTicketManagementComponent;
  let fixture: ComponentFixture<TroubleTicketManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TroubleTicketManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TroubleTicketManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
