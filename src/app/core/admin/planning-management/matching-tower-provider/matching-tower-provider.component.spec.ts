import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchingTowerProviderComponent } from './matching-tower-provider.component';

describe('MatchingTowerProviderComponent', () => {
  let component: MatchingTowerProviderComponent;
  let fixture: ComponentFixture<MatchingTowerProviderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatchingTowerProviderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchingTowerProviderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
