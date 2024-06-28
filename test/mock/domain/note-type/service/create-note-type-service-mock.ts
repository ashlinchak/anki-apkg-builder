import { CreateNoteTypeParams, ICreateNoteTypeService, NoteTypeEntity } from '../../../../../src/main';

export class CreateNoteTypeServiceMock implements ICreateNoteTypeService {
  async execute(params: CreateNoteTypeParams): Promise<NoteTypeEntity> {
    throw new Error('Method not implemented.');
  }
}
