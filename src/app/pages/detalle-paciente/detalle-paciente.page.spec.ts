import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetallePacientePage } from './detalle-paciente.page';

describe('DetallePacientePage', () => {
  let component: DetallePacientePage;
  let fixture: ComponentFixture<DetallePacientePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetallePacientePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetallePacientePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
