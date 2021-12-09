import {
  CreateClient,
  CreateClientValues,
} from '../../../../../src/domain/usecases/create-client';

export class FakeCreateClient implements CreateClient {
  create(client: CreateClientValues) {
    const { name, email, password, cpf } = client;

    return {
      id: 'id',
      name,
      email,
      password,
      cpf,
      created_at: new Date(),
      updated_at: new Date(),
    };
  }
}
