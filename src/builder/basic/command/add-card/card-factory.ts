import { CardEntity } from '../../../../domain/card/card-entity';
import { Card } from '../../../typing/card';

export interface ICardFactory {
  create(entity: CardEntity): Card;
}

export class CardFactory implements ICardFactory {
  create(entity: CardEntity): Card {
    return {
      id: entity.id,
      nid: entity.nid,
      did: entity.did,
      ord: entity.ord,
      mod: entity.mod,
      usn: entity.usn,
      type: entity.type,
      queue: entity.queue,
      due: entity.due,
      ivl: entity.ivl,
      factor: entity.factor,
      reps: entity.reps,
      lapses: entity.lapses,
      left: entity.left,
      odue: entity.odue,
      odid: entity.odid,
      flags: entity.flags,
      data: entity.data,
    };
  }
}
