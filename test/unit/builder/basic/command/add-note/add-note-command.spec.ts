import {
  AddNoteCommand,
  AddNoteCommandParams,
  ICreateNoteService,
  INoteFactory,
  Note,
  NoteEntity,
} from '../../../../../../src/main';
import { NoteFactoryMock } from '../../../../../mock/builder/basic/command/add-note/note-factory-mock';
import { CreateNoteServiceMock } from '../../../../../mock/domain/note/service/create-note-service-mock';

describe('AddNoteCommand', () => {
  let addNoteCommand: AddNoteCommand;
  let createNoteService: ICreateNoteService;
  let noteFactory: INoteFactory;

  beforeEach(() => {
    createNoteService = new CreateNoteServiceMock();
    noteFactory = new NoteFactoryMock();
    addNoteCommand = new AddNoteCommand(createNoteService, noteFactory);
  });

  describe('execute', () => {
    it('should create a note', async () => {
      const noteEntity = {} as NoteEntity;
      const note = {} as Note;
      const params: AddNoteCommandParams = {
        noteTypeId: 1,
        fields: ['a', 'b'],
        tags: ['c'],
        sortField: 'd',
      };

      createNoteService.execute = jest.fn().mockResolvedValue(noteEntity);
      noteFactory.create = jest.fn().mockReturnValue(note);

      const result = await addNoteCommand.execute(params);

      expect(result).toEqual(note);
      expect(createNoteService.execute).toHaveBeenCalledWith({
        noteTypeId: 1,
        fields: ['a', 'b'],
        tags: ['c'],
        sortField: 'd',
      });
      expect(noteFactory.create).toHaveBeenCalledWith(noteEntity);
    });
  });
});
