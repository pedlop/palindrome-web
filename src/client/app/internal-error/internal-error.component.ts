import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'law-internal-error',
  templateUrl: './internal-error.component.html',
  styleUrls: ['./internal-error.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InternalErrorComponent implements OnInit {

  constructor(
    private changeDetectorRef: ChangeDetectorRef
  ) { }

  ngOnInit() {
  }

}
