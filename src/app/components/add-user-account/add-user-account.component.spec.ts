import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUserAccountComponent } from './add-user-account.component';

describe('StepperTestComponent', () => {
  let component: AddUserAccountComponent;
  let fixture: ComponentFixture<AddUserAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddUserAccountComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddUserAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
