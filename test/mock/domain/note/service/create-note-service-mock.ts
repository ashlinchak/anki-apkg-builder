import { CreateNoteParams, ICreateNoteService, NoteEntity } from '../../../../../src/main';

export class CreateNoteServiceMock implements ICreateNoteService {
  execute(params: CreateNoteParams): Promise<NoteEntity> {
    throw new Error('Method not implemented.');
  }
}
