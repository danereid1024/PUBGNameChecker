import { HttpClientModule } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NameCheckerResponse, NameCheckerService } from './name-checker.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';


@Component({
    selector: 'app-root',
    standalone: true,
    imports: [RouterOutlet, HttpClientModule, FormsModule, CommonModule, MatButtonModule, MatInputModule, MatFormFieldModule],
    template: `
  <div class="title">
  <h1>PUBG Name Checker</h1>
  </div>
  <div class="description">
  <h2>Search for a user's name</h2>
  <h6>Enter the user's ID to see their username</h6>
  </div>
  <div class="search">
      {{nameData?.data?.username}}
      <div *ngIf="nameData?.msg === 'id_found'">
        User found!
      </div>
  </div>
  <mat-form-field appearance="fill">
  <input matInput class="text" type="text" [(ngModel)]="id" name="id">
  </mat-form-field>
  
  <div class="button">
  <button mat-flat-button (click)="getID()">Check ID</button>
  </div>
  
  `,
    styles: `
    .title{
      text-align: center; 
    }
    .search{
      text-align: center;
      margin-left: 30%;
      margin-right: 30%;
      display: block;
      code {
        margin-left: none;
      }
    }
    input {
      text-align: center;
    }
    .description{
      text-align: center;
    }
    mat-form-field {
      text-align: center;
      margin-left: 30%;
      margin-right: 30%;
      display: block;
    }
    .button {
      text-align: center;
      display: block;
    }
    button{
      width: 200px;
    }
  `
})
export class AppComponent {

  nameCheckerService = inject(NameCheckerService);

  id = ''
  nameData?: NameCheckerResponse;

  getID() {

    if (this.id.trim() === '') {
      alert("Please insert user ID!")
    }

    this.nameCheckerService.getID(this.id).subscribe({  
      next: (data) => {
        this.nameData = data;
        data.status
        console.log(
          this.nameData?.error,
          this.nameData?.status,
          this.nameData?.msg
        )
        if (this.nameData?.msg === 'id_not_found' || this.nameData?.error) {
          alert("Invalid user ID!");
          }
      },
      error: (err) => {
        console.error(err);
      },
  });
  } 
}
