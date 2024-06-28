import { PresetEntity } from '../../../../domain/preset/preset-entity';
import { Preset } from '../../../typing/preset';

export interface IPresetFactory {
  create(entity: PresetEntity): Preset;
}

export class PresetFactory implements IPresetFactory {
  create(entity: PresetEntity): Preset {
    return {
      id: Number.parseInt(entity.id, 10),
      name: entity.name,
      mod: entity.mod,
      usn: entity.usn,
      maxTaken: entity.maxTaken,
      autoplay: entity.autoplay,
      timer: entity.timer,
      replayq: entity.replayq,
      new: {
        bury: entity.new.bury,
        delays: entity.new.delays,
        initialFactor: entity.new.initialFactor,
        ints: entity.new.ints,
        order: entity.new.order,
        perDay: entity.new.perDay,
      },
      rev: {
        perDay: entity.rev.perDay,
        fuzz: entity.rev.fuzz,
        ivlFct: entity.rev.ivlFct,
        maxIvl: entity.rev.maxIvl,
        bury: entity.rev.bury,
        ease4: entity.rev.ease4,
        minSpace: entity.rev.minSpace,
      },
      lapse: {
        delays: entity.lapse.delays,
        leechAction: entity.lapse.leechAction,
        leechFails: entity.lapse.leechFails,
        minInt: entity.lapse.minInt,
        mult: entity.lapse.mult,
      },
      dyn: entity.dyn,
    };
  }
}
