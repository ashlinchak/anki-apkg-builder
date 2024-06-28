import { CreatePresetParams, ICreatePresetService, PresetEntity } from '../../../../../src/main';

export class CreatePresetServiceMock implements ICreatePresetService {
  execute(params: CreatePresetParams): Promise<PresetEntity> {
    throw new Error('Method not implemented.');
  }
}
