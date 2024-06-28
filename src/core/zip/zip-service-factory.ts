import { AdmZipAdapter } from './adapter/adm-zip-adapter';
import { IZipService } from './zip-service';

export type ZipProvider = 'adm-zip';

export interface IZipServiceFactory {
  create(zipProvider?: ZipProvider): IZipService;
}

export class ZipServiceFactory implements IZipServiceFactory {
  create(zipProvider?: ZipProvider): IZipService {
    if (zipProvider === 'adm-zip') {
      return new AdmZipAdapter();
    }

    return new AdmZipAdapter();
  }
}
