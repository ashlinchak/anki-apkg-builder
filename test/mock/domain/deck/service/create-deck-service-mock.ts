import { ICreateDeckService, CreateDeckParams, DeckEntity } from '../../../../../src/main';

export class CreateDeckServiceMock implements ICreateDeckService {
  async execute(params: CreateDeckParams): Promise<DeckEntity> {
    throw new Error('Method not implemented.');
  }
}
