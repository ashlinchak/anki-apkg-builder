import { DeckEntity } from '../../../../domain/deck/deck-entity';
import { Deck } from '../../../typing/deck';

export interface IDeckFactory {
  create(entity: DeckEntity): Deck;
}

export class DeckFactory implements IDeckFactory {
  create(entity: DeckEntity): Deck {
    return {
      id: entity.id,
      name: entity.name,
      description: entity.desc,
      presetId: entity.conf,
      usn: entity.usn,
      mod: entity.mod,
      newToday: entity.newToday,
      timeToday: entity.timeToday,
      revToday: entity.revToday,
      lrnToday: entity.lrnToday,
      isDynamic: entity.dyn === 1,
      extendNew: entity.extendNew,
      extendRev: entity.extendRev,
      collapsed: entity.collapsed,
    };
  }
}
