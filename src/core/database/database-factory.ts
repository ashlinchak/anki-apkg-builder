import { IFileDestroyer } from '../utils/file-destroyer';
import { Sqlite3DatabaseAdapter } from './adapter/sqlite3-database-adapter';
import { IDatabase } from './database';

export type DatabaseProvider = 'sqlite3';

export type DatabaseFactoryParams = {
  provider: DatabaseProvider;
  filePath: string;
  /**
   * Force recreate database
   */
  forceRecreate: boolean;
};

export interface IDabaseFactory {
  create(params: DatabaseFactoryParams): IDatabase;
}

export class DatabaseFactory implements IDabaseFactory {
  constructor(private readonly fileDestroyer: IFileDestroyer) {}

  create(params: DatabaseFactoryParams): IDatabase {
    const { provider, filePath, forceRecreate } = params;

    if (forceRecreate) {
      this.fileDestroyer.destroy(filePath);
    }

    if (provider === 'sqlite3') {
      return new Sqlite3DatabaseAdapter(filePath);
    }

    return new Sqlite3DatabaseAdapter(filePath);
  }
}
