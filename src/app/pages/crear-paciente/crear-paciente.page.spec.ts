import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearPacientePage } from './crear-paciente.page';

describe('CrearPacientePage', () => {
  let component: CrearPacientePage;
  let fixture: ComponentFixture<CrearPacientePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrearPacientePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearPacientePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
