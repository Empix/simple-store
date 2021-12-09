export class InvalidParameter extends Error {
  constructor(param: string) {
    super(`Invalid ${param} parameter.`);
  }
}
