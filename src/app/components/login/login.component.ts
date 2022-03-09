import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from 'src/app/models/user';
import { AuthService } from './../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  login!: FormGroup;
  users!: User[];

  constructor(
    private formBuilder : FormBuilder,
    private authService: AuthService,
    private router: Router,
    private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.login = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
    this.authService.getAllUsers()
    .subscribe((res: User[]) => { 
      this.users = res; 
    });
  }

  // function for displaying notification for every action
  openSnackBar(message: string): void {
    this._snackBar.open(message, '', {
      duration: 3000,
    });
  }

  // function to authenticate user
  onClickLogin(): void {
    if (this.login.valid) {
      let isUserRegistered = this.users.find(user => {
        return user.email == this.login.value.email;
      });
      if (isUserRegistered) {
        this.authService.logInUser(isUserRegistered);
      }
      else {
        let message = `${`User is not yet registered.`}`;
        this.openSnackBar(message);
        this.router.navigate(['/login']);
      }
      this.login.reset();
    }
  }

}
