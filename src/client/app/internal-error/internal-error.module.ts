import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material';

import { InternalErrorRoutingModule } from './internal-error-routing.module';
import { InternalErrorComponent } from './internal-error.component';

@NgModule({
  declarations: [InternalErrorComponent],
  imports: [
    CommonModule,
    InternalErrorRoutingModule,
    MatButtonModule
  ]
})
export class InternalErrorModule { }
