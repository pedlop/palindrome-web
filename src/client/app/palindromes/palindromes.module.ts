import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PalindromesRoutingModule } from './palindromes-routing.module';
import { PalindromesComponent } from './palindromes.component';

@NgModule({
  declarations: [PalindromesComponent],
  imports: [
    CommonModule,
    PalindromesRoutingModule
  ]
})
export class PalindromesModule { }
