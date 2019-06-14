import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { PageService } from 'ngx-seo-page';

import { ApiService } from '../core/api/api.service';
import { ResolverService } from '../core/resolver/resolver.service';

@Injectable({
  providedIn: 'root'
})
export class WordsResolverService implements Resolve<any> {

  constructor(
    private apiService: ApiService,
    private resolveService: ResolverService,
    private pageService: PageService
  ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    const request = this.apiService.readWords().pipe(
      tap(this.handlePage)
    );
    return this.resolveService.handleRequest(request, 'words-page');
  }

  private handlePage = (wordsSets: any) => {
    const pageDescription = 'Seja bem-vindo ao nosso site, vamos julgar se suas duas palavras são palíndromos ou não!';
    const pageKeywords = 'palindromo, palavras';
    this.pageService.updatePage({
      title: 'Julga Palíndromo - Verifique suas palavras ou frases',
      metatags: [
        { name: 'description', content: pageDescription },
        { name: 'keywords', content: pageKeywords },
        { name: 'og:url', content: 'https://palindromo-web.herokuapp.com/' },
        { name: 'og:title', content: 'Enquete Empreendimentos' },
        { name: 'og:description', content: pageDescription },
        { name: 'twitter:card', content: 'app' },
        { name: 'twitter:description', content: pageDescription },
        { name: 'twitter:app:country', content: 'BR' }
      ]
    });
  }

}
