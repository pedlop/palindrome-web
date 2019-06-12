export const SERVER_RESPONSE = 'SERVER_RESPONSE';

export interface ResolverModel<T> {
  success?: T;
  error?: ResolverErrorModel;
}

export interface ResolverErrorModel {
  status: number;
  error_description: string;
}
