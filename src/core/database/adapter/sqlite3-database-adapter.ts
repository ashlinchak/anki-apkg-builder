import * as sqlite3 from 'sqlite3';
import { IDatabase, QueryParams } from '../database';

export type DbPath = string | ':memory:';
const parameterPrefix = '$';

export class Sqlite3DatabaseAdapter implements IDatabase {
  private readonly db: sqlite3.Database;

  constructor(path: DbPath) {
    this.db = new (sqlite3.verbose().Database)(path);
  }

  exec(sql: string): Promise<void> {
    return new Promise((resolve, reject) => {
      this.db.exec(sql, function (err) {
        if (err) reject(err);
        else resolve();
      });
    });
  }

  run(sql: string, params: QueryParams): Promise<number> {
    return new Promise((resolve, reject) => {
      const statement = this.db.prepare(sql);
      statement.run(this.prepareParams(params), function (this: sqlite3.RunResult, err: Error | null) {
        if (err) {
          reject(err);
        } else {
          resolve(this.lastID);
        }
      });
    });
  }

  close(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.db.close((err: Error | null) => {
        if (err) {
          reject(err);
        }
        resolve();
      });
    });
  }

  get<T>(sql: string, params?: QueryParams): Promise<T> {
    return new Promise((resolve, reject) => {
      this.db.get<T>(sql, this.prepareParams(params), function (err, entity) {
        if (err) {
          reject(err);
        }
        resolve(entity);
      });
    });
  }

  private prepareParams(params?: Record<string, unknown>): Record<string, unknown> | undefined {
    if (params == null) {
      return params;
    }
    const namedParams: Record<string, unknown> = {};
    for (const key in params) {
      if (Object.prototype.hasOwnProperty.call(params, key)) {
        namedParams[`${parameterPrefix}${key}`] = params[key];
      }
    }
    return namedParams;
  }
}
