import { IRepository, CreateNoteTypeEntityParams } from '../../../core/database/repository';
import { DEFAULT_DECK_ID } from '../../deck/constant';
import { CreateNoteTypeParams } from '../dto/create-note-type-params';
import { ModelType } from '../../../builder/typing/note-type';
import { NoteTypeEntity } from '../note-type-entity';

export interface ICreateNoteTypeService {
  execute(params: CreateNoteTypeParams): Promise<NoteTypeEntity>;
}

export class CreateNoteTypeService implements ICreateNoteTypeService {
  constructor(private readonly repository: IRepository) {}

  async execute(params: CreateNoteTypeParams): Promise<NoteTypeEntity> {
    const createEntityParams: CreateNoteTypeEntityParams = {
      id: params.id,
      did: params.did ?? DEFAULT_DECK_ID,
      name: params.name,
      tmpls: params.tmpls,
      flds: params.flds,
      type: params.type ?? ModelType.STANDARD,
      mod: params.mod ?? 1696099943,
      usn: params.usn ?? -1,
      sortf: params.sortf ?? 0,
      css:
        params.css ?? '.card{font-family:arial;font-size:20px;text-align:center;color:black;background-color:white;}',
      latexPre:
        params.latexPre ??
        '\\documentclass[12pt]{article}\n\\special{papersize=3in,5in}\n\\usepackage[utf8]{inputenc}\n\\usepackage{amssymb,amsmath}\n\\pagestyle{empty}\n\\setlength{\\parindent}{0in}\n\\begin{document}\n',
      latexPost: params.latexPost ?? '\\end{document}',
      req: params.req ?? [[0, 'all', [0]]],
      tags: params.tags ?? [],
      vers: [],
    };
    return this.repository.addNoteType(createEntityParams);
  }
}
