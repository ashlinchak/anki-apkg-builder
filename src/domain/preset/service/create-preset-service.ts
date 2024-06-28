import { IRepository, CreatePresetEntityParams } from '../../../core/database/repository';
import { CreatePresetParams } from '../dto/create-preset-params';
import { PresetEntity } from '../preset-entity';

export interface ICreatePresetService {
  execute(params: CreatePresetParams): Promise<PresetEntity>;
}

export class CreatePresetService implements ICreatePresetService {
  constructor(private readonly repository: IRepository) {}

  async execute(params: CreatePresetParams): Promise<PresetEntity> {
    const createEntityParams: CreatePresetEntityParams = {
      name: params.name,
      mod: params.mod ?? 0,
      usn: params.usn ?? 0,
      maxTaken: params.maxTaken ?? 65,
      autoplay: params.autoplay ?? true,
      timer: params.timer ?? 0,
      replayq: params.replayq ?? true,
      new: params.new ?? {
        bury: true,
        delays: [1, 10],
        initialFactor: 2500,
        ints: [1, 4, 0],
        order: 0,
        perDay: 20,
      },
      rev: params.rev ?? {
        perDay: 100,
        fuzz: 0.05,
        ivlFct: 1,
        maxIvl: 36500,
        bury: true,
        ease4: 1.3,
        minSpace: 1,
      },
      lapse: params.lapse ?? {
        delays: [10],
        leechAction: 1,
        leechFails: 8,
        minInt: 1,
        mult: 0,
      },
      dyn: params.dyn ?? false,
    };
    return this.repository.addPreset(createEntityParams);
  }
}
