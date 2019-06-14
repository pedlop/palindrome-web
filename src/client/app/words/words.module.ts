import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

import { WordsRoutingModule } from './words-routing.module';
import { WordsComponent } from './words.component';

@NgModule({
  declarations: [WordsComponent],
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    WordsRoutingModule
  ]
})
export class WordsModule { }
