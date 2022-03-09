import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Article } from './../../../models/article';
import { ArticleService } from 'src/app/services/article.service';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {
  article!: Article[];
  form!: FormGroup;
  actionButtonText: string = 'Save';
  headerText: string = 'Create Post';

  constructor(
    private articleService: ArticleService,
    private formBuilder : FormBuilder,
    private dialogRef : MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public editData : Article,
    private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      title: ['', Validators.required],
      body: ['', Validators.required],
    });

    if (this.editData) {
      const { title, body } = this.editData;
      
      this.actionButtonText = 'Update';
      this.headerText = 'Edit Post';
      this.form.controls['title'].setValue(title);
      this.form.controls['body'].setValue(body);
    }
  }

  // function for closing the dialog
  closeDialog(): void {
    this.dialogRef.close();
  }

  // general function depending on the action needed eg. saving / editing
  actionButton(): void {
    return this.editData ? this.editArticle() : this.addArticle();
  }

  // function for displaying notification for every action
  openSnackBar(message: string): void {
    this._snackBar.open(message, '', {
      duration: 3000,
    });
  }

  // function for adding new article
  addArticle(): void {
    if (this.form.valid) {
      this.articleService.createArticle(this.form.value)
      .subscribe( res => {
        this.form.reset();
        this.dialogRef.close(res);
        let message = `${`Article ${res.id} added successfuly.`}`;
        this.openSnackBar(message);
      });
    }
  }

  // function for editing article
  editArticle(): void {
    if (this.editData) {
      this.articleService.updateArticle(this.editData.id, this.form.value)
      .subscribe( res => {
        this.dialogRef.close(res);
        this.form.reset();
        let message = `${`Article ${res.id} updated successfuly.`}`;
        this.openSnackBar(message);
      });
    }
  }

}
