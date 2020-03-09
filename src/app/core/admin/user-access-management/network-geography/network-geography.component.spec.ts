import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NetworkGeographyComponent } from './network-geography.component';

describe('NetworkGeographyComponent', () => {
  let component: NetworkGeographyComponent;
  let fixture: ComponentFixture<NetworkGeographyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NetworkGeographyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NetworkGeographyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
