import { IFileDestroyer } from '../../../../src/core/utils/file-destroyer';

export class FileDestroyerMock implements IFileDestroyer {
  destroy(filePath: string): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
