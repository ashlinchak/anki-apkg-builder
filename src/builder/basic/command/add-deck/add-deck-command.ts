import { CreateDeckParams } from '../../../../domain/deck/dto/create-deck-params';
import { ICreateDeckService } from '../../../../domain/deck/service/create-deck-service';
import { AddDeckParams } from '../../../typing/add-deck-params';
import { Deck } from '../../../typing/deck';
import { IDeckFactory } from './deck-factory';

export type AddDeckCommandParams = AddDeckParams;

export interface IAddDeckCommand {
  execute(params: AddDeckCommandParams): Promise<Deck>;
}

export class AddDeckCommand implements IAddDeckCommand {
  constructor(
    private readonly createDeckService: ICreateDeckService,
    private readonly deckFactory: IDeckFactory,
  ) {}

  async execute(params: AddDeckCommandParams): Promise<Deck> {
    const createDeckParams: CreateDeckParams = {
      name: params.name,
      desc: params.description ?? '',
      conf: params.presetId ?? 1,
      extendRev: params.extendRev ?? 50,
      collapsed: params.collapsed ?? false,
      dyn: params.isDynamic ? 1 : 0,
      extendNew: params.extendNew ?? 10,
      newToday: [0, 0],
      timeToday: [0, 0],
      revToday: [0, 0],
      lrnToday: [0, 0],
      usn: 0,
      mod: 1696099943,
    };
    const entity = await this.createDeckService.execute(createDeckParams);
    return this.deckFactory.create(entity);
  }
}
