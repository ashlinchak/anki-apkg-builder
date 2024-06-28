import { IDatabase, QueryParams } from '../../../../src/main';

export class DatabaseMock implements IDatabase {
  exec(sql: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
  run(sql: string, params: QueryParams): Promise<number> {
    throw new Error('Method not implemented.');
  }
  get<T>(sql: string, params?: QueryParams | undefined): Promise<T> {
    throw new Error('Method not implemented.');
  }
  close(): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
