import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TravelerPage } from './traveler.page';

describe('TravelerPage', () => {
  let component: TravelerPage;
  let fixture: ComponentFixture<TravelerPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TravelerPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TravelerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
