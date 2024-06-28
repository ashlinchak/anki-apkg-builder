import { getFileExtension } from '../../../../core/utils/file';
import { IZipService } from '../../../../core/zip/zip-service';
import { Media } from '../../../typing/media';
import { IFileReader } from '../../../../core/utils/fire-reader';

export type GenerateApkgCommandParams = {
  mediaCollection: Map<string, Media>;
  archivePath: string;
};

export interface IGenerateApkgCommand {
  execute(params: GenerateApkgCommandParams): Promise<void>;
}

export class GenerateApkgCommand implements IGenerateApkgCommand {
  constructor(
    private readonly databasePath: string,
    private readonly zipService: IZipService,
    private readonly fileReader: IFileReader,
  ) {}

  async execute(params: GenerateApkgCommandParams): Promise<void> {
    const { mediaCollection, archivePath: filename } = params;

    this.validateFileName(filename, ['apkg']);

    await this.addDatabaseToArchive();
    await this.addMediaToArchive(mediaCollection);
    await this.zipService.save(filename);
  }

  private async addDatabaseToArchive(): Promise<void> {
    const dbNameInArchive = 'collection.anki2';
    const data = await this.fileReader.read(this.databasePath);
    await this.zipService.addData(dbNameInArchive, data);
  }

  private async addMediaToArchive(mediaCollection: Map<string, Media>): Promise<void> {
    const items = Array.from(mediaCollection.values());
    const mediaCollectionObj = items.reduce(
      (memo, media, index) => {
        memo[index] = media.fileName;
        return memo;
      },
      {} as Record<number, string>,
    );
    await this.zipService.addData('media', Buffer.from(JSON.stringify(mediaCollectionObj)));
    items.forEach(async (media, index) => {
      await this.zipService.addData(index.toString(), media.data);
    });
  }

  private validateFileName(filename: string, allowedExtensions: string[]): void {
    const extension = getFileExtension(filename);
    if (!allowedExtensions.includes(extension.toLowerCase())) {
      throw new Error('Invalid file extension');
    }
  }
}
