import 'zone.js/dist/zone-node';
import 'reflect-metadata';

import { Application } from 'express';

import * as express from 'express';

const bodyParser = require('body-parser');
const proxy = require('express-http-proxy');

import * as EngineService from './services/engine.service';
import * as SSRService from './services/ssr.service';

import { CONFIGURATION } from './services/configuration.service';

const { AppServerModuleNgFactory, LAZY_MODULE_MAP } = require('./main');

export default (action?: any): Application => {
  const application = express();

  application.use(bodyParser.json());

  application.use('/api', proxy(`https://${CONFIGURATION.api.host}`));

  if (CONFIGURATION.production) {
    EngineService.register(application, AppServerModuleNgFactory, LAZY_MODULE_MAP);
    SSRService.mainRoute(application);
  } else {

  }

  if (action) {
    action(application);
  }

  return application;
};
