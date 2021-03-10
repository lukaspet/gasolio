import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutomezzoComponent } from './automezzo.component';

describe('AutomezzoComponent', () => {
  let component: AutomezzoComponent;
  let fixture: ComponentFixture<AutomezzoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AutomezzoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AutomezzoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
