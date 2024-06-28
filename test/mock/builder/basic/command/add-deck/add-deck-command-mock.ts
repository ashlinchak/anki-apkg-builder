import { AddDeckCommandParams, Deck, IAddDeckCommand } from '../../../../../../src/main';

export class AddDeckCommandMock implements IAddDeckCommand {
  execute(params: AddDeckCommandParams): Promise<Deck> {
    throw new Error('Method not implemented.');
  }
}
