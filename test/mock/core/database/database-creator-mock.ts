import { IDatabaseCreator } from '../../../../src/main';

export class DatabaseCreatorMock implements IDatabaseCreator {
  async create(): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
