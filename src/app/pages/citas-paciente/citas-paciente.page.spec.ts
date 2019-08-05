import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CitasPacientePage } from './citas-paciente.page';

describe('CitasPacientePage', () => {
  let component: CitasPacientePage;
  let fixture: ComponentFixture<CitasPacientePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CitasPacientePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CitasPacientePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
