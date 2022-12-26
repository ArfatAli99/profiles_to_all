import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEntityPage } from './add-entity.page';

describe('AddEntityPage', () => {
  let component: AddEntityPage;
  let fixture: ComponentFixture<AddEntityPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddEntityPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEntityPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
