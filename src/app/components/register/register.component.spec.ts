import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserModule, By } from '@angular/platform-browser';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RegisterComponent } from './register.component';

import { DebugElement } from '@angular/core';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;
  let de: DebugElement;
  let el: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterComponent ],
      imports: [
        BrowserModule,
        HttpClientTestingModule,
        RouterTestingModule,
        ReactiveFormsModule,
        MatSnackBarModule
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', async() => {
    expect(component).toBeTruthy();
  });

  it('form should be invalid', async () => {
    component.register.controls['username'].setValue('');
    component.register.controls['email'].setValue('');
    component.register.controls['password'].setValue('');
    expect(component.register.valid).toBeFalsy();
  });

  it('form should be valid', async () => {
    component.register.controls['username'].setValue('aya');
    component.register.controls['email'].setValue('ailyn_senal@yahoo.com');
    component.register.controls['password'].setValue('ailyn123!');
    expect(component.register.valid).toBeTruthy();
  });

  it('should call the `onClickRegister` method', async() => {
    spyOn(component, 'onClickRegister');
    el = fixture.debugElement.query(By.css('button')).nativeElement;
    el.click();
    expect(component.onClickRegister).toHaveBeenCalledTimes(0);
  });
});
