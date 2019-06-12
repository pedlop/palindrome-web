import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { WordSet, WordSetResponse } from './api.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private http: HttpClient
  ) { }

  createWords(words: WordSet): Observable<any> {
    const { first_word, second_word } = words;
    return this.http.post('/api/words', { first_word, second_word });
  }

  readWords(): Observable<WordSetResponse[]> {
    return this.http.get<WordSetResponse[]>('/api/words');
  }
}
