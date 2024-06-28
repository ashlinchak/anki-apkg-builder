export type AddCardParams = {
  /**
   * Note ID
   */
  nid: number;
  /**
   * Deck ID
   */
  did: number;
  /**
   * Ordinal: identifies which of the card templates or cloze deletions it corresponds to
   *  - for card templates, valid values are from 0 to num templates - 1
   *  - for cloze deletions, valid values are from 0 to num deletions - 1 (they're 0 indexed despite the first being called `c1`)
   */
  ord: number;
  /**
   * Update sequence number: used to figure out diffs when syncing.
   *   - value of -1 indicates changes that need to be pushed to server.
   *   - usn < server usn indicates changes that need to be pulled from server.
   */
  usn?: number;
  /**
   * 0=new, 1=learning, 2=review, 3=relearning
   * @default 0
   */
  type?: number;
  /**
   * -3=user buried(In scheduler 2),
   * -2=sched buried (In scheduler 2),
   * -2=buried(In scheduler 1),
   * -1=suspended,
   * 0=new,
   * 1=learning,
   * 2=review (as for type)
   * 3=in learning, next rev in at least a day after the previous review
   * 4=preview
   * @default 0
   */
  queue?: number;
  /**
   * Due is used differently for different card types:
   *   new: note id or random int
   *   due: integer day, relative to the collection's creation time
   *   learning: integer timestamp in second
   * @default nid
   */
  due?: number;
  /**
   * Interval (used in SRS algorithm). Negative = seconds, positive = days
   * @default 0
   */
  ivl?: number;
  /**
   * The ease factor of the card in permille (parts per thousand). If the ease factor is 2500, the card’s interval will be multiplied by 2.5 the next time you press Good.
   * @default 0
   */
  factor?: number;
  /**
   * Number of reviews
   * @default 0
   */
  reps?: number;
  /**
   * The number of times the card went from a "was answered correctly" to "was answered incorrectly" state
   * @default 0
   */
  lapses?: number;
  /**
   * Of the form a*1000+b, with:
   *   - a the number of reps left today
   *   - b the number of reps left till graduation
   *   - for example: '2004' means 2 reps left today and 4 reps till graduation
   * @default 0
   */
  left?: number;
  /**
   * Original due: In filtered decks, it's the original due date that the card had before moving to filtered.
   * If the card lapsed in scheduler1, then it's the value before the lapse. (This is used when switching to scheduler 2. At this time, cards in learning becomes due again, with their previous due date)
   * In any other case it's 0.
   * @default 0
   */
  odue?: number;
  /**
   * Original did: only used when the card is currently in filtered deck
   * @default 0
   */
  odid?: number;
  /**
   * An integer. This integer mod 8 represents a "flag", which can be see in browser and while reviewing a note. Red 1, Orange 2, Green 3, Blue 4, no flag: 0. This integer divided by 8 represents currently nothing
   * @default 0
   */
  flags?: number;
};
