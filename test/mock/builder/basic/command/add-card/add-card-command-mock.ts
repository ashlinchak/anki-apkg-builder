import { AddCardCommandParams, Card, IAddCardCommand } from '../../../../../../src/main';

export class AddCardCommandMock implements IAddCardCommand {
  execute(params: AddCardCommandParams): Promise<Card> {
    throw new Error('Method not implemented.');
  }
}
