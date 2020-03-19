import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlockingIssuesComponent } from './blocking-issues.component';

describe('BlockingIssuesComponent', () => {
  let component: BlockingIssuesComponent;
  let fixture: ComponentFixture<BlockingIssuesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlockingIssuesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlockingIssuesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
