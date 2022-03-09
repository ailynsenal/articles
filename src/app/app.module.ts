import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { ArticlesComponent } from './article/component/articles/articles.component';
import { ArticleComponent } from './article/component/article/article.component';
import { DialogComponent } from './article/component/dialog/dialog.component';
import { LoginComponent } from './components/login/login.component';

import { ArticleService } from 'src/app/services/article.service';
import { LoginGuard } from './auth/login.guard';
import { RegisterComponent } from './components/register/register.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ArticlesComponent,
    ArticleComponent,
    DialogComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatGridListModule,
    MatCardModule,
    MatDialogModule,
    MatFormFieldModule,
    MatSelectModule,
    MatSnackBarModule,
    MatProgressSpinnerModule
  ],
  providers: [
    ArticleService,
    LoginGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
