import { Router } from '@angular/router';
import { AuthService } from './../../services/auth.service';
import { ArticleService } from 'src/app/services/article.service';
import { Article } from '../../models/article';
import { Component, OnInit } from '@angular/core';

interface SearchField {
  value: string,
  searchFieldValue: string,
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  articles: Article[] =[];
  searchTerm: string = '';
  userName: string | null = '';
  showUserName!: boolean;

  searchField: SearchField[] = [
    {value: 'all', searchFieldValue: 'All'},
    {value: 'id', searchFieldValue: 'Article Id'},
    {value: 'title', searchFieldValue: 'Article Title'},
  ];

  constructor(
    private articleService: ArticleService,
    private authService: AuthService,
    private router: Router) { }

  ngOnInit(): void {
    this.userName = localStorage.getItem('sessionUser');
    this.showUserName = this.router.url == ('/login' || '/register') ? false : true;
  }

  // function to filter list based on given field name
  searchBy(fieldName: string): void {
    this.articleService.filterPostsBy(fieldName, this.searchTerm)
    .subscribe( res => this.articles = res );
  }

  // function for getting all articles
  getAllArticles(): void {
    this.articleService.getArticlesByUser()
    .subscribe( res => this.articles = res );
  }

  // function to clear/remove the search term
  clearSearchTerm(): void {
    this.searchTerm = '';
    this.getAllArticles();
  }

  logout(): void {
    this.authService.logOutUser();
  }

}

