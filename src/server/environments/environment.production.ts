import { commonEnvironment } from '../../util/enviroments/environment.production';

export const environment = {
  ...commonEnvironment,
  cookie: {
    name: 'palindrome-credentials'
  }
};
