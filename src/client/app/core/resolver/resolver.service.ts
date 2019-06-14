import { Inject, Injectable, Optional, PLATFORM_ID } from '@angular/core';
import { makeStateKey, TransferState } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { isPlatformServer } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';

import { Observable, of, throwError } from 'rxjs';
import { catchError, first, tap } from 'rxjs/operators';

import { ResolverModel, SERVER_RESPONSE } from '../../../../util/models/resolver.model';

@Injectable({
  providedIn: 'root'
})
export class ResolverService {

  private readonly isServer: boolean;
  private readonly defaultErrorMessage = 'Unable to complete your request, try again later';

  constructor(
    @Optional() @Inject(SERVER_RESPONSE) private serverResponse: any,
    @Inject(PLATFORM_ID) private platformId: any,
    private transferState: TransferState,
    private router: Router
  ) {
    this.isServer = isPlatformServer(this.platformId);
  }

  handleRequest<T>(request: Observable<T>, key: string): Observable<T> {
    const stateKey = makeStateKey<ResolverModel<T>>(key);
    if (this.transferState.hasKey(stateKey)) {
      const response = this.transferState.get<ResolverModel<T>>(stateKey, null as any);
      this.transferState.remove(stateKey);
      if (response.error) {
        if (response.error.status === 404 || response.error.status === 410) {
          this.router.navigate(['/404']);
        } else {
          this.router.navigate(['/500']);
        }
        return throwError(response);
      } else {
        return of(response.success).pipe(
          first()
        );
      }
    } else {
      return request.pipe(
        tap(data => this.isServer && this.transferState.onSerialize(stateKey, () => ({ success: data }))),
        catchError((response: HttpErrorResponse) => {
          const message = response ? response.message || this.defaultErrorMessage : this.defaultErrorMessage;
          let status;
          try {
            status = response.status || 500;
          } catch (exception) {
            status = 500;
          } finally {
            if (isPlatformServer(this.platformId)) {
              this.transferState.onSerialize(stateKey, () => ({ error: { status, error_description: message } }));
            }
            if (status === 404 || status === 410) {
              this.router.navigate(['/404']);
            } else {
              this.router.navigate(['/500']);
            }
            if (this.serverResponse) {
              this.serverResponse.statusCode = status;
            }
          }
          return throwError({ status, error_description: message });
        }),
        first()
      );
    }
  }

}
