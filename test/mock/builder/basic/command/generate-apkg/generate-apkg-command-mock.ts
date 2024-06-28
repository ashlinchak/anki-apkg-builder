import { GenerateApkgCommandParams, IGenerateApkgCommand } from '../../../../../../src/main';

export class GenerateApkgCommandMock implements IGenerateApkgCommand {
  execute(params: GenerateApkgCommandParams): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
