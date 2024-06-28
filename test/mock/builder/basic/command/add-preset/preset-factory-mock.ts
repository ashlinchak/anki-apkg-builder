import { IPresetFactory, Preset, PresetEntity } from '../../../../../../src/main';

export class PresetFactoryMock implements IPresetFactory {
  create(entity: PresetEntity): Preset {
    throw new Error('Method not implemented.');
  }
}
