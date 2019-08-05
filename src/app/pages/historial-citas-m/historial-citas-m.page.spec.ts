import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistorialCitasMPage } from './historial-citas-m.page';

describe('HistorialCitasMPage', () => {
  let component: HistorialCitasMPage;
  let fixture: ComponentFixture<HistorialCitasMPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HistorialCitasMPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistorialCitasMPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
