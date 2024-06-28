import {
  AddNoteTypeCommand,
  AddNoteTypeCommandParams,
  ICreateNoteTypeService,
  INoteTypeFactory,
  NoteType,
  NoteTypeEntity,
} from '../../../../../../src/main';
import { NoteTypeFactoryMock } from '../../../../../mock/builder/basic/command/add-note-type/note-type-factory-mock';
import { CreateNoteTypeServiceMock } from '../../../../../mock/domain/note-type/service/create-note-type-service-mock';

describe('AddNoteTypeCommand', () => {
  let addNoteTypeCommand: AddNoteTypeCommand;
  let createNoteTypeService: ICreateNoteTypeService;
  let noteTypeFactory: INoteTypeFactory;

  beforeEach(() => {
    noteTypeFactory = new NoteTypeFactoryMock();
    createNoteTypeService = new CreateNoteTypeServiceMock();
    addNoteTypeCommand = new AddNoteTypeCommand(createNoteTypeService, noteTypeFactory);
  });

  describe('execute', () => {
    it('should create a note type', async () => {
      const params = {} as AddNoteTypeCommandParams;
      const noteTypeEntity = {} as NoteTypeEntity;
      const noteType = {} as NoteType;

      createNoteTypeService.execute = jest.fn().mockResolvedValue(noteTypeEntity);
      noteTypeFactory.create = jest.fn().mockReturnValue(noteType);

      const result = await addNoteTypeCommand.execute(params);

      expect(result).toEqual(noteType);
      expect(createNoteTypeService.execute).toHaveBeenCalledWith(params);
    });
  });
});
