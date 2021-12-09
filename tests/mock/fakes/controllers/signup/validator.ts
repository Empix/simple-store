import { SignUpValidator } from '../../../../../src/presentation/protocols/validator';

export class FakeSignUpValidator implements SignUpValidator {
  isEmail(): boolean {
    return true;
  }

  isCPF(): boolean {
    return true;
  }

  isZipCode(): boolean {
    return true;
  }
}
