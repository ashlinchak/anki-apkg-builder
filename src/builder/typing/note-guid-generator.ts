export type NoteGuidGeneratorParams = {
  /**
   * Deck ID
   */
  deckId: number;
  /**
   * Deck name
   */
  deckName: string;
  /**
   * Note fields
   */
  noteFields: string[];
};

/**
 * Generates a note GUID for calculating uniqueness of notes
 */
export interface INoteGuidGenerator {
  generate(params: NoteGuidGeneratorParams): string;
}
