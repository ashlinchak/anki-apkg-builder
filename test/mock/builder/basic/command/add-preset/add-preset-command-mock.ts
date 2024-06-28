import { AddPresetCommandParams, IAddPresetCommand, Preset } from '../../../../../../src/main';

export class AddPresetCommandMock implements IAddPresetCommand {
  execute(params: AddPresetCommandParams): Promise<Preset> {
    throw new Error('Method not implemented.');
  }
}
