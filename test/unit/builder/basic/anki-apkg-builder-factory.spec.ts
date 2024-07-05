import { DatabaseFactoryMock } from '../../../mock/core/database/database-factory-mock';

jest.mock('../../../../src/core/database/database-factory', () => ({
  DatabaseFactory: DatabaseFactoryMock,
}));

import {
  AnkiApkgBuilder,
  AnkiApkgBuilderFactory,
  CreateAnkiApkgBuilderParams,
  DatabaseInitializer,
} from '../../../../src/main';
import { NoteGuidGeneratorMock } from '../../../mock/builder/typing/note-guid-generator-mock';

describe('AnkiApkgBuilderFactory', () => {
  let ankiApkgBuilderFactory: AnkiApkgBuilderFactory;

  beforeEach(() => {
    DatabaseFactoryMock.prototype.create = jest.fn();
    DatabaseInitializer.prototype.initialize = jest.fn();
  });

  describe('create', () => {
    describe('when params are not provided', () => {
      it('should create the an AnkiApkgBuilder object with default parameters', async () => {
        ankiApkgBuilderFactory = new AnkiApkgBuilderFactory();

        const result = await ankiApkgBuilderFactory.create();

        expect(result).toBeInstanceOf(AnkiApkgBuilder);
      });

      it('should create the an AnkiApkgBuilder object with custom parameters', async () => {
        const noteGuidGenerator = new NoteGuidGeneratorMock();
        const dbFilePath = 'db.apkg';
        ankiApkgBuilderFactory = new AnkiApkgBuilderFactory({
          noteGuidGenerator,
          dbFilePath,
        });

        const result = await ankiApkgBuilderFactory.create();

        expect(result).toBeInstanceOf(AnkiApkgBuilder);
      });
    });

    describe('when prepareDatabase is false', () => {
      const prepareDatabase = false;

      it('should not create and seed the database', async () => {
        const params: CreateAnkiApkgBuilderParams = { prepareDatabase };

        ankiApkgBuilderFactory = new AnkiApkgBuilderFactory();

        const result = await ankiApkgBuilderFactory.create(params);

        expect(result).toBeInstanceOf(AnkiApkgBuilder);
        expect(DatabaseInitializer.prototype.initialize).not.toHaveBeenCalled();
      });
    });

    describe('when prepareDatabase is true', () => {
      const prepareDatabase = true;

      it('should create and seed the database', async () => {
        const params: CreateAnkiApkgBuilderParams = { prepareDatabase };

        ankiApkgBuilderFactory = new AnkiApkgBuilderFactory();

        const result = await ankiApkgBuilderFactory.create(params);

        expect(result).toBeInstanceOf(AnkiApkgBuilder);
        expect(DatabaseInitializer.prototype.initialize).toHaveBeenCalled();
      });
    });
  });
});
