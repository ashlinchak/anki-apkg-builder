import { IFileReader } from '../../../../../../src/core/utils/fire-reader';
import { GenerateApkgCommand, IZipService, Media } from '../../../../../../src/main';
import { FileReaderMock } from '../../../../../mock/core/utils/fire-reader-mock';
import { ZipServiceMock } from '../../../../../mock/core/zip/zip-service-mock';

describe('GenerateApkgCommand', () => {
  let generateApkgCommand: GenerateApkgCommand;
  let zipService: IZipService;
  let fileReader: IFileReader;
  const databasePath = './database.db';
  const archivePath = './some-archive.apkg';
  const mediaCollection = new Map<string, Media>([
    [
      'image.png',
      {
        fileName: 'image.png',
        data: Buffer.from('media-data'),
      }
    ]
  ]);

  beforeEach(() => {
    zipService = new ZipServiceMock();
    fileReader = new FileReaderMock();
    generateApkgCommand = new GenerateApkgCommand(databasePath, zipService, fileReader);
  });

  describe('execute', () => {
    it('should validate file name', () => {
      expect(() => generateApkgCommand.execute({ archivePath: 'some-archive.fake', mediaCollection })).rejects.toThrow(
        'Invalid file extension',
      );
    });

    it('should generate apkg', async () => {
      const rawData = Buffer.from('data');

      fileReader.read = jest.fn().mockResolvedValue(rawData);
      zipService.addData = jest.fn();
      zipService.save = jest.fn();

      await generateApkgCommand.execute({ archivePath, mediaCollection });

      expect(fileReader.read).toHaveBeenCalledWith(databasePath);
      expect(zipService.save).toHaveBeenCalledWith(archivePath);
    });
  });
});
