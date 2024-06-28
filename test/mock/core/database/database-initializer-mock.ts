import { IDatabaseInitializer } from '../../../../src/main';

export class DatabaseInitializerMock implements IDatabaseInitializer {
  async initialize(): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
