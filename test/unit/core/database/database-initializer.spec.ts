import { DatabaseInitializer, IDatabaseCreator, IDatabaseSeeder } from '../../../../src/main';
import { DatabaseCreatorMock } from '../../../mock/core/database/database-creator-mock';
import { DatabaseSeederMock } from '../../../mock/core/database/seed/database-seeder-mock';

describe('DatabaseInitializer', () => {
  let databaseInitializer: DatabaseInitializer;
  let databaseCreator: IDatabaseCreator;
  let databaseSeeder: IDatabaseSeeder;

  beforeEach(() => {
    databaseCreator = new DatabaseCreatorMock();
    databaseSeeder = new DatabaseSeederMock();
    databaseInitializer = new DatabaseInitializer(databaseCreator, databaseSeeder);
  });

  describe('initialize', () => {
    it('should initialize database', async () => {
      databaseCreator.create = jest.fn();
      databaseSeeder.seed = jest.fn();

      await databaseInitializer.initialize();

      expect(databaseCreator.create).toHaveBeenCalled();
      expect(databaseSeeder.seed).toHaveBeenCalled();
    });

    it('should not initialize database if already initialized', async () => {
      databaseCreator.create = jest.fn();
      databaseSeeder.seed = jest.fn();

      await databaseInitializer.initialize();
      await databaseInitializer.initialize();

      expect(databaseCreator.create).toHaveBeenCalledTimes(1);
      expect(databaseSeeder.seed).toHaveBeenCalledTimes(1);
    });
  });
});
