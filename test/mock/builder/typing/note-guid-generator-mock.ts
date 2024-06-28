import { INoteGuidGenerator, NoteGuidGeneratorParams } from '../../../../src/main';

export class NoteGuidGeneratorMock implements INoteGuidGenerator {
  generate(params: NoteGuidGeneratorParams): string {
    throw new Error('Method not implemented.');
  }
}
