import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyFutureWithLimitComponent } from './buy-future-with-limit.component';

describe('BuyFutureWithLimitComponent', () => {
  let component: BuyFutureWithLimitComponent;
  let fixture: ComponentFixture<BuyFutureWithLimitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuyFutureWithLimitComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuyFutureWithLimitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
