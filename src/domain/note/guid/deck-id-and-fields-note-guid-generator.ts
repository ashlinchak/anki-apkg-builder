import { generateDigest } from '../../../core/utils/hash';
import { INoteGuidGenerator, NoteGuidGeneratorParams } from '../../../builder/typing/note-guid-generator';

export class DeckIdAndFieldsNoteGuidGenerator implements INoteGuidGenerator {
  generate(params: NoteGuidGeneratorParams): string {
    const { deckId, noteFields } = params;
    const payload = `${deckId}${noteFields.join('')}`;
    return generateDigest(payload);
  }
}
