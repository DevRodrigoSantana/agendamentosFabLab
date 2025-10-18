import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardLab } from './card-lab';

describe('CardLab', () => {
  let component: CardLab;
  let fixture: ComponentFixture<CardLab>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardLab]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardLab);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
