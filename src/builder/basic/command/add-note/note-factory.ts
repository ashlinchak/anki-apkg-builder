import { FIELD_SEPARATOR } from '../../../../domain/note/constant';
import { NoteEntity } from '../../../../domain/note/note-entity';
import { Note } from '../../../typing/note';

const tagSeparator = ' ';

export interface INoteFactory {
  create(entity: NoteEntity): Note;
}

export class NoteFactory implements INoteFactory {
  create(entity: NoteEntity): Note {
    const tags = entity.tags.split(tagSeparator).filter((str) => str.length !== 0);
    const fields = entity.flds.split(FIELD_SEPARATOR);

    return {
      id: entity.id,
      guid: entity.guid,
      mid: entity.mid,
      mod: entity.mod,
      tags,
      fields,
      sortField: entity.sfld,
      csum: entity.csum,
      usn: entity.usn,
      flags: entity.flags,
      data: entity.data,
    };
  }
}
