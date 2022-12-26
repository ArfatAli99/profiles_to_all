import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EntityPage } from './entity.page';

describe('EntityPage', () => {
  let component: EntityPage;
  let fixture: ComponentFixture<EntityPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EntityPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntityPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
