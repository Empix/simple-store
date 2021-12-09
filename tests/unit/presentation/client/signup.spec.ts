import { SignUpController } from '../../../../src/presentation/controllers/client/signup';
import { HttpRequest } from '../../../../src/presentation/protocols/http';
import { fakeSignUpRequestBody } from '../../../mock/fakes/signup.request-body';

describe('SignUp Controller', () => {
  it('Should return status code 400 if body is not provided', () => {
    const sut = new SignUpController();
    const httpRequest: HttpRequest = {};

    const result = sut.handle(httpRequest);

    expect(result.statusCode).toBe(400);
    expect(result.body?.errors).toBeTruthy();
    expect(result.body?.errors).toHaveLength(1);
  });

  it('Should return status code 400 if name is not provided', () => {
    const sut = new SignUpController();
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
    const sut = new SignUpController();
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
    const sut = new SignUpController();
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
    const sut = new SignUpController();
    const { cpf, ...fakeRequest } = fakeSignUpRequestBody;
    const httpRequest: HttpRequest = {
      body: fakeRequest,
    };

    const result = sut.handle(httpRequest);

    expect(result.statusCode).toBe(400);
    expect(result.body?.errors).toBeTruthy();
    expect(result.body?.errors).toHaveLength(1);
  });
});
