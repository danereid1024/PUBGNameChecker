import { HttpClientModule } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NameCheckerResponse, NameCheckerService } from './name-checker.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HttpClientModule, FormsModule, CommonModule],
  template: `
  <h1>PUBG Name Checker</h1>
  <div>
    <pre>
      <code>
      {{nameData?.data?.username | json}}
      </code>
    </pre>
  </div>
  <input type="text" [(ngModel)]="id" name="id">
  <button (click)="getID()">Get PUBG Name</button>
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
