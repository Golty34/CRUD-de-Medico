import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistorialCitasPage } from './historial-citas.page';

describe('HistorialCitasPage', () => {
  let component: HistorialCitasPage;
  let fixture: ComponentFixture<HistorialCitasPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistorialCitasPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistorialCitasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
