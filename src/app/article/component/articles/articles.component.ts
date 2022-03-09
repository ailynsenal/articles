import { Component, OnInit, Input } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { ArticleService } from 'src/app/services/article.service';
import { Article } from '../../../models/article';
import { DialogComponent } from './../dialog/dialog.component';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.scss']
})

export class ArticlesComponent implements OnInit {

  @Input() articles: Article[] = [];
  @Input() fetchAllArticles: boolean = true;
  @Input() hasSearchTerm: string = '';

  dialogConfig = new MatDialogConfig();

  constructor(
    private articleService: ArticleService,
    private dialog: MatDialog,
    private _snackbar: MatSnackBar) { }

    ngOnInit(): void {
      if (this.fetchAllArticles) this.getAllArticles();
  
      // common configuration for dialog
      this.dialogConfig = {
        width: '30%',
        disableClose: true
      };
    }

    // function for displaying notification for every action
    openSnackBar(message: string): void {
      this._snackbar.open(message, '', {
        duration: 3000
      });
    }

    // function for opening add article dialog
    openAddDialog(): void {
      this.dialogConfig.data = null;
      let addDialogRef = this.dialog.open(DialogComponent, this.dialogConfig);

      addDialogRef.afterClosed().subscribe( res => {
        this.articles.push(res);
      });
    }
  
    // function for opening edit article dialog
    openEditDialog(article: Article): void {
      this.dialogConfig.data = article;
      const editDialogRef = this.dialog.open(DialogComponent, this.dialogConfig);

      editDialogRef.afterClosed().subscribe( res => {
        this.articles.find( x => {
          if (x.id == res.id) Object.assign(x, res);
          this.dialogConfig.data = null;
        });
      });
    }

    // function for getting all articles
    getAllArticles(): void {
      this.articleService.getArticlesByUser()
      .subscribe(( res: Article[]) => {
        this.articles = res;
      });
    }

    // function for deleting specific article
    deleteArticle(id: number): void {
      this.articleService.deleteArticle(id)
      .subscribe( res => {
        this.articles = this.articles.filter( article => article.id !== id );
        let message = `${`Article ${id} deleted successfuly.`}`;
        this.openSnackBar(message);
      });
    }
}

