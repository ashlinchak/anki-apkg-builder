import { DatabaseFactoryMock } from '../../../mock/core/database/database-factory-mock';

jest.mock('../../../../src/core/database/database-factory', () => ({
  DatabaseFactory: DatabaseFactoryMock,
}));

import { AnkiApkgBuilder, AnkiApkgBuilderFactory } from '../../../../src/main';
import { NoteGuidGeneratorMock } from '../../../mock/builder/typing/note-guid-generator-mock';

describe('AnkiApkgBuilderFactory', () => {
  let ankiApkgBuilderFactory: AnkiApkgBuilderFactory;

  beforeEach(() => {
    DatabaseFactoryMock.prototype.create = jest.fn();
  });

  describe('create', () => {
    it('should create the an AnkiApkgBuilder object with default parameters', () => {
      ankiApkgBuilderFactory = new AnkiApkgBuilderFactory();

      const result = ankiApkgBuilderFactory.create();

      expect(result).toBeInstanceOf(AnkiApkgBuilder);
    });

    it('should create the an AnkiApkgBuilder object with custom parameters', () => {
      const noteGuidGenerator = new NoteGuidGeneratorMock();
      const dbFilePath = 'db.apkg';
      ankiApkgBuilderFactory = new AnkiApkgBuilderFactory({
        noteGuidGenerator,
        dbFilePath,
      });

      const result = ankiApkgBuilderFactory.create();

      expect(result).toBeInstanceOf(AnkiApkgBuilder);
    });
  });
});
