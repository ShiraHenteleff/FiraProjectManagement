import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicWidgetsComponent } from './dynamic-widgets-component';

describe('DynamicWidgetsComponent', () => {
  let component: DynamicWidgetsComponent;
  let fixture: ComponentFixture<DynamicWidgetsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DynamicWidgetsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DynamicWidgetsComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
