export type QueryParams = Record<string, string | boolean | number>;

export interface IDatabase {
  exec(sql: string): Promise<void>;
  run(sql: string, params: QueryParams): Promise<number>;
  get<T>(sql: string, params?: QueryParams): Promise<T>;
  close(): Promise<void>;
}
