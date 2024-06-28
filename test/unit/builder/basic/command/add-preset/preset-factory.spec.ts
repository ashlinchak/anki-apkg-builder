import { PresetEntity, PresetFactory } from '../../../../../../src/main';

describe('PresetFactory', () => {
  let presetFactory: PresetFactory;

  beforeEach(() => {
    presetFactory = new PresetFactory();
  });

  describe('create', () => {
    it('should create a preset', () => {
      const presetEntity: PresetEntity = {
        id: '1',
        name: 'My preset',
        mod: 1,
        usn: 1,
        maxTaken: 1,
        autoplay: true,
        timer: 0,
        replayq: true,
        new: {
          bury: true,
          delays: [1, 2],
          initialFactor: 1,
          ints: [1, 2],
          order: 1,
          perDay: 1,
        },
        rev: {
          perDay: 1,
          fuzz: 1,
          ivlFct: 1,
          maxIvl: 1,
          bury: true,
          ease4: 1,
          minSpace: 1,
        },
        lapse: {
          delays: [1, 2],
          leechAction: 1,
          leechFails: 1,
          minInt: 1,
          mult: 1,
        },
        dyn: true,
      };

      const result = presetFactory.create(presetEntity);

      expect(result).toEqual({
        id: 1,
        name: 'My preset',
        mod: 1,
        usn: 1,
        maxTaken: 1,
        autoplay: true,
        timer: 0,
        replayq: true,
        new: {
          bury: true,
          delays: [1, 2],
          initialFactor: 1,
          ints: [1, 2],
          order: 1,
          perDay: 1,
        },
        rev: {
          perDay: 1,
          fuzz: 1,
          ivlFct: 1,
          maxIvl: 1,
          bury: true,
          ease4: 1,
          minSpace: 1,
        },
        lapse: {
          delays: [1, 2],
          leechAction: 1,
          leechFails: 1,
          minInt: 1,
          mult: 1,
        },
        dyn: true,
      });
    });
  });
});
