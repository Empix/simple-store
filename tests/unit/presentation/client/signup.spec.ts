import { SignUpController } from '../../../../src/presentation/controllers/client/signup';
import { HttpRequest } from '../../../../src/presentation/protocols/http';
import { FakeCreateClient } from '../../../mock/fakes/controllers/signup/create-client';
import { fakeSignUpRequestBody } from '../../../mock/fakes/controllers/signup/request-body';
import { FakeSignUpValidator } from '../../../mock/fakes/controllers/signup/validator';

function makeSut() {
  const createClient = new FakeCreateClient();
  const validator = new FakeSignUpValidator();
  const signUpController = new SignUpController(validator, createClient);

  return {
    sut: signUpController,
    validator,
    createClient,
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

  it('Should call validator for email, cpf and zipcode with correct values', () => {
    const { sut, validator } = makeSut();
    const isEmailSpy = jest.spyOn(validator, 'isEmail');
    const isCPFSpy = jest.spyOn(validator, 'isCPF');
    const isZipCodeSpy = jest.spyOn(validator, 'isZipCode');

    const httpRequest: HttpRequest = {
      body: fakeSignUpRequestBody,
    };

    sut.handle(httpRequest);

    const {
      email,
      cpf,
      address: { zipcode },
    } = fakeSignUpRequestBody;
    expect(isEmailSpy).toHaveBeenCalledTimes(1);
    expect(isEmailSpy).toHaveBeenCalledWith(email);
    expect(isCPFSpy).toHaveBeenCalledTimes(1);
    expect(isCPFSpy).toHaveBeenCalledWith(cpf);
    expect(isZipCodeSpy).toHaveBeenCalledTimes(1);
    expect(isZipCodeSpy).toHaveBeenCalledWith(zipcode);
  });

  it('Should return status code 400 if email is invalid', () => {
    const { sut, validator } = makeSut();
    jest.spyOn(validator, 'isEmail').mockReturnValueOnce(false);
    const fakeRequest = fakeSignUpRequestBody;
    const httpRequest: HttpRequest = {
      body: { ...fakeRequest, email: 'invalid_email' },
    };

    const result = sut.handle(httpRequest);

    expect(result.statusCode).toBe(400);
    expect(result.body?.errors).toBeTruthy();
    expect(result.body?.errors).toHaveLength(1);
  });

  it('Should return status code 400 if CPF is invalid', () => {
    const { sut, validator } = makeSut();
    jest.spyOn(validator, 'isEmail').mockReturnValueOnce(false);
    const fakeRequest = fakeSignUpRequestBody;
    const httpRequest: HttpRequest = {
      body: { ...fakeRequest, cpf: 'invalid_cpf' },
    };

    const result = sut.handle(httpRequest);

    expect(result.statusCode).toBe(400);
    expect(result.body?.errors).toBeTruthy();
    expect(result.body?.errors).toHaveLength(1);
  });

  it('Should return status code 400 if zipcode is invalid', () => {
    const { sut, validator } = makeSut();
    jest.spyOn(validator, 'isEmail').mockReturnValueOnce(false);
    const fakeRequest = fakeSignUpRequestBody;
    const httpRequest: HttpRequest = {
      body: { ...fakeRequest, zipcode: 'invalid_zipcode' },
    };

    const result = sut.handle(httpRequest);

    expect(result.statusCode).toBe(400);
    expect(result.body?.errors).toBeTruthy();
    expect(result.body?.errors).toHaveLength(1);
  });

  it('Should call createClient with correct values', () => {
    const { sut, createClient } = makeSut();
    const createSpy = jest.spyOn(createClient, 'create');

    const httpRequest: HttpRequest = {
      body: fakeSignUpRequestBody,
    };

    sut.handle(httpRequest);

    const { name, email, password, cpf } = fakeSignUpRequestBody;
    expect(createSpy).toHaveBeenCalledTimes(1);
    expect(createSpy).toHaveBeenCalledWith({
      name,
      email,
      password,
      cpf,
    });
  });
});
