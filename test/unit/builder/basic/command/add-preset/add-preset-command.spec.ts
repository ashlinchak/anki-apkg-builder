import {
  AddPresetCommand,
  AddPresetParams,
  ICreatePresetService,
  IPresetFactory,
  Preset,
  PresetEntity,
} from '../../../../../../src/main';
import { PresetFactoryMock } from '../../../../../mock/builder/basic/command/add-preset/preset-factory-mock';
import { CreatePresetServiceMock } from '../../../../../mock/domain/preset/service/create-preset-service-mock';

describe('AddPresetCommand', () => {
  let addPresetCommand: AddPresetCommand;
  let createPresetService: ICreatePresetService;
  let presetFactory: IPresetFactory;

  beforeEach(() => {
    createPresetService = new CreatePresetServiceMock();
    presetFactory = new PresetFactoryMock();
    addPresetCommand = new AddPresetCommand(createPresetService, presetFactory);
  });

  describe('execute', () => {
    it('should create a preset', async () => {
      const presetEntity = {} as PresetEntity;
      const preset = {} as Preset;
      const params = {} as AddPresetParams;

      createPresetService.execute = jest.fn().mockResolvedValue(presetEntity);
      presetFactory.create = jest.fn().mockReturnValue(preset);

      const result = await addPresetCommand.execute(params);

      expect(result).toEqual(preset);
      expect(createPresetService.execute).toHaveBeenCalledWith(params);
      expect(presetFactory.create).toHaveBeenCalledWith(presetEntity);
    });
  });
});
