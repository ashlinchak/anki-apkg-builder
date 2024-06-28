export type AddDeckParams = {
  /**
   * Name of deck
   */
  name: string;
  /**
   * Description of deck
   * @default ''
   */
  description?: string;
  /**
   * ID of option group from dconf in `col` table
   * @default 1
   */
  presetId?: number;
  /**
   * Extended review card limit (for custom study)
   * @default 50
   */
  extendRev?: number;
  /**
   * `true` when deck is collapsed
   * @default false
   */
  collapsed?: boolean;
  /**
   * AKA filtered deck
   * @default false
   */
  isDynamic?: boolean;
  /**
   * Extended new card limit (for custom study)
   * @default 10
   */
  extendNew?: number;
};
