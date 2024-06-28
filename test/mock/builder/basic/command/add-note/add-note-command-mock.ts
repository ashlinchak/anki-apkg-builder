import { AddNoteCommandParams, IAddNoteCommand, Note } from '../../../../../../src/main';

export class AddNoteCommandMock implements IAddNoteCommand {
  async execute(params: AddNoteCommandParams): Promise<Note> {
    throw new Error('Method not implemented.');
  }
}
