import { IZipService } from '../../../../src/main';

export class ZipServiceMock implements IZipService {
  async addData(entryPath: string, data: Buffer): Promise<void> {
    throw new Error('Method not implemented.');
  }

  async save(path: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
