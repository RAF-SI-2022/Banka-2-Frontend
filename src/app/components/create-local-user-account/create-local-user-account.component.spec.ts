import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateLocalUserAccountComponent } from './create-local-user-account.component';

describe('CreateLocalUserAccountComponent', () => {
  let component: CreateLocalUserAccountComponent;
  let fixture: ComponentFixture<CreateLocalUserAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateLocalUserAccountComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateLocalUserAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
