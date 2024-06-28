export type CreateDeckParams = {
  name: string;
  desc?: string;
  /**
   * Preset ID
   */
  conf?: number;
  extendRev?: number;
  collapsed?: boolean;
  dyn?: 0 | 1;
  extendNew?: number;
  usn?: number;
  browserCollapsed?: boolean;
  newToday?: number[];
  revToday?: number[];
  lrnToday?: number[];
  timeToday?: number[];
  mod?: number;
};
