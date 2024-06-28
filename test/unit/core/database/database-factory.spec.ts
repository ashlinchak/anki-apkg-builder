import { IFileDestroyer } from '../../../../src/core/utils/file-destroyer';
import { DatabaseFactory } from '../../../../src/main';
import { DatabaseMock } from '../../../mock/core/database/database-mock';
import { FileDestroyerMock } from '../../../mock/core/utils/file-destroyer-mock';

jest.mock('../../../../src/core/database/adapter/sqlite3-database-adapter', () => {
  return {
    Sqlite3DatabaseAdapter: jest.fn().mockImplementation(() => {
      return new DatabaseMock();
    }),
  };
});


describe('DatabaseFactory', () => {
  let databaseFactory: DatabaseFactory;
  let fileDestroyer: IFileDestroyer;

  beforeEach(() => {
    fileDestroyer = new FileDestroyerMock();
    databaseFactory = new DatabaseFactory(fileDestroyer);
  });

  describe('create', () => {
    it('should create a database with sqlite3 adapter', async () => {
      const database = await databaseFactory.create({
        provider: 'sqlite3',
        filePath: 'db.sqlite3',
        forceRecreate: false,
      });

      expect(database).toBeTruthy();
    });

    it('should re-create a database', async () => {
      fileDestroyer.destroy = jest.fn();

      const database = await databaseFactory.create({
        provider: 'sqlite3',
        filePath: 'db.sqlite3',
        forceRecreate: true,
      });

      expect(database).toBeTruthy();
      expect(fileDestroyer.destroy).toHaveBeenCalledWith('db.sqlite3');
    });
  });
});
