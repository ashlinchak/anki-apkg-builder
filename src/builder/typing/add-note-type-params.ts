import { CardType } from './card-type';
import { NoteField } from './note-field';
import { ModelType, ReqField } from './note-type';

export type AddNoteTypeParams = {
  /**
   * ID of the note type
   * @default The epoch milliseconds of when the note type was created
   */
  id?: number;
  /**
   * Long specifying the id of the deck that cards are added to by default
   * @default 1
   */
  did?: number;
  /**
   * Note type name
   */
  name: string;
  /**
   * Card types
   * @example [
   *   {
   *     "name": "Card 1",
   *     "qfmt": "{{Front}}<link rel=\"stylesheet\" href=\"_highlight_default.css\"><link rel=\"stylesheet\" href=\"_highlight_dark.css\"></link><script>var script;\"undefined\"==typeof hljs&&((script=document.createElement(\"script\")).src=\"_prism.js\",script.async=!1,document.head.appendChild(script));(script=document.createElement(\"script\")).src=\"_highlight.js\",script.async=!1,document.head.appendChild(script),document.head.removeChild(script);</script>",
   *     "did": null,
   *     "bafmt": "",
   *     "afmt": "{{FrontSide}}\n\n<hr id=\"answer\">\n\n{{Back}}",
   *     "ord": 0,
   *     "bqfmt": ""
   *   }
   * ]
   */

  tmpls: CardType[];
  /**
   * Note fields
   * @example [
   *   {
   *     "name": "Front",
   *     "media": [],
   *     "sticky": false,
   *     "rtl": false,
   *     "ord": 0,
   *     "font": "Arial",
   *     "size": 20
   *   },
   *   {
   *     "name": "Back",
   *     "media": [],
   *     "sticky": false,
   *     "rtl": false,
   *     "ord": 1,
   *     "font": "Arial",
   *     "size": 20
   *   }
   * ]
   */
  flds: NoteField[];
  /**
   * CSS, shared for all templates
   * @default .card{font-family:arial;font-size:20px;text-align:center;color:black;background-color:white;}
   */
  css?: string;
  /**
   * Model type
   * @default STANDARD(0)
   */
  type?: ModelType;
  /**
   * Modification time in seconds
   * @default 1696099943
   */
  mod?: number;
  /**
   * Update sequence number: used in same way as other usn vales in db
   * @default -1
   */
  usn?: number;
  /**
   * Integer specifying which field is used for sorting in the browser
   * @default 0
   */
  sortf?: number;
  /**
   * Preamble for LaTeX expressions
   * @default \\documentclass[12pt]{article}\n\\special{papersize=3in,5in}\n\\usepackage[utf8]{inputenc}\n\\usepackage{amssymb,amsmath}\n\\pagestyle{empty}\n\\setlength{\\parindent}{0in}\n\\begin{document}\n
   */
  latexPre?: string;
  /**
   * String added to end of LaTeX expressions (usually \\end{document})
   * @default \\end{document}
   */
  latexPost?: string;
  /**
   * Unused, exists for backward compatibility
   * @default [[0, "all", [0]]]
   */
  req?: ReqField;
  /**
   * Anki saves the tags of the last added note to the current model, use an empty array []
   * @default []
   */
  tags?: string[];
};
