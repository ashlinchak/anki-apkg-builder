import { DatabaseFactoryParams, IDabaseFactory, IDatabase } from '../../../../src/main';

export class DatabaseFactoryMock implements IDabaseFactory {
  create(params: DatabaseFactoryParams): IDatabase {
    throw new Error('Method not implemented.');
  }
}
