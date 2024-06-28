import { readFile } from 'fs/promises';

export interface IFileReader {
  read(path: string): Promise<Buffer>;
}

export class FileReader implements IFileReader {
  async read(path: string): Promise<Buffer> {
    return readFile(path);
  }
}
