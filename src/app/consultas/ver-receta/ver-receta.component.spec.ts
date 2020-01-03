import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VerRecetaComponent } from './ver-receta.component';

describe('VerRecetaComponent', () => {
  let component: VerRecetaComponent;
  let fixture: ComponentFixture<VerRecetaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerRecetaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VerRecetaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
