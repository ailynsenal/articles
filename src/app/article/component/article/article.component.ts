import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common'

import { MatDialog } from '@angular/material/dialog';

import { ArticleService } from './../../../services/article.service';
import { Article } from '../../../models/article';
import { DialogComponent } from './../dialog/dialog.component';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit {
  article!: Article;

  constructor(
    public articleService: ArticleService,
    private route: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog) { }

  ngOnInit(): void {
     let id = this.route.snapshot.params['id'];
    this.getArticle(id);
  }

  // function for opening edit article dialog
  openEditModal(article: Article) {
    const editDialogRef = this.dialog.open(DialogComponent, {
      width: '30%',
      data: article
    });

    editDialogRef.afterClosed().subscribe( res => {
      this.article = res;
    });
  }

  // function for getting the article detail
  getArticle(id: number): void {
    this.articleService.getArticleById(id)
    .subscribe(( res: Article) => {
      this.article = res;
    });
  }
}

