export class MissingParameter extends Error {
  constructor(param: string) {
    super(`Missing ${param} parameter.`);
  }
}
