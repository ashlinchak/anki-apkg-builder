import { NoteTypeEntity, NoteTypeFactory } from '../../../../../../src/main';

describe('NoteTypeFactory', () => {
  let noteFactory: NoteTypeFactory;

  beforeEach(() => {
    noteFactory = new NoteTypeFactory();
  });

  describe('create', () => {
    it('should create a note type', () => {
      const noteTypeEntity: NoteTypeEntity = {
        id: 1,
        name: 'My note type',
        did: 1,
        type: 0,
        mod: 1,
        tags: ['tag1', 'tag2'],
        flds: [
          {
            name: 'fld1',
            ord: 1,
            sticky: true,
            rtl: false,
            font: 'Arial',
            size: 12,
            media: ['media1', 'media2'],
          },
        ],
        tmpls: [
          {
            name: 'tmpl1',
            ord: 1,
            qfmt: 'qfmt1',
            afmt: 'afmt1',
            bqfmt: 'bqfmt1',
            bafmt: 'bafmt1',
            did: 1,
          }
        ],
        usn: 1,
        sortf: 1,
        css: 'css1',
        latexPre: 'latexPre1',
        latexPost: 'latexPost1',
        vers: [],
        req: [[0, 'all', [0]]],
      };

      const result = noteFactory.create(noteTypeEntity);

      expect(result).toEqual({
        id: 1,
        name: 'My note type',
        did: 1,
        type: 0,
        mod: 1,
        tags: ['tag1', 'tag2'],
        flds: [
          {
            name: 'fld1',
            ord: 1,
            sticky: true,
            rtl: false,
            font: 'Arial',
            size: 12,
            media: ['media1', 'media2'],
          },
        ],
        tmpls: [
          {
            name: 'tmpl1',
            ord: 1,
            qfmt: 'qfmt1',
            afmt: 'afmt1',
            bqfmt: 'bqfmt1',
            bafmt: 'bafmt1',
            did: 1,
          }
        ],
        usn: 1,
        sortf: 1,
        css: 'css1',
        latexPre: 'latexPre1',
        latexPost: 'latexPost1',
        vers: [],
        req: [[0, 'all', [0]]],
      });
    });
  });
});
