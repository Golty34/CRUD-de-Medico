import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PacientePagePage } from './paciente-page.page';

describe('PacientePagePage', () => {
  let component: PacientePagePage;
  let fixture: ComponentFixture<PacientePagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PacientePagePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PacientePagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
