import { ICreateCardService, CreateCardParams, CardEntity } from '../../../../../src/main';

export class CreateCardServiceMock implements ICreateCardService {
  execute(params: CreateCardParams): Promise<CardEntity> {
    throw new Error('Method not implemented.');
  }
}
