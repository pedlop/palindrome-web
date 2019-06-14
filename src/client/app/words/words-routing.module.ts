import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WordsComponent } from './words.component';
import { WordsResolverService } from './words-resolver.service';

const routes: Routes = [
  { path: '', component: WordsComponent, resolve: { data: WordsResolverService } }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WordsRoutingModule { }
