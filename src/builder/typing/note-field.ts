export type NoteField = {
  /**
   * Name of the field
   */
  name: string;
  /**
   * Ordinal of the field - goes from 0 to num fields -1
   */
  ord: number;
  /**
   * Sticky fields retain the value that was last added when adding new notes
   */
  sticky: boolean;
  /**
   * Boolean, right-to-left script
   */
  rtl: boolean;
  /**
   * Font name
   */
  font: string;
  /**
   * Font size
   */
  size: number;
  /**
   * Array of media. appears to be unused
   */
  media: string[];
};
