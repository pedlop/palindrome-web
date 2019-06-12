import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, Optional, Inject } from '@angular/core';

@Component({
  selector: 'law-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class NotFoundComponent implements OnInit {

  constructor(
    @Optional() @Inject('SERVER_RESPONSE') private response,
    private changeDetectorRef: ChangeDetectorRef
  ) { }

  ngOnInit() {
    if (this.response) {
      this.response.status(404);
    }
  }

}
