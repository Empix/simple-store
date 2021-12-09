import { SignUpController } from '../../../../src/presentation/controllers/client/signup';
import { HttpRequest } from '../../../../src/presentation/protocols/http';
import { fakeSignUpRequestBody } from '../../../mock/fakes/controllers/signup/request-body';
import { FakeSignUpValidator } from '../../../mock/fakes/controllers/signup/validator';

function makeSut() {
  const validator = new FakeSignUpValidator();
  const signUpController = new SignUpController(validator);

  return {
    sut: signUpController,
    validator,
  };
}

describe('SignUp Controller', () => {
  it('Should return status code 400 if body is not provided', () => {
    const { sut } = makeSut();
    const httpRequest: HttpRequest = {};

    const result = sut.handle(httpRequest);

    expect(result.statusCode).toBe(400);
    expect(result.body?.errors).toBeTruthy();
    expect(result.body?.errors).toHaveLength(1);
  });

  it('Should return status code 400 if name is not provided', () => {
    const { sut } = makeSut();
    const { email, ...fakeRequest } = fakeSignUpRequestBody;
    const httpRequest: HttpRequest = {
      body: fakeRequest,
    };

    const result = sut.handle(httpRequest);

    expect(result.statusCode).toBe(400);
    expect(result.body?.errors).toBeTruthy();
    expect(result.body?.errors).toHaveLength(1);
  });

  it('Should return status code 400 if email is not provided', () => {
    const { sut } = makeSut();
    const { name, ...fakeRequest } = fakeSignUpRequestBody;
    const httpRequest: HttpRequest = {
      body: fakeRequest,
    };

    const result = sut.handle(httpRequest);

    expect(result.statusCode).toBe(400);
    expect(result.body?.errors).toBeTruthy();
    expect(result.body?.errors).toHaveLength(1);
  });

  it('Should return status code 400 if password is not provided', () => {
    const { sut } = makeSut();
    const { password, ...fakeRequest } = fakeSignUpRequestBody;
    const httpRequest: HttpRequest = {
      body: fakeRequest,
    };

    const result = sut.handle(httpRequest);

    expect(result.statusCode).toBe(400);
    expect(result.body?.errors).toBeTruthy();
    expect(result.body?.errors).toHaveLength(1);
  });

  it('Should return status code 400 if cpf is not provided', () => {
    const { sut } = makeSut();
    const { cpf, ...fakeRequest } = fakeSignUpRequestBody;
    const httpRequest: HttpRequest = {
      body: fakeRequest,
    };

    const result = sut.handle(httpRequest);

    expect(result.statusCode).toBe(400);
    expect(result.body?.errors).toBeTruthy();
    expect(result.body?.errors).toHaveLength(1);
  });

  it('Should return status code 400 if address is not provided', () => {
    const { sut } = makeSut();
    const { address, ...fakeRequest } = fakeSignUpRequestBody;
    const httpRequest: HttpRequest = {
      body: fakeRequest,
    };

    const result = sut.handle(httpRequest);

    expect(result.statusCode).toBe(400);
    expect(result.body?.errors).toBeTruthy();
    expect(result.body?.errors).toHaveLength(1);
  });

  it('Should return status code 400 if address props is not provided', () => {
    const { sut } = makeSut();
    const { address, ...fakeRequest } = fakeSignUpRequestBody;
    const httpRequest: HttpRequest = {
      body: { ...fakeRequest, address: {} },
    };

    const result = sut.handle(httpRequest);

    expect(result.statusCode).toBe(400);
    expect(result.body?.errors).toBeTruthy();
    expect(result.body?.errors).toHaveLength(4);
  });

  it('Should call validator for email, cpf and zipcode', () => {
    const { sut, validator } = makeSut();
    const isEmailSpy = jest.spyOn(validator, 'isEmail');
    const isCPFSpy = jest.spyOn(validator, 'isCPF');
    const isZipCodeSpy = jest.spyOn(validator, 'isZipCode');

    const httpRequest: HttpRequest = {
      body: fakeSignUpRequestBody,
    };

    sut.handle(httpRequest);

    expect(isEmailSpy).toHaveBeenCalledTimes(1);
    expect(isCPFSpy).toHaveBeenCalledTimes(1);
    expect(isZipCodeSpy).toHaveBeenCalledTimes(1);
  });
});
