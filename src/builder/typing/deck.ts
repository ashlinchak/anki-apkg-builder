export type Deck = {
  /**
   * ID of deck
   */
  id: number;
  /**
   * Name of deck
   */
  name: string;
  /**
   * Description of deck
   * @default ''
   */
  description: string;
  /**
   * ID of option group from dconf in `col` table
   * @default 1
   */
  presetId: number;
  /**
   * Update sequence number: used in same way as other usn vales in db
   */
  usn: number;
  /**
   * Last modification time
   */
  mod: number;
  /**
   * Two number array.
   * First one is the number of days that have passed between the collection was created and the deck was last updated.
   * The second one is equal to the number of cards seen today in this deck minus the number of new cards in custom study today.
   * BEWARE, it's changed in anki.sched(v2).Scheduler._updateStats and anki.sched(v2).Scheduler._updateCutoff.update  but can't be found by grepping 'newToday', because it's instead written as type+"Today" with type which may be new/rev/lrnToday
   */
  newToday: number[];
  /**
   * Two number array.
   * First one is the number of days that have passed between the collection was created and the deck was last updated.
   * The second one is equal to the number of cards seen today in this deck minus the number of new cards in custom study today.
   * BEWARE, it's changed in anki.sched(v2).Scheduler._updateStats and anki.sched(v2).Scheduler._updateCutoff.update  but can't be found by grepping 'newToday', because it's instead written as type+"Today" with type which may be new/rev/lrnToday
   */
  revToday: number[];
  /**
   * Two number array.
   * First one is the number of days that have passed between the collection was created and the deck was last updated.
   * The second one is equal to the number of cards seen today in this deck minus the number of new cards in custom study today.
   * BEWARE, it's changed in anki.sched(v2).Scheduler._updateStats and anki.sched(v2).Scheduler._updateCutoff.update  but can't be found by grepping 'newToday', because it's instead written as type+"Today" with type which may be new/rev/lrnToday
   */
  lrnToday: number[];
  /**
   * Two number array used somehow for custom study. Currently unused in the code
   */
  timeToday: number[];
  /**
   * AKA filtered deck
   * @default false
   */
  isDynamic: boolean;
  /**
   * Extended new card limit (for custom study)
   * @default 10
   */
  extendNew: number;
  /**
   * Extended review card limit (for custom study)
   * @default 50
   */
  extendRev: number;
  /**
   * `true` when deck is collapsed
   * @default false
   */
  collapsed: boolean;
};
