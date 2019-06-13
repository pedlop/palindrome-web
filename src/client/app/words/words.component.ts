import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { tap, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { WordSetResponse } from '../core/api/api.model';

@Component({
  selector: 'max-words',
  templateUrl: './words.component.html',
  styleUrls: ['./words.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WordsComponent implements OnInit {

  wordSets$: Observable<any>;

  constructor(
    private router: ActivatedRoute
  ) { }

  ngOnInit() {
    this.wordSets$ = this.router.data.pipe(
      map(response => response.data)
    );
  }

  trackByFn(index: number, wordset: any): any {
    return wordset._id;
  }

}
