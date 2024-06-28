import { CreateCollectionParams } from '../repository';

export const collectionConfiguration = {
  nextPos: 1,
  estTimes: true,
  activeDecks: [1],
  sortType: 'noteFld',
  timeLim: 0,
  sortBackwards: false,
  addToCur: true,
  curDeck: 1,
  newBury: true,
  newSpread: 0,
  dueCounts: true,
  curModel: 1696092076782,
  collapseTime: 1200,
};

export const createCollectionParams: CreateCollectionParams = {
  crt: 1696104134,
  mod: 1696104135525,
  scm: 1696104135523,
  ver: 11,
  dty: 0,
  usn: 0,
  ls: 0,
  conf: JSON.stringify(collectionConfiguration),
  models: JSON.stringify({}),
  decks: JSON.stringify({}),
  dconf: JSON.stringify({}),
  tags: '{}',
};
