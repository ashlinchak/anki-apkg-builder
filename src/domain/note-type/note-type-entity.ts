import { CardType } from '../../builder/typing/card-type';
import { ModelType, ReqField } from '../../builder/typing/note-type';
import { NoteField } from '../../builder/typing/note-field';

export type NoteTypeEntity = {
  id: number;
  name: string;
  did: number;
  type: ModelType;
  tmpls: CardType[];
  mod: number;
  usn: number;
  sortf: number;
  flds: NoteField[];
  css: string;
  latexPre: string;
  latexPost: string;
  req: ReqField;
  tags: string[];
  vers: [];
};
