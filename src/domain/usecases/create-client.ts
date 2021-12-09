import { Client } from '../models/client';

export interface CreateClientValues {
  name: string;
  email: string;
  password: string;
  cpf: string;
}

export interface CreateClient {
  create(client: CreateClientValues): Client;
}
