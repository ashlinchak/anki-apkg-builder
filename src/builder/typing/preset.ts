export type Preset = {
  /**
   * Preset ID
   */
  id: number;
  /**
   * The name of the configuration
   */
  name: string;
  /**
   * Last modification time
   * @default 0
   */
  mod: number;
  /**
   * Update sequence number.
   * Used to figure out diffs when syncing.
   *  --   value of -1 indicates changes that need to be pushed to server.
   *  --   usn < server usn indicates changes that need to be pulled from server.
   * @default 0
   */
  usn: number;
  /**
   * The number of seconds after which to stop the timer
   * @default 65
   */
  maxTaken: number;
  /**
   * Whether the audio associated to a question should be
played when the question is shown
   * @default true
   */
  autoplay: boolean;
  /**
   * Whether timer should be shown (1) or not (0)
   * @default 0
   */
  timer: 0 | 1;
  /**
   * Whether the audio associated to a question should be played when the answer is shown
   * @default true
   */
  replayq: boolean;
  /**
   * The configuration for new cards
   */
  new: {
    /**
     * Whether to bury cards related to new cards answered
     * @default true
     */
    bury: boolean;
    /**
     * The list of successive delay between the learning steps of the new cards, as explained in the manual.
     * @default [1, 10]
     */
    delays: number[];
    /**
     * The initial ease factor
     * @default 2500
     */
    initialFactor: number;
    /**
     * The list of delays according to the button pressed while leaving the learning mode. Good, easy and unused. In the GUI, the first two elements corresponds to Graduating Interval and Easy interval
     * @default [1, 4, 0]
     */
    ints: number[];
    /**
     * In which order new cards must be shown. NEW_CARDS_RANDOM = 0 and NEW_CARDS_DUE = 1.
     * @default 0
     */
    order: number;
    /**
     * Maximal number of new cards shown per day.
     * @default 20
     */
    perDay: number;
  };
  /**
   * The configuration for review cards
   */
  rev: {
    /**
     * Numbers of cards to review per day
     * @default 100
     */
    perDay: number;
    /**
     * The new interval is multiplied by a random number between -fuzz and fuzz
     * @default 0.05
     */
    fuzz: number;
    /**
     * Multiplication factor applied to the intervals Anki generates
     * @default 1
     */
    ivlFct: number;
    /**
     * The maximal interval for review
     * @default 36500
     */
    maxIvl: number;
    /**
     * Whether to bury cards related to new cards answered
     * @default true
     */
    bury: boolean;
    /**
     * The number to add to the easyness when the easy button is pressed
     * @default 1
     */
    ease4: number;
    /**
     * Not currently used according to decks.py code's comment
     * @default 1
     */
    minSpace: number;
  };
  /**
   * The configuration for lapse cards
   */
  lapse: {
    /**
     * The list of successive delay between the learning steps of the new cards, as explained in the manual
     */
    delays: number[];
    /**
     * What to do to leech cards. 0 for suspend, 1 for mark. Numbers according to the order in which the choices appear in aqt/dconf.ui
     */
    leechAction: number;
    /**
     * The number of lapses authorized before doing leechAction
     */
    leechFails: number;
    /**
     * A ower limit to the new interval after a leech
     */
    minInt: number;
    /**
     * Percent by which to multiply the current interval when a card goes has lapsed
     */
    mult: number;
  };
  /**
   * Whether this deck is dynamic. Not present by default in decks.py
   * @default false
   */
  dyn: boolean;
};
