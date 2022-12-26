import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SsoPage } from './sso.page';

describe('SsoPage', () => {
  let component: SsoPage;
  let fixture: ComponentFixture<SsoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SsoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SsoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
