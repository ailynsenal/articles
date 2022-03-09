import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserModule, By } from '@angular/platform-browser';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { LoginComponent } from './login.component';

import { DebugElement } from '@angular/core';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let de: DebugElement;
  let el: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      imports: [
        BrowserModule,
        HttpClientTestingModule,
        FormsModule,
        ReactiveFormsModule,
        RouterTestingModule,
        MatSnackBarModule
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', async () => {
    expect(component).toBeTruthy();
  });

  it('form should be invalid', async () => {
    component.login.controls['email'].setValue('');
    component.login.controls['password'].setValue('');
    expect(component.login.valid).toBeFalsy();
  });

  it('form should be valid', async () => {
    component.login.controls['email'].setValue('ailyn_senal@yahoo.com');
    component.login.controls['password'].setValue('ailyn123!');
    expect(component.login.valid).toBeTruthy();
  });

  it('should call the `oncClickLogin` method', async() => {
    spyOn(component, 'onClickLogin');
    el = fixture.debugElement.query(By.css('button')).nativeElement;
    el.click();
    expect(component.onClickLogin).toHaveBeenCalledTimes(0);
  });
});
