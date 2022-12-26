import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServerErrorPagePage } from './server-error-page.page';

describe('ServerErrorPagePage', () => {
  let component: ServerErrorPagePage;
  let fixture: ComponentFixture<ServerErrorPagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServerErrorPagePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServerErrorPagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
