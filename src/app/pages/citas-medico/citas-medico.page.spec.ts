import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CitasMedicoPage } from './citas-medico.page';

describe('CitasMedicoPage', () => {
  let component: CitasMedicoPage;
  let fixture: ComponentFixture<CitasMedicoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CitasMedicoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CitasMedicoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
