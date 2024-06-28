import {
  AddDeckCommand,
  ICreateDeckService,
  IDeckFactory,
  DeckEntity,
  Deck,
  AddDeckCommandParams,
} from '../../../../../../src/main';
import { DeckFactoryMock } from '../../../../../mock/builder/basic/command/add-deck/deck-factory-mock';
import { CreateDeckServiceMock } from '../../../../../mock/domain/deck/service/create-deck-service-mock';

describe('AddDeckCommand', () => {
  let addDeckCommand: AddDeckCommand;
  let createDeckService: ICreateDeckService;
  let deckFactory: IDeckFactory;

  beforeEach(() => {
    createDeckService = new CreateDeckServiceMock();
    deckFactory = new DeckFactoryMock();
    addDeckCommand = new AddDeckCommand(createDeckService, deckFactory);
  });

  describe('execute', () => {
    it('should create a deck with default parameters', async () => {
      const params: AddDeckCommandParams = {
        name: 'My deck',
      };
      const deckEntity = {} as DeckEntity;
      const deck = {} as Deck;

      createDeckService.execute = jest.fn().mockResolvedValue(deckEntity);
      deckFactory.create = jest.fn().mockReturnValue(deck);

      const result = await addDeckCommand.execute(params);

      expect(result).toEqual(deck);
      expect(createDeckService.execute).toHaveBeenCalledWith({
        name: 'My deck',
        desc: '',
        conf: 1,
        extendRev: 50,
        collapsed: false,
        dyn: 0,
        extendNew: 10,
        newToday: [0, 0],
        timeToday: [0, 0],
        revToday: [0, 0],
        lrnToday: [0, 0],
        usn: 0,
        mod: 1696099943,
      });
      expect(deckFactory.create).toHaveBeenCalledWith(deckEntity);
    });

    it('should create a deck with custom parameters', async () => {
      const params: AddDeckCommandParams = {
        name: 'My deck',
        description: 'My deck description',
        presetId: 2,
        extendRev: 100,
        collapsed: true,
        isDynamic: false,
        extendNew: 20,
      };
      const deckEntity = {} as DeckEntity;
      const deck = {} as Deck;

      createDeckService.execute = jest.fn().mockResolvedValue(deckEntity);
      deckFactory.create = jest.fn().mockReturnValue(deck);

      const result = await addDeckCommand.execute(params);

      expect(result).toEqual(deck);
      expect(createDeckService.execute).toHaveBeenCalledWith({
        name: 'My deck',
        desc: 'My deck description',
        conf: 2,
        extendRev: 100,
        collapsed: true,
        dyn: 0,
        extendNew: 20,
        newToday: [0, 0],
        timeToday: [0, 0],
        revToday: [0, 0],
        lrnToday: [0, 0],
        usn: 0,
        mod: 1696099943,
      });
      expect(deckFactory.create).toHaveBeenCalledWith(deckEntity);
    });
  });
});
