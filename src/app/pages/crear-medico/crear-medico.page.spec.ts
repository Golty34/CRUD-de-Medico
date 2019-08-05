import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearMedicoPage } from './crear-medico.page';

describe('CrearMedicoPage', () => {
  let component: CrearMedicoPage;
  let fixture: ComponentFixture<CrearMedicoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrearMedicoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrearMedicoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
