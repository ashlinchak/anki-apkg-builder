import { NoteEntity, NoteFactory } from '../../../../../../src/main';

describe('NoteFactory', () => {
  let noteFactory: NoteFactory;

  beforeEach(() => {
    noteFactory = new NoteFactory();
  });

  describe('create', () => {
    it('should create a note', () => {
      const noteEntity: NoteEntity = {
        id: 1,
        guid: 'My guid',
        mid: 1,
        mod: 1,
        tags: 'tag1 tag2',
        flds: 'fld1\u001Ffld2',
        sfld: 'sfld',
        csum: 1,
        usn: 1,
        flags: 0,
        data: '',
      };

      const result = noteFactory.create(noteEntity);

      expect(result).toEqual({
        id: 1,
        guid: 'My guid',
        mid: 1,
        mod: 1,
        tags: ['tag1', 'tag2'],
        fields: ['fld1', 'fld2'],
        sortField: 'sfld',
        csum: 1,
        usn: 1,
        flags: 0,
        data: '',
      });
    });
  });
});
