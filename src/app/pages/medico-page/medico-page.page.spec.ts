import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicoPagePage } from './medico-page.page';

describe('MedicoPagePage', () => {
  let component: MedicoPagePage;
  let fixture: ComponentFixture<MedicoPagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MedicoPagePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MedicoPagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
