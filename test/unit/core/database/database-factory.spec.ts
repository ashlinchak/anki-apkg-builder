import { IFileDestroyer } from '../../../../src/core/utils/file-destroyer';
import { DatabaseFactory, Sqlite3DatabaseAdapter } from '../../../../src/main';
import { FileDestroyerMock } from '../../../mock/core/utils/file-destroyer-mock';

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

      expect(database).toBeInstanceOf(Sqlite3DatabaseAdapter);
    });

    it('should re-create a database', async () => {
      fileDestroyer.destroy = jest.fn();

      const database = await databaseFactory.create({
        provider: 'sqlite3',
        filePath: 'db.sqlite3',
        forceRecreate: true,
      });

      expect(database).toBeInstanceOf(Sqlite3DatabaseAdapter);
      expect(fileDestroyer.destroy).toHaveBeenCalledWith('db.sqlite3');
    });
  });
});
