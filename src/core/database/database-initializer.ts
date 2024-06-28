import { IDatabaseCreator } from './database-creator';
import { IDatabaseSeeder } from './seed/database-seeder';

export interface IDatabaseInitializer {
  initialize(): Promise<void>;
}

export class DatabaseInitializer implements IDatabaseInitializer {
  private isInitialized: boolean = false;

  constructor(
    private readonly databaseCreator: IDatabaseCreator,
    private readonly databaseSeeder: IDatabaseSeeder,
  ) {}

  async initialize(): Promise<void> {
    if (this.isInitialized) {
      return;
    }

    await this.databaseCreator.create();
    await this.databaseSeeder.seed();

    this.isInitialized = true;
  }
}
