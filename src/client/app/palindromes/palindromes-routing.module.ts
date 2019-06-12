import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PalindromesComponent } from './palindromes.component';

const routes: Routes = [
  { path: '', component: PalindromesComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PalindromesRoutingModule { }
