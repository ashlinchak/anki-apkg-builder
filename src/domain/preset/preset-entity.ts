export type PresetEntity = {
  id: string;
  name: string;
  mod: number;
  usn: number;
  maxTaken: number;
  autoplay: boolean;
  timer: 0 | 1;
  replayq: boolean;
  new: {
    bury: boolean;
    delays: number[];
    initialFactor: number;
    ints: number[];
    order: number;
    perDay: number;
  };
  rev: {
    perDay: number;
    fuzz: number;
    ivlFct: number;
    maxIvl: number;
    bury: boolean;
    ease4: number;
    minSpace: number;
  };
  lapse: {
    delays: number[];
    leechAction: number;
    leechFails: number;
    minInt: number;
    mult: number;
  };
  dyn: boolean;
};
