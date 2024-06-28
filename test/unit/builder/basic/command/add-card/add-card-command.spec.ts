import {
  AddCardCommand,
  ICreateCardService,
  AddCardCommandParams,
  ICardFactory,
  CardEntity,
  Card,
} from '../../../../../../src/main';
import { CardFactoryMock } from '../../../../../mock/builder/basic/command/add-card/card-factory-mock';
import { CreateCardServiceMock } from '../../../../../mock/domain/card/service/create-card-service-mock';

describe('AddCardCommand', () => {
  let addCardCommand: AddCardCommand;
  let createCardService: ICreateCardService;
  let cardFactory: ICardFactory;

  beforeEach(() => {
    createCardService = new CreateCardServiceMock();
    cardFactory = new CardFactoryMock();
    addCardCommand = new AddCardCommand(createCardService, cardFactory);
  });

  describe('execute', () => {
    it('should call create cart service', async () => {
      const cardEntity = {} as CardEntity;
      const card = {} as Card;
      const params: AddCardCommandParams = {
        nid: 1,
        did: 1,
        ord: 1,
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
        flags: 1,
      };
      createCardService.execute = jest.fn().mockResolvedValue(cardEntity);
      cardFactory.create = jest.fn().mockReturnValue(card);

      const result = await addCardCommand.execute(params);

      expect(result).toEqual(card);
      expect(createCardService.execute).toHaveBeenCalledWith(params);
    });
  });
});
