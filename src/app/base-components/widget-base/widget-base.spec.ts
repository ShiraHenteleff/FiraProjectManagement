import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WidgetBase } from './widget-base';

describe('WidgetBase', () => {
  let component: WidgetBase;
  let fixture: ComponentFixture<WidgetBase>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WidgetBase],
    }).compileComponents();

    fixture = TestBed.createComponent(WidgetBase);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
