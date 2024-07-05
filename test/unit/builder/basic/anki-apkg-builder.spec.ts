import {
  AddCardParams,
  AddDeckParams,
  AddMediaParams,
  AddNoteParams,
  AddNoteTypeParams,
  AddPresetParams,
  AnkiApkgBuilder,
  Card,
  Deck,
  IAddCardCommand,
  IAddDeckCommand,
  IAddNoteCommand,
  IAddNoteTypeCommand,
  IAddPresetCommand,
  IGenerateApkgCommand,
  Media,
  Note,
  NoteType,
  Preset,
} from '../../../../src/main';
import { AddCardCommandMock } from '../../../mock/builder/basic/command/add-card/add-card-command-mock';
import { AddDeckCommandMock } from '../../../mock/builder/basic/command/add-deck/add-deck-command-mock';
import { AddNoteTypeCommandMock } from '../../../mock/builder/basic/command/add-note-type/add-note-type-command-mock';
import { AddNoteCommandMock } from '../../../mock/builder/basic/command/add-note/add-note-command-mock';
import { AddPresetCommandMock } from '../../../mock/builder/basic/command/add-preset/add-preset-command-mock';
import { GenerateApkgCommandMock } from '../../../mock/builder/basic/command/generate-apkg/generate-apkg-command-mock';

describe('AnkiApkgBuilder', () => {
  let ankiApkgBuilder: AnkiApkgBuilder;
  let addDeckCommand: IAddDeckCommand;
  let addPresetCommand: IAddPresetCommand;
  let addNoteTypeCommand: IAddNoteTypeCommand;
  let addNoteCommand: IAddNoteCommand;
  let addCardCommand: IAddCardCommand;
  let generateApkgCommand: IGenerateApkgCommand;

  beforeEach(() => {
    addDeckCommand = new AddDeckCommandMock();
    addPresetCommand = new AddPresetCommandMock();
    addNoteTypeCommand = new AddNoteTypeCommandMock();
    addNoteCommand = new AddNoteCommandMock();
    addCardCommand = new AddCardCommandMock();
    generateApkgCommand = new GenerateApkgCommandMock();
    ankiApkgBuilder = new AnkiApkgBuilder(
      addDeckCommand,
      addPresetCommand,
      addNoteTypeCommand,
      addNoteCommand,
      addCardCommand,
      generateApkgCommand,
    );
  });

  describe('addDeck', () => {
    it('should add deck to the collection', async () => {
      const params: AddDeckParams = {
        name: 'My deck',
        description: 'My deck description',
        presetId: 1,
        extendRev: 50,
        collapsed: false,
        isDynamic: false,
        extendNew: 10,
      };
      const deck = {} as Deck;

      addDeckCommand.execute = jest.fn().mockResolvedValue(deck);

      const result = await ankiApkgBuilder.addDeck(params);

      expect(result).toEqual(deck);
      expect(addDeckCommand.execute).toHaveBeenCalledWith(params);
    });
  });

  describe('addPreset', () => {
    it('should add preset to the collection', async () => {
      const params = {} as AddPresetParams;
      const preset = {} as Preset;

      addPresetCommand.execute = jest.fn().mockResolvedValue(preset);

      const result = await ankiApkgBuilder.addPreset(params);

      expect(result).toEqual(preset);
      expect(addPresetCommand.execute).toHaveBeenCalledWith(params);
    });
  });

  describe('addNoteType', () => {
    it('should add note type to the collection', async () => {
      const params = {} as AddNoteTypeParams;
      const noteType = {} as NoteType;

      addNoteTypeCommand.execute = jest.fn().mockResolvedValue(noteType);

      const result = await ankiApkgBuilder.addNoteType(params);

      expect(result).toEqual(noteType);
      expect(addNoteTypeCommand.execute).toHaveBeenCalledWith(params);
    });
  });

  describe('addNote', () => {
    it('should add note to the collection', async () => {
      const params = {} as AddNoteParams;
      const note = {} as Note;

      addNoteCommand.execute = jest.fn().mockResolvedValue(note);

      const result = await ankiApkgBuilder.addNote(params);

      expect(result).toEqual(note);
      expect(addNoteCommand.execute).toHaveBeenCalledWith(params);
    });
  });

  describe('addCard', () => {
    it('should add card to the collection', async () => {
      const params = {} as AddCardParams;
      const card = {} as Card;

      addCardCommand.execute = jest.fn().mockResolvedValue(card);

      const result = await ankiApkgBuilder.addCard(params);

      expect(result).toEqual(card);
      expect(addCardCommand.execute).toHaveBeenCalledWith(params);
    });
  });

  describe('addMedia', () => {
    it('should not throw error', async () => {
      const params = {} as AddMediaParams;

      expect(() => ankiApkgBuilder.addMedia(params)).not.toThrow();
    });
  });

  describe('generateApkg', () => {
    it('should generate apkg', async () => {
      const apkgPath = '/path/to/apkg.apkg';

      generateApkgCommand.execute = jest.fn();

      await ankiApkgBuilder.generateApkg(apkgPath);

      expect(generateApkgCommand.execute).toHaveBeenCalledWith({
        archivePath: apkgPath,
        mediaCollection: expect.any(Map<string, Media>),
      });
    });
  });
});
