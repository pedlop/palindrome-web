import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: './home/home.module#HomeModule' },
  { path: 'list', loadChildren: './words/words.module#WordsModule' },
  { path: '404', loadChildren: './not-found/not-found.module#NotFoundModule' },
  { path: '500', loadChildren: './internal-error/internal-error.module#InternalErrorModule' },
  { path: '**', redirectTo: '/404' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    enableTracing: false,
    initialNavigation: 'enabled',
    scrollPositionRestoration: 'enabled',
    preloadingStrategy: PreloadAllModules
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
