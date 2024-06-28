import { readFile } from 'fs/promises';
import { join } from 'path';
import { IDatabase } from './database';

export interface IDatabaseCreator {
  create(): Promise<void>;
}

export class DatabaseCreator implements IDatabaseCreator {
  constructor(private readonly db: IDatabase) {}

  async create(): Promise<void> {
    await this.loadSchema();
  }

  private async loadSchema(): Promise<void> {
    const schemaSqlPath = join(__dirname, '..', '..', '..', 'static', 'sql', 'schema.sql');
    const sql = await readFile(schemaSqlPath, 'utf-8');
    return this.db.exec(sql);
  }
}
