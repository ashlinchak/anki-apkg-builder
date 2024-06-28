import { CollectionEntity } from '../../../domain/collection/collection-entity';
import { DEFAULT_DECK_NAME } from '../../../domain/deck/constant';
import { ICreateDeckService } from '../../../domain/deck/service/create-deck-service';
import { DEFAULT_PRESET_NAME } from '../../../domain/preset/constant';
import { ICreatePresetService } from '../../../domain/preset/service/create-preset-service';
import { IRepository } from '../repository';
import { createCollectionParams } from './seed-data';

export interface IDatabaseSeeder {
  seed(): Promise<void>;
}

export class DatabaseSeeder implements IDatabaseSeeder {
  constructor(
    private readonly repository: IRepository,
    private readonly createPresetService: ICreatePresetService,
    private readonly createDeckService: ICreateDeckService,
  ) {}

  async seed(): Promise<void> {
    await this.addCollectionRecord();
  }

  private async addCollectionRecord(): Promise<CollectionEntity> {
    await this.repository.addCollection(createCollectionParams);
    await this.createPresetService.execute({ name: DEFAULT_PRESET_NAME });
    await this.createDeckService.execute({ name: DEFAULT_DECK_NAME });
    return this.repository.getCollection();
  }
}
