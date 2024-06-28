export interface IZipService {
  addData(path: string, data: Buffer): Promise<void>;
  save(path: string): Promise<void>;
}
