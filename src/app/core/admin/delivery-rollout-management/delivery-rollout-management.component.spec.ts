import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveryRolloutManagementComponent } from './delivery-rollout-management.component';

describe('DeliveryRolloutManagementComponent', () => {
  let component: DeliveryRolloutManagementComponent;
  let fixture: ComponentFixture<DeliveryRolloutManagementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeliveryRolloutManagementComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeliveryRolloutManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
