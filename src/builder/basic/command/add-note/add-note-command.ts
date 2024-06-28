import { ICreateNoteService } from '../../../../domain/note/service/create-note-service';
import { AddNoteParams } from '../../../typing/add-note-params';
import { Note } from '../../../typing/note';
import { INoteFactory } from './note-factory';

export type AddNoteCommandParams = AddNoteParams;

export interface IAddNoteCommand {
  execute(params: AddNoteCommandParams): Promise<Note>;
}

export class AddNoteCommand implements IAddNoteCommand {
  constructor(
    private readonly createNoteService: ICreateNoteService,
    private readonly noteFactory: INoteFactory,
  ) {}

  async execute(params: AddNoteCommandParams): Promise<Note> {
    const entity = await this.createNoteService.execute(params);
    return this.noteFactory.create(entity);
  }
}
