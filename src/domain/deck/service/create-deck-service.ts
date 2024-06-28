import { IRepository, CreateDeckEntityParams } from '../../../core/database/repository';
import { DeckEntity } from '../deck-entity';
import { CreateDeckParams } from '../dto/create-deck-params';

export interface ICreateDeckService {
  execute(params: CreateDeckParams): Promise<DeckEntity>;
}

export class CreateDeckService implements ICreateDeckService {
  constructor(private readonly repository: IRepository) {}

  async execute(params: CreateDeckParams): Promise<DeckEntity> {
    const createEntityParams: CreateDeckEntityParams = {
      name: params.name,
      desc: params.desc ?? '',
      conf: params.conf ?? 1,
      extendRev: params.extendRev ?? 50,
      collapsed: params.collapsed ?? false,
      dyn: params.dyn === 1 ? 1 : 0,
      extendNew: params.extendNew ?? 10,
      newToday: [0, 0],
      timeToday: [0, 0],
      revToday: [0, 0],
      lrnToday: [0, 0],
      usn: 0,
      mod: 1696099943,
    };
    return this.repository.addDeck(createEntityParams);
  }
}
