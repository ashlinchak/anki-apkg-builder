import { DeckFactory, DeckEntity } from '../../../../../../src/main';

describe('DeckFactory', () => {
  let deckFactory: DeckFactory;

  beforeEach(() => {
    deckFactory = new DeckFactory();
  });

  describe('create', () => {
    it('should create a deck', () => {
      const deckEntity: DeckEntity = {
        id: 1,
        name: 'My deck',
        desc: 'My deck description',
        conf: 2,
        usn: 0,
        mod: 1696099943,
        newToday: [0, 0],
        timeToday: [0, 0],
        revToday: [0, 0],
        lrnToday: [0, 0],
        dyn: 0,
        extendNew: 10,
        extendRev: 50,
        collapsed: false,
      };

      const result = deckFactory.create(deckEntity);

      expect(result).toEqual({
        id: 1,
        name: 'My deck',
        description: 'My deck description',
        presetId: 2,
        usn: 0,
        mod: 1696099943,
        newToday: [0, 0],
        timeToday: [0, 0],
        revToday: [0, 0],
        lrnToday: [0, 0],
        isDynamic: false,
        extendNew: 10,
        extendRev: 50,
        collapsed: false,
      });
    });
  });
});
