import { IAnkiApkgBuilder } from './anki-apkg-builder';

export interface IAnkiApkgBuilderFactory {
  create(): Promise<IAnkiApkgBuilder>;
}
