# anki-apkg-builder

Generate Anki package files (`.apkg`) programmatically using Node.js and import them into Anki.

## Usage

Install package:

```sh
npm install anki-apkg-builder
```

Generating Anki `apkg` file TypeScript example:

```ts
import { AnkiApkgBuilderFactory } from 'anki-apkg-builder';

const builder = new AnkiApkgBuilderFactory().create();
const germanVocabularyDeck = await builder.addDeck({
  name: 'German Vocabulary',
});
const englishVocabularyDeck = await builder.addDeck({
  name: 'English Vocabulary',
});
const germanVocabularyNoteType = await builder.addNoteType({
  id: 1719390000001,
  did: germanVocabularyDeck.id,
  name: 'German Vocabulary Note type',
  css: '.front{text-align:center}',
  tmpls: [
    {
      name: 'Forward Card',
      ord: 0,
      qfmt: '<span class="front">{{Front}}</span>',
      afmt: '{{FrontSide}}\n\n<hr id="answer">\n\n{{Back}}',
      bqfmt: '',
      bafmt: '',
      did: null,
    },
    {
      name: 'Reverse Card',
      ord: 1,
      qfmt: '{{Back}}',
      afmt: '{{FrontSide}}\n\n<hr id="answer">\n\n{{Front}}',
      bqfmt: '',
      bafmt: '',
      did: null,
    },
  ],
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
    {
      name: 'Back',
      media: [],
      sticky: false,
      rtl: false,
      ord: 1,
      font: 'Arial',
      size: 20,
    },
  ],
});
const englishVocabularyNoteType = await builder.addNoteType({
  id: 1719390000002,
  did: englishVocabularyDeck.id,
  name: 'English Vocabulary Note type',
  css: '.front{text-align:center}',
  tmpls: [
    {
      name: 'Question Card',
      ord: 0,
      qfmt: '<span class="front">{{Front}}</span></br><span class="transcription">[{{Transcription}}]</span>',
      afmt: '{{FrontSide}}\n\n<hr id="answer">\n\n{{Back}}',
      bqfmt: '',
      bafmt: '',
      did: null,
    },
    {
      name: 'Answer Card',
      ord: 1,
      qfmt: '{{Back}}',
      afmt: '{{FrontSide}}\n\n<hr id="answer">\n\n{{Front}}',
      bqfmt: '',
      bafmt: '',
      did: null,
    },
  ],
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
    {
      name: 'Transcription',
      media: [],
      sticky: false,
      rtl: false,
      ord: 1,
      font: 'Arial',
      size: 20,
    },
    {
      name: 'Back',
      media: [],
      sticky: false,
      rtl: false,
      ord: 2,
      font: 'Arial',
      size: 20,
    },
  ],
});

// Note 1
const noteGermanVocabularyDeck = await builder.addNote({
  noteTypeId: germanVocabularyNoteType.id,
  fields: ['fragen', 'запитувати, дізнаватися'],
});
// Forward Card: "fragen" -> "запитувати, дізнаватися"
await builder.addCard({
  nid: noteGermanVocabularyDeck.id,
  did: germanVocabularyDeck.id,
  ord: 0, // Forward Card template of German Vocabulary
});
// Reverse Card: "запитувати, дізнаватися" -> "fragen"
await builder.addCard({
  nid: noteGermanVocabularyDeck.id,
  did: germanVocabularyDeck.id,
  ord: 1, // Reverse Card template of German Vocabulary
});

// Note 2
const noteEnglishVocabularyDeck = await builder.addNote({
  noteTypeId: englishVocabularyNoteType.id,
  fields: ['read', 'ri:d', 'читати'],
});
await builder.addCard({
  nid: noteEnglishVocabularyDeck.id,
  did: englishVocabularyDeck.id,
  ord: 0,
});

// Note 3
const noteWithImageEnglishVocabularyDeck = await builder.addNote({
  noteTypeId: englishVocabularyNoteType.id,
  fields: ['write<br><img src="write.jpeg" alt="write">', 'rīt', 'писати'],
});
await builder.addCard({
  nid: noteWithImageEnglishVocabularyDeck.id,
  did: englishVocabularyDeck.id,
  ord: 0,
});

// Add media from Note 3
await builder.addMedia({
  fileName: 'write.jpeg', // Should be unique across all decks
  data: readFileSync(path.resolve(__dirname, 'write.jpeg')),
});

await builder.generateApkg(path.resolve(__dirname, 'decks-to-import.apkg'));
```

To create multiple `.apkg` files, generate a new builder using `AnkiApkgBuilderFactory` for each file:

```ts
import { AnkiApkgBuilderFactory } from '@mdanki/apkg-builder';

for (const archiveInput of archiveInputs) {
  const builder = new AnkiApkgBuilderFactory().create();
  // ...
}
```

## License

ISC License, Copyright (c) 2024, Oleksandr Shlinchak.
