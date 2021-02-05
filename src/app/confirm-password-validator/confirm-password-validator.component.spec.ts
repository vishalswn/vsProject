import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmPasswordValidatorComponent } from './confirm-password-validator.component';

describe('ConfirmPasswordValidatorComponent', () => {
  let component: ConfirmPasswordValidatorComponent;
  let fixture: ComponentFixture<ConfirmPasswordValidatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmPasswordValidatorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmPasswordValidatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
