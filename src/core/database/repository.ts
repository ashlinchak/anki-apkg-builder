import { CardEntity } from '../../domain/card/card-entity';
import { CollectionEntity } from '../../domain/collection/collection-entity';
import { DEFAULT_DECK_NAME, DEFAULT_DECK_ID } from '../../domain/deck/constant';
import { DeckEntity } from '../../domain/deck/deck-entity';
import { NoteTypeEntity } from '../../domain/note-type/note-type-entity';
import { NoteEntity } from '../../domain/note/note-entity';
import { PresetEntity } from '../../domain/preset/preset-entity';
import { IDatabase } from './database';

export type CreateDeckEntityParams = Omit<DeckEntity, 'id'>;
export type CreateCollectionParams = Omit<CollectionEntity, 'id'>;
export type CreatePresetEntityParams = Omit<PresetEntity, 'id'>;
export type CreateNoteTypeEntityParams = Omit<NoteTypeEntity, 'id'> & { id?: number };
export type CreateNoteEntityParams = Omit<NoteEntity, 'id'>;
export type UpdateNoteEntityParams = Omit<NoteEntity, 'id'>;
export type CreateCardEntityParams = Omit<CardEntity, 'id'>;

export interface IRepository {
  getDeckRecordsMap(): Promise<Record<DeckEntity['id'], DeckEntity>>;
  addDeck(params: CreateDeckEntityParams): Promise<DeckEntity>;
  getDeck(id: number): Promise<DeckEntity | undefined>;

  getPresetRecordsMap(): Promise<Record<PresetEntity['id'], PresetEntity>>;
  addPreset(params: CreatePresetEntityParams): Promise<PresetEntity>;

  getNoteType(id: number): Promise<NoteTypeEntity>;
  getNoteTypeRecordsMap(): Promise<Record<NoteTypeEntity['id'], NoteTypeEntity>>;
  addNoteType(params: CreateNoteTypeEntityParams): Promise<NoteTypeEntity>;

  getNote(id: number): Promise<NoteEntity | undefined>;
  getNoteByGuid(guid: string): Promise<NoteEntity | undefined>;
  createNote(params: CreateNoteEntityParams): Promise<NoteEntity>;
  updateNote(id: number, params: UpdateNoteEntityParams): Promise<NoteEntity>;

  getCard(id: number): Promise<CardEntity | undefined>;
  addCart(params: CreateCardEntityParams): Promise<CardEntity>;

  getCollection(): Promise<CollectionEntity>;
  addCollection(params: CreateCollectionParams): Promise<CollectionEntity>;
}

export class Repository implements IRepository {
  constructor(private readonly db: IDatabase) {}

  async getDeckRecordsMap(): Promise<Record<DeckEntity['id'], DeckEntity>> {
    const { decks: decksString } = await this.getCollection();
    return JSON.parse(decksString) as Record<DeckEntity['id'], DeckEntity>;
  }

  async addDeck(params: CreateDeckEntityParams): Promise<DeckEntity> {
    const decksMap = await this.getDeckRecordsMap();
    const calculateDeckId = (): number => {
      let id = Date.now();
      while (Object.keys(decksMap).includes(id.toString())) {
        id += 1;
      }
      return id;
    };
    const id = params.name === DEFAULT_DECK_NAME ? DEFAULT_DECK_ID : calculateDeckId();
    const deckEntity = { ...params, id };
    decksMap[id] = deckEntity;

    await this.db.run(`UPDATE col SET decks = $decks WHERE id = 1`, { decks: JSON.stringify(decksMap) });

    return deckEntity;
  }

  async getDeck(id: number): Promise<DeckEntity | undefined> {
    const decksMap = await this.getDeckRecordsMap();
    return decksMap[id];
  }

  async getPresetRecordsMap(): Promise<Record<PresetEntity['id'], PresetEntity>> {
    const { dconf: presetsString } = await this.getCollection();
    return JSON.parse(presetsString) as Record<PresetEntity['id'], PresetEntity>;
  }

  async addPreset(params: CreatePresetEntityParams): Promise<PresetEntity> {
    const presetsMap = await this.getPresetRecordsMap();
    let id = 1;
    while (Object.keys(presetsMap).includes(id.toString())) {
      id += 1;
    }
    const presetEntity = { ...params, id: id.toString() };
    presetsMap[id.toString()] = presetEntity;

    await this.db.run(`UPDATE col SET dconf = $dconf WHERE id = 1`, { dconf: JSON.stringify(presetsMap) });

    return presetEntity;
  }

