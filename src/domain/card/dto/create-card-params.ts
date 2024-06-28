export type CreateCardParams = {
  nid: number;
  did: number;
  ord: number;
  usn?: number;
  type?: number;
  queue?: number;
  due?: number;
  ivl?: number;
  factor?: number;
  reps?: number;
  lapses?: number;
  left?: number;
  odue?: number;
  odid?: number;
  flags?: number;
};
