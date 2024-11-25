import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

export interface NameCheckerResponse {
  "error": boolean,
  "status": number,
  "msg": string,
  "data": {
    "id": string,
    "username": string
  } 
}

@Injectable({
  providedIn: 'root'
})
export class NameCheckerService {

  private http = inject(HttpClient)

  getID(id?: string) {
    return this.http.get<NameCheckerResponse>('https://id-game-checker.p.rapidapi.com/pubgm-global/' + id, {
      headers: {
        'X-Rapidapi-Key': '809f52d640msh8ba44e260d0fe3ap1b72f0jsnadbfe7ffcafb',
      }
    })
  }
  constructor() { }
}
