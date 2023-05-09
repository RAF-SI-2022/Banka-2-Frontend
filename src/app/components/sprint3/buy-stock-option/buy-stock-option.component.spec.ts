import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyStockOptionComponent } from './buy-stock-option.component';

describe('BuyStockOptionComponent', () => {
  let component: BuyStockOptionComponent;
  let fixture: ComponentFixture<BuyStockOptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuyStockOptionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuyStockOptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
