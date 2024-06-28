import { IRepository } from '../../../core/database/repository';
import { CardEntity } from '../card-entity';
import { CreateCardParams } from '../dto/create-card-params';

export interface ICreateCardService {
  execute(params: CreateCardParams): Promise<CardEntity>;
}

export class CreateCardService implements ICreateCardService {
  constructor(private readonly repository: IRepository) {}

  async execute(params: CreateCardParams): Promise<CardEntity> {
    const mod = Math.floor(Date.now() / 1000);
    return this.repository.addCart({
      nid: params.nid,
      did: params.did,
      ord: params.ord ?? 0,
      usn: params.usn ?? 0,
      type: params.type ?? 0,
      queue: params.queue ?? 0,
      due: params.due ?? params.nid,
      ivl: params.ivl ?? 0,
      factor: params.factor ?? 0,
      reps: params.reps ?? 0,
      lapses: params.lapses ?? 0,
      left: params.left ?? 0,
      odue: params.odue ?? 0,
      odid: params.odid ?? 0,
      flags: params.flags ?? 0,
      data: '',
      mod,
    });
  }
}
