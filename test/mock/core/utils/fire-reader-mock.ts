import { IFileReader } from '../../../../src/core/utils/fire-reader';

export class FileReaderMock implements IFileReader {
  async read(filePath: string): Promise<Buffer> {
    throw new Error('Method not implemented.');
  }
}
