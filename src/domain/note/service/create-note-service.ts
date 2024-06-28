import { generateChecksum } from '../../../core/utils/hash';
import { FIELD_SEPARATOR } from '../constant';
import { CreateNoteParams } from '../dto/create-note-params';
import { INoteGuidGenerator } from '../../../builder/typing/note-guid-generator';
import { NoteEntity } from '../note-entity';
import { IRepository, CreateNoteEntityParams, UpdateNoteEntityParams } from '../../../core/database/repository';

export interface ICreateNoteService {
  execute(params: CreateNoteParams): Promise<NoteEntity>;
}

export class CreateNoteService implements ICreateNoteService {
  constructor(
    private readonly repository: IRepository,
    private readonly noteGuidGenerator: INoteGuidGenerator,
  ) {}

  async execute(params: CreateNoteParams): Promise<NoteEntity> {
    const noteTypeEntity = await this.repository.getNoteType(params.noteTypeId);
    const deckEntity = await this.repository.getDeck(noteTypeEntity.did);

    if (deckEntity == null) {
      throw new Error('Deck not found');
    }

    const guid = this.noteGuidGenerator.generate({
      deckId: deckEntity.id,
      deckName: deckEntity.name,
      noteFields: params.fields,
    });

    const noteEntity = await this.repository.getNoteByGuid(guid);
    const flds = this.generateFlds(params.fields);

    const entityParams: CreateNoteEntityParams | UpdateNoteEntityParams = {
      guid,
      mid: params.noteTypeId,
      usn: -1,
      tags: this.tagsToString(params.tags),
      flds,
      sfld: params.sortField ?? params.fields[0],
      csum: generateChecksum(flds),
      flags: 0,
      data: '',
      mod: this.generateMod(),
    };

    if (noteEntity == null) {
      return this.repository.createNote(entityParams);
    }

    return this.repository.updateNote(noteEntity.id, entityParams);
  }

  private tagsToString(tags?: string[]): string {
    if (tags == null) {
      return '';
    }
    return ' ' + tags.map((tag) => tag.replace(/ /g, '_')).join(' ') + ' ';
  }

  private generateFlds(fields: string[]): string {
    return fields.join(FIELD_SEPARATOR);
  }

  private generateMod(): number {
    return Math.floor(Date.now() / 1000);
  }
}
