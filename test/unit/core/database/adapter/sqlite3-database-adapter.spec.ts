import { DbPath, Sqlite3DatabaseAdapter, QueryParams } from '../../../../../src/main';

class MockDatabase {
  exec(sql: string, callback: (err: Error | null) => void) {
    callback(null);
  }
  prepare() {
    return {
      run: (params: Record<string, unknown>, callback: (err: Error | null) => void) => {
        callback.bind({ lastID: 1 })(null);
      },
    };
  }
  close(callback: (err: Error | null) => void) {
    callback(null);
  }
  get<T>(sql: string, params: Record<string, unknown>, callback: (err: Error | null, entity?: T) => void) {
    callback(null, {} as T);
  }
}

jest.mock('sqlite3', () => {
  return {
    verbose: jest.fn(() => ({
      Database: MockDatabase,
    })),
  };
});

describe('Sqlite3DatabaseAdapter', () => {
  const dbPath: DbPath = ':memory:';
  let adapter: Sqlite3DatabaseAdapter;

  beforeEach(() => {
    adapter = new Sqlite3DatabaseAdapter(dbPath);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('exec', () => {
    it('should execute SQL without parameters', async () => {
      const sql = 'CREATE TABLE test (id INTEGER PRIMARY KEY)';
      const execSpy = jest.spyOn(MockDatabase.prototype, 'exec');

      execSpy.mockImplementation((sql, callback) => callback(null));

      await expect(adapter.exec(sql)).resolves.toBeUndefined();
      expect(execSpy).toHaveBeenCalledWith(sql, expect.any(Function));
    });

    it('should handle errors in exec', async () => {
      const sql = 'CREATE TABLE test (id INTEGER PRIMARY KEY)';
      const execSpy = jest.spyOn(MockDatabase.prototype, 'exec');
      const error = new Error('Test error');

      execSpy.mockImplementation((sql, callback) => callback(error));

      await expect(adapter.exec(sql)).rejects.toThrow('Test error');
    });
  });

  describe('run', () => {
    it('should execute SQL with parameters', async () => {
      const sql = 'INSERT INTO test (name) VALUES ($name)';
      const params: QueryParams = { name: 'test' };
      const prepareSpy = jest.spyOn(MockDatabase.prototype, 'prepare');
      const runSpy = jest.fn().mockImplementation((params, callback) => callback.bind({ lastID: 1 })(null));
      prepareSpy.mockImplementation(() => ({ run: runSpy }));

      await expect(adapter.run(sql, params)).resolves.toBeDefined();
      expect(prepareSpy).toHaveBeenCalledWith(sql);
      expect(runSpy).toHaveBeenCalledWith({ $name: 'test' }, expect.any(Function));
    });

    it('should handle errors in run', async () => {
      const sql = 'INSERT INTO test (name) VALUES ($name)';
      const params: QueryParams = { name: 'test' };
      const prepareSpy = jest.spyOn(MockDatabase.prototype, 'prepare');
      const error = new Error('Test error');
      const runSpy = jest.fn().mockImplementation((params, callback) => callback(error));
      prepareSpy.mockImplementation(() => ({ run: runSpy }));

      await expect(adapter.run(sql, params)).rejects.toThrow('Test error');
    });
  });

  describe('close', () => {
    it('should close the database', async () => {
      const closeSpy = jest.spyOn(MockDatabase.prototype, 'close');

      closeSpy.mockImplementation((callback) => callback(null));

      await expect(adapter.close()).resolves.toBeUndefined();
      expect(closeSpy).toHaveBeenCalledWith(expect.any(Function));
    });

    it('should handle errors in close', async () => {
      const closeSpy = jest.spyOn(MockDatabase.prototype, 'close');
      const error = new Error('Test error');

      closeSpy.mockImplementation((callback) => callback(error));

      await expect(adapter.close()).rejects.toThrow('Test error');
    });
  });

  describe('get', () => {
    it('should retrieve a record', async () => {
      const sql = 'SELECT * FROM test WHERE id = $id';
      const params: QueryParams = { id: 1 };
      const mockEntity = { id: 1, name: 'test' };
      const getSpy = jest.spyOn(MockDatabase.prototype, 'get');

      getSpy.mockImplementation((sql, params, callback) => callback(null, mockEntity));

      await expect(adapter.get(sql, params)).resolves.toEqual(mockEntity);
      expect(getSpy).toHaveBeenCalledWith(sql, { $id: 1 }, expect.any(Function));
    });

    it('should handle errors in get', async () => {
      const sql = 'SELECT * FROM test WHERE id = $id';
      const params: QueryParams = { id: 1 };
      const getSpy = jest.spyOn(MockDatabase.prototype, 'get');
      const error = new Error('Test error');

      getSpy.mockImplementation((sql, params, callback) => callback(error));

      await expect(adapter.get(sql, params)).rejects.toThrow('Test error');
    });
  });
});
