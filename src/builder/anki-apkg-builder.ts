import { AddCardParams } from './typing/add-card-params';
import { AddDeckParams } from './typing/add-deck-params';
import { AddMediaParams } from './typing/add-media-params';
import { AddNoteParams } from './typing/add-note-params';
import { AddNoteTypeParams } from './typing/add-note-type-params';
import { AddPresetParams } from './typing/add-preset-params';
import { Card } from './typing/card';
import { Deck } from './typing/deck';
import { Note } from './typing/note';
import { NoteType } from './typing/note-type';
import { Preset } from './typing/preset';

export interface IAnkiApkgBuilder {
  /**
   * Alongside default preset, add custom preset (deck group options) based on which cards will be created.
   * @see https://docs.ankiweb.net/deck-options.html#presets
   */
  addPreset(params: AddPresetParams): Promise<Preset>;
  /**
   * Add a new deck to the collection.
   * @see https://docs.ankiweb.net/getting-started.html#decks
   */
  addDeck(params: AddDeckParams): Promise<Deck>;
  /**
   * Add a new note type to the collection.
   * @see https://docs.ankiweb.net/getting-started.html#note-types
   */
  addNoteType(params: AddNoteTypeParams): Promise<NoteType>;
  /**
   * Add a new note to the collection.
   * @see https://docs.ankiweb.net/getting-started.html#notes--fields
   */
  addNote(params: AddNoteParams): Promise<Note>;
  /**
   * Add media to the collection.
   * @see https://docs.ankiweb.net/media.html
   */
  addMedia(params: AddMediaParams): Promise<void>;
  /**
   * Add a new card to the collection.
   * @see https://docs.ankiweb.net/getting-started.html#cards
   */
  addCard(params: AddCardParams): Promise<Card>;
  /**
   * Generate the Anki apkg file.
   */
  generateApkg(fileName: string): Promise<void>;
}
