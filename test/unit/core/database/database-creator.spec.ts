import { DatabaseCreator, IDatabase } from '../../../../src/main';
import { DatabaseMock } from '../../../mock/core/database/database-mock';

describe('DatabaseCreator', () => {
  let databaseCreator: DatabaseCreator;
  let db: IDatabase;

  beforeEach(() => {
    db = new DatabaseMock();
    databaseCreator = new DatabaseCreator(db);
  });

  describe('create', () => {
    it('should load db schema', async () => {
      db.exec = jest.fn();

      await databaseCreator.create();

      expect(db.exec).toHaveBeenCalledWith(expect.any(String));
    });
  });
});
