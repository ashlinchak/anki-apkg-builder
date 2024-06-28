import { tmpdir } from 'os';
import { join } from 'path';
import { CreateCardService } from '../../domain/card/service/create-card-service';
import { CreateDeckService } from '../../domain/deck/service/create-deck-service';
import { CreateNoteTypeService } from '../../domain/note-type/service/create-note-type-service';
import { CreateNoteService } from '../../domain/note/service/create-note-service';
import { CreatePresetService } from '../../domain/preset/service/create-preset-service';
import { IAnkiApkgBuilder } from '../anki-apkg-builder';
import { INoteGuidGenerator } from '../typing/note-guid-generator';
import { Repository, IRepository } from '../../core/database/repository';
import { DatabaseSeeder } from '../../core/database/seed/database-seeder';
import { IAnkiApkgBuilderFactory } from '../anki-apkg-builder-factory';
import { ZipServiceFactory } from '../../core/zip/zip-service-factory';
import { DatabaseFactory } from '../../core/database/database-factory';
import { FileDestroyer } from '../../core/utils/file-destroyer';
import { DeckNameAndFieldsNoteGuidGenerator } from '../../domain/note/guid/deck-name-and-fields-note-guid-generator';
import { AnkiApkgBuilder } from './anki-apkg-builder';
import { IAddCardCommand, AddCardCommand } from './command/add-card/add-card-command';
import { IAddDeckCommand, AddDeckCommand } from './command/add-deck/add-deck-command';
import { DeckFactory } from './command/add-deck/deck-factory';
import { IAddNoteTypeCommand, AddNoteTypeCommand } from './command/add-note-type/add-note-type-command';
import { IAddNoteCommand, AddNoteCommand } from './command/add-note/add-note-command';
import { NoteFactory } from './command/add-note/note-factory';
import { IAddPresetCommand, AddPresetCommand } from './command/add-preset/add-preset-command';
import { IGenerateApkgCommand, GenerateApkgCommand } from './command/generate-apkg/generate-apkg-command';
import { PresetFactory } from './command/add-preset/preset-factory';
import {
  CardFactory,
  DatabaseCreator,
  DatabaseInitializer,
  IDatabase,
  IDatabaseInitializer,
  NoteTypeFactory,
} from '../../main';
import { FileReader } from '../../core/utils/fire-reader';

const defaultDbPath = join(tmpdir(), 'collection.anki2');

export type AnkiApkgBuilderFactoryParams = {
  /**
   * Note GUID generator.
   * @default DeckNameAndFieldsNoteGuidGenerator
   */
  noteGuidGenerator?: INoteGuidGenerator;
  /**
   * Temporary database path.
   * @default os.tmpdir() + '/collection.anki2'
   */
  dbFilePath?: string;
};

export class AnkiApkgBuilderFactory implements IAnkiApkgBuilderFactory {
  private readonly databaseInitializer: IDatabaseInitializer;
  private readonly addDeckCommand: IAddDeckCommand;
  private readonly addPresetCommand: IAddPresetCommand;
  private readonly addNoteTypeCommand: IAddNoteTypeCommand;
  private readonly addNoteCommand: IAddNoteCommand;
  private readonly addCardCommand: IAddCardCommand;
  private readonly saveCommand: IGenerateApkgCommand;

  constructor(params: AnkiApkgBuilderFactoryParams = {}) {
    const { noteGuidGenerator, dbFilePath = defaultDbPath } = params;

    const databaseAdapter = this.initDatabaseAdapter(dbFilePath);
    const repository = new Repository(databaseAdapter);
    this.databaseInitializer = this.initDatabaseInitializer(repository, databaseAdapter);
    this.addCardCommand = this.initAddCardCommand(repository);
    this.addDeckCommand = this.initAddDeckCommand(repository);
    this.addPresetCommand = this.initAddPresetCommand(repository);
    this.addNoteTypeCommand = this.initAddNoteTypeCommand(repository);
    this.addNoteCommand = this.initAddNoteCommand(repository, noteGuidGenerator);
    this.saveCommand = this.initSaveCommand(dbFilePath);
  }

  create(): IAnkiApkgBuilder {
    return new AnkiApkgBuilder(
      this.databaseInitializer,
      this.addDeckCommand,
      this.addPresetCommand,
      this.addNoteTypeCommand,
      this.addNoteCommand,
      this.addCardCommand,
      this.saveCommand,
    );
  }

  private initAddNoteTypeCommand(repository: IRepository): IAddNoteTypeCommand {
    const createNoteTypeService = new CreateNoteTypeService(repository);
    const noteTypeFactory = new NoteTypeFactory();
    return new AddNoteTypeCommand(createNoteTypeService, noteTypeFactory);
  }

  private initDatabaseAdapter(dbFilePath: string): IDatabase {
    const fileDestroyer = new FileDestroyer();
    return new DatabaseFactory(fileDestroyer).create({
      provider: 'sqlite3',
      filePath: dbFilePath,
      forceRecreate: true,
    });
  }

  private initDatabaseInitializer(repository: IRepository, databaseAdapter: IDatabase): IDatabaseInitializer {
    const createPresetService = new CreatePresetService(repository);
    const createDeckService = new CreateDeckService(repository);
    const databaseSeeder = new DatabaseSeeder(repository, createPresetService, createDeckService);
    const databaseCreator = new DatabaseCreator(databaseAdapter);

    return new DatabaseInitializer(databaseCreator, databaseSeeder);
  }

  private initAddNoteCommand(
    repository: IRepository,
    customNoteGuidGenerator: INoteGuidGenerator | undefined,
  ): IAddNoteCommand {
    const noteGuidGenerator = customNoteGuidGenerator ?? new DeckNameAndFieldsNoteGuidGenerator();
    const createNoteService = new CreateNoteService(repository, noteGuidGenerator);
    const noteFactory = new NoteFactory();
    return new AddNoteCommand(createNoteService, noteFactory);
  }

  private initAddPresetCommand(repository: IRepository): IAddPresetCommand {
    const presetFactory = new PresetFactory();
    const createPresetService = new CreatePresetService(repository);
    return new AddPresetCommand(createPresetService, presetFactory);
  }

  private initAddDeckCommand(repository: IRepository): IAddDeckCommand {
    const deckFactory = new DeckFactory();
    const createDeckService = new CreateDeckService(repository);
    return new AddDeckCommand(createDeckService, deckFactory);
  }

  private initAddCardCommand(repository: IRepository): IAddCardCommand {
    const cardFactory = new CardFactory();
    const createCardService = new CreateCardService(repository);
    return new AddCardCommand(createCardService, cardFactory);
  }

  private initSaveCommand(dbFilePath: string): IGenerateApkgCommand {
    const zipService = new ZipServiceFactory().create();
    const fileReader = new FileReader();
    return new GenerateApkgCommand(dbFilePath, zipService, fileReader);
  }
}
