import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleMedicoPage } from './detalle-medico.page';

describe('DetalleMedicoPage', () => {
  let component: DetalleMedicoPage;
  let fixture: ComponentFixture<DetalleMedicoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetalleMedicoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleMedicoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
