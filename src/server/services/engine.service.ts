import { join } from 'path';

import { Application } from 'express';

import { ngExpressEngine } from '@nguniversal/express-engine';
import { provideModuleMap } from '@nguniversal/module-map-ngfactory-loader';

const express = require('express');

export function register(app: Application, AppServerModuleNgFactory: any, LAZY_MODULE_MAP: any): void {
  app.use('/', express.static(join(__dirname, './browser'), { index: false }));
  app.set('view engine', 'html');
  app.set('views', join(__dirname, './browser'));
  app.engine('html',
    ngExpressEngine({
      bootstrap: AppServerModuleNgFactory,
      providers: [
        provideModuleMap(LAZY_MODULE_MAP)
      ]
    })
  );
}
