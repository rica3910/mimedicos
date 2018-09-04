import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DesplegarImagenComponent } from './desplegar-imagen.component';

describe('DesplegarImagenComponent', () => {
  let component: DesplegarImagenComponent;
  let fixture: ComponentFixture<DesplegarImagenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DesplegarImagenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DesplegarImagenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
