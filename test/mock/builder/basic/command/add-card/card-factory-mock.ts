import { Card, CardEntity, ICardFactory } from '../../../../../../src/main';

export class CardFactoryMock implements ICardFactory {
  create(entity: CardEntity): Card {
    throw new Error('Method not implemented.');
  }
}
