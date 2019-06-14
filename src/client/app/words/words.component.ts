import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

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
