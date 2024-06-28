import { CardType } from './card-type';
import { NoteField } from './note-field';

export type ReqField = [number, string, number[]][];

export enum ModelType {
  STANDARD = 0,
  CLOZE = 1,
}

export type NoteType = {
  /**
   * ID of the note type
   */
  id: number;
  /**
   * Name of the note type
   */
  name: string;
  /**
   * Long specifying the id of the deck that cards are added to by default
   */
  did: number;
  /**
   * Model type
   */
  type: ModelType;
  /**
   * Card types
   */
  tmpls: CardType[];
  /**
   * Modification time in seconds
   */
  mod: number;
  /**
   * Update sequence number: used in same way as other usn vales in db
   */
  usn: number;
  /**
   * Integer specifying which field is used for sorting in the browser
   */
  sortf: number;
  /**
   * Note fields
   */
  flds: NoteField[];
  /**
   * CSS, shared for all templates
   */
  css: string;
  /**
   * Preamble for LaTeX expressions
   */
  latexPre: string;
  /**
   * String added to end of LaTeX expressions (usually \\end{document})
   */
  latexPost: string;
  /**
   * Unused, exists for backward compatibility
   */
  req: ReqField;
  /**
   * Anki saves the tags of the last added note to the current model, use an empty array []
   */
  tags: string[];
  /**
   * Legacy version number (unused)
   */
  vers: [];
};
