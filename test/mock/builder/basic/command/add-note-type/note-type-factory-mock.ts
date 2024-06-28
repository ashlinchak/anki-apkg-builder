import { INoteTypeFactory, NoteType, NoteTypeEntity } from '../../../../../../src/main';

export class NoteTypeFactoryMock implements INoteTypeFactory {
  create(entity: NoteTypeEntity): NoteType {
    return entity;
  }
}
