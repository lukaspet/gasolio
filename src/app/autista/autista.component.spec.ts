import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutistaComponent } from './autista.component';

describe('AutistaComponent', () => {
  let component: AutistaComponent;
  let fixture: ComponentFixture<AutistaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AutistaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AutistaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
