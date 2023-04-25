import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyStockOptionsComponent } from './my-stock-options.component';

describe('MyStockOptionsComponent', () => {
  let component: MyStockOptionsComponent;
  let fixture: ComponentFixture<MyStockOptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyStockOptionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyStockOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
