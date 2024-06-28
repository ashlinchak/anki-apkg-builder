export type DeckEntity = {
  id: number;
  name: string;
  desc: string;
  usn: number;
  mod: number;
  conf: number;
  newToday: number[];
  timeToday: number[];
  revToday: number[];
  lrnToday: number[];
  dyn: 0 | 1;
  extendNew: number;
  extendRev: number;
  collapsed: boolean;
};
