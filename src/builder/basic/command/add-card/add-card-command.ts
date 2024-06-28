import { ICreateCardService } from '../../../../domain/card/service/create-card-service';
import { AddCardParams } from '../../../typing/add-card-params';
import { Card } from '../../../typing/card';
import { ICardFactory } from './card-factory';

export type AddCardCommandParams = AddCardParams;

export interface IAddCardCommand {
  execute(params: AddCardCommandParams): Promise<Card>;
}

export class AddCardCommand implements IAddCardCommand {
  constructor(
    private readonly createCardService: ICreateCardService,
    private readonly cardFactory: ICardFactory,
  ) {}

  async execute(params: AddCardCommandParams): Promise<Card> {
    const entity = await this.createCardService.execute(params);
    return this.cardFactory.create(entity);
  }
}
