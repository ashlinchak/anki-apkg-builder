import { IDeckFactory, DeckEntity, Deck } from '../../../../../../src/main';

export class DeckFactoryMock implements IDeckFactory {
  create(entity: DeckEntity): Deck {
    throw new Error('Method not implemented.');
  }
}
