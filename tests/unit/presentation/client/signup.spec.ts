import { SignUpController } from '../../../../src/presentation/controllers/client/signup';
import { HttpRequest } from '../../../../src/presentation/protocols/http';

describe('SignUp Controller', () => {
  it('Should return status code 400 if body is not provided', () => {
    const sut = new SignUpController();
    const httpRequest: HttpRequest = {};

    const result = sut.handle(httpRequest);

    expect(result.statusCode).toBe(400);
    expect(result.body?.errors).toBeTruthy();
    expect(result.body?.errors).toHaveLength(1);
  });
});
