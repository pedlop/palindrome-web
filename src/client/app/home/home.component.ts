import { Component, OnInit, ChangeDetectionStrategy, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { MatSnackBar } from '@angular/material/snack-bar';

import { Subject } from 'rxjs';
import { finalize, takeUntil, tap } from 'rxjs/operators';

import { ApiService } from '../core/api/api.service';

@Component({
  selector: 'max-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit, OnDestroy {

  private readonly unsubscribe: Subject<void>;

  wordsForm: FormGroup;
  loading: boolean;

  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private formBuilder: FormBuilder,
    private apiService: ApiService,
    private snackbar: MatSnackBar
  ) {
    this.unsubscribe = new Subject();
    this.loading = false;
  }

  ngOnInit(): void {
    this.wordsForm = this.formBuilder.group({
      first_word: ['', Validators.compose([Validators.required, Validators.minLength(2)])],
      second_word: ['', Validators.compose([Validators.required, Validators.minLength(2)])]
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }

  onSubmitWordsToJudgement() {
    this.loading = true;
    this.apiService.createWords(this.wordsForm.getRawValue()).pipe(
      takeUntil(this.unsubscribe),
      tap(() => this.changeDetectorRef.markForCheck()),
      finalize(() => {
        this.loading = false;
        this.wordsForm.reset();
      })
    ).subscribe(this.handleSuccessResponse, this.handleErrorResponse);
  }

  getErrorMessage(attribute: 'first_word' | 'second_word') {
    return this.wordsForm.controls[attribute].hasError('required') ? 'Você precisa digitar algum valor' :
      this.wordsForm.controls[attribute].hasError('minLength') ? 'A palavra tem que ter no mínimo 3 letras' :
        '';
  }

  private handleSuccessResponse = (response) => {
    this.loading = false;
    this.snackbar.open(response.message, '', {
      duration: 500000,
      panelClass: 'snackbar-success'
    });
  }

  private handleErrorResponse = (response) => {
    this.loading = false;
    this.snackbar.open(
      response.error.error_description || 'Desculpe, mas algo deu errado no nosso servidor. Por favor, tente novamente.',
      '',
      {
        duration: 4000,
        panelClass: 'snackbar-error'
      }
    );
  }

}
