import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionElementCreationComponent } from './transaction-element-creation.component';

describe('TransactionElementCreationComponent', () => {
  let component: TransactionElementCreationComponent;
  let fixture: ComponentFixture<TransactionElementCreationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransactionElementCreationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransactionElementCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
