export type CreateNoteTypeParams = {
  id?: number;
  did?: number;
  name: string;
  tmpls: {
    name: string;
    ord: number;
    qfmt: string;
    afmt: string;
    bqfmt: string;
    bafmt: string;
    did: number | null;
  }[];
  flds: {
    name: string;
    ord: number;
    sticky: boolean;
    rtl: boolean;
    font: string;
    size: number;
    media: string[];
  }[];
  css?: string;
  type?: 0 | 1;
  mod?: number;
  usn?: number;
  sortf?: number;
  latexPre?: string;
  latexPost?: string;
  req?: [number, string, number[]][];
  tags?: string[];
};
