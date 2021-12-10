import { HttpResponse } from '../protocols/http';

export const badRequest = (errors: Error[]): HttpResponse => ({
  statusCode: 400,
  body: {
    errors: errors.map((error) => error.message),
  },
});

export const internalServerError = (): HttpResponse => ({
  statusCode: 500,
  body: {
    errors: ['An unknown error has occurred.'],
  },
});
