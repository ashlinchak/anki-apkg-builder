import { NoteType } from './note-type';

export type AddNoteParams = {
  /**
   * Note type ID
   */
  noteTypeId: NoteType['id'];
  /**
   * Note fields
   */
  fields: string[];

  /**
   * Note tags
   */
  tags?: string[];
  /**
   * Sort field, is used for quick sorting and duplicate check. The sort field is an integer so that when users are sorting on a field that contains only numbers, they are sorted in numeric instead of lexical order. Text is stored in this integer field.
   */
  sortField?: AddNoteParams['fields'][number];
};