  async getNoteType(id: number): Promise<NoteTypeEntity> {
    const noteTypesMap = await this.getNoteTypeRecordsMap();
    return noteTypesMap[id];
  }

  async getNoteTypeRecordsMap(): Promise<Record<NoteTypeEntity['id'], NoteTypeEntity>> {
    const { models: noteTypesString } = await this.getCollection();
    return JSON.parse(noteTypesString) as Record<NoteTypeEntity['id'], NoteTypeEntity>;
  }

  async addNoteType(params: CreateNoteTypeEntityParams): Promise<NoteTypeEntity> {
    const noteTypesMap = await this.getNoteTypeRecordsMap();
    let id = params.id ?? Date.now();
    while (Object.keys(noteTypesMap).includes(id.toString())) {
      id += 1;
    }
    const noteTypeEntity = { ...params, id };
    noteTypesMap[id] = noteTypeEntity;

    await this.db.run(`UPDATE col SET models = $models WHERE id = 1`, { models: JSON.stringify(noteTypesMap) });

    return noteTypeEntity;
  }

  async getNote(id: number): Promise<NoteEntity | undefined> {
    return this.db.get<NoteEntity | undefined>('SELECT * FROM notes WHERE id = $id LIMIT 1', { id });
  }

  async getNoteByGuid(guid: string): Promise<NoteEntity | undefined> {
    return this.db.get<NoteEntity | undefined>('SELECT * FROM notes WHERE guid = $guid LIMIT 1', { guid });
  }

  async createNote(params: CreateNoteEntityParams): Promise<NoteEntity> {
    let id = Date.now();
    while (await this.getNote(id)) {
      id += 1;
    }
    const noteTypeEntity = { ...params, id };

    await this.db.run(
      `INSERT INTO notes (id,guid,mid,mod,tags,flds,sfld,csum,usn,flags,data) VALUES ($id,$guid,$mid,$mod,$tags,$flds,$sfld,$csum,$usn,$flags,$data)`,
      noteTypeEntity,
    );

    return this.getNote(noteTypeEntity.id) as Promise<NoteEntity>;
  }

  async updateNote(id: number, params: UpdateNoteEntityParams): Promise<NoteEntity> {
    await this.db.run(
      `UPDATE notes (guid,mid,mod,tags,flds,sfld,csum,usn,flags,data)
       VALUES ($guid,$mid,$mod,$tags,$flds,$sfld,$csum,$usn,$flags,$data)
       WHERE id = $id`,
      { ...params, id },
    );
    return this.getNote(id) as Promise<NoteEntity>;
  }

  async getCard(id: number): Promise<CardEntity | undefined> {
    return this.db.get<CardEntity | undefined>('SELECT * FROM cards WHERE id = $id LIMIT 1', { id });
  }

  async addCart(params: CreateCardEntityParams): Promise<CardEntity> {
    let id = Date.now();
    while (await this.getCard(id)) {
      id += 1;
    }
    const noteTypeEntity = { ...params, id };

    await this.db.run(
      `INSERT INTO cards (id,nid,did,ord,mod,usn,type,queue,due,ivl,factor,reps,lapses,left,odue,odid,flags,data)
    VALUES ($id,$nid,$did,$ord,$mod,$usn,$type,$queue,$due,$ivl,$factor,$reps,$lapses,$left,$odue,$odid,$flags,$data)`,
      noteTypeEntity,
    );

    return this.getCard(noteTypeEntity.id) as Promise<CardEntity>;
  }

  async getCollection(): Promise<CollectionEntity> {
    return this.db.get<CollectionEntity>('SELECT * FROM col LIMIT 1');
  }

  async addCollection(params: CreateCollectionParams): Promise<CollectionEntity> {
    const collectionEntity = { ...params, id: 1 };

    await this.db.run(
      `INSERT INTO "col"
      (id, crt, mod, scm, ver, dty, usn, ls, conf, models, decks, dconf, tags)
      VALUES
      ($id, $crt, $mod, $scm, $ver, $dty, $usn, $ls, $conf, $models, $decks, $dconf, $tags)`,
      collectionEntity,
    );

    return this.getCollection();
  }
}
