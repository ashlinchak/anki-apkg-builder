import { unlink } from 'fs/promises';
import { FileDestroyer } from '../../../../src/core/utils/file-destroyer';

jest.mock('fs/promises', () => ({
  unlink: jest.fn(),
}));

describe('FileDestroyer', () => {
  let fileDestroyer: FileDestroyer;

  beforeEach(() => {
    fileDestroyer = new FileDestroyer();
  });

  it('should call unlink with the correct file path', async () => {
    const filePath = '/path/to/file.txt';

    (unlink as jest.Mock).mockResolvedValue(undefined);

    await fileDestroyer.destroy(filePath);

    expect(unlink).toHaveBeenCalledWith(filePath);
  });

  it('should handle errors from unlink', async () => {
    const filePath = '/path/to/file.txt';
    const error = new Error('File not found');

    (unlink as jest.Mock).mockRejectedValue(error);

    await expect(fileDestroyer.destroy(filePath)).rejects.toThrow('File not found');
  });
});
