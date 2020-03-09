import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SiteSelectionFinalCandidateComponent } from './site-selection-final-candidate.component';

describe('SiteSelectionFinalCandidateComponent', () => {
  let component: SiteSelectionFinalCandidateComponent;
  let fixture: ComponentFixture<SiteSelectionFinalCandidateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SiteSelectionFinalCandidateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SiteSelectionFinalCandidateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
