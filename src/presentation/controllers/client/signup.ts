import { CreateClient } from '../../../domain/usecases/create-client';
import { InvalidParameter } from '../../errors/InvalidParameter';
import { MissingParameter } from '../../errors/MissingParameter';
import { badRequest, internalServerError, ok } from '../../helpers/http';
import { HttpRequest, HttpResponse } from '../../protocols/http';
import { SignUpValidator } from '../../protocols/validator';

export class SignUpController {
  constructor(
    private readonly validator: SignUpValidator,
    private readonly createClient: CreateClient,
  ) {}

  async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      if (!httpRequest.body) {
        return badRequest([new MissingParameter('body')]);
      }

      const requiredFields = ['name', 'email', 'password', 'cpf', 'address'];
      const requiredFieldsErrors = requiredFields
        .map((field) => {
          if (!httpRequest.body!.hasOwnProperty(field)) {
            return new MissingParameter(field);
          }
          return null;
        })
        .filter((error): error is MissingParameter => error !== null);

      if (httpRequest.body.address) {
        const requiredAddressFields = ['street', 'city', 'state', 'zipcode'];
        requiredFieldsErrors.push(
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

      if (requiredFieldsErrors.length > 0) {
        return badRequest(requiredFieldsErrors);
      }

      const {
        email,
        cpf,
        name,
        password,
        address: { zipcode },
      } = httpRequest.body;

      const validationFields = {
        email: this.validator.isEmail(email),
        cpf: this.validator.isCPF(cpf),
        zipcode: this.validator.isZipCode(zipcode),
      };
      const validationErrors = Object.entries(validationFields)
        .map(([field, isValid]) => {
          if (!isValid) {
            return new InvalidParameter(field);
          }
          return null;
        })
        .filter((error): error is InvalidParameter => error !== null);

      if (validationErrors.length > 0) {
        return badRequest(validationErrors);
      }

      const client = await this.createClient.create({
        name,
        email,
        password,
        cpf,
      });

      return ok(client);
    } catch (err) {
      return internalServerError();
    }
  }
}
