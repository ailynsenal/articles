import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from 'src/app/models/user';
import { AuthService } from './../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  register!: FormGroup;

  constructor(private formBuilder : FormBuilder,
    private authService: AuthService,
    private router: Router,
    private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.register = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', [Validators.email, Validators.required]],
      password: ['', Validators.required],
    });
  }

  // function for displaying notification for every action
  openSnackBar(message: string): void {
    this._snackBar.open(message, '', {
      duration: 3000,
    });
  }

  // fucntion to register user
  onClickRegister(): void {
    if (this.register.valid) {
      this.authService.registerUser(this.register.value)
      .subscribe( res => {
        this.register.reset();
        let message = `${`User ${res.id} registered successfuly.`}`;
        this.authService.logInUser(res);
        this.openSnackBar(message);
      });
    }
  }
}

