import { CreatePresetParams } from '../../../../domain/preset/dto/create-preset-params';
import { ICreatePresetService } from '../../../../domain/preset/service/create-preset-service';
import { Preset } from '../../../typing/preset';
import { IPresetFactory } from './preset-factory';

export type AddPresetCommandParams = CreatePresetParams;

export interface IAddPresetCommand {
  execute(params: AddPresetCommandParams): Promise<Preset>;
}

export class AddPresetCommand implements IAddPresetCommand {
  constructor(
    private readonly createPresetService: ICreatePresetService,
    private readonly presetFactory: IPresetFactory,
  ) {}

  async execute(params: AddPresetCommandParams): Promise<Preset> {
    const entity = await this.createPresetService.execute(params);
    return this.presetFactory.create(entity);
  }
}
