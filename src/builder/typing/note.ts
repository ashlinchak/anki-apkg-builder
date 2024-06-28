export type Note = {
  /**
   * Note ID.
   * Epoch milliseconds of when the note was created
   */
  id: number;
  /**
   * Globally unique id, almost certainly used for syncing
   */
  guid: string;
  /**
   * Model (Note type) ID
   */
  mid: number;
  /**
   * Modification timestamp, epoch seconds
   */
  mod: number;
  /**
   * Tags
   */
  tags: string[];
  /**
   * Note fields
   */
  fields: string[];
  /**
   * Sort field, is used for quick sorting and duplicate check. The sort field is an integer so that when users are sorting on a field that contains only numbers, they are sorted in numeric instead of lexical order. Text is stored in this integer field.
   * @default First field from fields
   */
  sortField: string;
  /**
   * Checksum used for duplicate check.
   * Integer representation of first 8 digits of sha1 hash of the first field
   */
  csum: number;
  /**
   * Update sequence number: for finding diffs when syncing.
   */
  usn: number;

  /**
   * Unused
   */
  flags: number;

  /**
   * Unused
   */
  data: string;
};
