/**
 * Card type
 * @example [
 *   {
 *     "name": "Card 1",
 *     "ord": 0,
 *     "qfmt": "{{Front}}<link rel=\"stylesheet\" href=\"_highlight_default.css\"><link rel=\"stylesheet\" href=\"_highlight_dark.css\"></link><script>var script;\"undefined\"==typeof hljs&&((script=document.createElement(\"script\")).src=\"_prism.js\",script.async=!1,document.head.appendChild(script));(script=document.createElement(\"script\")).src=\"_highlight.js\",script.async=!1,document.head.appendChild(script),document.head.removeChild(script);</script>",
 *     "afmt": "{{FrontSide}}\n\n<hr id=\"answer\">\n\n{{Back}}",
 *     "bafmt": "",
 *     "bqfmt": ""
 *     "did": null,
 *   }
 * ]
 * @see https://docs.ankiweb.net/getting-started.html#card-types
 */
export type CardType = {
  /**
   * Card type name
   */
  name: string;
  /**
   * The ordinal of the card type
   */
  ord: number;
  /**
   * The question format
   */
  qfmt: string;
  /**
   * The answer format
   */
  afmt: string;
  /**
   * The back format
   */
  bqfmt: string;
  /**
   * The back format
   */
  bafmt: string;
  /**
   * The deck id
   */
  did: number | null;
};
