import { HttpClientModule } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NameCheckerResponse, NameCheckerService } from './name-checker.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
    selector: 'app-root',
    imports: [RouterOutlet, HttpClientModule, FormsModule, CommonModule],
    template: `
  <div class="title">
  <h1>PUBG Name Checker</h1>
  </div>
  
  <div class="search">
    <pre>
      <code>
      {{nameData?.data?.username | json}}
      </code>
    </pre>
  </div>
  <input type="text" [(ngModel)]="id" name="id">
  <div class="button">
  <button (click)="getID()">Check</button>
  </div>
  
  `,
    styles: `
  h1 {
    color:red
  }
  `
})
export class AppComponent {

  nameCheckerService = inject(NameCheckerService);

  id = ''
  nameData?: NameCheckerResponse;

  getID() {
    this.nameCheckerService.getID(this.id).subscribe({  
      next: (data) => {
        this.nameData = data;
        data.status
      },
      error: (err) => {
        console.error(err);
      },
  });
  }

}
