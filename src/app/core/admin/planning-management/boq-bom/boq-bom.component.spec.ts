import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoqBomComponent } from './boq-bom.component';

describe('BoqBomComponent', () => {
  let component: BoqBomComponent;
  let fixture: ComponentFixture<BoqBomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoqBomComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoqBomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
