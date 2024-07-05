import { IAnkiApkgBuilder } from './anki-apkg-builder';

export type CreateAnkiApkgBuilderParams = {
  /**
   * Prepare database by creating and seeding it.
   * @default true
   */
  prepareDatabase?: boolean;
};

export interface IAnkiApkgBuilderFactory {
  create(params?: CreateAnkiApkgBuilderParams): Promise<IAnkiApkgBuilder>;
}
