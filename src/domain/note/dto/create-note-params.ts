export type CreateNoteParams = {
  noteTypeId: number;
  fields: string[];
  tags?: string[];
  sortField?: string;
};
