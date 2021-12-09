import { MissingParameter } from '../../errors/MissingParameter';
import { badRequest } from '../../helpers/http';
import { HttpRequest, HttpResponse } from '../../protocols/http';

export class SignUpController {
  handle(httpRequest: HttpRequest): HttpResponse {
    if (!httpRequest.body) {
      return badRequest([new MissingParameter('body')]);
    }

    return {
      statusCode: 200,
    };
  }
}
