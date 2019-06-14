import { BrowserModule, BrowserTransferStateModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, LOCALE_ID } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { CoreModule } from './core/core.module';
import { HeaderModule } from './shared/header/header.module';
import { LoadingModule } from './shared/loading/loading.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'palindromeApp' }),
    BrowserAnimationsModule,
    BrowserTransferStateModule,

    CoreModule,

    HeaderModule,
    LoadingModule,

    AppRoutingModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
