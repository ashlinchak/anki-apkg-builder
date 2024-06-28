import { CreateNoteTypeParams } from '../../../../domain/note-type/dto/create-note-type-params';
import { ICreateNoteTypeService } from '../../../../domain/note-type/service/create-note-type-service';
import { NoteType } from '../../../typing/note-type';
import { INoteTypeFactory } from './note-type-factory';

export type AddNoteTypeCommandParams = CreateNoteTypeParams;

export interface IAddNoteTypeCommand {
  execute(params: AddNoteTypeCommandParams): Promise<NoteType>;
}

export class AddNoteTypeCommand implements IAddNoteTypeCommand {
  constructor(
    private readonly createNoteTypeService: ICreateNoteTypeService,
    private readonly noteTypeFactory: INoteTypeFactory,
  ) {}

  async execute(params: AddNoteTypeCommandParams): Promise<NoteType> {
    const entity = await this.createNoteTypeService.execute(params);
    return this.noteTypeFactory.create(entity);
  }
}
