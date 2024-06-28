import { generateDigest } from '../../../core/utils/hash';
import { INoteGuidGenerator, NoteGuidGeneratorParams } from '../../../builder/typing/note-guid-generator';

export class DeckNameAndFieldsNoteGuidGenerator implements INoteGuidGenerator {
  generate(params: NoteGuidGeneratorParams): string {
    const { deckName, noteFields } = params;
    const payload = `${deckName}${noteFields.join('')}`;
    return generateDigest(payload);
  }
}
