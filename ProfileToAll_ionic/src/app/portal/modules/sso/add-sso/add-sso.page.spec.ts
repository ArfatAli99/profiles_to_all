import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSsoPage } from './add-sso.page';

describe('AddSsoPage', () => {
  let component: AddSsoPage;
  let fixture: ComponentFixture<AddSsoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddSsoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSsoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
