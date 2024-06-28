import { IDatabaseSeeder } from '../../../../../src/main';

export class DatabaseSeederMock implements IDatabaseSeeder {
  async seed(): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
