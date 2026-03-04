import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskCountWidget } from './task-count-widget';

describe('TaskCountWidget', () => {
  let component: TaskCountWidget;
  let fixture: ComponentFixture<TaskCountWidget>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskCountWidget],
    }).compileComponents();

    fixture = TestBed.createComponent(TaskCountWidget);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
