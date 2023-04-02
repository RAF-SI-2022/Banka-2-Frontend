import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellFutureWithLimitComponent } from './sell-future-with-limit.component';

describe('SellFutureWithLimitComponent', () => {
  let component: SellFutureWithLimitComponent;
  let fixture: ComponentFixture<SellFutureWithLimitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SellFutureWithLimitComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SellFutureWithLimitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
