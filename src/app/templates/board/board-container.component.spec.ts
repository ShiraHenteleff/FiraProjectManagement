import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardContainer } from './board-container.component';

describe('Board', () => {
  let component: BoardContainer;
  let fixture: ComponentFixture<BoardContainer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BoardContainer],
    }).compileComponents();

    fixture = TestBed.createComponent(BoardContainer);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
