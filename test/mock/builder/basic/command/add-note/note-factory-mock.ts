import { INoteFactory, Note, NoteEntity } from '../../../../../../src/main';

export class NoteFactoryMock implements INoteFactory {
  create(entity: NoteEntity): Note {
    throw new Error('Method not implemented.');
  }
}
