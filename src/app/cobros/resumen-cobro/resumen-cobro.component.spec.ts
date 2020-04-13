import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumenCobroComponent } from './resumen-cobro.component';

describe('ResumenCobroComponent', () => {
  let component: ResumenCobroComponent;
  let fixture: ComponentFixture<ResumenCobroComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResumenCobroComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResumenCobroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
