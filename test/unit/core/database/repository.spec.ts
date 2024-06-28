import {
  CardEntity,
  CollectionEntity,
  CreateCardEntityParams,
  CreateCollectionParams,
  CreateDeckEntityParams,
  CreateNoteEntityParams,
  CreateNoteTypeEntityParams,
  CreatePresetEntityParams,
  IDatabase,
  NoteEntity,
  Repository,
  UpdateNoteEntityParams,
} from '../../../../src/main';
import { dconf } from '../../../fixtures/col/dconf-fixture';
import { decks } from '../../../fixtures/col/decks-fixture';
import { models } from '../../../fixtures/col/models-fixture';
import { DatabaseMock } from '../../../mock/core/database/database-mock';

describe('Repository', () => {
  let repository: Repository;
  let db: IDatabase;

  beforeEach(() => {
    db = new DatabaseMock();
    repository = new Repository(db);

    jest.useFakeTimers().setSystemTime(new Date(1710000000000));
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  describe('getDeckRecordsMap', () => {
    it('should return decks map', async () => {
      db.get = jest.fn().mockResolvedValue({ decks: JSON.stringify(decks) });

      const result = await repository.getDeckRecordsMap();

      expect(result).toEqual(decks);
    });
  });

  describe('addDeck', () => {
    it('should add a new deck', async () => {
      const params: CreateDeckEntityParams = {
        name: 'test',
        desc: '',
        usn: 0,
        mod: 0,
        conf: 1,
        newToday: [0, 0],
        timeToday: [0, 0],
        revToday: [0, 0],
        lrnToday: [0, 0],
        dyn: 0,
        extendNew: 10,
        extendRev: 50,
        collapsed: false,
      };

      db.get = jest.fn().mockResolvedValue({ decks: JSON.stringify(decks) });
      db.run = jest.fn();

      const result = await repository.addDeck(params);

      expect(result).toEqual({ ...params, id: 1710000000000 });
      expect(db.run).toHaveBeenCalledWith('UPDATE col SET decks = $decks WHERE id = 1', {
        decks: JSON.stringify({ ...decks, '1710000000000': { ...params, id: 1710000000000 } }),
      });
    });

    it('should override Default deck', async () => {
      const params: CreateDeckEntityParams = {
        name: 'Default',
        desc: 'Updated default deck',
        usn: 0,
        mod: 0,
        conf: 1,
        newToday: [0, 0],
        timeToday: [0, 0],
        revToday: [0, 0],
        lrnToday: [0, 0],
        dyn: 0,
        extendNew: 10,
        extendRev: 50,
        collapsed: false,
      };

      db.get = jest.fn().mockResolvedValue({ decks: JSON.stringify(decks) });
      db.run = jest.fn();

      const result = await repository.addDeck(params);

      expect(result).toEqual({ ...params, id: 1 });
      expect(db.run).toHaveBeenCalledWith('UPDATE col SET decks = $decks WHERE id = 1', {
        decks: JSON.stringify({ [1]: { ...params, id: 1 } }),
      });
    });
  });

  describe('getDeck', () => {
    it('should find deck by id', async () => {
      db.get = jest.fn().mockResolvedValue({ decks: JSON.stringify(decks) });

      const result = await repository.getDeck(1);

      expect(result).toEqual({ ...decks['1'] });
    });

    it('should return undefined if can not find deck by id', async () => {
      db.get = jest.fn().mockResolvedValue({ decks: JSON.stringify(decks) });

      const result = await repository.getDeck(2);

      expect(result).toEqual(undefined);
    });
  });

  describe('getPresetRecordsMap', () => {
    it('should return presets map', async () => {
      db.get = jest.fn().mockResolvedValue({ dconf: JSON.stringify(dconf) });

      const result = await repository.getPresetRecordsMap();

      expect(result).toEqual(dconf);
    });
  });

  describe('addPreset', () => {
    it('should add a new preset', async () => {
      const params: CreatePresetEntityParams = {
        name: 'test',
        mod: 0,
        usn: 0,
        maxTaken: 60,
        autoplay: false,
        timer: 0,
        replayq: false,
        new: {
          bury: false,
          delays: [],
          initialFactor: 250,
          ints: [],
          order: 0,
          perDay: 0,
        },
        rev: {
          perDay: 0,
          fuzz: 0.05,
          ivlFct: 1,
          maxIvl: 36500,
          bury: false,
          ease4: 1.3,
          minSpace: 1,
        },
        lapse: {
          delays: [],
          leechAction: 1,
          leechFails: 8,
          minInt: 0,
          mult: 1,
        },
        dyn: false,
      };

      db.get = jest.fn().mockResolvedValue({ dconf: JSON.stringify(dconf) });
      db.run = jest.fn();

      const result = await repository.addPreset(params);

      expect(result).toEqual({ ...params, id: '2' });
      expect(db.run).toHaveBeenCalledWith('UPDATE col SET dconf = $dconf WHERE id = 1', {
        dconf: JSON.stringify({ ...dconf, '2': { ...params, id: '2' } }),
      });
    });
  });

  describe('getNoteType', () => {
    it('should find note type by id', async () => {
      db.get = jest.fn().mockResolvedValue({ models: JSON.stringify(models) });

      const result = await repository.getNoteType(1719390000001);

      expect(result).toEqual(models['1719390000001']);
    });
  });

  describe('getNoteTypeRecordsMap', () => {
    it('should get note types map', async () => {
      db.get = jest.fn().mockResolvedValue({ models: JSON.stringify(models) });

      const result = await repository.getNoteTypeRecordsMap();

      expect(result).toEqual(models);
    });
  });

  describe('addNoteType', () => {
    let params: CreateNoteTypeEntityParams;

    beforeEach(() => {
      params = {
        name: 'test',
        did: 1,
        type: 1,
        tmpls: [],
        mod: 0,
        usn: 0,
        sortf: 0,
        flds: [
          {
            name: 'Front',
            media: [],
            sticky: false,
            rtl: false,
            ord: 0,
            font: 'Arial',
            size: 20,
          },
        ],
        css: '',
        latexPre: '',
        latexPost: '',
        req: [[0, '', [0]]],
        tags: ['tag 1', 'tag 2'],
        vers: [],
      };

      db.get = jest.fn().mockResolvedValue({ models: JSON.stringify(models) });
      db.run = jest.fn();
    });

    it('should add a new note type with default id', async () => {
      const result = await repository.addNoteType(params);

      expect(result).toEqual({ ...params, id: 1710000000000 });
      expect(db.run).toHaveBeenCalledWith('UPDATE col SET models = $models WHERE id = 1', {
        models: JSON.stringify({ ...models, '1710000000000': { ...params, id: 1710000000000 } }),
      });
    });

    it('should add a new note type with specified id', async () => {
      params.id = 3;

      const result = await repository.addNoteType(params);

      expect(result).toEqual({ ...params, id: 3 });
      expect(db.run).toHaveBeenCalledWith('UPDATE col SET models = $models WHERE id = 1', {
        models: JSON.stringify({ ...models, '3': { ...params, id: 3 } }),
      });
    });
  });

  describe('getNote', () => {
    it('should find note by id', async () => {
      const noteEntity = {} as NoteEntity;

      db.get = jest.fn().mockResolvedValue(noteEntity);

      const result = await repository.getNote(1);

      expect(result).toEqual(noteEntity);
      expect(db.get).toHaveBeenCalledWith('SELECT * FROM notes WHERE id = $id LIMIT 1', { id: 1 });
    });
  });

  describe('getNoteByGuid', () => {
    it('should find note by guid', async () => {
      const noteEntity = {} as NoteEntity;
      const guid = 'guid';

      db.get = jest.fn().mockResolvedValue(noteEntity);

      const result = await repository.getNoteByGuid(guid);

      expect(result).toEqual(noteEntity);
      expect(db.get).toHaveBeenCalledWith('SELECT * FROM notes WHERE guid = $guid LIMIT 1', { guid });
    });
  });

  describe('createNote', () => {
    it('should create a new note with the next id', async () => {
      const oldEntity = { id: 1710000000000 } as NoteEntity;
      const newEntity = { id: 1710000000001 } as NoteEntity;
      const params: CreateNoteEntityParams = {
        guid: 'guid',
        mid: 1,
        usn: 1,
        tags: 'tags',
        flds: 'flds',
        sfld: 'sfld',
        csum: 1,
        flags: 1,
        data: 'data',
        mod: 1,
      };

      repository.getNote = jest
        .fn()
        .mockResolvedValueOnce(oldEntity)
        .mockResolvedValueOnce(undefined)
        .mockResolvedValueOnce(newEntity);
      db.run = jest.fn();

      const result = await repository.createNote(params);

      expect(result).toEqual(newEntity);
      expect(db.run).toHaveBeenCalledWith(
        'INSERT INTO notes (id,guid,mid,mod,tags,flds,sfld,csum,usn,flags,data) VALUES ($id,$guid,$mid,$mod,$tags,$flds,$sfld,$csum,$usn,$flags,$data)',
        {
          ...params,
          id: 1710000000001,
        },
      );
    });
  });

  describe('updateNote', () => {
    it('should update note', async () => {
      const noteEntity = {} as NoteEntity;
      const params: UpdateNoteEntityParams = {
        tags: 'tags',
        flds: 'flds',
        sfld: 'sfld',
        csum: 1,
        usn: 1,
        flags: 1,
        data: 'data',
        mod: 1,
        guid: 'guid',
        mid: 1,
      };

      db.run = jest.fn();
      repository.getNote = jest.fn().mockResolvedValue(noteEntity);

      const result = await repository.updateNote(1, params);

      expect(result).toEqual(noteEntity);
      expect(db.run).toHaveBeenCalledWith(
        `UPDATE notes (guid,mid,mod,tags,flds,sfld,csum,usn,flags,data)
       VALUES ($guid,$mid,$mod,$tags,$flds,$sfld,$csum,$usn,$flags,$data)
       WHERE id = $id`,
        {
          ...params,
          id: 1,
        },
      );
    });
  });

  describe('getCard', () => {
    it('should find card by id', async () => {
      const cardEntity = {} as CardEntity;

      db.get = jest.fn().mockResolvedValue(cardEntity);

      const result = await repository.getCard(1);

      expect(result).toEqual(cardEntity);
      expect(db.get).toHaveBeenCalledWith('SELECT * FROM cards WHERE id = $id LIMIT 1', { id: 1 });
    });
  });

  describe('addCard', () => {
    it('should add a new card', async () => {
      const oldEntity = { id: 1710000000000 } as CardEntity;
      const newEntity = { id: 1710000000001 } as CardEntity;
      const params: CreateCardEntityParams = {
        nid: 1,
        did: 1,
        ord: 1,
        mod: 1,
        usn: 1,
        type: 1,
        queue: 1,
        due: 1,
        ivl: 1,
        factor: 1,
        reps: 1,
        lapses: 1,
        left: 1,
        odue: 1,
        odid: 1,
        flags: 1,
        data: 'data',
      };

      repository.getCard = jest
        .fn()
        .mockResolvedValueOnce(oldEntity)
        .mockResolvedValueOnce(undefined)
        .mockResolvedValueOnce(newEntity);
      db.run = jest.fn();

      const result = await repository.addCart(params);

      expect(result).toEqual(newEntity);
      expect(db.run).toHaveBeenCalledWith(
        `INSERT INTO cards (id,nid,did,ord,mod,usn,type,queue,due,ivl,factor,reps,lapses,left,odue,odid,flags,data)
    VALUES ($id,$nid,$did,$ord,$mod,$usn,$type,$queue,$due,$ivl,$factor,$reps,$lapses,$left,$odue,$odid,$flags,$data)`,
        {
          ...params,
          id: 1710000000001,
        },
      );
    });
  });

  describe('getCollection', () => {
    it('should find collection', async () => {
      const collectionEntity = {} as CollectionEntity;

      db.get = jest.fn().mockResolvedValue(collectionEntity);

      const result = await repository.getCollection();

      expect(result).toEqual(collectionEntity);
      expect(db.get).toHaveBeenCalledWith('SELECT * FROM col LIMIT 1');
    });
  });

  describe('addCollection', () => {
    it('should add only collection', async () => {
      const params: CreateCollectionParams = {
        crt: 1,
        mod: 1,
        scm: 1,
        ver: 1,
        dty: 1,
        usn: 1,
        ls: 1,
        conf: 'conf',
        models: 'models',
        decks: 'decks',
        dconf: 'dconf',
        tags: 'tags',
      };
      const collectionEntity = {} as CollectionEntity;

      db.run = jest.fn();
      repository.getCollection = jest.fn().mockResolvedValue(collectionEntity);

      const result = await repository.addCollection(params);

      expect(result).toEqual(collectionEntity);
      expect(db.run).toHaveBeenCalledWith(
        `INSERT INTO "col"
      (id, crt, mod, scm, ver, dty, usn, ls, conf, models, decks, dconf, tags)
      VALUES
      ($id, $crt, $mod, $scm, $ver, $dty, $usn, $ls, $conf, $models, $decks, $dconf, $tags)`,
        {
          ...params,
          id: 1,
        },
      );
    });
  });
});
