import { IAnkiApkgBuilder } from '../anki-apkg-builder';
import { AddCardParams } from '../typing/add-card-params';
import { AddDeckParams } from '../typing/add-deck-params';
import { AddMediaParams } from '../typing/add-media-params';
import { AddNoteParams } from '../typing/add-note-params';
import { AddNoteTypeParams } from '../typing/add-note-type-params';
import { AddPresetParams } from '../typing/add-preset-params';
import { Card } from '../typing/card';
import { Deck } from '../typing/deck';
import { Media } from '../typing/media';
import { Note } from '../typing/note';
import { NoteType } from '../typing/note-type';
import { Preset } from '../typing/preset';
import { IGenerateApkgCommand } from './command/generate-apkg/generate-apkg-command';
import { IAddPresetCommand } from './command/add-preset/add-preset-command';
import { IAddNoteCommand } from './command/add-note/add-note-command';
import { IAddNoteTypeCommand } from './command/add-note-type/add-note-type-command';
import { IAddDeckCommand } from './command/add-deck/add-deck-command';
import { IAddCardCommand } from './command/add-card/add-card-command';
import { IDatabaseInitializer } from '../../core/database/database-initializer';

export class AnkiApkgBuilder implements IAnkiApkgBuilder {
  private readonly mediaCollection: Map<string, Media>;

  constructor(
    private readonly databaseInitializer: IDatabaseInitializer,
    private readonly addDeckCommand: IAddDeckCommand,
    private readonly addPresetCommand: IAddPresetCommand,
    private readonly addNoteTypeCommand: IAddNoteTypeCommand,
    private readonly addNoteCommand: IAddNoteCommand,
    private readonly addCardCommand: IAddCardCommand,
    private readonly generateApkgCommand: IGenerateApkgCommand,
  ) {
    this.mediaCollection = new Map();
  }

  async addDeck(params: AddDeckParams): Promise<Deck> {
    await this.databaseInitializer.initialize();

    return this.addDeckCommand.execute(params);
  }

  async addPreset(params: AddPresetParams): Promise<Preset> {
    await this.databaseInitializer.initialize();

    return this.addPresetCommand.execute(params);
  }

  async addNoteType(params: AddNoteTypeParams): Promise<NoteType> {
    await this.databaseInitializer.initialize();

    return this.addNoteTypeCommand.execute(params);
  }

  async addNote(params: AddNoteParams): Promise<Note> {
    await this.databaseInitializer.initialize();

    return this.addNoteCommand.execute(params);
  }

  async addCard(params: AddCardParams): Promise<Card> {
    await this.databaseInitializer.initialize();

    return this.addCardCommand.execute(params);
  }

  addMedia(params: AddMediaParams): Promise<void> {
    this.mediaCollection.set(params.fileName, params);
    return Promise.resolve();
  }

  async generateApkg(apkgPath: string): Promise<void> {
    await this.databaseInitializer.initialize();

    return this.generateApkgCommand.execute({
      mediaCollection: this.mediaCollection,
      archivePath: apkgPath,
    });
  }
}
