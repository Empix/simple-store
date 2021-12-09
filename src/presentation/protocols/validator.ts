export interface SignUpValidator {
  isEmail(email: string): boolean;
  isCPF(cpf: string): boolean;
  isZipCode(zipcode: string): boolean;
}
