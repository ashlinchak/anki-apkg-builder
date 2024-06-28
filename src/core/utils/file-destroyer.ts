import { unlink } from 'fs/promises';

export interface IFileDestroyer {
  destroy(filePath: string): Promise<void>;
}

export class FileDestroyer implements IFileDestroyer {
  destroy(filePath: string): Promise<void> {
    return unlink(filePath);
  }
}
