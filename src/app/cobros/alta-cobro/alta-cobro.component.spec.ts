import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AltaCobroComponent } from './alta-cobro.component';

describe('AltaCobroComponent', () => {
  let component: AltaCobroComponent;
  let fixture: ComponentFixture<AltaCobroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AltaCobroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AltaCobroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
