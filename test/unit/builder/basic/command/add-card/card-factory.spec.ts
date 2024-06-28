import { CardEntity, CardFactory } from '../../../../../../src/main';

describe('CardFactory', () => {
  let cardFactory: CardFactory;

  beforeEach(() => {
    cardFactory = new CardFactory();
  });

  describe('create', () => {
    it('should create a card', () => {
      const cardEntity: CardEntity = {
        id: 1,
        nid: 1,
        did: 1,
        ord: 1,
        mod: 1,
        usn: 1,
        type: 1,
        queue: 1,
        due: 1,
        ivl: 1,
        factor: 1,
        reps: 1,
        lapses: 1,
        left: 1,
        odue: 1,
        odid: 1,
        flags: 0,
        data: '',
      };

      const result = cardFactory.create(cardEntity);

      expect(result).toEqual({
        id: 1,
        nid: 1,
        did: 1,
        ord: 1,
        mod: 1,
        usn: 1,
        type: 1,
        queue: 1,
        due: 1,
        ivl: 1,
        factor: 1,
        reps: 1,
        lapses: 1,
        left: 1,
        odue: 1,
        odid: 1,
        flags: 0,
        data: '',
      });
    });
  });
});
