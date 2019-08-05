import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearCitaPage } from './crear-cita.page';

describe('CrearCitaPage', () => {
  let component: CrearCitaPage;
  let fixture: ComponentFixture<CrearCitaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrearCitaPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearCitaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
