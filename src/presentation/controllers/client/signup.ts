import { MissingParameter } from '../../errors/MissingParameter';
import { badRequest } from '../../helpers/http';
import { HttpRequest, HttpResponse } from '../../protocols/http';

export class SignUpController {
  handle(httpRequest: HttpRequest): HttpResponse {
    if (!httpRequest.body) {
      return badRequest([new MissingParameter('body')]);
    }

    const requiredFields = ['name', 'email', 'password', 'cpf', 'address'];
    const errors = requiredFields
      .map((field) => {
        if (!httpRequest.body!.hasOwnProperty(field)) {
          return new MissingParameter(field);
        }
        return null;
      })
      .filter((error): error is MissingParameter => error !== null);

    if (httpRequest.body.address) {
      const requiredAddressFields = ['street', 'city', 'state', 'zipcode'];
      errors.push(
        ...requiredAddressFields
          .map((field) => {
            if (!httpRequest.body!.address.hasOwnProperty(field)) {
              return new MissingParameter(`address.${field}`);
            }
            return null;
          })
          .filter((error): error is MissingParameter => error !== null),
      );
    }

    if (errors.length > 0) {
      return badRequest(errors);
    }

    return {
      statusCode: 200,
    };
  }
}
