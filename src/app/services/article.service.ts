import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Article } from './../models/article';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  private apiURL = "http://localhost:3000/articles";
  httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };

  constructor(
    private http: HttpClient,
    private authservice: AuthService) { }


  getArticlesByUser(): Observable<Article[]> {
    let userId = this.authservice.getSessionId();
    return this.http.get<Article[]>(`${this.apiURL}?userId=${userId}`)
      .pipe(
        catchError(this.errorHandler)
      );
  }

  getArticleById(id: number): Observable<Article> {
    return this.http.get<Article>(`${this.apiURL}/${id}`)
      .pipe(
        catchError(this.errorHandler)
      );
  }
  
  createArticle(article: Article): Observable<Article> {
    article.userId = this.authservice.getSessionId();
    return this.http.post<Article>(this.apiURL, article, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      );
  }

  updateArticle(id: number, post: Article): Observable<Article> {
    return this.http.put<Article>(`${this.apiURL}/${id}`, post, this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    );
  }

  deleteArticle(id: number): Observable<Article> {
    return this.http.delete<Article>(`${this.apiURL}/${id}`)
      .pipe(
        catchError(this.errorHandler)
      );
  }

  filterPostsBy(fieldName: any, searchTerm: string): Observable<Article[]> {
    return fieldName === 'all' ? this.http.get<Article[]>(`${this.apiURL}?q=${searchTerm}`) : this.http.get<Article[]>(`${this.apiURL}?${fieldName}=${searchTerm}`)
      .pipe(
        catchError(this.errorHandler)
      );
  }

  errorHandler(error: any) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\n Message: ${error.message}`;
    }
    alert(errorMessage);
    return throwError(() => { new Error(errorMessage) });
  }
}
