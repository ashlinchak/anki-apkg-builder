import { AddNoteTypeCommandParams, IAddNoteTypeCommand, NoteType } from '../../../../../../src/main';

export class AddNoteTypeCommandMock implements IAddNoteTypeCommand {
  execute(params: AddNoteTypeCommandParams): Promise<NoteType> {
    throw new Error('Method not implemented.');
  }
}
