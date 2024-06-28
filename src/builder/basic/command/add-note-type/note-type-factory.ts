import { NoteTypeEntity } from '../../../../domain/note-type/note-type-entity';
import { NoteType } from '../../../typing/note-type';

export interface INoteTypeFactory {
  create(entity: NoteTypeEntity): NoteType;
}

export class NoteTypeFactory implements INoteTypeFactory {
  create(entity: NoteTypeEntity): NoteType {
    return {
      id: entity.id,
      name: entity.name,
      did: entity.did,
      tmpls: entity.tmpls,
      flds: entity.flds,
      type: entity.type,
      mod: entity.mod,
      usn: entity.usn,
      sortf: entity.sortf,
      css: entity.css,
      latexPre: entity.latexPre,
      latexPost: entity.latexPost,
      req: entity.req,
      tags: entity.tags,
      vers: entity.vers,
    };
  }
}
