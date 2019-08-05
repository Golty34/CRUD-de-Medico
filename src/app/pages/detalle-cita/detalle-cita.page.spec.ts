import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleCitaPage } from './detalle-cita.page';

describe('DetalleCitaPage', () => {
  let component: DetalleCitaPage;
  let fixture: ComponentFixture<DetalleCitaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetalleCitaPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleCitaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
