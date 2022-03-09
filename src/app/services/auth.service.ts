import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from 'src/app/models/user';

const apiURL = "http://localhost:3000/users";
const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private router: Router) {}

  
  setSession(session: any): void {
    const { id, username } = session;
    localStorage.setItem('sessionId', id);
    localStorage.setItem('sessionUser', username);
  }

  getSessionId(): string | null {
    return localStorage.getItem('sessionId');
  }

  isLoggedIn() {
    return this.getSessionId() !== null;
  }

  registerUser(user: User) {
    const { username, email } = user;
    const data = {
      username,
      email
    }
    return this.http.post<User>(apiURL, data, httpOptions);
  }

  getAllUsers(): Observable<any> {
    return this.http.get<User[]>(apiURL);
  }

  logInUser(user: User): void {
    let userData = {
      id: user.id,
      username: user.username
    }
    this.setSession(userData);
    this.router.navigate(['/articles']);
  }

  logOutUser(): void {
    localStorage.removeItem('sessionId');
    localStorage.removeItem('sessionUser');
    this.router.navigate(['/login']);
  }
}
