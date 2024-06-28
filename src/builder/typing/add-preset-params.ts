import { Preset } from './preset';

export type AddPresetParams = Partial<Omit<Preset, 'id'>> & { name: string };
