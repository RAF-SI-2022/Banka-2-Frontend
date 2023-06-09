import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateForeignUserAccountComponent } from './create-foreign-user-account.component';

describe('CreateForeignUserAccountComponent', () => {
  let component: CreateForeignUserAccountComponent;
  let fixture: ComponentFixture<CreateForeignUserAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateForeignUserAccountComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateForeignUserAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
